"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function toggleStock(productId: string, current: "in_stock" | "sold_out") {
  const supabase = await createClient();
  await supabase
    .from("products")
    .update({ stock_status: current === "in_stock" ? "sold_out" : "in_stock" })
    .eq("id", productId);
  revalidatePath("/admin/dashboard");
  revalidatePath("/products");
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", productId);
  revalidatePath("/admin/dashboard");
  revalidatePath("/products");
}
