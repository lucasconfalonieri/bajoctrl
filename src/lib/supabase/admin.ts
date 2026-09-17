import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import WebSocket from "ws";

/**
 * Service-role Supabase client. Bypasses Row Level Security entirely, so
 * this must only ever run on the server (the "server-only" import above
 * makes any accidental client-component import a build error) and must
 * never be sent to the browser. Used for:
 * - inserting leads from the public /presupuesto form
 * - reading/updating leads in the admin dashboard (which is itself gated
 *   by the auth-session check in middleware.ts before this ever runs)
 */
export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      // We never use Realtime, but the client constructor spins one up
      // unconditionally and it needs a WebSocket implementation. Node's own
      // global WebSocket only exists from v22 on, so this `ws` polyfill
      // keeps things working on older Node too (e.g. local dev on Node 20).
      realtime: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transport: WebSocket as any,
      },
    }
  );
}
