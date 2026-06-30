import Link from "next/link";

export default function Footer() {
  const tiktokUrl =
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@dakacosmetics_";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";

  return (
    <footer className="border-t border-primary/10 bg-cream-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-primary">DAKA COSMETICS</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-outline">
            Earrings, body sprays &amp; chains, curated for everyday elegance.
            Junction Trade Center, T-Room G175.
          </p>
          <p className="mt-2 text-sm text-outline">Open 8:00 AM – 6:00 PM</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Shop
          </p>
          <ul className="mt-4 space-y-3 text-sm text-outline">
            <li>
              <Link href="/products?category=earrings" className="hover:text-primary">
                Earrings
              </Link>
            </li>
            <li>
              <Link href="/products?category=sprays" className="hover:text-primary">
                Body Sprays
              </Link>
            </li>
            <li>
              <Link href="/products?category=chains" className="hover:text-primary">
                Chains
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Connect
          </p>
          <ul className="mt-4 space-y-3 text-sm text-outline">
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                TikTok @dakacosmetics_
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/10 px-6 py-5 text-center text-xs uppercase tracking-widest text-outline/60">
        © {new Date().getFullYear()} Daka Cosmetics. All rights reserved.
      </div>
    </footer>
  );
}
