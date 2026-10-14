"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/pixel";

const slides = [
  {
    image: "/images/zoonetics-carousel/mobility-v1.png",
    position: "object-center",
    alt: "Senior black Labrador pausing with its owner during a morning walk",
    focus: "Movement + Mobility",
    question: "Are walks getting shorter?",
    product: "K9 Rebuild",
    compound: "BPC-157 + TB-500",
    description: "A paired profile for research into mobility, soft tissue, repair signaling and recovery after physical stress.",
    href: "/shop/bpc-tb-500-blend-10mg",
  },
  {
    image: "/images/zoonetics-carousel/recovery-v1.png",
    position: "object-center",
    alt: "Active German Shepherd resting beside its owner after outdoor activity",
    focus: "Soft Tissue + Recovery",
    question: "Is recovery taking longer?",
    product: "K9 Reforge",
    compound: "BPC-157",
    description: "A focused profile for research into tendon, ligament, gastrointestinal tissue and local repair signaling.",
    href: "/shop/bpc-157-10mg",
  },
  {
    image: "/images/zoonetics-carousel/reload-v1.png",
    position: "object-left",
    alt: "Active Border Collie walking beside its owner after outdoor activity",
    focus: "Movement + Recovery",
    question: "Does your dog take longer to bounce back?",
    product: "K9 Reload",
    compound: "TB-500",
    description: "A single-peptide profile for research into cell migration, actin regulation and recovery after physical stress.",
    href: "/shop/tb-500-10mg",
  },
  {
    image: "/images/zoonetics-carousel/skin-gut-v1.png",
    position: "object-center",
    alt: "Dog owner checking her dog's coat while keeping observation notes",
    focus: "Skin + Gut Pathways",
    question: "Do skin or gut issues keep coming back?",
    product: "K9 Reclaim",
    compound: "KPV",
    description: "A dual-format profile for research into inflammatory signaling, epithelial tissue and barrier models.",
    href: "/shop/kpv-10mg",
  },
  {
    image: "/images/zoonetics-carousel/restore-v1.png",
    position: "object-left",
    alt: "Golden Retriever having its coat gently brushed during an at-home check-in",
    focus: "Skin + Collagen",
    question: "Has their coat lost its usual shine?",
    product: "K9 Restore",
    compound: "GHK-Cu",
    description: "A copper-peptide profile for research into collagen signaling, tissue remodeling and skin and coat pathways.",
    href: "/shop/ghk-cu-50mg",
  },
  {
    image: "/images/zoonetics-carousel/recast-v1.png",
    position: "object-left",
    alt: "Older Weimaraner receiving a calm whole-dog check-in from its owner",
    focus: "Multi-Pathway Research",
    question: "Are you tracking more than one change?",
    product: "K9 Recast",
    compound: "GHK-Cu + BPC-157 + TB-500",
    description: "A three-peptide profile for broader research across repair signaling, tissue remodeling and physical-stress recovery pathways.",
    href: "/shop/glow-70mg",
  },
] as const;

const ROTATION_MS = 8000;

export default function WhatChangedCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[active];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  function move(direction: -1 | 1) {
    setActive((current) => {
      const next = (current + direction + slides.length) % slides.length;
      trackEvent("research_question_selected", { properties: { question: slides[next].question, product: slides[next].product, control: direction === 1 ? "next" : "previous" } });
      return next;
    });
  }

  return (
    <section id="signal" className="bg-white px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4F6EF7]">Start With The Change You Noticed</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.45rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#17233B]">What changed?</h2>
          </div>
          <p className="max-w-md text-[15px] font-medium leading-7 text-[#17233B]/62">Choose the question that sounds most familiar. We will show you the product profile built around that focus.</p>
        </div>

        <div
          className="overflow-hidden rounded-[26px] bg-[#081624] shadow-[0_26px_80px_rgba(23,35,59,0.14)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="grid lg:grid-cols-[1.22fr_0.78fr]">
            <div className="relative min-h-[390px] overflow-hidden sm:min-h-[470px] md:min-h-[600px]">
              {slides.map((item, index) => (
                <Image
                  key={item.image}
                  src={item.image}
                  alt={index === active ? item.alt : ""}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 61vw"
                  className={`object-cover ${item.position} transition duration-700 ${index === active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.025] opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#081624]/35" />
              <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-[#081624]/65 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur-md md:bottom-8 md:left-8">
                {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>

            <div className="flex min-h-[410px] flex-col justify-between p-7 text-white md:min-h-[440px] md:p-10 lg:p-12">
              <div key={slide.question} className="animate-[carousel-copy_.45s_ease-out]">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">{slide.focus}</p>
                <h3 className="mt-5 text-balance font-display text-[clamp(2rem,3.2vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">{slide.question}</h3>
                <div className="mt-8 border-t border-white/15 pt-7">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/45">The Matching ZOONETICS Profile</p>
                  <p className="mt-3 font-display text-2xl font-extrabold">{slide.product}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9C7FF]">{slide.compound}</p>
                  <p className="mt-5 text-[14px] font-medium leading-7 text-white/65">{slide.description}</p>
                </div>
                <Link href={slide.href} onClick={() => trackEvent("product_cta_clicked", { properties: { placement: "research_question", product: slide.product, question: slide.question } })} className="mt-7 inline-flex rounded-full bg-white px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#081624] transition hover:bg-[#DDE7FF]">
                  View {slide.product}
                </Link>
              </div>

              <div className="mt-10">
                <div className="mb-5 h-px overflow-hidden bg-white/12">
                  <span key={`${active}-${paused}`} className="block h-full origin-left bg-[#A9C7FF]" style={{ animation: `carousel-progress ${ROTATION_MS}ms linear`, animationPlayState: paused ? "paused" : "running" }} />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-2" aria-label="Choose research question">
                    {slides.map((item, index) => (
                      <button key={item.question} type="button" onClick={() => { setActive(index); trackEvent("research_question_selected", { properties: { question: item.question, product: item.product, control: "dot" } }); }} aria-label={`Show ${item.question}`} aria-current={index === active ? "true" : undefined} className={`h-2.5 rounded-full transition-all ${index === active ? "w-8 bg-white" : "w-2.5 bg-white/25 hover:bg-white/50"}`} />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => move(-1)} aria-label="Previous research question" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-lg transition hover:bg-white hover:text-[#081624]">←</button>
                    <button type="button" onClick={() => move(1)} aria-label="Next research question" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-lg transition hover:bg-white hover:text-[#081624]">→</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-[#17233B]/35">Research use only · not veterinary medicine · no outcome promised</p>
      </div>
      <style jsx>{`
        @keyframes carousel-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes carousel-copy { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>
    </section>
  );
}
