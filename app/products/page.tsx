import Link from "next/link";
import { getCategories } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import clsx from "clsx";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);
  const filtered = category
    ? products.filter((p) => p.category.slug === category)
    : products;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl text-ink">Shop the Collection</h1>
        <p className="mt-2 text-outline">
          Earrings, body sprays and chains — pick your favourite.
        </p>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href="/products"
          className={clsx(
            "rounded-full border px-5 py-2 text-sm uppercase tracking-widest transition",
            !category
              ? "border-primary bg-primary text-white"
              : "border-primary/20 text-outline hover:border-primary/50"
          )}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/products?category=${cat.slug}`}
            className={clsx(
              "rounded-full border px-5 py-2 text-sm uppercase tracking-widest transition",
              category === cat.slug
                ? "border-primary bg-primary text-white"
                : "border-primary/20 text-outline hover:border-primary/50"
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
