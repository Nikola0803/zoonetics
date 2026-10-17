"use client";

/**
 * Inline checkout upsells, styled after a competitor reference the founder
 * liked: offers embedded directly in the order summary (a checkbox "add this
 * deal" card + a small "Researchers Also Add" row), not a popup modal.
 * Real ZOONETICS pricing throughout - discounts are applied to actual product.price,
 * never fabricated "was $X" numbers.
 */

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { getProductBySlug, getProducts } from "@/lib/products";

const FEATURED_DISCOUNT_PERCENT = 25;
const FEATURED_PACK_LABEL = `Single vial · ${FEATURED_DISCOUNT_PERCENT}% cart offer`;

const ALSO_ADD_DISCOUNT_PERCENT = 10;
const ALSO_ADD_PACK_LABEL = `Single vial · ${ALSO_ADD_DISCOUNT_PERCENT}% cart offer`;

const FEATURED_PRIORITY = [
  "bpc-tb-500-blend-10mg",
  "kpv-10mg",
  "ghk-cu-50mg",
  "tb-500-10mg",
  "bpc-157-10mg",
  "glow-70mg",
  "kpv-oral-500mcg",
];

const RESEARCH_CONTEXT: Record<string, string> = {
  "bpc-tb-500-blend-10mg": "Paired tissue-repair and recovery profile",
  "kpv-10mg": "Barrier and inflammatory-pathway profile",
  "ghk-cu-50mg": "Collagen and tissue-remodeling profile",
  "tb-500-10mg": "Cell-migration and recovery profile",
  "bpc-157-10mg": "Focused tissue-integrity profile",
  "glow-70mg": "Multi-pathway research profile",
  "kpv-oral-500mcg": "Oral-format barrier research profile",
};

const ZOONETICS_PRODUCT_SLUGS = new Set([
  "bpc-157-10mg",
  "tb-500-10mg",
  "bpc-tb-500-blend-10mg",
  "ghk-cu-50mg",
  "glow-70mg",
  "kpv-10mg",
  "kpv-oral-500mcg",
]);

function getFeaturedProduct(inCartIds: Set<string>) {
  return FEATURED_PRIORITY
    .map((slug) => getProductBySlug(slug))
    .find((candidate) => candidate?.inStock && !inCartIds.has(candidate.id));
}

export const FREE_SHIPPING_THRESHOLD = 400;
export const FLAT_SHIPPING_COST = 15;

export function ShippingProgressBar() {
  const { subtotal } = useCart();
  const { formatPrice } = useCurrency();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const unlocked = remaining === 0;

  return (
    <div
      className={`mb-5 rounded-lg border p-4 shadow-sm ${
        unlocked ? "border-sage-deep/40 bg-sage-deep/[0.07]" : "border-copper/30 bg-white"
      }`}
    >
      <p className="flex items-center gap-1.5 text-xs font-semibold text-charcoal">
        <i className={`text-sm ${unlocked ? "ri-checkbox-circle-fill text-sage-deep" : "ri-truck-line text-copper"}`} />
        {unlocked ? "You've unlocked free shipping!" : `Spend ${formatPrice(remaining)} more for free shipping!`}
      </p>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-charcoal/10">
        <div
          className={`h-full rounded-full transition-all duration-500 ${unlocked ? "bg-sage-deep" : "bg-copper"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function FeaturedOfferCard() {
  const { lines, addToCart, removeLine } = useCart();
  const { formatPrice } = useCurrency();
  const inCartIds = new Set(lines.map((line) => line.product.id));
  const product = getFeaturedProduct(inCartIds);
  if (!product) return null;

  const checked = lines.some((l) => l.product.id === product.id && l.packLabel === FEATURED_PACK_LABEL);

  const discountedPrice = product.price * (1 - FEATURED_DISCOUNT_PERCENT / 100);

  function toggle() {
    if (!product) return;
    if (checked) {
      removeLine(product.id, FEATURED_PACK_LABEL);
    } else {
      addToCart(product, 1, discountedPrice, FEATURED_PACK_LABEL);
    }
  }

  return (
    <div className="mt-6">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#4F6EF7]">Complete The Research Order</p><p className="mt-1 text-sm font-bold text-[#17233B]">Add a complementary profile</p></div>
        <span className="rounded-full bg-[#EEF3FF] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#4F6EF7]">Cart offer</span>
      </div>
      <label className="flex cursor-pointer items-center gap-3 rounded-[18px] border border-[#4F6EF7]/25 bg-[#EEF3FF] p-4 transition hover:border-[#4F6EF7]/55">
        <input type="checkbox" checked={checked} onChange={toggle} className="h-4 w-4 shrink-0 accent-[#4F6EF7]" />
        <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
          {product.image && <Image src={product.image} alt={product.name} width={90} height={112} className="h-full w-full object-contain" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-[#17233B]">{product.name}</p>
          <p className="mt-0.5 text-[11px] leading-4 text-[#17233B]/55">{RESEARCH_CONTEXT[product.slug] ?? "Complementary canine research profile"}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[11px] text-[#17233B]/35 line-through">{formatPrice(product.price)}</span>
            <span className="text-sm font-extrabold text-[#4F6EF7]">{formatPrice(discountedPrice)}</span>
            <span className="text-[9px] font-bold uppercase text-[#4F6EF7]">Save {FEATURED_DISCOUNT_PERCENT}%</span>
          </div>
        </div>
      </label>
    </div>
  );
}

export function ResearchersAlsoAdd() {
  const { lines, addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const inCartIds = new Set(lines.map((l) => l.product.id));
  const featuredProduct = getFeaturedProduct(inCartIds);
  const items = getProducts()
    .filter(
      (p) =>
        ZOONETICS_PRODUCT_SLUGS.has(p.slug) &&
        !inCartIds.has(p.id) &&
        p.id !== featuredProduct?.id &&
        p.inStock
    )
    .slice(0, 3);

  if (items.length === 0) return null;

  return (
    <div className="mt-6 border-t border-[#17233B]/10 pt-5">
      <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#17233B]/45">Researchers Also Consider</p>
      <div className="space-y-3">
        {items.map((p) => {
          const discountedPrice = p.price * (1 - ALSO_ADD_DISCOUNT_PERCENT / 100);
          return (
            <div key={p.id} className="flex items-center gap-3">
              <div className="h-14 w-12 shrink-0 overflow-hidden rounded-xl border border-[#17233B]/8 bg-white p-1.5">
                {p.image && <Image src={p.image} alt={p.name} width={90} height={112} className="h-full w-full object-contain" />}
              </div>
              <div className="flex-1">
                <p className="text-xs font-extrabold text-[#17233B]">{p.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[10px] text-[#17233B]/45">{RESEARCH_CONTEXT[p.slug]}</p>
                <div className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="text-[11px] text-charcoal/40 line-through">{formatPrice(p.price)}</span>
                  <span className="text-xs font-semibold text-charcoal">{formatPrice(discountedPrice)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => addToCart(p, 1, discountedPrice, ALSO_ADD_PACK_LABEL)}
                className="rounded-full bg-[#17233B] px-3 py-2 text-[9px] font-extrabold uppercase tracking-wide text-white transition hover:bg-[#4F6EF7]"
              >
                Add · {ALSO_ADD_DISCOUNT_PERCENT}% Off
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

