"use client";

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
  focus: string;
  reason: string;
  formats: string[];
  variants: QuickVariant[];
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
          <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.12em]">ZooNetics</p>
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
  const dialog = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, count, subtotal } = useCart();

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

  const openQuickBuy = (product: Product) => {
    setSelectedProduct(product);
    setVariantIndex(0);
    setQuantity(1);
    setJustAdded(false);
    window.requestAnimationFrame(() => dialog.current?.showModal());
  };

  const closeQuickBuy = () => dialog.current?.close();

  const selectedVariant = selectedProduct?.variants[variantIndex];
  const variantPrice = selectedVariant?.cartProducts.reduce((sum, product) => sum + product.price, 0) ?? 0;

  const addSelected = () => {
    if (!selectedVariant) return;
    selectedVariant.cartProducts.forEach((product) => addToCart(product, quantity, product.price, `ZooNetics K9 · ${selectedVariant.label}`));
    setJustAdded(true);
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

      <div ref={track} onScroll={updatePosition} tabIndex={0} aria-label="ZooNetics product carousel" className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 pt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F6EF7] md:mx-0 md:px-0">
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
              <button type="button" onClick={() => openQuickBuy(product)} className="mt-6 flex w-full items-center justify-between rounded-full bg-[#17233B] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#D95858]"><span>Quick buy + COA</span><i className="ri-shopping-bag-3-line text-base" /></button>
            </div>
          </article>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>

      <dialog ref={dialog} onClose={() => setSelectedProduct(null)} onClick={(event) => event.target === event.currentTarget && closeQuickBuy()} aria-label={selectedProduct ? `${selectedProduct.name} quick buy` : "K9 quick buy"} className="m-0 ml-auto h-dvh max-h-none w-full max-w-[720px] overflow-hidden bg-transparent p-0 backdrop:bg-[#101829]/65 backdrop:backdrop-blur-sm open:flex">
        {selectedProduct && selectedVariant && (
          <div className="flex h-full w-full flex-col bg-[#F6F7FC] text-[#17233B] shadow-[-24px_0_80px_rgba(16,24,41,0.24)]">
            <header className="flex items-center justify-between border-b border-[#17233B]/12 bg-white px-5 py-4 md:px-8">
              <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#DCE7FF] text-[#4F6EF7]"><i className="ri-bubble-chart-fill" /></span><div><p className="text-sm font-bold">ZooNetics K9</p><p className="text-xs text-[#17233B]/48">Quick research order</p></div></div>
              <div className="flex items-center gap-3"><Link href="/checkout" className="hidden rounded-full bg-[#EEF2FF] px-4 py-2 text-xs font-bold sm:block">K9 cart · {count}</Link><button type="button" onClick={closeQuickBuy} aria-label="Close quick buy" className="grid h-10 w-10 place-items-center rounded-full border border-[#17233B]/15 bg-white text-lg transition hover:bg-[#17233B] hover:text-white"><i className="ri-close-line" /></button></div>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="grid md:grid-cols-[0.82fr_1.18fr]">
                <div className="relative grid min-h-[340px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#FFFFFF_0%,#E8ECFF_58%,#D2DBF4_100%)] px-8 py-12 md:min-h-[520px]">
                  <span className="absolute left-5 top-5 rounded-full bg-[#17233B] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">K9 research only</span>
                  <ProductVial color={selectedProduct.color} ink={selectedProduct.ink} name={selectedProduct.name} />
                  <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/70 bg-white/75 p-4 backdrop-blur">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#D95858]">Evidence status</p>
                    <p className="mt-2 text-sm leading-5 text-[#17233B]/65">Research context only. No established canine clinical benefit; not approved for veterinary use.</p>
                  </div>
                </div>

                <div className="p-6 md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D95858]">{selectedProduct.type} · RUO</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.045em]">{selectedProduct.name}</h2>
                  <p className="mt-2 text-base text-[#17233B]/55">{selectedProduct.formula}</p>
                  <p className="mt-5 text-base leading-7 text-[#17233B]/68">{selectedProduct.reason}</p>

                  <div className="mt-7">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#17233B]/50">Choose research format</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {selectedProduct.variants.map((variant, index) => {
                        const price = variant.cartProducts.reduce((sum, item) => sum + item.price, 0);
                        return <button key={variant.label} type="button" onClick={() => { setVariantIndex(index); setJustAdded(false); }} className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${variantIndex === index ? "border-[#4F6EF7] bg-[#DCE7FF]" : "border-[#17233B]/15 bg-white hover:border-[#4F6EF7]/50"}`}><span>{variant.label}</span><span>${price.toFixed(2)}</span></button>;
                      })}
                    </div>
                  </div>

                  <section className="mt-7 rounded-2xl border border-[#17233B]/12 bg-white p-5" aria-labelledby="coa-heading">
                    <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#D95858]">Lot documentation</p><h3 id="coa-heading" className="mt-1 font-display text-xl font-semibold">COA snapshot</h3></div><span className="rounded-full bg-[#E5F3EA] px-3 py-2 text-xs font-bold text-[#25734A]"><i className="ri-checkbox-circle-fill mr-1" /> Passed</span></div>
                    <div className="mt-5 space-y-4">
                      {selectedVariant.cartProducts.map((item) => (
                        <div key={item.id} className="border-t border-[#17233B]/10 pt-4 first:border-0 first:pt-0">
                          <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold">{item.name}</p><p className="mt-1 text-xs text-[#17233B]/48">Lot {item.batch?.code ?? "Pending CRM sync"}</p></div><p className="text-right text-sm font-bold text-[#4F6EF7]">{item.purity ?? "Pending"}<span className="block text-xs font-medium text-[#17233B]/40">Reported purity</span></p></div>
                          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-[#17233B]/55"><span><b className="block text-[#17233B]">CAS</b>{item.casNumber ?? "—"}</span><span><b className="block text-[#17233B]">Mass</b>{item.avgMass ?? "—"}</span><span><b className="block text-[#17233B]">Tested</b>{item.batch?.date ?? "—"}</span></div>
                        </div>
                      ))}
                    </div>
                    <Link href="/coas" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#4F6EF7]">Open full COA library <i className="ri-file-search-line" /></Link>
                  </section>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-12 items-center rounded-full border border-[#17233B]/15 bg-white px-2"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center"><i className="ri-subtract-line" /></button><span className="w-8 text-center text-sm font-bold">{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity" className="grid h-8 w-8 place-items-center"><i className="ri-add-line" /></button></div>
                    <button type="button" onClick={addSelected} className="flex h-12 flex-1 items-center justify-between rounded-full bg-[#FF8A72] px-6 text-sm font-bold text-[#17233B] transition hover:bg-[#FFC0B0]"><span>{justAdded ? "Added to K9 cart" : "Add to K9 cart"}</span><span>${(variantPrice * quantity).toFixed(2)}</span></button>
                  </div>

                  {justAdded && <div className="mt-4 rounded-xl bg-[#17233B] p-4 text-white"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-bold">Ready in your K9 cart</p><p className="mt-1 text-xs text-white/55">{count} item{count === 1 ? "" : "s"} · ${subtotal.toFixed(2)}</p></div><Link href="/checkout" className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#17233B]">Checkout</Link></div></div>}
                  <p className="mt-5 text-xs leading-5 text-[#17233B]/45">For laboratory research use only. Not intended for administration to dogs, other animals, or humans. Product availability and lot details remain subject to final CRM synchronization.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
