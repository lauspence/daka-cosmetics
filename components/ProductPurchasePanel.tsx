"use client";

import { useState } from "react";
import { Minus, Plus, MessageCircle, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/types";

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.stockStatus === "sold_out";

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";
  const message = `Hi Daka Cosmetics! I'd like to order: ${product.name} x${quantity} (KSh ${(
    product.price * quantity
  ).toLocaleString()})`;
  const whatsappHref = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="mt-6">
      <p className="text-2xl font-semibold text-primary">
        KSh {(product.price * quantity).toLocaleString()}
        {quantity > 1 && (
          <span className="ml-2 text-sm font-normal text-outline">
            (KSh {product.price.toLocaleString()} each)
          </span>
        )}
      </p>

      {!soldOut && (
        <div className="mt-6 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-outline">
            Quantity
          </span>
          <div className="flex items-center rounded-full border border-primary/20">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center text-primary transition hover:bg-primary/5"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-medium text-ink">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-center text-primary transition hover:bg-primary/5"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {soldOut ? (
          <p className="text-sm uppercase tracking-widest text-outline">
            Currently sold out — message us on WhatsApp to be notified when
            it&rsquo;s back.
          </p>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-primary/5 active:scale-95"
          >
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}
            {added ? "Added" : "Add to Cart"}
          </button>
        )}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-95"
        >
          <MessageCircle size={18} />
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
}
