"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function signIn(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { status: "error", message: "Completá email y contraseña." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { status: "error", message: "El login todavía no está configurado." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: "Email o contraseña incorrectos." };
  }

  redirect("/admin");
}
