const steps = [
  {
    number: "01",
    title: "Escuchamos",
    description:
      "Entendemos tu marca, tu momento y a dónde querés llegar antes de proponer nada.",
  },
  {
    number: "02",
    title: "Definimos estrategia",
    description:
      "Objetivos claros, público definido y un plan concreto de acción.",
  },
  {
    number: "03",
    title: "Creamos",
    description:
      "Diseño, contenido y campañas que ejecutan la estrategia sin perder identidad.",
  },
  {
    number: "04",
    title: "Medimos y ajustamos",
    description:
      "Revisamos resultados con datos reales y optimizamos sobre la marcha.",
  },
];

export default function Process() {
  return (
    <section className="border-t border-cream/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
            Cómo trabajamos
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Un proceso simple, sin vueltas
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-display text-5xl font-bold text-cream/15">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-cream/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
