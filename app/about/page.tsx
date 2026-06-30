import Image from "next/image";
import { MapPin, Clock, MessageCircle, Wallet } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

const MPESA_PAYBILL = "512100";
const MPESA_ACCOUNT = "14143759";

export default function AboutPage() {
  const tiktokUrl =
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@dakacosmetics_";

  return (
    <>
      {/* Hero — full-bleed editorial photo */}
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
        <Image
          src="/about_contact_image_1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="relative z-10 max-w-3xl px-6 text-center">
          <h1 className="font-display text-4xl leading-tight text-white drop-shadow-lg md:text-6xl">
            Defining <span className="italic">African</span> Elegance
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/90 drop-shadow-md">
            A legacy of luxury, crafted for the modern individual who seeks
            perfection in every detail — one earring, one chain, one scent
            at a time.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl text-primary">
              Our Journey of Craftsmanship
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-outline">
              Daka Cosmetics is a Nairobi-based boutique specialising in
              earrings, body sprays and chains — pieces chosen for everyday
              elegance without the everyday price tag. Visit us in store or
              shop the collection online and order straight through
              WhatsApp.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl md:col-span-5">
            <Image
              src="/about_contact_image_2.png"
              alt="Rose-gold cosmetic texture"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* M-Pesa policy */}
      <section className="bg-blush-deep/40 py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 md:flex-row">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <Wallet size={28} />
              <h2 className="font-display text-2xl uppercase tracking-widest">
                M-Pesa Policy
              </h2>
            </div>
            <p className="text-outline">
              We accept direct M-Pesa payments for orders confirmed via
              WhatsApp — fast, simple, and trackable.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 rounded-lg bg-white/70 p-4">
                <span className="w-8 font-display text-lg text-primary">01</span>
                <span className="text-ink">Confirm your order with us on WhatsApp.</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-white/70 p-4">
                <span className="w-8 font-display text-lg text-primary">02</span>
                <span className="text-ink">
                  Go to M-Pesa &rarr; Lipa na M-Pesa &rarr; Paybill. Business
                  Number: <strong>{MPESA_PAYBILL}</strong>
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-white/70 p-4">
                <span className="w-8 font-display text-lg text-primary">03</span>
                <span className="text-ink">
                  Account Number: <strong>{MPESA_ACCOUNT}</strong>, then enter
                  the amount and complete payment.
                </span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-white/70 p-4">
                <span className="w-8 font-display text-lg text-primary">04</span>
                <span className="text-ink">
                  Send us the M-Pesa confirmation message on WhatsApp and
                  we&rsquo;ll prepare your order.
                </span>
              </div>
            </div>
          </div>
          <div className="relative aspect-square w-full max-w-sm shrink-0 overflow-hidden rounded-full border-8 border-white/50 shadow-lg">
            <Image
              src="/about_contact_image_3.png"
              alt="Daka Cosmetics perfume"
              fill
              sizes="(min-width: 768px) 24rem, 100vw"
              className="object-cover"
              style={{ objectPosition: "15% 45%" }}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-[0_4px_12px_rgba(138,72,83,0.08)]">
            <MapPin className="mt-1 text-primary" size={22} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Visit Us
              </p>
              <p className="mt-1 text-ink">Junction Trade Center, T-Room, G175</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-[0_4px_12px_rgba(138,72,83,0.08)]">
            <Clock className="mt-1 text-primary" size={22} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Hours
              </p>
              <p className="mt-1 text-ink">8:00 AM – 6:00 PM, daily</p>
            </div>
          </div>

          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-[0_4px_12px_rgba(138,72,83,0.08)] transition hover:shadow-[0_10px_25px_rgba(138,72,83,0.16)]"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                TikTok
              </p>
              <p className="mt-1 text-ink">@dakacosmetics_</p>
            </div>
          </a>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 rounded-xl bg-white p-6 shadow-[0_4px_12px_rgba(138,72,83,0.08)] transition hover:shadow-[0_10px_25px_rgba(138,72,83,0.16)]"
          >
            <div className="flex items-center gap-4">
              <MessageCircle className="text-[#25D366]" size={22} />
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  WhatsApp
                </p>
                <p className="mt-1 text-ink">Chat with us</p>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-14">
          <WhatsAppButton label="Order via WhatsApp" />
        </div>
      </section>
    </>
  );
}
