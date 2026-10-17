interface TrustItem {
  icon: string;
  label: string;
  sublabel?: string;
}

export function TrustIconRow({ items }: { items: TrustItem[]; tone?: "ring" | "plain" }) {
  return (
    <section className="border-y border-stone/70 bg-white">
      <div
        className="mx-auto flex max-w-[1600px] snap-x overflow-x-auto px-2 [scrollbar-width:none] md:grid md:overflow-visible md:px-8 [&::-webkit-scrollbar]:hidden"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => (
          <div key={item.label} className="flex min-w-[210px] snap-start flex-col items-center justify-center gap-2 border-r border-stone/60 px-5 py-5 text-center text-xs font-bold text-charcoal/75 last:border-r-0 md:min-w-0 md:py-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-mist text-sage-deep">
              <i className={`${item.icon} text-base`} />
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
