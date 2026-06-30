import AdminProductForm from "@/components/AdminProductForm";
import { createProduct } from "@/app/admin/products/actions";
import { getCategories } from "@/lib/categories";

interface NewProductPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewProductPage({ searchParams }: NewProductPageProps) {
  const { error } = await searchParams;
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl text-ink">Add Product</h1>
      <AdminProductForm action={createProduct} categories={categories} error={error} />
    </div>
  );
}
