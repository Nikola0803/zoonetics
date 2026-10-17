"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { ProductVisual } from "@/components/ui/ProductVisual";
import { K9VialVisual } from "@/components/ui/K9VialVisual";
import { PackSelector, usePackSelection } from "./PackSelector";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { getStoredUser } from "@/lib/auth";

const DOSAGE_PATTERN = /\s(\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g)(?:\/\d+(?:\.\d+)?\s?(?:mg|mcg|iu|g))?)$/i;

function splitDosage(name: string) {
  const match = name.match(DOSAGE_PATTERN);
  if (!match) return { title: name, dosage: null as string | null };
  return { title: name.slice(0, match.index).trim(), dosage: match[1].toUpperCase() };
}

export function ProductCard({ product }: { product: Product }) {
  const { packIndex, setPackIndex, packs, selected } = usePackSelection(product);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { title, dosage } = splitDosage(product.name);
  const [isMember, setIsMember] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    setIsMember(user?.membershipStatus === "APPROVED");
    setIsVerified(user?.researcherStatus === "APPROVED");
  }, []);

  const memberLocked = !!product.memberOnly && !isMember;
  const restrictedLocked = !!product.restricted && !isVerified;
  const locked = memberLocked || restrictedLocked;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#17233B]/10 bg-white shadow-[0_18px_50px_rgba(23,35,59,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(23,35,59,0.14)]">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#FFFFFF_0%,#EDF2FC_72%)]">
        <div className="aspect-[3/4] w-full">
          {product.name.startsWith("K9 ") ? (
            <K9VialVisual title={title} dosage={dosage} className="h-full w-full p-3 transition duration-500 ease-out group-hover:scale-[1.025]" />
          ) : product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={750}
              sizes="(max-width: 768px) 45vw, 320px"
              className="h-full w-full object-contain p-3 transition duration-500 ease-out group-hover:scale-[1.025]"
            />
          ) : (
            <ProductVisual name={title} dosage={dosage} floating className="h-full w-full p-6" />
          )}
        </div>
        {product.badges?.filter((badge) => !/case pricing/i.test(badge)).map((badge) => (
          <span key={badge} className="absolute left-3 top-3 bg-sage-deep px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {badge}
          </span>
        ))}
        {locked && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-charcoal/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-copper backdrop-blur-sm">
            <i className="ri-lock-line" /> {restrictedLocked ? "Verified Researchers Only" : "Member Exclusive"}
          </span>
        )}
        {!product.inStock && !locked && (
          <span className="absolute right-3 top-3 text-[10px] font-semibold uppercase tracking-wider text-charcoal/50">Out of Stock</span>
        )}
        {product.purity && !locked && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-charcoal/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            <i className="ri-flask-line text-copper" /> {product.purity}+
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/shop/${product.slug}`} className="font-display text-lg font-extrabold tracking-[-0.025em] text-[#17233B] transition hover:text-[#4F6EF7] md:text-xl">
            {title} {dosage}
          </Link>
          <Link
            href={`/shop/${product.slug}`}
            className="flex shrink-0 items-center gap-1 pt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#4F6EF7] transition hover:text-[#17233B]"
          >
            Details <i className="ri-arrow-right-line" />
          </Link>
        </div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-extrabold text-[#17233B]">{formatPrice(product.price).split(" ")[0]}</span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-charcoal/40">{formatPrice(product.price).split(" ")[1]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-0.5 text-sage-deep">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="ri-star-fill text-[11px]" />
              ))}
            </span>
            <span className="text-xs font-semibold text-charcoal">{product.rating}</span>
            <span className="text-xs text-charcoal/40">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-auto pt-5">
          {packs.length > 1 && (
            <div className="mb-4">
              <PackSelector packs={packs} packIndex={packIndex} onSelect={setPackIndex} />
            </div>
          )}

          {locked ? (
            <Link
              href={restrictedLocked ? "/account?tab=verification" : "/plans"}
              className="flex w-full items-center justify-center gap-1.5 border border-charcoal py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-charcoal transition hover:bg-charcoal hover:text-ivory"
            >
              <i className="ri-lock-line" /> {restrictedLocked ? "Apply for Verification" : "Unlock With Membership"}
            </Link>
          ) : (
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product, 1, selected.unitPrice, selected.label)}
              className="w-full rounded-full bg-[#17233B] py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-[#4F6EF7] disabled:cursor-not-allowed disabled:bg-stone disabled:text-charcoal/40"
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
