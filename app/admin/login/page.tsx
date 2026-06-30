import { login } from "./actions";
import { isSupabaseConfigured } from "@/lib/supabase/server";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl text-ink">Admin Login</h1>
      <p className="mt-2 text-sm text-outline">
        Manage Daka Cosmetics products, photos and stock.
      </p>

      {!configured && (
        <p className="mt-6 rounded-lg bg-blush/40 px-4 py-3 text-sm text-ink">
          Supabase isn&rsquo;t configured yet. Add your project credentials to{" "}
          <code className="font-mono">.env.local</code> — see{" "}
          <code className="font-mono">README.md</code> for steps.
        </p>
      )}

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <form action={login} className="mt-8 space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-widest text-outline">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
            placeholder="owner@dakacosmetics.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-widest text-outline">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-95"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
