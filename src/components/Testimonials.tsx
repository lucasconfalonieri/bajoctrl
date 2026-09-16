const testimonials = [
  {
    quote:
      "Le dieron una identidad clara a la marca en tiempo récord. El equipo entiende de diseño y de negocio, algo raro de encontrar junto.",
    author: "Nombre Apellido",
    role: "Fundadora, Marca Ejemplo",
  },
  {
    quote:
      "Pasamos de publicar sin rumbo a tener una estrategia real en redes. Se nota en el engagement y, sobre todo, en las ventas.",
    author: "Nombre Apellido",
    role: "Marketing, Empresa Ejemplo",
  },
  {
    quote:
      "Rápidos, claros y con buen ojo. Cada entrega vino con una explicación del por qué, no solo del qué.",
    author: "Nombre Apellido",
    role: "CEO, Startup Ejemplo",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-cream/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
          Lo dicen ellos
        </p>
        <h2 className="mt-3 max-w-xl font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
          Marcas que ya están bajo ctrl
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col justify-between border-2 border-cream/15 bg-maroon-deep/40 p-8"
            >
              <blockquote className="font-display text-lg leading-relaxed text-cream">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold text-cream">{t.author}</p>
                <p className="text-sm text-cream/55">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
