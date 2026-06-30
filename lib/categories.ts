import type { Category } from "@/types";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";

// Shown until Supabase is configured — see README.md.
export const PLACEHOLDER_CATEGORIES: Category[] = [
  { id: "cat-earrings", name: "Earrings", slug: "earrings" },
  { id: "cat-sprays", name: "Body Sprays", slug: "sprays" },
  { id: "cat-chains", name: "Chains", slug: "chains" },
];

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return PLACEHOLDER_CATEGORIES;

  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", { ascending: true });

  if (error || !data) return PLACEHOLDER_CATEGORIES;
  return data;
}
