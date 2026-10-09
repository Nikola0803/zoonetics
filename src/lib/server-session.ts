import "server-only";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "evlv_session";
const THIRTY_DAYS = 30 * 24 * 60 * 60;

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? "";
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS,
    priority: "high",
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function bodyWithServerSession(req: Request) {
  const token = await getSessionToken();
  if (!token) return null;
  const body = await req.json().catch(() => ({}));
  return { ...(body && typeof body === "object" ? body : {}), token };
}

export function unauthorized() {
  return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
}
