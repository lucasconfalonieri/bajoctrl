"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { InstagramIcon, WhatsappIcon } from "./icons";

const links = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#trabajo", label: "Trabajo" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-maroon/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" onClick={() => setOpen(false)}>
          <Image
            src="/brand/wordmark-pink.png"
            alt="bajo ctrl estudio creativo"
            width={273}
            height={101}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-cream/70 transition-colors hover:text-pink-light"
            >
              {link.label}
            </Link>
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
          <Link
            href="/presupuesto"
            className="border-2 border-cream/80 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-pink hover:bg-pink hover:text-ink"
          >
            Pedí tu presupuesto
          </Link>
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
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-sm uppercase tracking-widest text-cream/80"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-5">
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cream/80">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-cream/80">
              <WhatsappIcon className="h-5 w-5" />
            </a>
          </div>
          <Link
            href="/presupuesto"
            onClick={() => setOpen(false)}
            className="mt-3 border-2 border-cream/80 px-5 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-cream"
          >
            Pedí tu presupuesto
          </Link>
        </nav>
      )}
    </header>
  );
}
