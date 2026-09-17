import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import WebSocket from "ws";

/**
 * Cookie-bound Supabase client using the public anon key. Only used to
 * check/manage the admin's own Auth session (login, logout, "who am I").
 * Never used to read or write lead data — that always goes through the
 * service-role client in ./admin.ts.
 */
export async function createClient() {
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
            // Called from a Server Component render — middleware refreshes
            // the session cookie instead, so this can be safely ignored.
          }
        },
      },
      // See admin.ts for why this is needed on Node < 22.
      realtime: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transport: WebSocket as any,
      },
    }
  );
}
