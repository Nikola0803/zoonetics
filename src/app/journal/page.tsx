import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getJournalArticles } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "K9 Research Library | ZOONETICS",
  description: "Evidence-led reading on canine peptide research, product quality, testing, documentation, and responsible research practices.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const articles = getJournalArticles();
  const [featured, ...rest] = articles;
  const categories = [...new Set(articles.map((article) => article.label))];

  return <>
    <section className="overflow-hidden bg-[#101829] px-5 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#A9C7FF]">ZOONETICS Research Library</p><h1 className="mt-5 max-w-xl font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] md:text-7xl">Better questions build better research.</h1><p className="mt-6 max-w-lg text-base font-medium leading-7 text-white/65">Clear, searchable articles about K9 research pathways, peptide profiles, independent testing, and the standards behind every lot.</p></div>
        {featured && <Link href={`/journal/${featured.slug}`} className="group grid overflow-hidden rounded-[28px] bg-white text-[#17233B] md:grid-cols-2"><div className="relative min-h-72"><Image src={featured.image} alt="" fill className="object-cover transition duration-700 group-hover:scale-105" /></div><div className="flex flex-col justify-between p-8"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#4F6EF7]">Featured · {featured.label}</p><h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em]">{featured.title}</h2><p className="mt-4 text-sm font-medium leading-6 text-[#17233B]/62">{featured.excerpt}</p></div><span className="mt-8 text-sm font-extrabold">Read the article <i className="ri-arrow-right-line" /></span></div></Link>}
      </div>
    </section>
    <section className="bg-[#FBFCFF] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 border-b border-[#17233B]/12 pb-8 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#4F6EF7]">Browse The Library</p><h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.035em] text-[#17233B] md:text-5xl">Research, without the fog.</h2></div><div className="flex max-w-2xl flex-wrap gap-2">{categories.map(category => <span key={category} className="rounded-full border border-[#17233B]/12 bg-white px-4 py-2 text-xs font-bold text-[#17233B]/68">{category}</span>)}</div></div>
        <div className="mt-10 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{rest.map((article) => <Link key={article.slug} href={`/journal/${article.slug}`} className="group"><div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#E8EEFC]"><Image src={article.image} alt="" fill className="object-cover transition duration-700 group-hover:scale-105" /></div><p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#4F6EF7]">{article.label} · {article.readTime}</p><h3 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#17233B]">{article.title}</h3><p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-[#17233B]/58">{article.excerpt}</p></Link>)}</div>
      </div>
    </section>
  </>;
}
