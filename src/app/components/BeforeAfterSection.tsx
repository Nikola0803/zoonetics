"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type BeforeAfterPair = {
  dog: { breed: string; age: string; compound: string; compoundSlug: string };
  owner: string;
  before: { week: string; observation: string; quote: string; image: string };
  after: { week: string; observation: string; quote: string; image: string };
  note: string;
};

export default function BeforeAfterSection({ pairs }: { pairs: BeforeAfterPair[] }) {
  const [index, setIndex] = useState(0);
  const pair = pairs[index];
  const initials = pair.owner.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <section id="before-after" className="bg-[#0D1726] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1380px]">

        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF8A72]">Owner observations</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
              See the <span className="font-serif italic text-[#A9C7FF]">difference.</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/45">
              Week-by-week documentation from owners who tracked what changed. Not anecdotes.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            {pairs.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition ${
                  i === index
                    ? "bg-white text-[#17233B]"
                    : "border border-white/18 text-white/45 hover:border-white/40 hover:text-white"
                }`}
              >
                Case {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        {/* Main card */}
        <div
          key={index}
          className="overflow-hidden rounded-[1.8rem] border border-white/8"
          style={{ animation: "baFadeIn 0.38s ease both" }}
        >
          <div className="grid md:grid-cols-2">

            {/* BEFORE panel */}
            <div className="flex flex-col border-b border-white/8 md:border-b-0 md:border-r md:border-white/8">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pair.before.image}
                  alt="Before"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-[0.72] saturate-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1726]/90 via-[#0D1726]/20 to-transparent" />
                <div className="absolute inset-0 bg-[#D95858]/10" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#0D1726]/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF8A72] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A72]" />
                  Week {pair.before.week}
                </span>
              </div>
              <div className="flex flex-1 flex-col bg-[#111F30] p-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF8A72]/60">Before</p>
                <p className="font-display text-[1.45rem] font-medium leading-[1.2] tracking-[-0.02em] text-white md:text-[1.6rem]">
                  {pair.before.observation}
                </p>
                <p className="mt-6 text-[15px] leading-6 text-white/38 italic">
                  &ldquo;{pair.before.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* AFTER panel */}
            <div className="flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pair.after.image}
                  alt="After"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1726]/80 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#0D1726]/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A9C7FF] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A9C7FF]" />
                  Week {pair.after.week}
                </span>
              </div>
              <div className="flex flex-1 flex-col bg-[#111F30] p-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9C7FF]/60">After</p>
                <p className="font-display text-[1.45rem] font-medium leading-[1.2] tracking-[-0.02em] text-white md:text-[1.6rem]">
                  {pair.after.observation}
                </p>
                <p className="mt-6 text-[15px] leading-6 text-white/38 italic">
                  &ldquo;{pair.after.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Footer bar */}
          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/8 bg-[#0D1726] px-8 py-5">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 text-sm font-bold text-white">
                  {initials}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white">{pair.owner}</p>
                  <p className="text-[11px] text-white/35">{pair.dog.breed}, {pair.dog.age}</p>
                </div>
              </div>
              <span className="hidden h-5 w-px bg-white/12 sm:block" />
              <span className="rounded-full border border-white/12 px-3.5 py-1.5 text-[11px] font-semibold text-white/55">
                {pair.dog.compound}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <p className="hidden max-w-[220px] text-[10px] leading-[1.55] text-white/20 sm:block">
                {pair.note}
              </p>
              <Link
                href={`/shop/${pair.dog.compoundSlug}`}
                className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/6 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#A9C7FF] hover:text-[#17233B] hover:border-[#A9C7FF]"
              >
                View compound <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile dots */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {pairs.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Case ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-[#A9C7FF]" : "w-2 bg-white/20"}`}
            />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes baFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
