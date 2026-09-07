export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { getClientSession, verifyClientToken, getClientTokenFromHeader } from "@/lib/auth";

export async function GET(req: NextRequest) {
  let session = await getClientSession();

  if (!session) {
    const bearer = getClientTokenFromHeader(req.headers.get("Authorization"));
    if (bearer) {
      session = await verifyClientToken(bearer);
    }
  }

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    client: session,
  });
}
