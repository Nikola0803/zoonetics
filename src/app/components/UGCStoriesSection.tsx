import Image from "next/image";

const stories = [
  {
    image: "/images/zoonetics-carousel/mobility-v1.png",
    dog: "Senior Lab Diary",
    focus: "Movement + Mobility",
    moment: "The usual morning walk",
    position: "object-center",
  },
  {
    image: "/images/zoonetics-carousel/recovery-v1.png",
    dog: "Working Dog Diary",
    focus: "Activity + Recovery",
    moment: "The day after a hard run",
    position: "object-center",
  },
  {
    image: "/images/canis/story-before.png",
    dog: "At-Home Check-In",
    focus: "Stairs + Rising",
    moment: "The same steps each week",
    position: "object-[52%_center]",
  },
  {
    image: "/images/zoonetics-carousel/skin-gut-v1.png",
    dog: "Owner Observation Diary",
    focus: "Skin + Coat",
    moment: "A repeatable coat check",
    position: "object-center",
  },
] as const;

export default function UGCStoriesSection() {
  return (
    <section id="creators" className="overflow-hidden bg-[#EAF0FF] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#4F6EF7]">Owner Video Diaries</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,3.15vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#17233B]">Real Dog People. Real Camera-Roll Moments.</h2>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-[15px] font-medium leading-7 text-[#17233B]/65">Short owner-recorded check-ins, captured in the places their dogs move every day. Each diary keeps the baseline and follow-up together.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Owner recorded", "Baseline + follow-up", "Individual results vary"].map((tag) => (
                <span key={tag} className="rounded-full bg-white px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#17233B]/55">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((story, index) => (
            <article key={story.dog} className="group overflow-hidden rounded-[22px] bg-[#101829] shadow-[0_18px_50px_rgba(23,35,59,0.10)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={story.image} alt={`${story.dog}: ${story.moment}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className={`object-cover transition duration-700 group-hover:scale-[1.03] ${story.position}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081624]/95 via-transparent to-[#081624]/20" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#081624]/60 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.13em] text-white backdrop-blur-md">Diary {String(index + 1).padStart(2, "0")}</div>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-white/35 bg-white/15 text-xl text-white backdrop-blur-md"><i className="ri-play-fill" /></span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#A9C7FF]">{story.focus}</p>
                  <h3 className="mt-2 font-display text-xl font-extrabold leading-tight">{story.moment}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-white">
                <p className="text-[11px] font-bold">{story.dog}</p>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/42">Before + After</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-[#17233B]/38">Owner observations are not clinical evidence · individual results vary</p>
      </div>
    </section>
  );
}
