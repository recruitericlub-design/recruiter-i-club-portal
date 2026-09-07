import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "recruiter_club_client_portal_super_jwt_secret_key_2026";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);
const COOKIE_NAME = "ric_client_token";

export interface ClientJwtPayload {
  clientId: string;
  companyId: string;
  companyName: string;
  clientName: string;
  phone?: string;
  email?: string;
}

export async function signClientToken(payload: ClientJwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyClientToken(token: string): Promise<ClientJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as ClientJwtPayload;
  } catch (error) {
    return null;
  }
}

export async function getClientSession(): Promise<ClientJwtPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyClientToken(token);
}

export function getClientTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
    return parts[1];
  }
  return null;
}
