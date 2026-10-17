"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

type Species = "dog" | "cat" | "horse" | "other";
type Activity = "sedentary" | "moderate" | "active" | "working";

interface PetProfile {
  species: Species;
  breed: string;
  age: number;
  weight: string;
  sex: string;
  name: string;
  concerns: string[];
  activity: Activity;
}

interface Recommendation {
  slug: string;
  name: string;
  rationale: string;
}

const SPECIES = [
  { id: "dog", label: "Dog", icon: "ri-footprint-line" },
  { id: "cat", label: "Cat", icon: "ri-footprint-fill" },
  { id: "horse", label: "Horse", icon: "ri-run-line" },
  { id: "other", label: "Other", icon: "ri-heart-line" },
] as const;

const CONCERNS = [
  { id: "joint", label: "Joint health and mobility", icon: "ri-walk-line" },
  { id: "recovery", label: "Injury or surgery recovery", icon: "ri-heart-pulse-line" },
  { id: "energy", label: "Energy and vitality", icon: "ri-flashlight-line" },
  { id: "immune", label: "Immune system support", icon: "ri-shield-line" },
  { id: "aging", label: "Cellular aging and longevity", icon: "ri-time-line" },
  { id: "coat", label: "Coat and skin health", icon: "ri-leaf-line" },
  { id: "metabolic", label: "Metabolic support", icon: "ri-scales-3-line" },
  { id: "cognitive", label: "Cognitive function", icon: "ri-brain-line" },
];

const ACTIVITIES: Array<{ id: Activity; label: string; description: string }> = [
  { id: "sedentary", label: "Sedentary", description: "Mostly resting, minimal exercise" },
  { id: "moderate", label: "Moderate", description: "Daily walks, light play" },
  { id: "active", label: "Active", description: "Regular vigorous exercise" },
  { id: "working", label: "Working / Sport", description: "Agility, hunting, working K9" },
];

function calculateZooScore(profile: Partial<PetProfile>): number {
  let score = 90;
  const age = profile.age ?? 0;
  if (age >= 8) score -= Math.min(28, (age - 7) * 7);
  else if (age >= 6) score -= (age - 5) * 3;
  score -= (profile.concerns?.length ?? 0) * 6;
  if (profile.activity === "working") score += 5;
  else if (profile.activity === "active") score += 2;
  else if (profile.activity === "sedentary") score -= 7;
  return Math.max(18, Math.min(98, Math.round(score)));
}

function scoreLabel(score: number) {
  if (score >= 78) return { label: "Optimized", color: "#4ade80", ring: "#4ade8040", description: "Strong baseline. Targeted support may further the research profile." };
  if (score >= 62) return { label: "Maintained", color: "#facc15", ring: "#facc1540", description: "Solid foundation with specific areas to address in the research protocol." };
  if (score >= 46) return { label: "Developing", color: "#fb923c", ring: "#fb923c40", description: "Multiple factors suggest a comprehensive multi-compound research approach." };
  return { label: "Reactive", color: "#f87171", ring: "#f8717140", description: "Profile indicates a priority research window. Comprehensive compound support warranted." };
}

function ScoreDial({ score }: { score: number }) {
  const { label, color } = scoreLabel(score);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#ffffff10" strokeWidth="8" />
          <circle
            cx="60" cy="60" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-bold leading-none text-white">{score}</span>
          <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color }}>{label}</span>
        </div>
      </div>
    </div>
  );
}

type Step = "intro" | "species" | "profile" | "concerns" | "activity" | "loading" | "results";

export default function ZooProtocolPage() {
  const [step, setStep] = useState<Step>("intro");
  const [profile, setProfile] = useState<Partial<PetProfile>>({});
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [aiPowered, setAiPowered] = useState(false);
  const [zooScore, setZooScore] = useState(0);
  const [error, setError] = useState("");

  function next(update?: Partial<PetProfile>) {
    const updated = { ...profile, ...update };
    setProfile(updated);
    const order: Step[] = ["intro", "species", "profile", "concerns", "activity", "loading", "results"];
    const current = order.indexOf(step);
    setStep(order[current + 1] as Step);
    if (order[current + 1] === "loading") {
      runAnalysis(updated as PetProfile);
    }
  }

  async function runAnalysis(p: PetProfile) {
    setError("");
    const score = calculateZooScore(p);
    setZooScore(score);
    try {
      const res = await fetch("/api/zoo-protocol/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setRecommendations(data.recommendations);
      setAiPowered(data.aiPowered);
      setStep("results");
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("activity");
    }
  }

  const stepIndex = { species: 1, profile: 2, concerns: 3, activity: 4 }[step as string] ?? 0;

  return (
    <div className="min-h-screen bg-[#101829]">
      {step === "intro" && <IntroStep onStart={() => next()} />}

      {(step === "species" || step === "profile" || step === "concerns" || step === "activity") && (
        <div className="min-h-screen px-4 py-20 md:py-28">
          <div className="mx-auto max-w-lg">
            <ProgressBar current={stepIndex} total={4} />
            {step === "species" && <SpeciesStep onNext={(s) => next({ species: s })} />}
            {step === "profile" && <ProfileStep species={profile.species} onNext={(p) => next(p)} />}
            {step === "concerns" && <ConcernsStep onNext={(c) => next({ concerns: c })} />}
            {step === "activity" && (
              <ActivityStep onNext={(a) => next({ activity: a })} error={error} />
            )}
          </div>
        </div>
      )}

      {step === "loading" && <LoadingStep />}

      {step === "results" && (
        <ResultsStep
          profile={profile as PetProfile}
          score={zooScore}
          recommendations={recommendations}
          aiPowered={aiPowered}
          onReset={() => { setStep("intro"); setProfile({}); setRecommendations([]); }}
        />
      )}
    </div>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#17233B] to-[#101829]" />
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F6EF7]/8 blur-3xl" />
      <div className="relative">
        <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#4F6EF7]">ZooNetics Research System</p>
        <h1 className="font-display text-5xl font-bold tracking-[-0.04em] text-white md:text-7xl">
          Zoo<span className="text-[#4F6EF7]">Protocol</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/55 md:text-lg">
          Input your animal subject&rsquo;s profile. ZooProtocol analyzes age, health focus areas, and activity level to generate a ZooScore and match the most relevant research compounds from our catalog.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white/35">
          <span>Takes about 2 minutes</span>
          <span>&#183;</span>
          <span>For research use only</span>
          <span>&#183;</span>
          <span>No account required</span>
        </div>
        <button
          onClick={onStart}
          className="mt-10 rounded-xl bg-[#4F6EF7] px-10 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_40px_rgba(79,110,247,0.35)] transition hover:bg-[#6B8EF9]"
        >
          Begin Assessment
        </button>
      </div>
    </section>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ background: i < current ? "#4F6EF7" : i === current - 1 ? "#4F6EF7" : "#ffffff15" }}
          />
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold text-white/35">Step {current} of {total}</p>
    </div>
  );
}

function SpeciesStep({ onNext }: { onNext: (s: Species) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-white">What species is your research subject?</h2>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {SPECIES.map((s) => (
          <button
            key={s.id}
            onClick={() => onNext(s.id)}
            className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-7 text-white transition hover:border-[#4F6EF7]/60 hover:bg-[#4F6EF7]/10"
          >
            <i className={`${s.icon} text-2xl text-[#A9C7FF]`} />
            <span className="text-sm font-bold">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfileStep({ species, onNext }: { species?: Species; onNext: (p: Partial<PetProfile>) => void }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!age) return;
    onNext({ name, breed, age: parseFloat(age), weight, sex });
  }

  return (
    <form onSubmit={submit}>
      <h2 className="font-display text-3xl font-bold text-white">Tell us about your subject.</h2>
      <p className="mt-2 text-sm text-white/45">All fields except age are optional.</p>
      <div className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">Name (optional)</span>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Max"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#4F6EF7]/60"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
            {species === "dog" ? "Breed" : species === "cat" ? "Breed" : species === "horse" ? "Breed" : "Species / type"} (optional)
          </span>
          <input
            type="text" value={breed} onChange={(e) => setBreed(e.target.value)}
            placeholder={species === "dog" ? "e.g. German Shepherd" : "e.g. Domestic Shorthair"}
            className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#4F6EF7]/60"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">Age (years) *</span>
            <input
              required type="number" min="0" max="30" step="0.5" value={age} onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 8"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#4F6EF7]/60"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">Weight (optional)</span>
            <input
              type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 65 lbs"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#4F6EF7]/60"
            />
          </label>
        </div>
        <div>
          <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/40">Sex (optional)</span>
          <div className="flex gap-2">
            {["Male", "Female", "Neutered", "Spayed"].map((opt) => (
              <button
                key={opt} type="button" onClick={() => setSex(sex === opt ? "" : opt)}
                className={`flex-1 rounded-lg border py-2.5 text-xs font-bold transition ${
                  sex === opt ? "border-[#4F6EF7] bg-[#4F6EF7]/20 text-[#A9C7FF]" : "border-white/10 text-white/50 hover:border-white/25"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button type="submit" className="mt-8 w-full rounded-xl bg-[#4F6EF7] py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#6B8EF9]">
        Continue
      </button>
    </form>
  );
}

function ConcernsStep({ onNext }: { onNext: (c: string[]) => void }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
  }

  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-white">What research areas are most relevant?</h2>
      <p className="mt-2 text-sm text-white/45">Select all that apply.</p>
      <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CONCERNS.map((c) => {
          const on = selected.includes(c.id);
          return (
            <button
              key={c.id} type="button" onClick={() => toggle(c.id)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                on ? "border-[#4F6EF7] bg-[#4F6EF7]/15 text-white" : "border-white/10 bg-white/4 text-white/65 hover:border-white/25 hover:text-white"
              }`}
            >
              <i className={`${c.icon} shrink-0 text-base ${on ? "text-[#4F6EF7]" : "text-white/35"}`} />
              <span className="font-semibold leading-snug">{c.label}</span>
              {on && <i className="ri-check-line ml-auto shrink-0 text-[#4F6EF7]" />}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => selected.length > 0 && onNext(selected)}
        disabled={selected.length === 0}
        className="mt-8 w-full rounded-xl bg-[#4F6EF7] py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#6B8EF9] disabled:opacity-35"
      >
        Continue ({selected.length} selected)
      </button>
    </div>
  );
}

function ActivityStep({ onNext, error }: { onNext: (a: Activity) => void; error: string }) {
  return (
    <div>
      <h2 className="font-display text-3xl font-bold text-white">Activity level?</h2>
      <p className="mt-2 text-sm text-white/45">Best description of daily activity.</p>
      <div className="mt-7 space-y-2">
        {ACTIVITIES.map((a) => (
          <button
            key={a.id} type="button" onClick={() => onNext(a.id)}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:border-[#4F6EF7]/60 hover:bg-[#4F6EF7]/10"
          >
            <div>
              <p className="text-sm font-bold text-white">{a.label}</p>
              <p className="mt-0.5 text-xs text-white/40">{a.description}</p>
            </div>
            <i className="ri-arrow-right-line text-white/25" />
          </button>
        ))}
      </div>
      {error && <p className="mt-4 rounded-lg bg-red-900/40 px-4 py-3 text-xs font-semibold text-red-300">{error}</p>}
    </div>
  );
}

function LoadingStep() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-full w-full animate-spin" aria-hidden="true">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#4F6EF7" strokeWidth="4" strokeDasharray="100 64" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#4F6EF7]">Analyzing profile</p>
        <p className="mt-2 text-sm text-white/45">Matching research compounds to your subject&rsquo;s profile...</p>
      </div>
    </div>
  );
}

function ResultsStep({
  profile,
  score,
  recommendations,
  aiPowered,
  onReset,
}: {
  profile: PetProfile;
  score: number;
  recommendations: Recommendation[];
  aiPowered: boolean;
  onReset: () => void;
}) {
  const { label, color, description } = scoreLabel(score);

  return (
    <div className="min-h-screen px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#4F6EF7]">
          ZooProtocol Results {profile.name ? `— ${profile.name}` : ""}
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#17233B] p-8 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/40">ZooScore</p>
          <ScoreDial score={score} />
          <p className="mt-4 text-sm leading-6 text-white/50">{description}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-white/35">
            {profile.breed && <span className="rounded-full border border-white/10 px-3 py-1">{profile.breed}</span>}
            {profile.age && <span className="rounded-full border border-white/10 px-3 py-1">{profile.age}yr</span>}
            {profile.activity && <span className="rounded-full border border-white/10 px-3 py-1 capitalize">{profile.activity}</span>}
            {profile.concerns.map((c) => (
              <span key={c} className="rounded-full border border-white/10 px-3 py-1 capitalize">{c}</span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-bold uppercase tracking-widest text-white/70">Recommended Protocol</h2>
            {aiPowered && (
              <span className="flex items-center gap-1.5 rounded-full border border-[#4F6EF7]/30 bg-[#4F6EF7]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#A9C7FF]">
                <i className="ri-sparkling-2-line" />
                AI Matched
              </span>
            )}
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, i) => {
              const product = products.find((p) => p.slug === rec.slug);
              return (
                <div key={rec.slug} className="rounded-2xl border border-white/10 bg-[#17233B] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4F6EF7]/15 text-xs font-bold text-[#4F6EF7]">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-bold text-white">{product?.name ?? rec.name}</p>
                        {product?.price && (
                          <p className="shrink-0 text-sm font-bold text-[#A9C7FF]">${product.price}</p>
                        )}
                      </div>
                      <p className="mt-2 text-xs leading-5 text-white/50">{rec.rationale}</p>
                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/shop/${rec.slug}`}
                          className="rounded-lg bg-[#4F6EF7] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#6B8EF9]"
                        >
                          View Compound
                        </Link>
                        {product?.purity && (
                          <span className="flex items-center rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/40">
                            {product.purity} purity
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/6 bg-white/3 px-5 py-4">
          <p className="text-[11px] leading-5 text-white/30">
            <strong className="text-white/45">Research Use Only.</strong> ZooProtocol recommendations are generated for research purposes only and do not constitute veterinary advice, diagnosis, or treatment. Consult a licensed veterinarian before using any compound with an animal.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/shop" className="rounded-xl border border-white/15 px-8 py-3.5 text-sm font-bold text-white/70 transition hover:border-white/30 hover:text-white">
            Browse Full Catalog
          </Link>
          <button onClick={onReset} className="rounded-xl border border-white/10 px-8 py-3.5 text-sm font-bold text-white/40 transition hover:border-white/20 hover:text-white/60">
            New Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
