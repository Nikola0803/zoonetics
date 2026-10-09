"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export type Product = {
  name: string;
  formula: string;
  type: string;
  focus: string;
  reason: string;
  formats: string[];
  color: string;
  ink: string;
};

function ProductVial({ color, ink, name }: Pick<Product, "color" | "ink" | "name">) {
  return (
    <div className="relative mx-auto h-52 w-32" aria-hidden>
      <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-t-lg bg-[#c9bda8] shadow-sm" />
      <div className="absolute left-1/2 top-6 h-5 w-20 -translate-x-1/2 rounded-sm bg-[#7b4a26]" />
      <div className="absolute inset-x-2 bottom-0 top-10 overflow-hidden rounded-b-[1.8rem] rounded-t-xl border border-[#4a2d1c]/30 bg-[linear-gradient(90deg,#6e3c1f,#b26d35_42%,#744021)] shadow-[0_22px_35px_rgba(36,43,32,0.22)]">
        <div className="absolute inset-x-0 top-9 px-3 py-5 text-center" style={{ backgroundColor: color, color: ink }}>
          <i className="ri-pulse-line text-lg" />
          <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.12em]">PetPeps</p>
          <p className="mt-1 font-display text-[11px] font-bold leading-tight">{name}</p>
          <p className="mt-2 text-[6px] font-bold uppercase tracking-[0.16em] opacity-65">Research use only</p>
        </div>
        <div className="absolute inset-y-0 left-2 w-2 bg-white/15 blur-sm" />
      </div>
    </div>
  );
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(1);

  const move = (direction: -1 | 1) => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>("[data-product-card]");
    const distance = (card?.offsetWidth ?? 360) + 20;
    element.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const updatePosition = () => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>("[data-product-card]");
    const distance = (card?.offsetWidth ?? 360) + 20;
    setPosition(Math.min(products.length, Math.max(1, Math.round(element.scrollLeft / distance) + 1)));
  };

  return (
    <div className="mt-12">
      <div className="flex items-end justify-between gap-6 border-b border-[#17233B]/15 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#17233B]">The focused research library</p>
          <p className="mt-2 text-sm text-[#17233B]/50">Swipe or use the arrows to explore two blends and three single peptides.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="mr-1 hidden text-[10px] font-bold tracking-[0.18em] text-[#17233B]/45 sm:block">0{position} / 0{products.length}</span>
          <button type="button" onClick={() => move(-1)} aria-label="Previous product" className="grid h-11 w-11 place-items-center rounded-full border border-[#17233B]/20 bg-white text-[#17233B] transition hover:border-[#17233B] hover:bg-[#17233B] hover:text-white"><i className="ri-arrow-left-line" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next product" className="grid h-11 w-11 place-items-center rounded-full bg-[#17233B] text-white transition hover:bg-[#D95858]"><i className="ri-arrow-right-line" /></button>
        </div>
      </div>

      <div ref={track} onScroll={updatePosition} tabIndex={0} aria-label="PetPeps product carousel" className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 pt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F6EF7] md:mx-0 md:px-0">
        {products.map((product, index) => (
          <article data-product-card key={product.name} className="group w-[84vw] max-w-[390px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#17233B]/12 bg-[#FBFAFF] shadow-[0_18px_50px_rgba(23,35,59,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(23,35,59,0.14)]">
            <div className="relative grid min-h-[290px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#F8FAFF_0%,#E8ECFF_58%,#DCE3F5_100%)] px-6 pt-10">
              <div className="absolute left-5 top-5 flex items-center gap-2"><span className="rounded-full bg-[#FBFAFF] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#17233B]">{product.type}</span><span className="rounded-full border border-[#17233B]/15 bg-white/45 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#17233B]/65">RUO</span></div>
              <span className="absolute right-5 top-7 text-[9px] font-bold text-[#17233B]/35">0{index + 1}</span>
              <ProductVial color={product.color} ink={product.ink} name={product.name} />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#D7DEEF] to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#D95858]">{product.focus}</p>
              <h3 className="mt-3 font-display text-[1.65rem] font-semibold tracking-[-0.035em] text-[#17233B]">{product.name}</h3>
              <p className="mt-1 text-sm leading-5 text-[#17233B]/55">{product.formula}</p>
              <div className="mt-5 rounded-xl bg-[#EEF2FF] p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#17233B]/45">Why it&apos;s here</p>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#17233B]/65">{product.reason}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#17233B]/12 pt-5">
                <div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#17233B]/45">Research format</p><div className="mt-2 flex flex-wrap gap-2">{product.formats.map((format) => <span key={format} className="rounded-full border border-[#17233B]/15 px-3 py-1.5 text-[10px] font-bold text-[#17233B]">{format}</span>)}</div></div>
                <div className="text-right text-[10px] font-semibold text-[#17233B]/55"><span className="block"><i className="ri-file-shield-2-line mr-1 text-[#D95858]" />Lot COA</span><span className="mt-2 block"><i className="ri-flask-line mr-1 text-[#D95858]" />Lyophilized</span></div>
              </div>
              <Link href="#science" className="mt-6 flex w-full items-center justify-between rounded-full bg-[#17233B] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#D95858]">View research profile <i className="ri-arrow-right-line text-base" /></Link>
            </div>
          </article>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>
    </div>
  );
}
