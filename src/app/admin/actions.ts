"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { LEAD_STATUSES } from "@/lib/rubros";

export async function signOut() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function updateLeadStatus(id: string, status: string) {
  if (!(LEAD_STATUSES as readonly string[]).includes(status)) return;
  if (!isSupabaseConfigured()) return;
  const supabase = createAdminClient();
  await supabase.from("leads").update({ status }).eq("id", id);
}
