export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientSession, verifyClientToken, getClientTokenFromHeader } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    let session = await getClientSession();
    if (!session) {
      const bearer = getClientTokenFromHeader(req.headers.get("Authorization"));
      if (bearer) session = await verifyClientToken(bearer);
    }

    if (!session) {
      return NextResponse.json({ error: "пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ" }, { status: 401 });
    }

    // Safety Rule: Only fetch non-deleted deals for this company
    const deals = await prisma.deal.findMany({
      where: {
        companyId: session.companyId,
        isDeleted: false,
      },
      include: {
        stage: true,
        pipeline: true,
        responsible: {
          select: {
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedDeals = deals.map((d) => {
      let custom: any = {};
      try {
        if (d.customFields) {
          custom = JSON.parse(d.customFields);
        }
      } catch (e) {
        custom = {};
      }

      return {
        id: d.id,
        title: d.title,
        budget: d.budget,
        stageName: d.stage?.name || "пїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ",
        stageColor: d.stage?.color || "#3b82f6",
        createdAt: d.createdAt,
        contractDoc: custom.contractDoc || null,
        contractStatus: custom.contractStatus || "sent_unsigned",
        paymentStatus: custom.paymentStatus || "pending",
        receiptDoc: custom.receiptDoc || null,
        requisitionDetails: custom.requisitionDetails || null,
        responsible: d.responsible,
      };
    });

    return NextResponse.json({
      deals: formattedDeals,
      company: {
        id: session.companyId,
        name: session.companyName,
      },
    });
  } catch (error: any) {
    console.error("Fetch deals error:", error);
    return NextResponse.json(
      { error: "пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ", details: error.message },
      { status: 500 }
    );
  }
}
