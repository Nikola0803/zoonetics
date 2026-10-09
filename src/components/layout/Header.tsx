"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SearchWidget } from "./SearchWidget";
import { ShopMegaMenu } from "./ShopMegaMenu";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

const NAV = [
  { href: "/trade", label: "Trade" },
  { href: "/coas", label: "COA Library" },
  { href: "/sourcing", label: "Quality" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Support" },
];

export function Header({ products }: { products?: Product[] } = {}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-[32px] z-50 border-b border-stone/70 bg-ivory-soft/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_30px_rgba(14,17,19,0.06)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-4 transition-[padding] duration-300 md:px-8 ${
          scrolled ? "py-2.5 md:py-3" : "py-4 md:py-5"
        }`}
      >
        <Logo tone="charcoal" imgClassName="h-9 w-auto md:h-11" />

        <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.13em] text-charcoal/75 md:flex xl:gap-8">
          <ShopMegaMenu products={products} />
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-sage-deep">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <SearchWidget />
          <Link href="/account" className="hidden h-10 w-10 items-center justify-center text-charcoal/75 transition hover:text-sage-deep md:flex" aria-label="Account">
            <i className="ri-user-line text-lg" />
          </Link>
          <button type="button" onClick={openCart} className="relative flex h-10 w-10 items-center justify-center text-charcoal/75 transition hover:text-sage-deep" aria-label="Cart">
            <i className="ri-shopping-bag-line text-lg" />
            {count > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-sage-deep text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
          <Link href="/shop" className="hidden shrink-0 bg-sage-deep px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-charcoal lg:block">
            Shop all
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-charcoal transition hover:text-sage-deep md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i className={open ? "ri-close-line text-lg" : "ri-menu-line text-lg"} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-stone/70 bg-ivory-soft px-4 pb-5 pt-2 md:hidden">
          <Link href="/shop" onClick={() => setOpen(false)} className="border-b border-stone/60 py-3 text-sm font-medium uppercase tracking-wide text-charcoal">
            Shop all
          </Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-stone/60 py-3 text-sm font-medium uppercase tracking-wide text-charcoal">
              {item.label}
            </Link>
          ))}
          <Link href="/account" onClick={() => setOpen(false)} className="py-3 text-sm font-medium uppercase tracking-wide text-charcoal">
            My account
          </Link>
        </nav>
      )}
    </header>
  );
}
