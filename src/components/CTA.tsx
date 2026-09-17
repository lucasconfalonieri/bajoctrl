import Image from "next/image";
import { SITE } from "@/lib/site";
import { InstagramIcon, WhatsappIcon } from "./icons";
import LinkButton from "./LinkButton";

export default function CTA() {
  return (
    <section id="contacto" className="border-t border-cream/10 bg-ink bg-grid">
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
        <Image
          src="/brand/wordmark-pink.png"
          alt="bajo ctrl estudio creativo"
          width={273}
          height={101}
          className="animate-drop h-18 w-auto"
        />

        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-pink-light">
          ¿Hablamos?
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-cream sm:text-5xl">
          Pongamos tu marca bajo ctrl
        </h2>

        <div className="mt-6 h-0.75 w-10 bg-pink" />

        <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/70">
          Contanos qué necesitás y te respondemos en menos de 48 horas con
          una propuesta a medida.
        </p>

        <nav className="mt-10 flex w-full flex-col gap-3.5">
          <LinkButton
            href={SITE.instagramUrl}
            icon={<InstagramIcon className="h-full w-full" />}
            label="Instagram"
            sublabel={SITE.instagramHandle}
            variant="light"
          />
          <LinkButton
            href={SITE.whatsappUrl}
            icon={<WhatsappIcon className="h-full w-full" />}
            label="WhatsApp"
            sublabel={SITE.whatsappDisplay}
            variant="dark"
          />
        </nav>
      </div>
    </section>
  );
}
