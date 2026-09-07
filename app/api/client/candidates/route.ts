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
      return NextResponse.json({ error: "РќРµРѕР±С…С–РґРЅР° Р°РІС‚РѕСЂРёР·Р°С†С–СЏ" }, { status: 401 });
    }

    // Safety Rule: Employer ONLY sees candidates attached to their company
    const candidates = await prisma.contact.findMany({
      where: {
        companyId: session.companyId,
        type: "candidate",
        isDeleted: false,
      },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        profession: true,
        country: true,
        status: true,
        videoUrl: true,
        resumeUrl: true,
        avatar: true,
        experienceYears: true,
        salaryExpectation: true,
        skills: true,
        languages: true,
        driverLicense: true,
        bio: true,
        documents: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      candidates,
      total: candidates.length,
      company: {
        id: session.companyId,
        name: session.companyName,
      },
    });
  } catch (error: any) {
    console.error("Fetch candidates error:", error);
    return NextResponse.json(
      { error: "РџРѕРјРёР»РєР° Р·Р°РІР°РЅС‚Р°Р¶РµРЅРЅСЏ РєР°РЅРґРёРґР°С‚С–РІ", details: error.message },
      { status: 500 }
    );
  }
}
