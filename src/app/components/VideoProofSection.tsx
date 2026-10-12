"use client";

import Image from "next/image";
import { useState } from "react";

type DiaryClip = { key: "baseline" | "routine" | "midpoint" | "followup"; label: string; image: string; caption: string; video?: string };

const clips: DiaryClip[] = [
  { key: "baseline", label: "Before · baseline", image: "/images/canis/story-before.png", caption: "Stair hesitation and slower starts documented at baseline." },
  { key: "routine", label: "Routine · week 02", image: "/images/canis/story-before.png", caption: "The same stair approach recorded again as part of the normal weekly routine." },
  { key: "midpoint", label: "Midpoint · week 04", image: "/images/canis/story-followup.png", caption: "A midpoint check-in keeps the record continuous instead of jumping straight to an outcome." },
  { key: "followup", label: "After · week 06", image: "/images/canis/story-followup.png", caption: "The same movement, route, and camera angle at the documented follow-up." },
] as const;

export default function VideoProofSection() {
  const [active, setActive] = useState<(typeof clips)[number]["key"]>("baseline");
  const clip = clips.find((item) => item.key === active) ?? clips[0];

  return (
    <section id="creators" className="bg-[#EAF0FF] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#4F6EF7]">Before And After Video Diaries</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.6rem,3.5vw,3.8rem)] font-extrabold leading-[0.96] tracking-[-0.05em] text-[#17233B]">Before. After. Same movement.</h2>
          </div>
          <div className="max-w-xl lg:justify-self-end"><p className="text-[16px] font-medium leading-8 text-[#17233B]/68">Every creator story starts with a baseline clip and returns to the same movement at follow-up. No highlight reel, no mismatched angles, and no outcome presented without its starting point.</p><div className="mt-5 flex flex-wrap gap-2">{["Owner submitted", "Matched movement", "Individual results vary"].map(tag => <span key={tag} className="rounded-full bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#17233B]/58">{tag}</span>)}</div></div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] bg-[#101829] shadow-[0_28px_80px_rgba(23,35,59,0.18)] lg:grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative min-h-[520px] overflow-hidden md:min-h-[680px]">
            {clip.video ? <video key={clip.video} controls playsInline poster={clip.image} className="absolute inset-0 h-full w-full object-cover"><source src={clip.video} type="video/mp4" /></video> : <Image key={clip.image} src={clip.image} alt={clip.label} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover transition duration-700" />}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/95 via-transparent to-[#081624]/15" />
            <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#081624]/60 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-md">{clip.label}</div>
            {!clip.video && <div className="absolute inset-0 grid place-items-center">
              <div className="text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/45 bg-white/15 text-2xl text-white backdrop-blur-xl"><i className="ri-video-line" /></span><p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/75">Creator footage slot</p></div>
            </div>}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-9"><p className="max-w-xl font-display text-2xl font-extrabold md:text-3xl">{clip.caption}</p><p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-white/55">Zero · documented visual diary</p></div>
          </div>

          <div className="flex flex-col justify-between p-6 text-white md:p-9">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#A9C7FF]">Compare The Check-Ins</p><div className="mt-6 grid gap-3">{clips.map((item, index) => <button key={item.key} type="button" onClick={() => setActive(item.key)} className={`rounded-2xl border px-5 py-4 text-left transition ${active === item.key ? "border-white bg-white text-[#17233B]" : "border-white/15 bg-white/[0.05] text-white hover:bg-white/[0.09]"}`}><span className="text-[10px] font-extrabold uppercase tracking-[0.14em] opacity-55">{String(index + 1).padStart(2, "0")}</span><span className="mt-1 block font-display text-lg font-extrabold">{item.label}</span></button>)}</div></div>
            <div className="mt-9 border-t border-white/12 pt-6"><p className="text-sm font-bold">Real footage replaces the poster.</p><p className="mt-2 text-xs font-medium leading-5 text-white/48">The section is wired for separate baseline and follow-up video files. Until creator footage is supplied, it remains clearly marked instead of presenting a still image as a playable testimonial.</p></div>
          </div>
        </div>
        <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#17233B]/42">Owner observations are not clinical evidence. Individual results vary.</p>
      </div>
    </section>
  );
}
