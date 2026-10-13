import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AffiliateForm } from "@/app/ambassadors/AffiliateForm";

export const metadata: Metadata = {
  title: "Partner Program | ZOONETICS",
  description: "Join the ZOONETICS partner program for pet creators, dog communities and research educators.",
  alternates: { canonical: "/partners" },
};

const benefits = [
  ["Earn on every confirmed order", "Receive tracked commission when your audience shops with your personal link or code."],
  ["Built for dog communities", "We work with breed pages, rescue voices, trainers, working-dog creators and trusted pet educators."],
  ["Content you can stand behind", "Access clear product references, research framing, campaign briefs and lot-level documentation."],
  ["Direct partner support", "Get launch coordination, campaign support and a direct line to the ZOONETICS team."],
];

export default function PartnersPage() {
  return (
    <>
      <section className="overflow-hidden bg-[#101829] px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">ZOONETICS Partner Network</p>
            <h1 className="mt-5 max-w-2xl font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] md:text-7xl">Your audience trusts you with their dogs.</h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-white/65">Partner with a canine research brand built for trusted creators, clear education and long-term relationships, not one-off promo codes.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#apply" className="rounded-full bg-white px-7 py-4 text-sm font-extrabold text-[#17233B]">Apply To Partner</a><Link href="/account?tab=affiliate" className="rounded-full border border-white/20 px-7 py-4 text-sm font-extrabold text-white">Partner Sign In</Link></div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden rounded-[28px] md:min-h-[560px]">
            <Image src="/images/ambassadors/hero-creator.webp" alt="Dog creator building a trusted community" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101829]/55 to-transparent" />
          </div>
        </div>
      </section>
      <section className="bg-[#FBFCFF] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#4F6EF7]">A Real Partnership</p><h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] text-[#17233B] md:text-5xl">Built To Grow With Your Community.</h2></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">{benefits.map(([title, body], index) => <div key={title} className="rounded-[22px] border border-[#17233B]/10 bg-white p-7"><span className="text-xs font-extrabold text-[#4F6EF7]">0{index + 1}</span><h3 className="mt-5 font-display text-2xl font-extrabold tracking-[-0.025em] text-[#17233B]">{title}</h3><p className="mt-3 text-sm font-medium leading-6 text-[#17233B]/58">{body}</p></div>)}</div>
        </div>
      </section>
      <section id="apply" className="bg-[#EEF2FA] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#4F6EF7]">Partner Application</p><h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] text-[#17233B]">Tell Us About Your Community.</h2><p className="mt-5 text-sm font-medium leading-7 text-[#17233B]/60">We review audience fit, content quality and alignment with research-use communication. Large reach helps, but trust and relevance matter more.</p></div>
          <AffiliateForm />
        </div>
      </section>
    </>
  );
}
