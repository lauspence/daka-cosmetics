import { notFound } from "next/navigation";
import AdminProductForm from "@/components/AdminProductForm";
import { updateProduct } from "@/app/admin/products/actions";
import { getAllProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const { id } = await params;
  const { error } = await searchParams;

  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl text-ink">Edit Product</h1>
      <AdminProductForm
        action={updateProduct.bind(null, id)}
        categories={categories}
        product={product}
        error={error}
      />
    </div>
  );
}
