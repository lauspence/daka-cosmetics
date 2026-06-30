"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  baseSlug: string,
  excludeId?: string
): Promise<string> {
  let slug = baseSlug;
  let attempt = 2;

  while (true) {
    let query = supabase.from("products").select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();

    if (!data) return slug;
    slug = `${baseSlug}-${attempt++}`;
  }
}

async function uploadImageIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData
): Promise<string | undefined> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const path = `${Date.now()}-${slugify(file.name)}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(path, file, { upsert: true });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(path);

  return publicUrl;
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const price = Number(formData.get("price") ?? 0);
  const categorySlug = String(formData.get("category") ?? "");
  const featured = formData.get("featured") === "on";

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  const imageUrl = await uploadImageIfPresent(supabase, formData);
  const slug = await uniqueSlug(supabase, slugify(name));

  const { error } = await supabase.from("products").insert({
    name,
    slug,
    description,
    price,
    category_id: category?.id,
    images: imageUrl ? [imageUrl] : [],
    featured,
  });

  if (error) {
    redirect(`/admin/products/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/products");
  redirect("/admin/dashboard");
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "");
  const description = String(formData.get("description") ?? "");
  const price = Number(formData.get("price") ?? 0);
  const categorySlug = String(formData.get("category") ?? "");
  const featured = formData.get("featured") === "on";

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  const imageUrl = await uploadImageIfPresent(supabase, formData);
  const slug = await uniqueSlug(supabase, slugify(name), productId);

  const update: Record<string, unknown> = {
    name,
    slug,
    description,
    price,
    category_id: category?.id,
    featured,
  };
  if (imageUrl) update.images = [imageUrl];

  const { error } = await supabase
    .from("products")
    .update(update)
    .eq("id", productId);

  if (error) {
    redirect(
      `/admin/products/${productId}/edit?error=${encodeURIComponent(error.message)}`
    );
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/products");
  redirect("/admin/dashboard");
}
