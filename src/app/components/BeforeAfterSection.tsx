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
    <section id="before-after" className="bg-[#F5F2EC] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1380px]">

        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF8A72]">Owner-documented</p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,4vw,4.2rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-[#17233B]">Before. After.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {pairs.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] transition ${
                  i === index
                    ? "bg-[#17233B] text-white"
                    : "border border-[#17233B]/18 text-[#17233B]/40 hover:border-[#17233B]/40 hover:text-[#17233B]"
                }`}
              >
                {p.owner} &middot; {p.dog.breed.split(",")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Video card pair */}
        <div
          key={index}
          className="grid gap-3 sm:grid-cols-2"
          style={{ animation: "baFadeIn 0.38s ease both" }}
        >
          {/* BEFORE */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#101829]">
            <Image
              src={pair.before.image}
              alt={`Before – ${pair.owner}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover saturate-0 brightness-[0.55] transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060c18]/90 via-transparent to-[#060c18]/25" />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
              <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
                Before · Week {pair.before.week}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-xl text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#17233B]">
                <i className="ri-play-fill translate-x-px" />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">What they noticed</p>
              <p className="mt-2.5 font-display text-[1.5rem] font-semibold leading-[1.18] tracking-[-0.03em] text-white">
                {pair.before.observation}
              </p>
              <p className="mt-3 text-[13px] italic leading-5 text-white/45">&ldquo;{pair.before.quote}&rdquo;</p>
            </div>
          </div>

          {/* AFTER */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#101829]">
            <Image
              src={pair.after.image}
              alt={`After – ${pair.owner}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover brightness-[0.82] transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060c18]/88 via-transparent to-transparent" />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
              <span className="rounded-full border border-[#FF8A72]/45 bg-[#FF8A72]/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#FF8A72] backdrop-blur-sm">
                After · Week {pair.after.week}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 text-xl text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-[#17233B]">
                <i className="ri-play-fill translate-x-px" />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">What changed</p>
              <p className="mt-2.5 font-display text-[1.5rem] font-semibold leading-[1.18] tracking-[-0.03em] text-white">
                {pair.after.observation}
              </p>
              <p className="mt-3 text-[13px] italic leading-5 text-white/45">&ldquo;{pair.after.quote}&rdquo;</p>
            </div>
          </div>
        </div>

        {/* Attribution strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#17233B]/10 pt-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[14px] font-semibold text-[#17233B]">{pair.owner}</span>
            <span className="text-[13px] text-[#17233B]/50">{pair.dog.breed}</span>
            <span className="rounded-full border border-[#17233B]/15 px-3 py-1 text-[11px] font-medium text-[#17233B]/55">{pair.dog.compound}</span>
          </div>
          <div className="flex items-center gap-5">
            <p className="hidden text-[11px] text-[#17233B]/28 sm:block">{pair.note}</p>
            <Link href={`/shop/${pair.dog.compoundSlug}`} className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#17233B] transition hover:text-[#FF8A72]">
              View compound →
            </Link>
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
