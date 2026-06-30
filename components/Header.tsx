import Link from "next/link";
import { Menu } from "lucide-react";
import { getCategories } from "@/lib/categories";
import CartIcon from "@/components/CartIcon";

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-.92-.64-1.51-1.69-1.6-2.82h-3.06v13.06a3.05 3.05 0 1 1-2.16-2.92V9.97a6.18 6.18 0 1 0 5.22 6.1V9.4a8.16 8.16 0 0 0 4.69 1.49V7.83a4.85 4.85 0 0 1-3.09-2.01z" />
    </svg>
  );
}

export default async function Header() {
  const tiktokUrl =
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@dakacosmetics_";
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/80 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <button
            aria-label="Open menu"
            className="text-primary transition hover:opacity-80 md:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="hidden gap-6 md:flex">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="text-sm uppercase tracking-widest text-outline transition hover:text-primary"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="font-display text-xl tracking-tight text-primary md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          DAKA COSMETICS
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/products"
            className="hidden text-sm uppercase tracking-widest text-outline transition hover:text-primary md:block"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="hidden text-sm uppercase tracking-widest text-outline transition hover:text-primary md:block"
          >
            About
          </Link>
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Daka Cosmetics on TikTok"
            className="text-primary transition hover:opacity-70"
          >
            <TikTokIcon />
          </a>
          <CartIcon />
        </div>
      </nav>
    </header>
  );
}
