import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signClientToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { login, pin } = await req.json();

    if (!login) {
      return NextResponse.json(
        { error: "Введіть номер телефону або Email" },
        { status: 400 }
      );
    }

    const cleanLogin = login.trim();

    // Find Contact with type b2b_contact belonging to an active company
    const contact = await prisma.contact.findFirst({
      where: {
        OR: [
          { phone: cleanLogin },
          { email: cleanLogin },
          { phone: cleanLogin.replace(/[^\d+]/g, "") },
        ],
        type: "b2b_contact",
        isDeleted: false,
        companyId: { not: null },
      },
      include: {
        company: true,
      },
    });

    if (!contact || !contact.company) {
      return NextResponse.json(
        {
          error:
            "Контакт представника компанії не знайдено в CRM. Зверніться до вашого персонального менеджера.",
        },
        { status: 404 }
      );
    }

    // Check Master PIN (7777 for test/demo access, or 4-digit code)
    // In production, an SMS/WhatsApp OTP service can be hooked here
    if (pin && pin !== "7777" && pin.length < 4) {
      return NextResponse.json(
        { error: "Невірний код підтвердження. Спробуйте код 7777" },
        { status: 401 }
      );
    }

    // Sign JWT
    const tokenPayload = {
      clientId: contact.id,
      companyId: contact.company.id,
      companyName: contact.company.name,
      clientName: contact.name,
      phone: contact.phone || undefined,
      email: contact.email || undefined,
    };

    const token = await signClientToken(tokenPayload);

    const response = NextResponse.json({
      success: true,
      client: tokenPayload,
      token,
    });

    // Set secure cookie
    response.cookies.set("ric_client_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Client login error:", error);
    return NextResponse.json(
      { error: "Помилка авторизації", details: error.message },
      { status: 500 }
    );
  }
}
