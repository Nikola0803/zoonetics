import Image from "next/image";
import Link from "next/link";

export function ZooneticsFooter() {
  return (
    <footer className="bg-[#101829] px-5 pb-8 pt-16 text-white md:px-8 md:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Image src="/brand/zoonetics-light.webp" alt="ZOONETICS" width={250} height={62} className="h-10 w-auto" />
            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/58">Independent, lot-tested peptide profiles supplied strictly for canine research. Clear documentation, visible purity data, and no vague promises.</p>
          </div>
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#A9C7FF]">Explore</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/68"><Link href="/shop">K9 Product Line</Link><Link href="/journal">Research Library</Link><Link href="/coas">Lab Results</Link></div></div>
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#A9C7FF]">Support</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/68"><Link href="/contact">Contact</Link><Link href="/shipping">Shipping</Link><Link href="/returns">Returns</Link><Link href="/privacy">Privacy</Link></div></div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[11px] font-medium leading-5 text-white/38 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl">Research use only. Products are not approved veterinary medicines and are not intended for administration to humans or animals. No medical outcome is promised.</p>
          <p>© {new Date().getFullYear()} ZOONETICS</p>
        </div>
      </div>
    </footer>
  );
}
