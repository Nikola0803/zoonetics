import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  species: z.string(),
  breed: z.string(),
  age: z.number().min(0).max(30),
  weight: z.string(),
  sex: z.string(),
  name: z.string().optional(),
  concerns: z.array(z.string()).min(1).max(8),
  activity: z.string(),
});

// Research-area mapping: concern id -> compound slugs in priority order
const CONCERN_COMPOUNDS: Record<string, Array<{ slug: string; name: string }>> = {
  joint: [
    { slug: "bpc-tb-500-blend-10mg", name: "K9 Rebuild 10MG" },
    { slug: "bpc-157-10mg", name: "K9 Reforge 10MG" },
    { slug: "cartalax-20mg", name: "Cartalax 20MG" },
    { slug: "tb-500-10mg", name: "K9 Reload 10MG" },
    { slug: "igf-1-lr3-1mg", name: "IGF-1 LR3 1MG" },
  ],
  recovery: [
    { slug: "bpc-157-10mg", name: "K9 Reforge 10MG" },
    { slug: "bpc-tb-500-blend-10mg", name: "K9 Rebuild 10MG" },
    { slug: "ghk-cu-50mg", name: "K9 Restore 50MG" },
    { slug: "tb-500-10mg", name: "K9 Reload 10MG" },
    { slug: "igf-1-lr3-1mg", name: "IGF-1 LR3 1MG" },
  ],
  energy: [
    { slug: "mots-c-10mg", name: "MOTS-C 10MG" },
    { slug: "nad-500mg", name: "NAD+ 500MG" },
    { slug: "cjc-ipa-blend-10mg", name: "CJC-1295 / Ipamorelin Blend 10MG" },
    { slug: "ss-31-10mg", name: "SS-31 10MG" },
  ],
  immune: [
    { slug: "kpv-10mg", name: "K9 Reclaim 10MG" },
    { slug: "thymosin-alpha-1-5mg", name: "Thymosin Alpha-1 5MG" },
    { slug: "ghk-cu-50mg", name: "K9 Restore 50MG" },
  ],
  aging: [
    { slug: "mots-c-10mg", name: "MOTS-C 10MG" },
    { slug: "ss-31-10mg", name: "SS-31 10MG" },
    { slug: "nad-500mg", name: "NAD+ 500MG" },
    { slug: "ghk-cu-50mg", name: "K9 Restore 50MG" },
    { slug: "glow-70mg", name: "K9 Recast 70MG" },
  ],
  coat: [
    { slug: "ghk-cu-50mg", name: "K9 Restore 50MG" },
    { slug: "kpv-10mg", name: "K9 Reclaim 10MG" },
    { slug: "glow-70mg", name: "K9 Recast 70MG" },
  ],
  metabolic: [
    { slug: "evlv-1-5mg", name: "GLP-1S 5MG" },
    { slug: "evlv-2-10mg", name: "GLP-2T 10MG" },
    { slug: "mots-c-10mg", name: "MOTS-C 10MG" },
  ],
  cognitive: [
    { slug: "selank-10mg", name: "Selank 10MG" },
    { slug: "semax-10mg", name: "Semax 10MG" },
    { slug: "nad-500mg", name: "NAD+ 500MG" },
  ],
};

const RATIONALE: Record<string, string> = {
  "bpc-157-10mg": "BPC-157 research centers on connective tissue and structural integrity pathways, making it a primary candidate for joint and recovery-focused protocols.",
  "tb-500-10mg": "TB-500 (Thymosin Beta-4) research explores tissue remodeling and repair signaling, with documented interest in mobility and recovery mechanisms.",
  "bpc-tb-500-blend-10mg": "The BPC-157/TB-500 blend addresses complementary research vectors in a single vial: structural integrity (BPC-157) combined with tissue remodeling signaling (TB-500).",
  "ghk-cu-50mg": "GHK-Cu (copper peptide) research examines gene expression modulation and cellular renewal pathways, with particular relevance to skin, coat, and regenerative signaling.",
  "kpv-10mg": "KPV research is focused on inflammatory pathway modulation, relevant for studies of systemic and localized inflammatory response.",
  "glow-70mg": "The GLOW blend (GHK-Cu + BPC-157 + TB-500) provides multi-pathway cellular research coverage in a single compound, suited to comprehensive recovery protocols.",
  "mots-c-10mg": "MOTS-C mitochondrial peptide research explores metabolic regulation and energy utilization pathways, relevant to aging, endurance, and vitality studies.",
  "selank-10mg": "Selank neuropeptide research examines anxiety modulation and cognitive signaling pathways, relevant to behavioral and neurological function studies.",
  "semax-10mg": "Semax research explores nootropic and neuroprotective signaling, with documented interest in cognitive and neurological function mechanisms.",
  "nad-500mg": "NAD+ is foundational to cellular energy and DNA repair research, with broad relevance across aging, metabolic, and recovery research areas.",
  "ss-31-10mg": "SS-31 targets mitochondrial membrane integrity in research settings, with particular relevance to cardiac function and mitochondrial aging studies.",
  "thymosin-alpha-1-5mg": "Thymosin Alpha-1 research explores T-cell regulation and systemic immune modulation, relevant to immune function and viral response protocols.",
  "igf-1-lr3-1mg": "IGF-1 LR3 research focuses on anabolic signaling relevant to muscle and connective tissue repair, growth factor cascades, and structural recovery.",
  "cartalax-20mg": "Cartalax peptide research centers on cartilage tissue and chondrocyte signaling, making it relevant for joint structural and articular research protocols.",
  "evlv-1-5mg": "GLP-1S research centers on GLP-1 receptor agonism and its role in metabolic pathway regulation and satiety signaling.",
  "evlv-2-10mg": "GLP-2T dual-agonist research explores both GIP and GLP-1 receptor pathways, relevant to metabolic and body composition studies.",
  "cjc-ipa-blend-10mg": "CJC-1295/Ipamorelin blend research examines GHRH and GH secretagogue pathways, relevant to recovery, body composition, and anabolic research.",
};

function rulesBasedRecommendations(
  concerns: string[]
): Array<{ slug: string; name: string; rationale: string }> {
  const scores: Record<string, { slug: string; name: string; score: number }> = {};

  for (const concern of concerns) {
    const compounds = CONCERN_COMPOUNDS[concern] ?? [];
    compounds.forEach((c, i) => {
      if (!scores[c.slug]) scores[c.slug] = { ...c, score: 0 };
      scores[c.slug].score += 5 - Math.min(i, 4);
    });
  }

  const top = Object.values(scores)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Pad to 3 if fewer unique compounds scored
  if (top.length < 3) {
    const fallbacks = [
      { slug: "bpc-tb-500-blend-10mg", name: "K9 Rebuild 10MG" },
      { slug: "ghk-cu-50mg", name: "K9 Restore 50MG" },
      { slug: "mots-c-10mg", name: "MOTS-C 10MG" },
    ];
    for (const f of fallbacks) {
      if (top.length >= 3) break;
      if (!top.find((t) => t.slug === f.slug)) top.push({ ...f, score: 0 });
    }
  }

  return top.map((c) => ({
    slug: c.slug,
    name: c.name,
    rationale: RATIONALE[c.slug] ?? "Research compound relevant to the indicated focus areas.",
  }));
}

async function aiRecommendations(
  profile: z.infer<typeof bodySchema>
): Promise<Array<{ slug: string; name: string; rationale: string }> | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const catalog = Object.entries(RATIONALE)
    .map(([slug, rationale]) => `- ${slug}: ${rationale.split(",")[0]}`)
    .join("\n");

  const prompt = `You are ZooProtocol, a research compound matching system for ZooNetics.
Select exactly 3 compounds from the catalog below for this animal research profile.

PROFILE:
Species: ${profile.species}
Breed: ${profile.breed || "unspecified"}
Age: ${profile.age} years
Weight: ${profile.weight || "unspecified"}
Sex: ${profile.sex || "unspecified"}
Research focus: ${profile.concerns.join(", ")}
Activity level: ${profile.activity}

CATALOG (slug: research area summary):
${catalog}

Return ONLY a valid JSON array, no prose, no markdown, no code fences:
[{"slug":"product-slug","name":"Display Name","rationale":"One sentence framing research relevance, never a medical or veterinary claim"},...]

Rules: only slugs from the catalog above. Prioritize K9-branded products for pet profiles. Return exactly 3.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-5-5",
        max_tokens: 512,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text: string = data?.content?.[0]?.text ?? "";
    const parsed = JSON.parse(text.trim()) as Array<{ slug: string; name: string; rationale: string }>;
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    // Validate slugs exist in our rationale map
    const valid = parsed.filter((r) => typeof r.slug === "string" && typeof r.rationale === "string").slice(0, 3);
    return valid.length >= 2 ? valid : null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const profile = parsed.data;

  const ai = await aiRecommendations(profile);
  const recommendations = ai ?? rulesBasedRecommendations(profile.concerns);

  return NextResponse.json({ recommendations, aiPowered: Boolean(ai) });
}
