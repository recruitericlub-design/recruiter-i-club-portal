import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactName,
      phone,
      email,
      specialty,
      workersCount,
      requirements,
      budget,
      salaryOffered,
      city,
    } = body;

    if (!phone || !contactName) {
      return NextResponse.json(
        { error: "Будь ласка, вкажіть контактну особу та номер телефону" },
        { status: 400 }
      );
    }

    // 1. Find or create Company (Rule: No hard delete, check isDeleted: false)
    let company = await prisma.company.findFirst({
      where: {
        OR: [
          ...(phone ? [{ phone }] : []),
          ...(email ? [{ email }] : []),
          ...(companyName ? [{ name: companyName }] : []),
        ],
        isDeleted: false,
      },
    });

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName || `Підприємство (${contactName})`,
          phone: phone || null,
          email: email || null,
          address: city || null,
        },
      });
    }

    // 2. Find or create Contact (type: 'b2b_contact')
    let contact = await prisma.contact.findFirst({
      where: {
        phone,
        isDeleted: false,
      },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          companyId: company.id,
          name: contactName,
          phone,
          email: email || null,
          type: "b2b_contact",
          position: "Представник роботодавця",
        },
      });
    } else if (!contact.companyId) {
      // Connect existing contact to company safely
      contact = await prisma.contact.update({
        where: { id: contact.id },
        data: { companyId: company.id },
      });
    }

    // 3. Find default pipeline and first stage
    let defaultPipeline = await prisma.pipeline.findFirst({
      where: { isDefault: true },
      include: { stages: { orderBy: { sortOrder: "asc" } } },
    });

    if (!defaultPipeline) {
      defaultPipeline = await prisma.pipeline.findFirst({
        include: { stages: { orderBy: { sortOrder: "asc" } } },
      });
    }

    const firstStage = defaultPipeline?.stages?.[0];
    const responsibleUser = await prisma.user.findFirst({
      where: { isDeleted: false, isActive: true },
    });

    if (!defaultPipeline || !firstStage) {
      return NextResponse.json(
        { error: "CRM воронка наразі не налаштована" },
        { status: 500 }
      );
    }

    // 4. Create Deal safely with JSON customFields
    const dealTitle = `Заявка з сайту: ${specialty || "Підбір персоналу"} (${workersCount || 1} чол)`;
    const deal = await prisma.deal.create({
      data: {
        title: dealTitle,
        budget: budget ? parseFloat(String(budget)) : 0,
        pipelineId: defaultPipeline.id,
        stageId: firstStage.id,
        companyId: company.id,
        contactId: contact.id,
        responsibleId: responsibleUser?.id || "usr-admin",
        projectId: "employers",
        customFields: JSON.stringify({
          requisitionDetails: {
            workersCount: workersCount || 1,
            specialty: specialty || "Загальний підбір",
            requirements: requirements || "Не вказано",
            salaryOffered: salaryOffered || "За домовленістю",
            city: city || "Україна / ЄС",
            source: "Офіційний сайт (Landing Page)",
            createdAt: new Date().toISOString(),
          },
        }),
      },
    });

    // 5. Create System DealNote (Rule: Notify CRM manager)
    await prisma.dealNote.create({
      data: {
        dealId: deal.id,
        userId: deal.responsibleId,
        type: "system",
        content: `🌐 Нова заявка з офіційного сайту!\n🏢 Компанія: ${company.name}\n👤 Контакт: ${contact.name} (${contact.phone})\n🎯 Потреба: ${specialty || "Підбір"} (${workersCount || 1} осіб)\n📍 Місто/Локація: ${city || "Не вказано"}\n📝 Примітки: ${requirements || "Не вказано"}`,
      },
    });

    return NextResponse.json({
      success: true,
      dealId: deal.id,
      companyId: company.id,
      message: "Заявку успішно прийнято та передано в роботу рекрутеру.",
    });
  } catch (error: any) {
    console.error("Error creating lead in CRM:", error);
    return NextResponse.json(
      { error: "Помилка збереження заявки", details: error.message },
      { status: 500 }
    );
  }
}
