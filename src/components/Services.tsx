import Link from "next/link";

const services = [
  {
    title: "Diseño gráfico",
    description:
      "Posts, carruseles, flyers digitales, banners, reels y contenido gráfico adaptado a la identidad de cada marca.",
  },
  {
    title: "Estrategia de contenido & Planificación",
    description:
      "Calendarios editoriales mensuales, definición de líneas de comunicación y ejes temáticos por cliente.",
  },
  {
    title: "Pauta paga",
    description:
      "Estrategia y estructura de campañas en Meta Ads y Google Ads.",
  },
  {
    title: "Video y edición audiovisual",
    description:
      "Reels y videos cortos integrando diseño gráfico y narrativa visual.",
  },
  {
    title: "Fotografía de producto & branding",
    description:
      "Producción fotográfica profesional adaptable a cada proyecto y necesidad.",
  },
  {
    title: "Fotografía y cobertura de eventos",
    description:
      "Cumpleaños, casamientos, eventos empresariales y más: cobertura a medida según la duración, la ubicación y el tipo de fotos que necesitás.",
    href: "/presupuesto?rubro=fotografia",
    cta: "Pedir presupuesto",
  },
];

const cardClass =
  "group block border-2 border-cream/15 bg-maroon-deep/40 p-8 transition-colors hover:border-pink hover:bg-maroon-deep/70";

export default function Services() {
  return (
    <section id="servicios" className="border-t border-cream/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
            Servicios
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Todo lo que tu marca necesita, en un solo lugar
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const content = (
              <>
                <div className="mb-6 h-9 w-9 rounded-full bg-pink transition-transform group-hover:scale-110" />
                <h3 className="font-display text-xl font-semibold text-cream">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/60">
                  {service.description}
                </p>
                {service.href && (
                  <p className="mt-5 font-mono text-xs uppercase tracking-widest text-pink-light">
                    {service.cta} →
                  </p>
                )}
              </>
            );

            return service.href ? (
              <Link key={service.title} href={service.href} className={cardClass}>
                {content}
              </Link>
            ) : (
              <div key={service.title} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
