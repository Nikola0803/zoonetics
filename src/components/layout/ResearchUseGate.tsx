"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "zoonetics-research-use-acknowledged";

export function ResearchUseGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) !== "true") setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  if (!open) return null;

  function enter() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center overflow-y-auto bg-[#08111F]/95 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="research-gate-title">
      <div className="grid w-full max-w-[920px] overflow-hidden rounded-[28px] border border-white/10 bg-[#FBFCFF] shadow-[0_40px_120px_rgba(0,0,0,0.5)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[560px] md:block">
          <Image src="/images/zoonetics-premium/hero-senior-lab-v2.png" alt="Senior Labrador on a morning walk" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101829] via-[#101829]/18 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#A9C7FF]">ZOONETICS</p>
            <p className="mt-3 font-display text-3xl font-extrabold leading-tight">Research starts with a clear boundary.</p>
          </div>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
          <Image src="/brand/zoonetics-dark.webp" alt="ZOONETICS" width={220} height={54} className="h-8 w-auto self-start" />
          <p className="mt-10 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4F6EF7]">Research Use Acknowledgment</p>
          <h2 id="research-gate-title" className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#17233B] sm:text-4xl">Before You Enter.</h2>
          <p className="mt-5 text-sm font-medium leading-7 text-[#17233B]/64">ZOONETICS supplies independently tested peptide materials strictly for laboratory, analytical and non-clinical research.</p>
          <div className="mt-6 grid gap-3 text-sm font-bold text-[#17233B]/76">
            <p className="flex gap-3"><i className="ri-checkbox-circle-fill text-[#4F6EF7]" /> Not approved veterinary medicines</p>
            <p className="flex gap-3"><i className="ri-checkbox-circle-fill text-[#4F6EF7]" /> Not intended to diagnose, treat, cure or prevent disease</p>
            <p className="flex gap-3"><i className="ri-checkbox-circle-fill text-[#4F6EF7]" /> No dosing or veterinary guidance is provided</p>
          </div>
          <button type="button" onClick={enter} className="mt-8 w-full rounded-full bg-[#17233B] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#4F6EF7]">I Understand. Enter ZOONETICS</button>
          <p className="mt-4 text-center text-[11px] font-medium leading-5 text-[#17233B]/46">By entering, you confirm that you understand the research-only status of all products and content. <Link href="/ruo" className="underline underline-offset-2">Read the full policy</Link>.</p>
        </div>
      </div>
    </div>
  );
}
