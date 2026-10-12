"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Product, ProductCategory, ProductFormat } from "@/lib/types";
import { categories, formats } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterDropdown<T extends string>({
  label,
  activeLabel,
  options,
  value,
  onChange,
}: {
  label: string;
  activeLabel: string | null;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isActive = activeLabel !== null;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors md:px-5 md:text-sm ${
          isActive ? "bg-[#4F6EF7] text-white" : "border border-[#17233B]/12 bg-white text-[#17233B]/70 hover:border-[#4F6EF7]/50"
        }`}
      >
        {activeLabel ?? label}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-lg border border-stone bg-white py-1.5 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition ${
                opt.value === value ? "font-semibold text-[#4F6EF7]" : "text-[#17233B]/70 hover:bg-[#EEF3FF]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [activeFormat, setActiveFormat] = useState<ProductFormat | "all">("all");
  const [sortAz, setSortAz] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fromUrl = searchParams.get("category") as ProductCategory | null;
    if (fromUrl && categories.some((c) => c.value === fromUrl)) setActiveCategory(fromUrl);
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
    if (activeFormat !== "all") list = list.filter((p) => p.format === activeFormat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortAz) list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, activeCategory, activeFormat, query, sortAz]);

  const resetAll = () => {
    setActiveCategory("all");
    setActiveFormat("all");
    setSortAz(false);
  };

  const nothingActive = activeCategory === "all" && activeFormat === "all" && !sortAz;

  return (
    <>
      <section className="relative overflow-hidden bg-[#101829] py-20 text-center text-white md:py-28">
        <div className="absolute -right-24 -top-36 h-[480px] w-[480px] rounded-full bg-[#4F6EF7]/20 blur-3xl" />
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">The K9 Product Line</p>
          <h1 className="mb-5 font-display text-4xl font-extrabold tracking-[-0.04em] md:text-6xl">Research profiles, clearly defined.</h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Explore peptide profiles by research focus. Every ZOONETICS lot is independently tested for identity and purity, with its documentation visible before checkout.
          </p>
          <div className="relative mx-auto mt-8 max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-white/50"
            />
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
        </div>
      </section>

      <section className="sticky top-[82px] z-40 border-b border-[#17233B]/10 bg-[#FBFCFF]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 md:gap-3">
            <button
              type="button"
              onClick={resetAll}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors md:px-5 md:text-sm ${
                nothingActive ? "bg-[#17233B] text-white" : "border border-[#17233B]/12 bg-white text-[#17233B]/70 hover:border-[#4F6EF7]/50"
              }`}
            >
              All
            </button>

            <FilterDropdown
              label="Shop by Category"
              activeLabel={activeCategory === "all" ? null : categories.find((c) => c.value === activeCategory)?.label ?? null}
              options={categories}
              value={activeCategory}
              onChange={setActiveCategory}
            />

            <FilterDropdown
              label="Shop by Format"
              activeLabel={activeFormat === "all" ? null : formats.find((f) => f.value === activeFormat)?.label ?? null}
              options={formats}
              value={activeFormat}
              onChange={setActiveFormat}
            />

            <button
              type="button"
              onClick={() => setSortAz((v) => !v)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-colors md:px-5 md:text-sm ${
                sortAz ? "bg-[#17233B] text-white" : "border border-[#17233B]/12 bg-white text-[#17233B]/70 hover:border-[#4F6EF7]/50"
              }`}
            >
              A to Z
            </button>

            <Link
              href="/bundles"
              className="shrink-0 whitespace-nowrap rounded-full border border-stone bg-ivory-soft px-4 py-2 text-xs font-semibold text-charcoal/70 transition-colors hover:bg-stone/40 md:px-5 md:text-sm"
            >
              Bundles
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FC] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1400px]">
        <p className="mb-6 text-sm text-charcoal/50">Showing {filtered.length} products</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
