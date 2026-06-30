import type { Product } from "@/types";
import { PLACEHOLDER_CATEGORIES } from "@/lib/categories";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";

const [earrings, sprays, chains] = PLACEHOLDER_CATEGORIES;

// Shown until Supabase is configured and real products are added via /admin.
// Swap these out (or delete once real data exists) — see README.md.
const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: "ph-1",
    name: "Crystal Petal Stud Earrings",
    slug: "crystal-petal-stud-earrings",
    description:
      "Sparkling crystal stud earrings with a delicate petal halo setting in rose gold. A statement piece for everyday glam.",
    price: 450,
    category: earrings,
    images: [],
    stockStatus: "in_stock",
    featured: true,
  },
  {
    id: "ph-2",
    name: "Delicate Gold Hoop Earrings",
    slug: "delicate-gold-hoop-earrings",
    description:
      "Lightweight gold-plated hoops with a subtle knot detail. Easy to dress up or down.",
    price: 350,
    category: earrings,
    images: [],
    stockStatus: "in_stock",
    featured: true,
  },
  {
    id: "ph-3",
    name: "Pearl Drop Earrings",
    slug: "pearl-drop-earrings",
    description: "Classic pearl drops on a gold-tone hook, perfect for any occasion.",
    price: 500,
    category: earrings,
    images: [],
    stockStatus: "sold_out",
    featured: false,
  },
  {
    id: "ph-4",
    name: "Tropical Woods Body Mist",
    slug: "tropical-woods-body-mist",
    description: "A warm, woody fragrance mist that lasts all day. 250ml.",
    price: 600,
    category: sprays,
    images: [],
    stockStatus: "in_stock",
    featured: true,
  },
  {
    id: "ph-5",
    name: "Wild Nights Body Mist",
    slug: "wild-nights-body-mist",
    description: "Bold and sweet, a signature scent for nights out. 250ml.",
    price: 600,
    category: sprays,
    images: [],
    stockStatus: "in_stock",
    featured: false,
  },
  {
    id: "ph-6",
    name: "Fresh Pomegranate Body Lotion",
    slug: "fresh-pomegranate-body-lotion",
    description: "Lightweight daily moisturizer with a fresh pomegranate scent.",
    price: 750,
    category: sprays,
    images: [],
    stockStatus: "in_stock",
    featured: false,
  },
  {
    id: "ph-7",
    name: "Gold Layered Chain Necklace",
    slug: "gold-layered-chain-necklace",
    description: "A trio of layered gold-tone chains in one ready-to-wear necklace.",
    price: 800,
    category: chains,
    images: [],
    stockStatus: "in_stock",
    featured: true,
  },
  {
    id: "ph-8",
    name: "Classic Gold Chain",
    slug: "classic-gold-chain",
    description: "A timeless gold-plated chain that pairs with everything.",
    price: 650,
    category: chains,
    images: [],
    stockStatus: "in_stock",
    featured: false,
  },
  {
    id: "ph-9",
    name: "Beaded Pendant Chain",
    slug: "beaded-pendant-chain",
    description: "Delicate beaded chain with a small charm pendant.",
    price: 550,
    category: chains,
    images: [],
    stockStatus: "sold_out",
    featured: false,
  },
];

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[] | null;
  stock_status: "in_stock" | "sold_out";
  featured: boolean;
  categories: { id: string; name: string; slug: string } | null;
}

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    price: Number(row.price),
    category: row.categories ?? earrings,
    images: row.images ?? [],
    stockStatus: row.stock_status,
    featured: row.featured,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return PLACEHOLDER_PRODUCTS;

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name, slug)")
    .order("created_at", { ascending: false });

  if (error || !data) return PLACEHOLDER_PRODUCTS;
  return (data as ProductRow[]).map(mapRow);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.featured);
  return featured.length > 0 ? featured : products.slice(0, 3);
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category.slug === slug);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}
