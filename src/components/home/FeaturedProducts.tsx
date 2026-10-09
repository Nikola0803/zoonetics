import { getProducts } from "@/lib/products";
import { getLiveProducts, mergeProducts } from "@/lib/product-feed";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const FEATURED_SLUGS = ["evlv-3-10mg", "evlv-2-10mg", "evlv-1-5mg", "bpc-157-10mg"];

export async function FeaturedProducts() {
  const catalog = mergeProducts(getProducts(), await getLiveProducts());
  const products = FEATURED_SLUGS.map((slug) => catalog.find((product) => product.slug === slug)).filter(
    (product): product is NonNullable<typeof product> => Boolean(product),
  );

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-sage-deep">Our featured collection</p>
          <h2 className="font-display text-4xl font-semibold text-charcoal md:text-5xl">Research essentials</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-soft-gray">
            Independently tested research materials with batch-level documentation.
          </p>
        </Reveal>

        <Reveal stagger className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Reveal>

        <div className="mt-14 flex justify-center md:mt-16">
          <ButtonLink href="/shop" variant="dark">
            Shop all compounds <i className="ri-arrow-right-line" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
