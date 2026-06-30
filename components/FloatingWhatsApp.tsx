import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";
  const message = "Hi Daka Cosmetics! I'd like to know more about your products.";
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Daka Cosmetics on WhatsApp"
      className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-5px_rgba(138,72,83,0.4)] transition hover:scale-110"
    >
      <MessageCircle size={26} fill="white" />
      <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs text-white opacity-0 transition group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
