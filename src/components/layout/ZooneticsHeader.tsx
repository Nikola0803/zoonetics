"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const links = [
  ["K9 Product Line", "/shop"],
  ["Research Library", "/journal"],
  ["Partners", "/partners"],
  ["Our Standard", "/sourcing"],
] as const;

export function ZooneticsHeader() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#17233B]/10 bg-[#FBFCFF]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="ZOONETICS home" className="shrink-0">
          <Image src="/brand/zoonetics-dark.webp" alt="ZOONETICS" width={220} height={54} className="h-8 w-auto md:h-9" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex xl:gap-10">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-[13px] font-bold tracking-[-0.01em] text-[#17233B]/78 transition hover:text-[#4F6EF7]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/account" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17233B]/12 text-[#17233B] transition hover:border-[#4F6EF7] hover:text-[#4F6EF7]" aria-label="Open account">
            <i className="ri-user-3-line text-lg" />
          </Link>
          <button onClick={openCart} className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#17233B]/12 text-[#17233B] transition hover:border-[#4F6EF7]" aria-label="Open cart">
            <i className="ri-shopping-bag-line text-lg" />
            {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF8A72] px-1 text-[10px] font-extrabold text-[#17233B]">{count}</span>}
          </button>
          <Link href="/account/protocol" className="hidden rounded-full bg-[#17233B] px-5 py-3 text-[12px] font-extrabold text-white transition hover:bg-[#4F6EF7] sm:block">ZooProtocol</Link>
          <button onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center text-[#17233B] lg:hidden" aria-label="Open menu"><i className={open ? "ri-close-line text-xl" : "ri-menu-line text-xl"} /></button>
        </div>
      </div>
      {open && <nav className="border-t border-[#17233B]/10 bg-white px-5 py-4 lg:hidden">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-[#17233B]/8 py-4 text-sm font-bold text-[#17233B]">{label}</Link>)}<Link href="/account" onClick={() => setOpen(false)} className="block py-4 text-sm font-bold text-[#17233B]">Account</Link></nav>}
    </header>
  );
}
