import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Product } from "@/types";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(138,72,83,0.08)] transition hover:shadow-[0_10px_25px_rgba(138,72,83,0.16)]"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blush-deep via-blush to-cream-deep">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-primary/40">
            <Sparkles size={32} />
            <span className="text-xs uppercase tracking-widest">
              {product.category.name}
            </span>
          </div>
        )}

        {product.stockStatus === "sold_out" && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-wide text-white">
            Sold out
          </span>
        )}
        <AddToCartButton product={product} />
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-outline">
          {product.category.name}
        </p>
        <h3 className="mt-1 font-display text-lg text-ink">{product.name}</h3>
        <p className="mt-2 text-sm font-semibold text-primary">
          KSh {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
