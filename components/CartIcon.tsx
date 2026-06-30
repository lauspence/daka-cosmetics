"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="View cart"
      className="relative text-primary transition hover:opacity-70"
    >
      <ShoppingBag size={20} />
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
