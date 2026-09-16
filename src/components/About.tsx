import Image from "next/image";

export default function About() {
  return (
    <section id="nosotros" className="border-t border-cream/10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
            Quiénes somos
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Un estudio chico, con criterio grande.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cream/70">
            Somos un equipo de diseñadores, estrategas y creadores de
            contenido que se mete de lleno en cada marca que trabaja. Nada de
            plantillas genéricas: cada proyecto tiene su propia estrategia,
            su propio tono y su propio ritmo.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-cream/70">
            Creemos en el diseño que resuelve, en el marketing que se mide y
            en la comunicación que suena a vos, no a nosotros.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-6">
            {[
              "Estrategia primero",
              "Diseño con intención",
              "Datos, no corazonadas",
              "Comunicación sin filtro",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-pink" />
                <span className="text-[15px] font-medium text-cream/80">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex aspect-square items-center justify-center border-2 border-cream/15 bg-maroon-deep">
          <Image
            src="/brand/mark-pink-on-dark.png"
            alt="Isotipo bajo ctrl"
            width={260}
            height={260}
            className="h-2/3 w-2/3 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
