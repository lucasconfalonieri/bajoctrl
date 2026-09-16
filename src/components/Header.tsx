"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { InstagramIcon, WhatsappIcon } from "./icons";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/brand/mark-pink-on-dark.png"
            alt="bajo ctrl"
            width={34}
            height={34}
            className="h-8 w-8"
            priority
          />
          <span className="font-display text-base font-semibold tracking-tight text-cream">
            bajo ctrl
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-cream/70 transition-colors hover:text-pink-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-cream/70 transition-colors hover:text-pink-light"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-cream/70 transition-colors hover:text-pink-light"
          >
            <WhatsappIcon className="h-5 w-5" />
          </a>
          <a
            href="#contacto"
            className="border-2 border-cream/80 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-pink hover:bg-pink hover:text-ink"
          >
            Empecemos
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-cream transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-cream transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 bg-maroon-deep px-6 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-sm uppercase tracking-widest text-cream/80"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-5">
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/80">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-cream/80">
              <WhatsappIcon className="h-5 w-5" />
            </a>
          </div>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-3 border-2 border-cream/80 px-5 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-cream"
          >
            Empecemos
          </a>
        </nav>
      )}
    </header>
  );
}
