import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { logout, toggleStock, deleteProduct } from "@/app/admin/actions";

export default async function AdminDashboardPage() {
  const products = await getAllProducts();
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">Product Dashboard</h1>
          <p className="mt-1 text-sm text-outline">
            Add, edit and manage stock for Daka Cosmetics products.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-primary/5"
          >
            Categories
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow transition hover:opacity-90"
          >
            <Plus size={16} />
            Add Product
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-primary transition hover:bg-primary/5"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      {!configured && (
        <p className="mt-6 rounded-lg bg-blush/40 px-4 py-3 text-sm text-ink">
          Supabase isn&rsquo;t configured yet, so you&rsquo;re viewing
          placeholder products and changes here won&rsquo;t be saved. See{" "}
          <code className="font-mono">README.md</code>.
        </p>
      )}

      <div className="mt-10 overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(138,72,83,0.08)]">
        {products.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-ink">No products yet.</p>
            <Link
              href="/admin/products/new"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow transition hover:opacity-90"
            >
              <Plus size={16} />
              Add your first product
            </Link>
          </div>
        ) : (
          <table className="w-full table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[34%]" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
              <col className="w-[16%]" />
              <col className="w-[20%]" />
            </colgroup>
            <thead className="bg-cream-deep text-xs uppercase tracking-widest text-outline">
              <tr>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const image = product.images[0];
                return (
                  <tr
                    key={product.id}
                    className="border-t border-primary/10 transition hover:bg-cream-deep/50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-primary/10 bg-gradient-to-br from-blush-deep to-cream-deep">
                          {image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <span className="truncate font-medium text-ink hover:text-primary hover:underline">
                          {product.name}
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-outline">{product.category.name}</td>
                    <td className="px-5 py-4 text-outline">
                      KSh {product.price.toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <form
                        action={toggleStock.bind(null, product.id, product.stockStatus)}
                      >
                        <button
                          type="submit"
                          className={
                            product.stockStatus === "in_stock"
                              ? "rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-700 transition hover:bg-green-200"
                              : "rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700 transition hover:bg-red-200"
                          }
                        >
                          {product.stockStatus === "in_stock" ? "In stock" : "Sold out"}
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          aria-label={`Edit ${product.name}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:bg-primary/5"
                        >
                          <Pencil size={15} />
                        </Link>
                        <form action={deleteProduct.bind(null, product.id)}>
                          <button
                            type="submit"
                            aria-label={`Delete ${product.name}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-outline transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
