"use client";

import Link from "next/link";
import { useState } from "react";
import { K9VialVisual } from "@/components/ui/K9VialVisual";

const profiles = [
  {
    id: "rebuild",
    name: "K9 Rebuild",
    compound: "BPC-157 + TB-500",
    focusLabel: "Mobility + Soft Tissue",
    label: "The Research Stack",
    image: "/images/zoonetics-products/k9-rebuild.png",
    href: "/shop/bpc-tb-500-blend-10mg",
    purity: "99.59–99.31%",
    price: "$75",
    formats: ["10 mg", "20 mg"],
    dosage: "10 MG",
    summary: "The broad mobility profile. Researchers select this blend when the question spans joints, tendons, ligaments, soft tissue and recovery after physical stress.",
    focuses: ["Tissue-repair signaling", "Cell migration", "Inflammatory pathways", "Recovery after physical stress"],
  },
  {
    id: "reforge",
    name: "K9 Reforge",
    compound: "BPC-157",
    focusLabel: "Focused Tissue Repair",
    label: "Single-Peptide Profile",
    image: "/images/zoonetics-products/k9-reforge.png",
    href: "/shop/bpc-157-10mg",
    purity: "99.31%",
    price: "$40",
    formats: ["5 mg", "10 mg", "20 mg"],
    dosage: "10 MG",
    summary: "The focused tissue-repair profile. Common research questions involve tendon and ligament models, local repair signaling and gastrointestinal tissue integrity.",
    focuses: ["Tendon models", "Ligament models", "Gastrointestinal tissue", "Local repair signaling"],
  },
  {
    id: "reload",
    name: "K9 Reload",
    compound: "TB-500",
    focusLabel: "Movement + Recovery",
    label: "Single-Peptide Profile",
    image: "/images/zoonetics-products/k9-reload.png",
    href: "/shop/tb-500-10mg",
    purity: "99.59%",
    price: "$45",
    formats: ["5 mg", "10 mg", "20 mg"],
    dosage: "10 MG",
    summary: "The movement and recovery profile. Research centers on cell migration, actin regulation, soft-tissue models and recovery following physical stress.",
    focuses: ["Cell migration", "Actin regulation", "Soft-tissue models", "Physical-stress recovery"],
  },
  {
    id: "reclaim",
    name: "K9 Reclaim",
    compound: "KPV",
    focusLabel: "Gut + Inflammatory Pathways",
    label: "Dual-Format Profile",
    image: "/images/zoonetics-products/k9-reclaim.png",
    href: "/shop/kpv-10mg",
    purity: "99.45%",
    price: "$70",
    formats: ["10 mg injectable", "500 mcg oral"],
    dosage: "10 MG",
    summary: "The barrier and inflammatory-pathway profile. Researchers use KPV in models involving gut integrity, epithelial barriers, skin and inflammatory signaling.",
    focuses: ["Inflammatory signaling", "Barrier models", "Epithelial tissue", "Dual-format research"],
  },
  {
    id: "restore",
    name: "K9 Restore",
    compound: "GHK-Cu",
    focusLabel: "Skin + Collagen",
    label: "Copper-Peptide Profile",
    image: "/images/zoonetics-products/k9-restore.png",
    href: "/shop/ghk-cu-50mg",
    purity: "99.4%",
    price: "$40",
    formats: ["50 mg"],
    dosage: "50 MG",
    summary: "The skin and remodeling profile. Research questions commonly involve collagen signaling, skin and coat models, tissue remodeling and wound pathways.",
    focuses: ["Tissue remodeling", "Collagen signaling", "Skin models", "Wound-model research"],
  },
  {
    id: "recast",
    name: "K9 Recast",
    compound: "GHK-Cu + BPC-157 + TB-500",
    focusLabel: "Multi-Pathway Recovery",
    label: "Triple-Blend Profile",
    image: "/images/zoonetics-products/k9-recast.png",
    href: "/shop/glow-70mg",
    purity: "99.56–99.32%",
    price: "$140",
    formats: ["70 mg"],
    dosage: "70 MG",
    summary: "The widest research profile. This three-compound blend spans skin and collagen models, tissue remodeling, repair signaling, mobility and cell migration.",
    focuses: ["Multi-pathway research", "Tissue remodeling", "Repair signaling", "Cell migration"],
  },
] as const;

export default function ResearchProfileTabs() {
  const [activeId, setActiveId] = useState<(typeof profiles)[number]["id"]>("rebuild");
  const active = profiles.find((profile) => profile.id === activeId) ?? profiles[0];

  return (
    <section id="product" className="scroll-mt-20 px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14" style={{ background: "#F7F9FC", color: "#10243D" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4C7EF3]">The K9 Product Line</p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-[clamp(2.15rem,2.8vw,3rem)] font-extrabold leading-[0.99] tracking-[-0.04em]">Compare All Six Profiles.</h2>
          </div>
          <p className="max-w-lg text-[15px] font-medium leading-7 text-[#10243D]/64 lg:justify-self-end">Compare compounds, formats, verified purity and pricing in one place.</p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-12" role="tablist" aria-label="Research profiles">
          {profiles.map((profile) => {
            const selected = active.id === profile.id;
            return (
              <button key={profile.id} type="button" role="tab" aria-selected={selected} onClick={() => setActiveId(profile.id)}
                className="min-w-fit snap-start rounded-full border px-5 py-3 text-left transition"
                style={{ background: selected ? "#10243D" : "#FFFFFF", borderColor: selected ? "#10243D" : "rgba(16,36,61,.12)", color: selected ? "#FFFFFF" : "#10243D" }}>
                <span className="block text-[12px] font-extrabold">{profile.name}</span>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.1em] opacity-55">{profile.focusLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid overflow-hidden rounded-[1.75rem] border border-[#10243D]/10 bg-white shadow-[0_24px_80px_rgba(16,36,61,0.08)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[460px] bg-[#EDF2FA] lg:min-h-[650px]">
            <K9VialVisual key={active.id} title={active.name} dosage={active.dosage} className="h-full min-h-[460px] w-full p-2 md:p-4 lg:min-h-[650px]" />
            <div className="absolute left-6 top-6 rounded-full border border-[#10243D]/10 bg-white/90 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.15em] backdrop-blur">Research Use Only</div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/70 bg-white/88 p-5 backdrop-blur-xl">
              <div><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#10243D]/45">HPLC Purity</p><p className="mt-1 font-display text-xl font-extrabold">{active.purity}</p></div>
              <div className="text-right"><p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#10243D]/45">From</p><p className="mt-1 font-display text-xl font-extrabold">{active.price}</p></div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14" role="tabpanel">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#4C7EF3]">{active.label}</p>
            <h3 className="mt-3 font-display text-[clamp(2.3rem,3.5vw,3.6rem)] font-extrabold leading-none tracking-[-0.045em]">{active.name}</h3>
            <p className="mt-3 text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#10243D]/48">{active.compound}</p>
            <p className="mt-7 max-w-xl text-[17px] font-medium leading-8 text-[#10243D]/72">{active.summary}</p>

            <div className="mt-8 border-t border-[#10243D]/10 pt-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#10243D]/45">Available Formats</p>
              <div className="mt-3 flex flex-wrap gap-2">{active.formats.map((format) => <span key={format} className="rounded-full border border-[#10243D]/12 px-4 py-2 text-[11px] font-bold">{format}</span>)}</div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={active.href} className="inline-flex flex-1 items-center justify-center rounded-full bg-[#10243D] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#4C7EF3]">Shop {active.name} · From {active.price}</Link>
              <Link href="/coas" className="inline-flex items-center justify-center rounded-full border border-[#10243D]/18 px-6 py-4 text-[12px] font-extrabold">View Available COAs</Link>
            </div>
            <p className="mt-5 text-[10px] font-medium leading-5 text-[#10243D]/42">Preclinical research context only. Not an approved veterinary medicine. No clinical outcome is promised.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
