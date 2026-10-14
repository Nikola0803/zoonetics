"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredUser } from "@/lib/auth";
import { ZooProtocolPanel } from "../ZooProtocolPanel";
export default function ZooProtocolPage() {
  const [ready,setReady]=useState(false); const [signedIn,setSignedIn]=useState(false);
  useEffect(()=>{setSignedIn(Boolean(getStoredUser()));setReady(true)},[]);
  if(!ready)return null;
  return <main className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16"><div className="mb-7 flex items-center justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#4F6EF7]">My Account</p><h1 className="mt-2 text-3xl font-extrabold text-[#17233B]">ZooProtocol</h1></div><Link href="/account" className="rounded-full border border-[#17233B]/15 px-5 py-2.5 text-xs font-extrabold text-[#17233B]">Back To Account</Link></div>{signedIn?<ZooProtocolPanel/>:<div className="rounded-[28px] bg-[#101829] p-10 text-center text-white"><h2 className="text-3xl font-extrabold">Sign in to open your dog&apos;s record.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">ZooProtocol records stay connected to your private ZOONETICS account.</p><Link href="/account" className="mt-7 inline-flex rounded-full bg-white px-7 py-3 text-sm font-extrabold text-[#17233B]">Sign In Or Create Account</Link></div>}</main>;
}
