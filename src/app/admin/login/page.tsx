"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
      <Link
        href="/"
        className="mb-6 font-mono text-xs uppercase tracking-widest text-cream/50 hover:text-pink-light"
      >
        ← Volver al sitio
      </Link>

      <div className="w-full max-w-sm border-2 border-cream/15 bg-maroon-deep/30 p-8">
        <div className="flex items-center gap-2.5">
          <Image src="/brand/mark-dark.png" alt="bajo ctrl" width={28} height={28} className="h-7 w-7 invert" />
          <span className="font-display text-base font-semibold text-cream">bajo ctrl · admin</span>
        </div>

        <h1 className="mt-8 font-display text-2xl font-bold text-cream">Iniciar sesión</h1>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-cream/80">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full border-2 border-cream/20 bg-ink/40 px-4 py-2.5 text-[15px] text-cream outline-none focus:border-pink"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[13px] font-medium text-cream/80">Contraseña</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full border-2 border-cream/20 bg-ink/40 px-4 py-2.5 text-[15px] text-cream outline-none focus:border-pink"
            />
          </label>

          {state.status === "error" && (
            <p className="text-[13px] text-pink-light">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 border-2 border-pink bg-pink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-pink-light disabled:opacity-60"
          >
            {pending ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
