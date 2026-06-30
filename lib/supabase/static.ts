import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Plain (cookie-free) client for public reads — safe to call anywhere,
// including generateStaticParams at build time where cookies() is unavailable.
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
