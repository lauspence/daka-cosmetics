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

function revalidateCategoryConsumers() {
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
  revalidatePath("/products");
  revalidatePath("/", "layout");
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    redirect("/admin/categories?error=Category name is required");
  }

  const { error } = await supabase
    .from("categories")
    .insert({ name, slug: slugify(name) });

  if (error) {
    redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  }

  revalidateCategoryConsumers();
  redirect("/admin/categories");
}

export async function updateCategory(categoryId: string, formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    redirect("/admin/categories?error=Category name is required");
  }

  const { error } = await supabase
    .from("categories")
    .update({ name, slug: slugify(name) })
    .eq("id", categoryId);

  if (error) {
    redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  }

  revalidateCategoryConsumers();
  redirect("/admin/categories");
}

export async function deleteCategory(categoryId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    redirect(`/admin/categories?error=${encodeURIComponent(error.message)}`);
  }

  revalidateCategoryConsumers();
  redirect("/admin/categories");
}
