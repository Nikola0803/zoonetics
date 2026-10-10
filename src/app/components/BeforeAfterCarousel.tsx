"use client";

import Image from "next/image";
import { useState } from "react";

type Pair = {
  label: string;
  before: { tag: string; caption: string; image: string };
  after: { tag: string; caption: string; image: string };
  note: string;
};

export default function BeforeAfterCarousel({ pairs }: { pairs: Pair[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const pair = pairs[index];

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const prev = () => go(index === 0 ? pairs.length - 1 : index - 1);
  const next = () => go(index === pairs.length - 1 ? 0 : index + 1);

  return (
    <section id="before-after" className="bg-[#FBFCFF] px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1380px]">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">Owner observations</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,4.3vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              See the <span className="font-serif italic text-[#D95858]">difference.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#17233B]/55">
              Side-by-side timelines from owners who documented what changed. Owner-observed accounts, not veterinary outcomes or medical claims.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-3 pt-1">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#17233B]/35">
              0{index + 1} / 0{pairs.length}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#17233B]/18 bg-white text-[#17233B] transition hover:border-[#17233B] hover:bg-[#17233B] hover:text-white"
              >
                <i className="ri-arrow-left-line" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#17233B] text-white transition hover:bg-[#D95858]"
              >
                <i className="ri-arrow-right-line" />
              </button>
            </div>
          </div>
        </div>

        {/* Card */}
        <div
          key={index}
          className="mt-10 overflow-hidden rounded-[1.8rem] border border-[#17233B]/8 bg-white shadow-[0_20px_60px_rgba(23,35,59,0.06)]"
          style={{ animation: "fadeSlide 0.35s ease both" }}
        >
          <div className="flex items-center justify-between border-b border-[#17233B]/8 px-7 py-4 md:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F6EF7]">{pair.label}</p>
            <div className="flex gap-1">
              {pairs.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-[#4F6EF7]" : "w-1.5 bg-[#17233B]/18 hover:bg-[#17233B]/35"}`}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            {/* Before */}
            <div className="border-b border-[#17233B]/8 md:border-b-0 md:border-r">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DCE3F5]">
                <Image
                  src={pair.before.image}
                  alt="Before"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale transition duration-500 hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#17233B]/10" />
                <span className="absolute left-5 top-5 rounded-full bg-[#23324D] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  {pair.before.tag}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F1E8E8] text-[11px] font-bold text-[#D95858]">-</span>
                  <p className="text-[15px] leading-7 text-[#17233B]/65">{pair.before.caption}</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DCE3F5]">
                <Image
                  src={pair.after.image}
                  alt="After"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 hover:scale-[1.03]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-[#4F6EF7] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  {pair.after.tag}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#DCE7FF] text-[11px] font-bold text-[#4F6EF7]">✓</span>
                  <p className="text-[15px] leading-7 text-[#17233B]/65">{pair.after.caption}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#17233B]/8 bg-[#F6F7FC] px-7 py-3 md:px-10">
            <p className="text-[10px] text-[#17233B]/35">{pair.note}</p>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
