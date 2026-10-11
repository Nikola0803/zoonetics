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
    <section id="before-after" className="bg-white px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1380px]">

        {/* Header */}
        <div className="pb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Owner observations</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,3.6vw,3.8rem)] font-medium leading-[1.0] tracking-[-0.04em] text-[#17233B]">
            See the <span className="font-serif italic text-[#4F6EF7]">difference.</span>
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[15px] leading-7 text-[#17233B]/45">Week-by-week documentation from owners who tracked what changed. Not anecdotes.</p>
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
        </div>

        {/* Main card */}
        <div
          key={index}
          className="overflow-hidden rounded-[1.8rem] border border-[#17233B]/10 shadow-[0_16px_48px_rgba(23,35,59,0.07)]"
          style={{ animation: "baFadeIn 0.38s ease both" }}
        >
          <div className="grid md:grid-cols-2">

            {/* BEFORE panel */}
            <div className="flex flex-col border-b border-[#17233B]/10 md:border-b-0 md:border-r md:border-[#17233B]/10">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pair.before.image}
                  alt="Before"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover brightness-[0.72] saturate-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D95858] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D95858]" />
                  Week {pair.before.week}
                </span>
              </div>
              <div className="flex flex-1 flex-col bg-[#F6F7FC] p-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95858]/70">Before</p>
                <p className="font-display text-[1.45rem] font-medium leading-[1.2] tracking-[-0.02em] text-[#17233B] md:text-[1.6rem]">
                  {pair.before.observation}
                </p>
                <p className="mt-6 text-[15px] leading-6 text-[#17233B]/45 italic">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#4F6EF7] backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4F6EF7]" />
                  Week {pair.after.week}
                </span>
              </div>
              <div className="flex flex-1 flex-col bg-[#F6F7FC] p-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F6EF7]/70">After</p>
                <p className="font-display text-[1.45rem] font-medium leading-[1.2] tracking-[-0.02em] text-[#17233B] md:text-[1.6rem]">
                  {pair.after.observation}
                </p>
                <p className="mt-6 text-[15px] leading-6 text-[#17233B]/45 italic">
                  &ldquo;{pair.after.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Footer bar */}
          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#17233B]/10 bg-white px-8 py-5">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#17233B]/8 text-sm font-bold text-[#17233B]">
                  {initials}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-[#17233B]">{pair.owner}</p>
                  <p className="text-[11px] text-[#17233B]/40">{pair.dog.breed}, {pair.dog.age}</p>
                </div>
              </div>
              <span className="hidden h-5 w-px bg-[#17233B]/12 sm:block" />
              <span className="rounded-full border border-[#17233B]/15 px-3.5 py-1.5 text-[11px] font-semibold text-[#17233B]/55">
                {pair.dog.compound}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <p className="hidden max-w-[220px] text-[10px] leading-[1.55] text-[#17233B]/30 sm:block">
                {pair.note}
              </p>
              <Link
                href={`/shop/${pair.dog.compoundSlug}`}
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#17233B] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#4F6EF7]"
              >
                View compound <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
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
