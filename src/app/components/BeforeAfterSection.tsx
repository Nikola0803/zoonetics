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

  return (
    <section id="before-after" className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1380px]">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF8A72]">Owner observations</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,3.6vw,3.8rem)] font-semibold leading-[1.0] tracking-[-0.04em] text-[#17233B]">
              See the difference.
            </h2>
          </div>
          <div className="flex gap-2">
            {pairs.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition ${
                  i === index
                    ? "bg-[#17233B] text-white"
                    : "border border-[#17233B]/18 text-[#17233B]/45 hover:border-[#17233B]/40 hover:text-[#17233B]"
                }`}
              >
                Case {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial grid */}
        <div
          key={index}
          className="grid gap-px bg-[#17233B]/8 md:grid-cols-2"
          style={{ animation: "baFadeIn 0.38s ease both" }}
        >
          {/* BEFORE */}
          <div className="bg-[#F5F2EC] pb-10 pr-0 md:pr-10">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={pair.before.image}
                alt="Before"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover brightness-[0.68] saturate-[0.4]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#D95858]">
                Before · Week {pair.before.week}
              </span>
            </div>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#17233B]/30">What they noticed</p>
            <p className="mt-3 font-display text-[1.65rem] font-medium leading-[1.18] tracking-[-0.03em] text-[#17233B] md:text-[1.9rem]">
              {pair.before.observation}
            </p>
            <p className="mt-5 text-[14px] leading-6 text-[#17233B]/45 italic">
              &ldquo;{pair.before.quote}&rdquo;
            </p>
          </div>

          {/* AFTER */}
          <div className="bg-[#F5F2EC] pb-10 pl-0 md:pl-10">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={pair.after.image}
                alt="After"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#4F6EF7]">
                After · Week {pair.after.week}
              </span>
            </div>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] text-[#17233B]/30">What changed</p>
            <p className="mt-3 font-display text-[1.65rem] font-medium leading-[1.18] tracking-[-0.03em] text-[#17233B] md:text-[1.9rem]">
              {pair.after.observation}
            </p>
            <p className="mt-5 text-[14px] leading-6 text-[#17233B]/45 italic">
              &ldquo;{pair.after.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Attribution strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#17233B]/10 pt-6">
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#17233B]/50">
            <span className="font-semibold text-[#17233B]">{pair.owner}</span>
            <span>{pair.dog.breed}</span>
            <span className="rounded-full border border-[#17233B]/15 px-3 py-1 text-[11px]">{pair.dog.compound}</span>
          </div>
          <div className="flex items-center gap-5">
            <p className="hidden text-[10px] text-[#17233B]/25 sm:block">{pair.note}</p>
            <Link
              href={`/shop/${pair.dog.compoundSlug}`}
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4F6EF7] transition hover:text-[#17233B]"
            >
              View compound →
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes baFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
