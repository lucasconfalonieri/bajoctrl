import Image from "next/image";
import { SITE } from "@/lib/site";
import { InstagramIcon, WhatsappIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/mark-pink-on-dark.png"
            alt="bajo ctrl"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-display text-base font-semibold">
            bajo ctrl <span className="font-normal text-cream/50">estudio creativo</span>
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-widest text-cream/60">
          <a href="#servicios" className="hover:text-pink-light">Servicios</a>
          <a href="#trabajo" className="hover:text-pink-light">Trabajo</a>
          <a href="#nosotros" className="hover:text-pink-light">Nosotros</a>
          <a href="#contacto" className="hover:text-pink-light">Contacto</a>
        </nav>

        <div className="flex gap-5">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-cream/60 hover:text-pink-light"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-cream/60 hover:text-pink-light"
          >
            <WhatsappIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-6 font-mono text-[0.68rem] uppercase tracking-wide text-cream/40">
          bajoctrl estudio · {SITE.location} · © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
