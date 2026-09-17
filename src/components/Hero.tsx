import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-105 w-105 opacity-15 sm:-right-16 sm:-top-16">
        <Image
          src="/brand/mark-dark.png"
          alt=""
          fill
          className="object-contain invert"
          priority
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 sm:pt-16">
        <p className="mb-5 inline-flex items-center border-2 border-pink-light/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-pink-light">
          Estudio creativo · Diseño &amp; Marketing
        </p>

        <h1 className="max-w-3xl font-display text-5xl font-bold leading-[1.1] tracking-tight text-cream sm:text-6xl md:text-7xl">
          Tu marca,{" "}
          <span className="text-pink-light">bajo ctrl.</span>
        </h1>

        <div className="mt-8 h-0.75 w-10 bg-pink" />

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70 sm:text-xl">
          Diseño, marketing y community management para marcas que quieren
          crecer con criterio. Estrategia clara, piezas que se notan y
          resultados que se miden.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/presupuesto"
            className="inline-flex items-center justify-center border-2 border-pink bg-pink px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-pink-light"
          >
            Contanos tu proyecto
          </a>
          <a
            href="#trabajo"
            className="inline-flex items-center justify-center border-2 border-cream/30 px-7 py-3.5 text-base font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/5"
          >
            Ver trabajos
          </a>
        </div>

        <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-cream/15 pt-8">
          {[
            ["+15", "marcas acompañadas"],
            ["5", "años de estudio"],
            ["100%", "bajo control"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-bold text-cream sm:text-4xl">
                {value}
              </dd>
              <p className="mt-1 text-sm text-cream/55">{label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
