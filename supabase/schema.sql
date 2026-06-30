-- Daka Cosmetics — Supabase schema
-- Run this once in your Supabase project's SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null,
  category_id uuid references categories(id) on delete set null,
  images text[] not null default '{}',
  stock_status text not null default 'in_stock' check (stock_status in ('in_stock', 'sold_out')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Convenience view used by lib/products.ts (categories joined inline)
-- (Supabase's PostgREST embed `categories(id, name, slug)` works directly off
-- the foreign key above, no view needed.)

alter table categories enable row level security;
alter table products enable row level security;

-- Public (anon) read access — the storefront is public.
create policy "Public can read categories" on categories
  for select using (true);

create policy "Public can read products" on products
  for select using (true);

-- Only authenticated users (the shop admin) can manage data.
create policy "Authenticated can insert products" on products
  for insert to authenticated with check (true);

create policy "Authenticated can update products" on products
  for update to authenticated using (true) with check (true);

create policy "Authenticated can delete products" on products
  for delete to authenticated using (true);

create policy "Authenticated can manage categories" on categories
  for all to authenticated using (true) with check (true);

-- Seed the three product categories.
insert into categories (name, slug) values
  ('Earrings', 'earrings'),
  ('Body Sprays', 'sprays'),
  ('Chains', 'chains')
on conflict (slug) do nothing;

-- Storage bucket for product photos.
-- Run in the SQL editor too (Supabase allows bucket creation via SQL):
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "Authenticated can upload product images" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

create policy "Authenticated can delete product images" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');

-- M-Pesa STK Push transactions.
-- No RLS policies are defined on purpose: all access goes through server
-- API routes using the service_role key, which bypasses RLS entirely.
-- Anon/authenticated clients get zero direct access to this table.
create table if not exists mpesa_transactions (
  id uuid primary key default gen_random_uuid(),
  checkout_request_id text not null unique,
  merchant_request_id text,
  phone text not null,
  amount numeric(10, 2) not null,
  items jsonb not null default '[]',
  status text not null default 'pending' check (status in ('pending', 'success', 'failed')),
  result_desc text,
  mpesa_receipt_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table mpesa_transactions enable row level security;
