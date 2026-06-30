"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Category } from "@/types";

export default function MobileNav({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="text-primary transition hover:opacity-80"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute left-0 top-full w-full border-t border-primary/10 bg-cream shadow-md">
          <div className="flex flex-col px-6 py-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                onClick={() => setOpen(false)}
                className="py-2 text-sm uppercase tracking-widest text-outline transition hover:text-primary"
              >
                {cat.name}
              </Link>
            ))}
            <div className="my-2 border-t border-primary/10" />
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-outline transition hover:text-primary"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-outline transition hover:text-primary"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
