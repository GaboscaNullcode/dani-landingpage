import { cache } from 'react';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase server client that reads/writes auth cookies.
 * Use this in Server Components, Server Actions, and Route Handlers.
 */
export const createServerSupabase = cache(async () => {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll can fail in Server Components (read-only cookies).
            // This is expected — the middleware will refresh the session.
          }
        },
      },
    }
  );
});

/**
 * Creates a Supabase anon client WITHOUT cookies.
 * Use for public read-only queries (blog, tienda) that don't need auth.
 * Works in both request and non-request contexts (e.g., generateStaticParams).
 */
export const createAnonSupabase = cache(() => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
});

/**
 * Creates a Supabase admin client using the service_role key.
 * Bypasses RLS — use only in server-side code (API routes, webhooks).
 * Replaces the old getAdminPb() pattern.
 */
export const getServiceSupabase = cache(() => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
});
