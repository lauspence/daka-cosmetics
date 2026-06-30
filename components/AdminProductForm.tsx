import Image from "next/image";
import type { Category, Product } from "@/types";

interface AdminProductFormProps {
  action: (formData: FormData) => void | Promise<void>;
  categories: Category[];
  product?: Product;
  error?: string;
}

export default function AdminProductForm({
  action,
  categories,
  product,
  error,
}: AdminProductFormProps) {
  return (
    <form action={action} className="mt-8 space-y-6">
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-outline">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          defaultValue={product?.name}
          className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-outline">
          Category
        </label>
        <select
          name="category"
          required
          defaultValue={product?.category.slug ?? categories[0]?.slug}
          className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-outline">
          Price (KSh)
        </label>
        <input
          type="number"
          name="price"
          min="0"
          step="1"
          required
          defaultValue={product?.price}
          className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-outline">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description}
          className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-outline">
          Photo {product ? "(leave empty to keep current)" : ""}
        </label>
        {product?.images[0] && (
          <div className="relative mb-2 h-48 w-48 overflow-hidden rounded-xl border border-primary/15 bg-cream-deep">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={product?.featured}
          className="h-4 w-4 rounded border-primary/30"
        />
        Feature on homepage
      </label>

      <button
        type="submit"
        className="rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-95"
      >
        {product ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
}
