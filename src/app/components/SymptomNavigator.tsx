"use client";

import Link from "next/link";
import { useState } from "react";

const pathways = [
  {
    id: "movement",
    label: "Movement changed",
    icon: "ri-walk-line",
    title: "They hesitate before the step.",
    intro: "Stiffness, limping, or avoiding normal movement can be signs of pain. The cause cannot be identified from the movement alone.",
    signs: ["Stiff or slow when rising", "Favoring a limb or limping", "Avoiding stairs, jumps, or slick floors", "Shorter walks or slower recovery"],
    possibilities: "Injury, arthritis, orthopedic disease, or another source of pain can look similar from the outside.",
    action: "Record a short video, note when the change began, and schedule a veterinary examination.",
    profiles: ["The Long Run", "BPC-157", "TB-500"],
    tone: "standard",
  },
  {
    id: "skin",
    label: "Skin looks different",
    icon: "ri-sparkling-2-line",
    title: "The licking, redness, or coat change keeps returning.",
    intro: "Surface changes are visible, but the cause may be allergy, infection, parasites, irritation, injury, or a broader health problem.",
    signs: ["Repeated licking or chewing", "New redness or irritated areas", "Hair, coat, or texture changes", "A sore that is slow to settle"],
    possibilities: "Different causes need different care. A photograph or timeline can help a veterinarian compare progression.",
    action: "Avoid guessing from appearance alone. Ask a veterinarian to identify the cause before comparing options.",
    profiles: ["Matrix Pair", "GHK-Cu"],
    tone: "standard",
  },
  {
    id: "behavior",
    label: "Behavior or appetite",
    icon: "ri-heart-pulse-line",
    title: "They are not acting like themselves.",
    intro: "Pain and illness can appear as withdrawal, restlessness, irritability, vocalization, or changes in eating and drinking.",
    signs: ["Eating or drinking less", "Pacing or unable to settle", "Withdrawn, fearful, or unusually irritable", "Whining when touched or lifted"],
    possibilities: "These changes are nonspecific and can involve many body systems. They are not a reliable way to choose a product.",
    action: "Contact your veterinarian—especially if appetite or thirst changes last more than a day or other signs appear.",
    profiles: [],
    tone: "standard",
  },
  {
    id: "urgent",
    label: "Emergency signs",
    icon: "ri-alarm-warning-line",
    title: "Do not keep scrolling. Get help now.",
    intro: "Certain signs can indicate a time-sensitive emergency and should never be routed into product research.",
    signs: ["Difficulty, noisy, or labored breathing", "Blue, grey, purple, or very pale gums", "Collapse, paralysis, or extreme weakness", "Trauma, uncontrolled bleeding, or sudden bloating"],
    possibilities: "These signs can occur with serious heart, lung, neurologic, circulatory, traumatic, or abdominal conditions.",
    action: "Go to the nearest emergency veterinary hospital or contact an emergency veterinarian immediately.",
    profiles: [],
    tone: "urgent",
  },
];

export default function SymptomNavigator() {
  const [activeId, setActiveId] = useState("movement");
  const active = pathways.find((item) => item.id === activeId) ?? pathways[0];
  const urgent = active.tone === "urgent";

  return (
    <section id="symptom-guide" className="bg-[#FBFCFF] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D95858]">A clearer place to begin</p><h2 className="mt-5 max-w-2xl font-display text-[clamp(2.6rem,4.4vw,4.65rem)] font-medium leading-[0.98] tracking-[-0.045em]">Start with the sign. <span className="font-serif italic text-[#D95858]">Not the vial.</span></h2></div>
          <div className="max-w-xl lg:justify-self-end"><p className="text-lg leading-8 text-[#23324D]/66">Choose the change you are seeing. We will help you name what to document, understand why a diagnosis matters, and know whether product research belongs in the conversation at all.</p><p className="mt-4 text-sm font-semibold text-[#D95858]">PetPeps does not diagnose or treat dogs. Its products are research-use-only materials.</p></div>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[1.8rem] border border-[#17233B]/12 bg-white shadow-[0_24px_70px_rgba(23,35,59,0.08)] lg:grid-cols-[0.34fr_0.66fr]">
          <div className="border-b border-[#17233B]/12 bg-[#EEF2FF] p-4 lg:border-b-0 lg:border-r lg:p-5">
            <p className="px-3 pb-4 pt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#17233B]/45">What are you noticing?</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {pathways.map((item, index) => (
                <button key={item.id} type="button" onClick={() => setActiveId(item.id)} aria-pressed={activeId === item.id} className={`group flex min-h-20 items-center gap-3 rounded-xl px-3 py-4 text-left transition md:px-4 ${activeId === item.id ? item.tone === "urgent" ? "bg-[#D95858] text-white" : "bg-[#17233B] text-white" : "bg-white/60 text-[#17233B] hover:bg-white"}`}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg ${activeId === item.id ? "bg-white/15" : "bg-[#DCE7FF] text-[#4F6EF7]"}`}><i className={item.icon} /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[0.12em] opacity-50">0{index + 1}</span><span className="mt-1 block text-sm font-bold md:text-base">{item.label}</span></span>
                </button>
              ))}
            </div>
          </div>

          <div className={`p-6 md:p-10 ${urgent ? "bg-[#FFF2EF]" : "bg-white"}`} aria-live="polite">
            <div className="flex items-start justify-between gap-5"><div><p className={`text-xs font-bold uppercase tracking-[0.15em] ${urgent ? "text-[#D95858]" : "text-[#4F6EF7]"}`}>{urgent ? "Emergency veterinary care" : "The first chapter"}</p><h3 className="mt-3 max-w-3xl font-display text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{active.title}</h3></div><span className={`hidden h-14 w-14 shrink-0 place-items-center rounded-full text-2xl md:grid ${urgent ? "bg-[#D95858] text-white" : "bg-[#DCE7FF] text-[#4F6EF7]"}`}><i className={active.icon} /></span></div>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#17233B]/65">{active.intro}</p>

            <div className="mt-8 grid gap-7 md:grid-cols-2">
              <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#17233B]/45">What it can look like</p><ul className="mt-4 space-y-3">{active.signs.map((sign) => <li key={sign} className="flex gap-3 text-[15px] leading-6 text-[#17233B]/75"><i className={`ri-checkbox-circle-fill mt-0.5 ${urgent ? "text-[#D95858]" : "text-[#4F6EF7]"}`} /><span>{sign}</span></li>)}</ul></div>
              <div className="space-y-5"><div className="rounded-xl bg-[#EEF2FF] p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#17233B]/45">Why diagnosis matters</p><p className="mt-3 text-[15px] leading-6 text-[#17233B]/68">{active.possibilities}</p></div><div className={`rounded-xl p-5 ${urgent ? "bg-[#D95858] text-white" : "bg-[#17233B] text-white"}`}><p className="text-xs font-bold uppercase tracking-[0.14em] opacity-55">What to do next</p><p className="mt-3 text-[15px] font-semibold leading-6">{active.action}</p></div></div>
            </div>

            <div className="mt-8 border-t border-[#17233B]/12 pt-6">
              {active.profiles.length > 0 ? <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#17233B]/45">Research profiles people compare after diagnosis</p><div className="mt-3 flex flex-wrap gap-2">{active.profiles.map((profile) => <span key={profile} className="rounded-full border border-[#17233B]/15 bg-[#F6F7FC] px-4 py-2 text-sm font-bold">{profile}</span>)}</div><p className="mt-3 text-xs text-[#17233B]/45">Literature profiles only—not treatments or product recommendations.</p></div><Link href="#collection" className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#FF8A72] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#17233B]">Explore the research library</Link></div> : <div className="flex items-center gap-4 rounded-xl border border-[#D95858]/25 bg-[#FFF2EF] p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#D95858] text-white"><i className="ri-stethoscope-line" /></span><div><p className="font-display text-lg font-semibold">No product match. Veterinary care comes first.</p><p className="mt-1 text-sm text-[#17233B]/55">PetPeps will not route this set of signs into a peptide profile.</p></div></div>}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-xs leading-5 text-[#17233B]/45 md:flex-row md:items-center md:justify-between"><p>Symptom guidance adapted from veterinary pain and emergency-care resources.</p><div className="flex gap-4"><a href="https://www.aaha.org/resources/whats-wrong-common-pet-pain-signs/" target="_blank" rel="noreferrer" className="font-bold underline underline-offset-4">AAHA pain signs</a><a href="https://www.aaha.org/resources/help-is-this-a-pet-emergency/" target="_blank" rel="noreferrer" className="font-bold underline underline-offset-4">AAHA emergency signs</a></div></div>
      </div>
    </section>
  );
}
