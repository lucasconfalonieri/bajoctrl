import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/app/admin/actions";

export default function AdminTopbar() {
  return (
    <header className="border-b border-cream/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image src="/brand/mark-dark.png" alt="bajo ctrl" width={26} height={26} className="h-7 w-7 invert" />
          <span className="font-display text-sm font-semibold text-cream">bajo ctrl · admin</span>
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest text-cream/60 hover:text-pink-light"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </header>
  );
}
