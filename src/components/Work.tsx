const projects = [
  { name: "Proyecto Uno", category: "Branding · Marketing digital", tone: "bg-maroon-deep border-pink/40 text-cream" },
  { name: "Proyecto Dos", category: "Community Management", tone: "bg-pink-light border-ink text-maroon-deep" },
  { name: "Proyecto Tres", category: "Contenido · Producción", tone: "bg-ink border-pink/40 text-cream" },
  { name: "Proyecto Cuatro", category: "Sitio web · Landing", tone: "bg-pink border-ink text-ink" },
];

export default function Work() {
  return (
    <section id="trabajo" className="border-t border-cream/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
              Trabajo
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
              Algunos proyectos recientes
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-cream/55">
            Próximamente vamos a sumar casos reales acá. Mientras tanto,
            contanos tu proyecto y sé el próximo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`flex aspect-4/3 flex-col justify-end border-2 p-8 transition-transform hover:-translate-y-1 ${project.tone}`}
            >
              <p className="font-mono text-xs uppercase tracking-wide opacity-70">
                {project.category}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold">
                {project.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
