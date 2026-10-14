"use client";

import { useEffect, useState } from "react";
import { setMembershipStatus, type MembershipStatus } from "@/lib/auth";
import { trackEvent } from "@/lib/pixel";

const STEPS = [
  { number: "01", title: "Build The Baseline", body: "Record movement, routines and the questions you want to investigate before a research period begins." },
  { number: "02", title: "Keep One Timeline", body: "Add repeatable check-ins, photos, videos, lot numbers and notes to one consistent record." },
  { number: "03", title: "Review The Pattern", body: "Compare like with like and export a clear timeline for conversations with your veterinarian or research team." },
];

export function ZooProtocolPanel() {
  const [status, setStatus] = useState<MembershipStatus>("NONE");
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/membership/status", { method: "POST" })
      .then(async (res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.status) setStatus(data.status); })
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, []);

  async function joinWaitlist() {
    setRequesting(true);
    setError("");
    try {
      const res = await fetch("/api/membership/request", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "The early-access request could not be submitted.");
      const next = (data.status ?? "PENDING") as MembershipStatus;
      setStatus(next);
      setMembershipStatus(next);
      trackEvent("zooprotocol_waitlist_joined", { properties: { placement: "account" } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again shortly.");
    } finally {
      setRequesting(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-[#101829] text-white">
      <div className="relative p-7 md:p-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#4F6EF7]/20 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">ZOOPROTOCOL</p>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/60">Coming Soon</span>
          </div>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] md:text-5xl">One record for the whole research journey.</h2>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/64">A private canine research workspace for baselines, repeatable check-ins, media, product lots and clear exports. Built to make the record consistent, not to replace veterinary judgment.</p>
          <div className="mt-9 grid gap-3 md:grid-cols-3">
            {STEPS.map((step) => <div key={step.number} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5"><p className="text-xs font-extrabold text-[#A9C7FF]">{step.number}</p><h3 className="mt-4 text-base font-extrabold">{step.title}</h3><p className="mt-2 text-xs font-medium leading-5 text-white/52">{step.body}</p></div>)}
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-sm font-extrabold">Early access opens in stages.</p><p className="mt-1 text-xs font-medium text-white/45">Account holders get first access to private testing.</p></div>
            {status === "PENDING" || status === "APPROVED" ? <span className="rounded-full bg-[#A9C7FF] px-6 py-3 text-center text-xs font-extrabold text-[#17233B]">{status === "APPROVED" ? "Early Access Active" : "You Are On The Waitlist"}</span> : <button type="button" onClick={joinWaitlist} disabled={requesting || loading} className="rounded-full bg-white px-6 py-3 text-xs font-extrabold text-[#17233B] transition hover:bg-[#A9C7FF] disabled:opacity-50">{requesting ? "Joining..." : "Join Early Access"}</button>}
          </div>
          {error && <p className="mt-4 text-xs font-bold text-[#FF8A72]">{error}</p>}
        </div>
      </div>
    </div>
  );
}
