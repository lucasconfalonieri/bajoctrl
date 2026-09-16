const services = [
  {
    title: "Branding & Diseño",
    description:
      "Identidad visual, sistemas de marca y piezas gráficas que hacen que te reconozcan a primera vista.",
  },
  {
    title: "Marketing Digital",
    description:
      "Estrategia, pauta y funnels pensados para vender, no solo para gustar.",
  },
  {
    title: "Community Management",
    description:
      "Contenido, calendario y comunidad gestionados con voz propia, todos los días del mes.",
  },
  {
    title: "Producción de Contenido",
    description:
      "Foto, video y diseño de piezas listas para redes, campañas y pauta.",
  },
  {
    title: "Estrategia de Marca",
    description:
      "Posicionamiento, tono de voz y arquitectura de marca antes de diseñar un solo pixel.",
  },
  {
    title: "Sitios & Landings",
    description:
      "Webs rápidas, claras y con foco en conversión — como esta, pero para vos.",
  },
];

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
          {services.map((service) => (
            <div
              key={service.title}
              className="group border-2 border-cream/15 bg-maroon-deep/40 p-8 transition-colors hover:border-pink hover:bg-maroon-deep/70"
            >
              <div className="mb-6 h-9 w-9 rounded-full bg-pink transition-transform group-hover:scale-110" />
              <h3 className="font-display text-xl font-semibold text-cream">
                {service.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
