import { NextResponse } from "next/server";
import { crmConfigured,crmFetch,crmGet } from "@/lib/crm-proxy";
import { getSessionToken,unauthorized } from "@/lib/server-session";
export async function GET(){const token=await getSessionToken();if(!token)return unauthorized();if(!crmConfigured())return NextResponse.json({error:"CRM unavailable"},{status:503});const r=await crmGet("/api/store/zooprotocol",{revalidate:0,headers:{Authorization:`Bearer ${token}`}});return NextResponse.json(r.data,{status:r.status});}
export async function POST(req:Request){const token=await getSessionToken();if(!token)return unauthorized();if(!crmConfigured())return NextResponse.json({error:"CRM unavailable"},{status:503});const body=await req.json().catch(()=>({}));const r=await crmFetch("/api/store/zooprotocol",body,{headers:{Authorization:`Bearer ${token}`}});return NextResponse.json(r.data,{status:r.status});}
