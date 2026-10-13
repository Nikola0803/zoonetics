export interface JournalArticle {
  slug: string;
  label: string;
  title: string;
  excerpt: string;
  image: string;
  publishedDate: string;
  readTime: string;
  body: string[];
  cta?: { label: string; href: string };
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "bpc-157-canine-research",
    label: "BPC-157",
    title: "BPC-157 and Canine Research: What Is Actually Being Studied?",
    excerpt: "A plain-language look at the tissue-repair, vascular and inflammatory signaling pathways behind BPC-157 research, and what the evidence does not yet prove.",
    image: "/images/research-library/bpc-157-animal-research-v1.png",
    publishedDate: "2026-10-13",
    readTime: "7 min read",
    body: [
      "BPC-157 is a synthetic 15-amino-acid peptide studied primarily in preclinical models. Researchers have investigated its relationship with growth-factor signaling, blood-vessel formation, inflammatory response and the cellular processes involved in tissue repair.",
      "That research interest is why BPC-157 often appears in conversations about soft tissue, tendon and gastrointestinal models. It does not mean that a specific outcome has been established in dogs. Most published work is preclinical, study designs vary, and controlled canine evidence remains limited.",
      "For canine research, the useful question is not whether BPC-157 fixes an injury. The useful question is which pathway a protocol is designed to observe, which baseline is recorded, and whether the same movement or recovery markers are documented consistently over time.",
      "Product quality is separate from biological evidence. A lot-specific certificate of analysis should confirm identity and purity for the exact vial being studied. A product name or a generic supplier claim cannot replace batch-level verification.",
      "ZOONETICS supplies K9 Reforge as a BPC-157 research profile and K9 Rebuild as a paired BPC-157 plus TB-500 profile. Both are research-use-only materials, not approved veterinary medicines, and no therapeutic outcome is promised.",
    ],
    cta: { label: "Explore K9 Reforge", href: "/shop/bpc-157-10mg" },
  },
  {
    slug: "tb-500-canine-movement-recovery-research",
    label: "TB-500",
    title: "TB-500 Research: Movement, Cell Migration and Recovery Models",
    excerpt: "Why thymosin beta-4 related research focuses on cell migration, vascular signaling and recovery after physical stress.",
    image: "/images/zoonetics-carousel/reload-v1.png",
    publishedDate: "2026-10-12",
    readTime: "6 min read",
    body: [
      "TB-500 is a synthetic research peptide related to thymosin beta-4, a naturally occurring protein involved in cell movement, actin regulation and tissue response. These mechanisms make it a subject of interest in laboratory models of recovery after physical stress.",
      "In canine-focused research, movement is often the clearest observation layer. Researchers may document how a dog rises, approaches stairs, completes a familiar route or recovers after ordinary activity. Those observations do not establish efficacy, but a consistent record makes change easier to evaluate.",
      "TB-500 and BPC-157 are not interchangeable. Their research histories overlap around repair-related pathways, but they are distinct compounds with different proposed mechanisms. A study should select a profile because it matches the research question, not because two products share similar marketing language.",
      "K9 Reload is the ZOONETICS single-peptide TB-500 profile. Every available lot should be evaluated through its own identity and purity documentation before it is included in a research protocol.",
    ],
    cta: { label: "Explore K9 Reload", href: "/shop/tb-500-10mg" },
  },
  {
    slug: "bpc-157-tb-500-blend-research",
    label: "K9 Rebuild",
    title: "Why Researchers Pair BPC-157 and TB-500",
    excerpt: "The rationale behind a paired research profile, where the pathways overlap, and why a blend should not be treated as proof of a better result.",
    image: "/images/zoonetics-carousel/recovery-v1.png",
    publishedDate: "2026-10-11",
    readTime: "7 min read",
    body: [
      "K9 Rebuild combines BPC-157 and TB-500 in one research profile. The pairing is designed for protocols examining multiple repair-related pathways, including tissue signaling, cell migration, vascular response and the response to physical stress.",
      "A blend is not automatically more effective than a single compound. It introduces more variables, which makes a clear baseline and a consistent observation schedule even more important. The research question should justify the combination.",
      "For mobility-focused observation, useful records may include the same short walk, the same stair sequence and the same rise-from-rest movement captured from a similar camera position. The purpose is comparison, not a dramatic before-and-after claim.",
      "Evidence for these compounds remains predominantly preclinical. K9 Rebuild is not an approved veterinary medicine, is not a substitute for veterinary care, and is supplied strictly as a research-use-only material.",
    ],
    cta: { label: "Explore K9 Rebuild", href: "/shop/bpc-tb-500-blend-10mg" },
  },
  {
    slug: "kpv-canine-gut-inflammatory-pathways",
    label: "KPV",
    title: "KPV Research: Gut, Barrier and Inflammatory Pathways",
    excerpt: "What KPV is, why it appears in barrier-function research, and the limits of translating laboratory findings into canine outcomes.",
    image: "/images/zoonetics-carousel/skin-gut-v1.png",
    publishedDate: "2026-10-10",
    readTime: "6 min read",
    body: [
      "KPV is a short tripeptide fragment associated with alpha-melanocyte-stimulating hormone research. Laboratory studies have examined its relationship with inflammatory signaling and epithelial barrier function, particularly in gastrointestinal and skin models.",
      "Those pathways explain why KPV is discussed in gut and barrier research. They do not establish that KPV treats digestive disease, allergy or inflammation in dogs. Translational evidence is limited and a veterinary diagnosis should never be replaced by a research hypothesis.",
      "A well-framed protocol identifies one question at a time. Stool consistency, appetite, visible skin condition or another defined observation should be recorded consistently rather than bundled into a vague claim that a dog feels better.",
      "ZOONETICS offers K9 Reclaim as a KPV research profile in clearly separated formats. The selected format, lot code and handling record should stay attached to the observation log from the start.",
    ],
    cta: { label: "Explore K9 Reclaim", href: "/shop/kpv-10mg" },
  },
  {
    slug: "ghk-cu-canine-skin-collagen-research",
    label: "GHK-Cu",
    title: "GHK-Cu Research: Skin, Collagen and Tissue Remodeling",
    excerpt: "A practical overview of copper-peptide research involving collagen signaling, skin models and tissue remodeling.",
    image: "/images/zoonetics-carousel/restore-v1.png",
    publishedDate: "2026-10-09",
    readTime: "6 min read",
    body: [
      "GHK-Cu is a naturally occurring copper-binding tripeptide studied for its relationship with extracellular matrix signaling, collagen production and tissue remodeling. Its distinctive copper complex also gives the compound its characteristic blue color.",
      "In canine-oriented research, these mechanisms create interest around skin, coat and tissue models. Appearance can be documented, but coat shine or a single photograph is not enough to establish a biological effect. Lighting, grooming, season and diet can all change what the camera records.",
      "A stronger observation record uses consistent lighting, camera distance and timing, with notes about other variables that changed during the same period. That approach cannot turn preclinical evidence into a clinical claim, but it can make the record more interpretable.",
      "K9 Restore is the ZOONETICS GHK-Cu profile. K9 Recast combines GHK-Cu with BPC-157 and TB-500 for broader multi-pathway research. Neither is an approved veterinary treatment.",
    ],
    cta: { label: "Explore K9 Restore", href: "/shop/ghk-cu-50mg" },
  },
  {
    slug: "k9-recast-multi-pathway-research",
    label: "K9 Recast",
    title: "Inside a Three-Peptide Research Profile",
    excerpt: "How GHK-Cu, BPC-157 and TB-500 create a multi-pathway research profile, and why broader does not always mean better.",
    image: "/images/zoonetics-carousel/recast-v1.png",
    publishedDate: "2026-10-08",
    readTime: "7 min read",
    body: [
      "K9 Recast brings GHK-Cu, BPC-157 and TB-500 into one profile. The scientific rationale is pathway breadth: extracellular matrix signaling, tissue-response research, cell migration and recovery-related models can be considered within one protocol.",
      "That breadth also makes attribution harder. If an observation changes, a three-compound profile cannot reveal which component, interaction or outside variable is associated with the change. Researchers should choose it only when the broader question is intentional.",
      "The most useful protocols define the observation window before starting, record a baseline and keep other variables as stable as practical. More ingredients should lead to tighter documentation, not looser conclusions.",
      "Every component must be verified at the lot level. Purity ranges should identify the individual compounds rather than compressing three analytical results into one vague quality claim.",
    ],
    cta: { label: "Explore K9 Recast", href: "/shop/glow-70mg" },
  },
  {
    slug: "reading-canine-peptide-evidence",
    label: "Evidence",
    title: "Animal Study, Canine Study or Marketing Claim?",
    excerpt: "How to separate rodent data, canine evidence, owner observation and product marketing before drawing a conclusion.",
    image: "/images/research-library/hip-dysplasia-mobility-v1.png",
    publishedDate: "2026-10-07",
    readTime: "8 min read",
    body: [
      "Not all animal evidence is canine evidence. A result observed in cells or rodents can identify a promising mechanism, but it cannot be assumed to produce the same outcome in a dog. Species, model, study design and measured endpoint all matter.",
      "Owner observations are valuable for noticing patterns because owners see the dog every day. They are not controlled clinical evidence. Expectations, natural variation, concurrent care and changes in routine can all influence what is noticed.",
      "The cleanest reading process starts by asking four questions: what species was studied, what was actually measured, was there a comparison group, and has the result been replicated? If a product page cannot answer those questions, its claim should be treated cautiously.",
      "ZOONETICS uses pathway language because it describes the subject of research without promising a medical result. Research use only is a real limitation, not a phrase intended to sit quietly below a sales claim.",
    ],
  },
  {
    slug: "documenting-canine-mobility-baseline",
    label: "Observation",
    title: "How to Build a Useful Canine Mobility Baseline",
    excerpt: "A repeatable way to record standing, stairs, walking and recovery without turning ordinary footage into a medical claim.",
    image: "/images/research-library/ccl-recovery-documentation-v1.png",
    publishedDate: "2026-10-06",
    readTime: "5 min read",
    body: [
      "A useful baseline captures ordinary movement before a research period begins. Choose a few repeatable moments: rising after rest, walking a short familiar route, turning, approaching stairs and settling after activity.",
      "Record from the same angle and distance when possible. Keep the surface, route and approximate time of day consistent. Note unusual activity, grooming, medication changes or veterinary care that could affect what the footage shows.",
      "Avoid grading a dog from memory. A short weekly clip and a few direct questions produce a more reliable record than a long narrative written after several weeks have passed.",
      "Any sudden pain, inability to bear weight, collapse, breathing difficulty or major behavioral change belongs with a veterinarian, not in a wait-and-see research log.",
    ],
  },
  {
    slug: "reading-a-peptide-coa-for-canine-research",
    label: "Testing",
    title: "How to Read a Peptide Certificate of Analysis",
    excerpt: "Identity, purity, lot matching and the questions a real COA should answer before a vial reaches a research protocol.",
    image: "/images/science/coa-vial-banner.png",
    publishedDate: "2026-10-05",
    readTime: "6 min read",
    body: [
      "A certificate of analysis should refer to the exact lot printed on the vial. A generic report for the product name cannot confirm the material in a specific shipment.",
      "HPLC is commonly used to estimate purity by separating components and measuring their relative peak areas. Mass spectrometry addresses a different question by checking whether the measured molecular mass matches the expected compound. A purity number alone does not confirm identity.",
      "The report should identify the laboratory, test date, sample or lot identifier and analytical result clearly. Researchers should be able to connect the vial, lot code and published document without asking support to interpret a hidden internal system.",
      "Testing supports material verification. It does not prove safety, efficacy, sterility or suitability for a veterinary use unless those specific questions were independently tested under an appropriate standard.",
    ],
    cta: { label: "View Lab Results", href: "/coas" },
  },
  {
    slug: "sterile-saline-research-handling-guide",
    label: "Handling",
    title: "Sterile Saline and Research Handling Basics",
    excerpt: "A documentation-first overview of clean handling, labels, storage records and why sterile saline is kept distinct from the research compound.",
    image: "/images/research-library/reconstitution-guide-v1.png",
    publishedDate: "2026-10-04",
    readTime: "6 min read",
    body: [
      "Good research handling begins with separation and traceability. The peptide vial, sterile saline, tools and observation record should each remain clearly identified so the lot, format and preparation event can be reconstructed later.",
      "Before handling, inspect labels and packaging, confirm the lot code against its certificate of analysis and record the date. Use a clean workspace and follow the protocol established by the qualified researcher overseeing the work.",
      "Sterile saline is a separate product with its own packaging and storage requirements. Do not assume that the appearance of a mixed solution confirms concentration, purity or suitability. Visual inspection cannot replace documentation.",
      "ZOONETICS does not provide veterinary dosing or administration guidance. Questions involving an animal's diagnosis, treatment or safety require a licensed veterinarian.",
    ],
  },
];

export function getJournalArticles() {
  return JOURNAL_ARTICLES;
}

export function getJournalArticleBySlug(slug: string) {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}
