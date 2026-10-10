"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product as ShopProduct } from "@/lib/types";

export type QuickVariant = {
  label: string;
  cartProducts: ShopProduct[];
};

export type Product = {
  name: string;
  formula: string;
  type: string;
  lane: "mobility" | "skin" | "single";
  focus: string;
  reason: string;
  formats: string[];
  variants: QuickVariant[];
  color: string;
  ink: string;
};

function ProductVial({ color, ink, name, compact = false }: Pick<Product, "color" | "ink" | "name"> & { compact?: boolean }) {
  return (
    <div className={`relative mx-auto ${compact ? "h-40 w-28" : "h-52 w-36"}`} aria-hidden style={{ color: ink }}>
      <Image src="/images/canis/zoonetics-vial.png" alt="" fill sizes={compact ? "112px" : "144px"} className="object-contain" />
      <p className={`absolute left-1/2 top-[58%] -translate-x-1/2 text-center font-display font-bold leading-tight tracking-[-0.02em] drop-shadow ${compact ? "w-20 text-[8px]" : "w-24 text-[10px]"}`} style={{ color: color === "#17233B" ? "#FFFFFF" : ink }}>{name}</p>
    </div>
  );
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeLane, setActiveLane] = useState<"all" | Product["lane"]>("all");
  const { addToCart, count, subtotal } = useCart();
  const visibleProducts = activeLane === "all" ? products : products.filter((product) => product.lane === activeLane);

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
    setPosition(Math.min(visibleProducts.length, Math.max(1, Math.round(element.scrollLeft / distance) + 1)));
  };

  const openQuickBuy = (product: Product, packQuantity = 1) => {
    setSelectedProduct(product);
    setVariantIndex(0);
    setQuantity(packQuantity);
    setJustAdded(false);
    window.requestAnimationFrame(() => dialog.current?.showModal());
  };

  const closeQuickBuy = () => dialog.current?.close();

  const selectedVariant = selectedProduct?.variants[variantIndex];
  const variantPrice = selectedVariant?.cartProducts.reduce((sum, product) => sum + product.price, 0) ?? 0;
  const packDiscount = quantity >= 4 ? 0.2 : quantity >= 2 ? 0.1 : 0;
  const discountedTotal = variantPrice * quantity * (1 - packDiscount);

  const addSelected = () => {
    if (!selectedVariant) return;
    selectedVariant.cartProducts.forEach((product) => addToCart(product, quantity, product.price * (1 - packDiscount), `ZooNetics K9 · ${selectedVariant.label}`));
    setJustAdded(true);
  };

  const selectLane = (lane: "all" | Product["lane"]) => {
    setActiveLane(lane);
    setPosition(1);
    track.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-5 border-b border-[#17233B]/15 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#17233B]">Shop by research focus</p>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Filter K9 research products">
            {([['all', 'All profiles'], ['mobility', 'Mobility + recovery'], ['skin', 'Skin + tissue'], ['single', 'Single peptides']] as const).map(([lane, label]) => <button key={lane} type="button" onClick={() => selectLane(lane)} aria-pressed={activeLane === lane} className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.11em] transition ${activeLane === lane ? 'bg-[#17233B] text-white' : 'border border-[#17233B]/15 bg-white text-[#17233B]/65 hover:border-[#17233B]/40'}`}>{label}</button>)}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="mr-1 hidden text-[10px] font-bold tracking-[0.18em] text-[#17233B]/45 sm:block">0{position} / 0{visibleProducts.length}</span>
          <button type="button" onClick={() => move(-1)} aria-label="Previous product" className="grid h-11 w-11 place-items-center rounded-full border border-[#17233B]/20 bg-white text-[#17233B] transition hover:border-[#17233B] hover:bg-[#17233B] hover:text-white"><i className="ri-arrow-left-line" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next product" className="grid h-11 w-11 place-items-center rounded-full bg-[#17233B] text-white transition hover:bg-[#D95858]"><i className="ri-arrow-right-line" /></button>
        </div>
      </div>

      <div ref={track} onScroll={updatePosition} tabIndex={0} aria-label="ZooNetics product carousel" className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 pt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F6EF7] md:mx-0 md:px-0">
        {visibleProducts.map((product, index) => {
          const basePrice = product.variants[0].cartProducts.reduce((sum, item) => sum + item.price, 0);
          const reportedPurity = product.variants[0].cartProducts[0]?.purity ?? "99%+";
          const purityValues = reportedPurity.match(/\d+(?:\.\d+)?%/g);
          const compactPurity = purityValues && purityValues.length > 1 ? `${purityValues.at(-1)?.replace("%", "")}–${purityValues[0]}` : reportedPurity;
          return (
          <article data-product-card key={product.name} className="group w-[72vw] max-w-[250px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#17233B]/12 bg-[#FBFAFF] shadow-[0_12px_30px_rgba(23,35,59,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(23,35,59,0.12)]">
            <div className="relative grid min-h-[190px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#26324A_0%,#101829_58%,#090C12_100%)] px-4 pt-7">
              <div className="absolute left-3 top-3 flex items-center gap-1.5"><span className="rounded-full bg-[#FBFAFF] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#17233B]">{product.type}</span><span className="rounded-full border border-white/30 bg-white/15 px-2 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white/75">RUO</span></div>
              <span className="absolute right-3 top-4 text-[9px] font-bold text-white/35">0{index + 1}</span>
              <ProductVial color={product.color} ink={product.ink} name={product.name} compact />
              <div className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-[#D7DEEF] to-transparent" />
            </div>
            <div className="p-4">
              <p className="line-clamp-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#D95858]">{product.focus}</p>
              <h3 className="mt-2 font-display text-[1.35rem] font-semibold tracking-[-0.035em] text-[#17233B]">{product.name}</h3>
              <p className="mt-0.5 text-[13px] leading-5 text-[#17233B]/55">{product.formula}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 border-y border-[#17233B]/10 py-3">
                <div><p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#17233B]/40">Purity</p><p className="mt-1 truncate text-[11px] font-bold text-[#17233B]">{compactPurity}</p></div>
                <div className="border-l border-[#17233B]/10 pl-3"><p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#17233B]/40">From</p><p className="mt-1 text-xs font-bold text-[#17233B]">${basePrice.toFixed(0)}</p></div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-semibold text-[#17233B]/55"><span>{product.formats.join(" · ")}</span><span><i className="ri-file-shield-2-line mr-1 text-[#D95858]" />Lot COA</span></div>
              <button type="button" onClick={() => openQuickBuy(product)} className="mt-3 flex w-full items-center justify-center rounded-full bg-[#17233B] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#D95858]">Quick buy + COA</button>
            </div>
          </article>
        );})}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <dialog
        ref={dialog}
        onClose={() => setSelectedProduct(null)}
        onClick={(event) => event.target === event.currentTarget && closeQuickBuy()}
        aria-label={selectedProduct ? `${selectedProduct.name} quick buy` : "K9 quick buy"}
        className="m-auto w-[calc(100%-2rem)] max-w-[960px] overflow-hidden rounded-[2rem] bg-transparent p-0 shadow-[0_40px_120px_rgba(16,24,41,0.4)] backdrop:bg-[#101829]/72 backdrop:backdrop-blur-md open:flex"
      >
        {selectedProduct && selectedVariant && (
          <div className="flex max-h-[92dvh] w-full flex-col overflow-hidden bg-[#F6F7FC] text-[#17233B]">

            {/* Header */}
            <header className="flex shrink-0 items-center justify-between border-b border-[#17233B]/10 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#DCE7FF] text-[#4F6EF7]"><i className="ri-bubble-chart-fill" /></span>
                <div>
                  <p className="text-sm font-bold">ZooNetics K9</p>
                  <p className="text-xs text-[#17233B]/45">Research use only</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/checkout" className="hidden rounded-full bg-[#EEF2FF] px-4 py-2 text-xs font-bold text-[#4F6EF7] sm:block">Cart · {count}</Link>
                <button type="button" onClick={closeQuickBuy} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-[#17233B]/12 bg-[#F6F7FC] text-lg transition hover:bg-[#17233B] hover:text-white"><i className="ri-close-line" /></button>
              </div>
            </header>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-[420px_1fr]">

                {/* Left — vial visual */}
                <div className="relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#26324A_0%,#101829_55%,#090C12_100%)] px-8 py-12 lg:min-h-0">
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">RUO · K9 research</span>
                  <ProductVial color={selectedProduct.color} ink={selectedProduct.ink} name={selectedProduct.name} />
                  <div className="mt-6 w-full rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#25734A]/20 text-sm text-[#4FCB7A]"><i className="ri-checkbox-circle-fill" /></span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">Lot status</p>
                        <p className="text-sm font-semibold text-white">COA connected</p>
                      </div>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-white/45">Identity · Reported purity · Batch code · Analytical date all linked to this lot.</p>
                  </div>
                </div>

                {/* Right — details */}
                <div className="p-6 lg:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D95858]">{selectedProduct.type}</p>
                  <h2 className="mt-2 font-display text-[2.4rem] font-semibold leading-none tracking-[-0.045em]">{selectedProduct.name}</h2>
                  <p className="mt-1.5 text-base text-[#17233B]/50">{selectedProduct.formula}</p>
                  <p className="mt-4 text-[15px] leading-7 text-[#17233B]/65">{selectedProduct.reason}</p>

                  {/* Format selector */}
                  <div className="mt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#17233B]/45">Research format</p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {selectedProduct.variants.map((variant, index) => {
                        const price = variant.cartProducts.reduce((sum, item) => sum + item.price, 0);
                        return (
                          <button key={variant.label} type="button" onClick={() => { setVariantIndex(index); setJustAdded(false); }}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-bold transition ${variantIndex === index ? "border-[#4F6EF7] bg-[#DCE7FF] text-[#17233B]" : "border-[#17233B]/12 bg-white text-[#17233B]/70 hover:border-[#4F6EF7]/40"}`}>
                            <span>{variant.label}</span>
                            <span className={`text-xs font-semibold ${variantIndex === index ? "text-[#4F6EF7]" : "text-[#17233B]/40"}`}>${price.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* COA snapshot */}
                  <div className="mt-6 rounded-2xl border border-[#17233B]/10 bg-white p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#17233B]/40">Lot documentation</p>
                        <p className="mt-0.5 font-display text-lg font-semibold">COA snapshot</p>
                      </div>
                      <span className="rounded-full bg-[#E5F3EA] px-3 py-1.5 text-[11px] font-bold text-[#25734A]"><i className="ri-checkbox-circle-fill mr-1" />Passed</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {selectedVariant.cartProducts.map((item) => (
                        <div key={item.id} className="rounded-xl bg-[#F6F7FC] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold">{item.name}</p>
                              <p className="mt-0.5 text-[11px] text-[#17233B]/40">Lot {item.batch?.code ?? "—"}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-[#4F6EF7]">{item.purity ?? "—"}</p>
                              <p className="text-[10px] text-[#17233B]/38">Reported purity</p>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#17233B]/8 pt-3 text-[11px]">
                            <span><b className="block text-[#17233B]/50">CAS</b>{item.casNumber ?? "—"}</span>
                            <span><b className="block text-[#17233B]/50">Mass</b>{item.avgMass ?? "—"}</span>
                            <span><b className="block text-[#17233B]/50">Tested</b>{item.batch?.date ?? "—"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/coas" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#4F6EF7]">Full COA library <i className="ri-arrow-right-line" /></Link>
                  </div>

                  {/* Add to cart */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 items-center rounded-xl border border-[#17233B]/12 bg-white px-1.5">
                      <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease" className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-[#F0F1F5]"><i className="ri-subtract-line" /></button>
                      <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                      <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase" className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-[#F0F1F5]"><i className="ri-add-line" /></button>
                    </div>
                    <button type="button" onClick={addSelected} className="flex h-12 flex-1 items-center justify-between rounded-xl bg-[#17233B] px-6 text-sm font-bold text-white transition hover:bg-[#D95858]">
                      <span>{justAdded ? "✓ Added to cart" : "Add to cart"}</span>
                      <span className="flex flex-col items-end leading-tight">
                        <span>${discountedTotal.toFixed(2)}</span>
                        {packDiscount > 0 && <span className="text-[10px] font-medium text-[#4FCB7A]">−{packDiscount * 100}% pack deal</span>}
                      </span>
                    </button>
                  </div>

                  {justAdded && (
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-[#EEF2FF] px-5 py-4">
                      <div>
                        <p className="text-sm font-bold text-[#17233B]">In your cart</p>
                        <p className="text-xs text-[#17233B]/45">{count} item{count === 1 ? "" : "s"} · ${subtotal.toFixed(2)}</p>
                      </div>
                      <Link href="/checkout" className="rounded-xl bg-[#17233B] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#4F6EF7]">Checkout →</Link>
                    </div>
                  )}

                  <p className="mt-5 text-[11px] leading-5 text-[#17233B]/35">For laboratory research use only. Not intended for administration to animals or humans. Lot details subject to final CRM synchronisation.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
