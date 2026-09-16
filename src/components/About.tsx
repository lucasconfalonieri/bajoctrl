import Image from "next/image";

export default function About() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden border-t border-cream/10 bg-ink bg-grid"
    >
      <div className="pointer-events-none absolute -right-32 top-1/2 h-128 w-lg -translate-y-1/2 opacity-10 sm:-right-20">
        <Image
          src="/brand/mark-pink-on-dark.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
            Quiénes somos
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Un estudio chico, con criterio grande.
          </h2>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-cream/50">
            Rosario Alegre — Diseñadora Gráfica y Creadora de Contenido
          </p>
          <p className="mt-6 text-lg leading-relaxed text-cream/70">
            Hace más de 5 años combino diseño gráfico y gestión de contenido
            digital, diseñando la comunicación de marcas de rubros muy
            distintos entre sí. Combino diseño, producción audiovisual y
            estrategia de contenido en un mismo proceso, adaptando cada
            proyecto a la identidad y los objetivos de la marca.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-cream/70">
            Hoy trabajo de forma simultánea con cuentas activas desde hace más
            de un año, sosteniendo consistencia y calidad a través de
            procesos propios de planificación y seguimiento.
          </p>

          <ul className="mt-10 flex flex-wrap gap-3">
            {[
              "Salud",
              "Gastronomía",
              "Automotor",
              "Servicios",
              "Bienestar animal",
            ].map((item) => (
              <li
                key={item}
                className="border-2 border-cream/15 px-4 py-1.5 text-[13px] font-medium text-cream/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
