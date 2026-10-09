"use client";

import { useEffect, useState } from "react";
import { trackTradeEvent } from "@/lib/trade/analytics";

export function TradeLandingEvents() {
  useEffect(() => {
    trackTradeEvent("trade_page_view");
    const plans = document.getElementById("plans");
    if (!plans) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        trackTradeEvent("trade_plan_view");
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(plans);
    return () => observer.disconnect();
  }, []);
  return null;
}

export function TradeFaq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="divide-y divide-stone border-y border-stone">{items.map((item, index) => {
    const expanded = open === index;
    return <div key={item.question}><button type="button" className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={expanded} onClick={() => { setOpen(expanded ? null : index); if (!expanded) trackTradeEvent("trade_faq_opened", { question: item.question }); }}><span className="font-display text-lg font-medium text-charcoal">{item.question}</span><span aria-hidden className="text-xl text-sage-deep">{expanded ? "−" : "+"}</span></button>{expanded && <p className="max-w-3xl pb-6 text-base leading-7 text-charcoal/65">{item.answer}</p>}</div>;
  })}</div>;
}

export function PolicyViewLink() {
  return <a href="#responsible-marketing" onClick={() => trackTradeEvent("trade_policy_viewed")} className="text-sm font-semibold text-sage-deep underline decoration-sage-deep/30 underline-offset-4 hover:decoration-sage-deep">Review the responsible marketing standard</a>;
}
