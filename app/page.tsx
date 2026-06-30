import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getCategories } from "@/lib/categories";
import { getFeaturedProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import WhatsAppButton from "@/components/WhatsAppButton";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-20 top-0 h-[120%] w-2/3 translate-y-10 rounded-l-full bg-blush-deep/40 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-2/3 w-1/2 -translate-y-10 rounded-r-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                New season favourites
              </span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-ink md:text-6xl">
              Elegance is an <span className="italic text-primary">art form.</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-outline">
              Discover Daka Cosmetics&rsquo; signature earrings, body sprays
              and chains — timeless pieces for the modern woman.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-95"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
              <WhatsAppButton
                label="Order via WhatsApp"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-primary/5"
              />
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 scale-95 animate-pulse rounded-full bg-blush/40 blur-xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/15 bg-white shadow-xl">
              <p className="text-center font-display text-5xl tracking-tight text-primary">
                DAKA
                <span className="mt-2 block text-center text-sm font-sans font-semibold uppercase tracking-[0.3em] text-outline">
                  Cosmetics
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative flex h-48 items-end overflow-hidden rounded-2xl bg-gradient-to-br from-blush-deep to-cream-deep p-6 shadow-[0_4px_12px_rgba(138,72,83,0.08)] transition hover:shadow-[0_10px_25px_rgba(138,72,83,0.16)]"
            >
              <span className="font-display text-2xl text-ink transition group-hover:text-primary">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-ink">The Signature Edit</h2>
            <p className="mt-2 text-outline">Handpicked pieces for every mood.</p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-semibold uppercase tracking-widest text-primary underline decoration-2 underline-offset-4 hover:opacity-80 sm:block"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </>
  );
}
