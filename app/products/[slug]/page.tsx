import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ChevronLeft } from "lucide-react";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const image = product.images[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-1 text-sm uppercase tracking-widest text-outline hover:text-primary"
      >
        <ChevronLeft size={16} />
        Back to shop
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-blush-deep via-blush to-cream-deep">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-primary/40">
              <Sparkles size={48} />
              <span className="text-sm uppercase tracking-widest">
                {product.category.name}
              </span>
            </div>
          )}
          {product.stockStatus === "sold_out" && (
            <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-wide text-white">
              Sold out
            </span>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-primary">
            {product.category.name}
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink">{product.name}</h1>
          <p className="mt-6 max-w-md leading-relaxed text-outline">
            {product.description}
          </p>

          <ProductPurchasePanel product={product} />
        </div>
      </div>
    </div>
  );
}
