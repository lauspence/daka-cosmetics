# Daka Cosmetics

Storefront for Daka Cosmetics — earrings, body sprays and chains. Built with
Next.js (App Router), Tailwind CSS, and Supabase (database, auth, storage).
Checkout currently happens via WhatsApp; there is no online payment yet.

The site runs out of the box with **placeholder products** even before
Supabase is configured, so you can preview the design immediately:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Connect real data (Supabase)

1. Create a free project at https://supabase.com.
2. In the Supabase dashboard, open **SQL Editor > New query**, paste the
   contents of [`supabase/schema.sql`](supabase/schema.sql), and run it. This
   creates the `categories` and `products` tables, row-level security
   policies, and a public `product-images` storage bucket.
3. In **Project Settings > API**, copy the Project URL and the `anon` /
   `service_role` keys.
4. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — the number that should receive orders
     (international format, digits only, e.g. `2547XXXXXXXX`)
   - `NEXT_PUBLIC_TIKTOK_URL` — defaults to `https://www.tiktok.com/@dakacosmetics_`
5. Restart `npm run dev`. The site now reads/writes real products instead of
   the placeholder list in `lib/products.ts`.

## Create your admin login

The admin panel at `/admin/login` uses Supabase Auth (email + password). To
create your own login:

1. In the Supabase dashboard, go to **Authentication > Users > Add user**.
2. Set an email and password — this is what you'll use to sign in at
   `/admin/login`.
3. From there you can add products, upload photos, edit prices, and toggle
   stock status from `/admin/dashboard`.

## Adding real product photos

Until you add products through `/admin`, products without a photo show a
soft placeholder card so nothing looks broken. Upload real photos through
the admin "Add Product" / "Edit Product" forms — they go straight into the
`product-images` Supabase Storage bucket.

## M-Pesa payments (not yet wired up)

Checkout is currently "Order via WhatsApp" only — the customer taps a
button, WhatsApp opens with the product and price prefilled, and the order
is confirmed in chat. To add M-Pesa STK Push later:

- Get a Daraja API app (consumer key/secret) and a Till or Paybill number
  from Safaricom.
- Add an API route (e.g. `app/api/mpesa/stk-push/route.ts`) that calls the
  Daraja `STK Push` endpoint, and a webhook route for the payment callback.
- Hook it into a real checkout flow (the current `WhatsAppButton` component
  in `components/WhatsAppButton.tsx` is the natural place to add a "Pay with
  M-Pesa" option alongside it).

## Project structure

```
app/                     Pages (App Router)
  products/               Shop listing + product detail
  about/                   Location, hours, socials
  admin/                   Login, dashboard, product CRUD (Supabase-auth protected)
components/               Header, Footer, ProductCard, WhatsAppButton, AdminProductForm, ...
lib/                       Supabase clients, product/category data helpers
supabase/schema.sql        Database schema + RLS policies to run in Supabase
```

## Deploying

Not deployed yet. The easiest path is Vercel — connect this repo, add the
same environment variables from `.env.local`, and deploy.
