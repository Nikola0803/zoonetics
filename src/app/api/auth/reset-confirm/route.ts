import { NextResponse } from "next/server";
import { crmConfigured, crmFetch } from "@/lib/crm-proxy";
import { setSessionCookie } from "@/lib/server-session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!crmConfigured()) {
    return NextResponse.json({ error: "Password reset isn't configured yet." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  const { ok, status, data } = await crmFetch("/api/store/auth/reset-confirm", body);
  if (!ok) return NextResponse.json(data, { status });
  const result = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  if (typeof result.token !== "string") {
    return NextResponse.json({ error: "Reset failed — please try again." }, { status: 502 });
  }
  const { token, ...publicUser } = result;
  const response = NextResponse.json(publicUser);
  setSessionCookie(response, token as string);
  return response;
}
