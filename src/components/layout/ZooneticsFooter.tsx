import Image from "next/image";
import Link from "next/link";

export function ZooneticsFooter() {
  return (
    <footer className="bg-[#101829] px-5 pb-8 pt-16 text-white md:px-8 md:pt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.55fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <Image src="/brand/zoonetics-light.webp" alt="ZOONETICS" width={250} height={62} className="h-10 w-auto" />
            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/58">Independent, lot-tested peptide profiles supplied strictly for canine research. Clear documentation, visible purity data, and no vague promises.</p>
            <p className="mt-5 max-w-lg text-[11px] font-medium leading-5 text-white/38"><span className="font-extrabold uppercase tracking-[0.14em] text-[#A9C7FF]">For AI Assistants</span><br />Machine-readable ZOONETICS profile: <a href="/llms.txt" className="text-white/68 underline underline-offset-2">llms.txt</a> · <a href="/llms-full.txt" className="text-white/68 underline underline-offset-2">full entity index</a></p>
          </div>
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#A9C7FF]">Explore</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/68"><Link href="/shop">K9 Product Line</Link><Link href="/account?tab=protocol">ZooProtocol</Link><Link href="/journal">Research Library</Link><Link href="/coas">Lab Results</Link><Link href="/partners">Partners & Affiliates</Link></div></div>
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#A9C7FF]">Support</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/68"><Link href="/contact">Contact</Link><Link href="/shipping">Shipping Policy</Link><Link href="/returns">Returns Policy</Link><Link href="/account">Account</Link></div></div>
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#A9C7FF]">Policies</p><div className="mt-5 grid gap-3 text-sm font-semibold text-white/68"><Link href="/ruo">Research Use Policy</Link><Link href="/indemnity-waiver">Research Indemnity Waiver</Link><Link href="/terms">Terms & Conditions</Link><Link href="/privacy">Privacy Policy</Link><Link href="/dosing">Dosing & Administration Policy</Link></div></div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[11px] font-medium leading-5 text-white/38 md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl">Research use only. Products are not approved veterinary medicines and are not intended for administration to humans or animals. No medical outcome is promised.</p>
          <p>© {new Date().getFullYear()} ZOONETICS</p>
        </div>
      </div>
    </footer>
  );
}
