import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  productName?: string;
  price?: number;
  className?: string;
  label?: string;
}

export default function WhatsAppButton({
  productName,
  price,
  className,
  label = "Order via WhatsApp",
}: WhatsAppButtonProps) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";
  const message = productName
    ? `Hi Daka Cosmetics! I'd like to order: ${productName}${
        price ? ` (KSh ${price})` : ""
      }`
    : "Hi Daka Cosmetics! I'd like to know more about your products.";

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-95"
      }
    >
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
