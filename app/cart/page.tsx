"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, MessageCircle, Sparkles } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";
  const message =
    `Hi Daka Cosmetics! I'd like to order:\n` +
    items
      .map(
        (item) =>
          `- ${item.product.name} x${item.quantity} (KSh ${(
            item.product.price * item.quantity
          ).toLocaleString()})`
      )
      .join("\n") +
    `\n\nTotal: KSh ${totalPrice.toLocaleString()}`;
  const whatsappHref = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <Sparkles size={32} className="mx-auto text-primary/40" />
        <h1 className="mt-4 font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-outline">
          Browse the collection and add something you love.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-ink">Your Cart</h1>

      <div className="mt-10 divide-y divide-primary/10 rounded-xl bg-white shadow-[0_4px_12px_rgba(138,72,83,0.08)]">
        {items.map(({ product, quantity }) => {
          const image = product.images[0];
          return (
            <div
              key={product.id}
              className="flex items-center gap-4 px-5 py-5"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-blush-deep to-cream-deep">
                {image ? (
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-primary/40">
                    <Sparkles size={20} />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-display text-lg text-ink hover:text-primary"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-outline">
                  KSh {product.price.toLocaleString()} each
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-primary/20">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center text-primary transition hover:bg-primary/5"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-7 text-center text-sm font-medium text-ink">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center text-primary transition hover:bg-primary/5"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from cart`}
                    onClick={() => removeItem(product.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 text-outline transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <p className="text-right font-semibold text-primary">
                KSh {(product.price * quantity).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm uppercase tracking-widest text-outline">
          Total
        </span>
        <span className="font-display text-3xl text-ink">
          KSh {totalPrice.toLocaleString()}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-primary/5"
        >
          Continue Shopping
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-95"
        >
          <MessageCircle size={18} />
          Checkout via WhatsApp
        </a>
      </div>
    </div>
  );
}
