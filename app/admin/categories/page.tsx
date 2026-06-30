import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { getCategories } from "@/lib/categories";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { createCategory, updateCategory, deleteCategory } from "./actions";

interface CategoriesPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminCategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { error } = await searchParams;
  const categories = await getCategories();
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-1 text-sm text-outline transition hover:text-primary"
      >
        <ArrowLeft size={14} />
        Back to dashboard
      </Link>

      <h1 className="mt-4 font-display text-3xl text-ink">Categories</h1>
      <p className="mt-1 text-sm text-outline">
        Add, rename or remove product categories.
      </p>

      {!configured && (
        <p className="mt-6 rounded-lg bg-blush/40 px-4 py-3 text-sm text-ink">
          Supabase isn&rsquo;t configured yet, so changes here won&rsquo;t be
          saved.
        </p>
      )}

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form
        action={createCategory}
        className="mt-8 flex items-end gap-3 rounded-xl bg-white p-5 shadow-[0_4px_12px_rgba(138,72,83,0.08)]"
      >
        <div className="flex-1 space-y-1">
          <label className="text-xs font-semibold uppercase tracking-widest text-outline">
            New category name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Bracelets"
            className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow transition hover:opacity-90"
        >
          Add
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-[0_4px_12px_rgba(138,72,83,0.08)]">
        {categories.length === 0 ? (
          <p className="px-6 py-10 text-center text-outline">
            No categories yet.
          </p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex items-center gap-3 border-t border-primary/10 px-5 py-4 first:border-t-0"
              >
                <form
                  action={updateCategory.bind(null, category.id)}
                  className="flex flex-1 items-center gap-3"
                >
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={category.name}
                    className="flex-1 rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label={`Save ${category.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:bg-primary/5"
                  >
                    <Save size={15} />
                  </button>
                </form>
                <form action={deleteCategory.bind(null, category.id)}>
                  <button
                    type="submit"
                    aria-label={`Delete ${category.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-outline transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
