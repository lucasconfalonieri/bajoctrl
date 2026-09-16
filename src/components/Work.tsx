import BrandsMarquee from "./BrandsMarquee";
import WorkCarousel from "./WorkCarousel";

const projects = [
  {
    name: "SIMOGAS · YPF Gas",
    category: "Distribuidora de gas envasado",
    description:
      "Calendario editorial adaptado al uso cotidiano del gas en Corrientes, con recetas y contenido práctico.",
    image: "/work/simogas.webp",
    // banner real en azul YPF — marco neutro oscuro para no pelear con ese azul
    tone: "bg-ink text-cream",
  },
  {
    name: "Laboratorio de la Mujer y el Niño",
    category: "Salud · Análisis clínicos, Goya",
    description:
      "Piezas informativas y contenido educativo para posicionar el estudio genético GEN360.",
    image: "/work/lmyn.webp",
    // banner real claro/celeste — marco claro para que no choque
    tone: "bg-cream text-ink",
  },
  {
    name: "Lalos Bar & Food",
    category: "Gastronomía · Delivery",
    description:
      "Campañas de Meta Ads enfocadas en la zona real de cobertura, con presupuesto acotado.",
    image: "/work/lalos.webp",
    // fotografía cálida marrón oscuro — el bordó oscuro acompaña el tono
    tone: "bg-maroon-deep text-cream",
  },
  {
    name: "Polarshop",
    category: "Automotor · Polarizado de vidrios",
    description:
      "Identidad oscura y cinematográfica para un servicio premium, con paleta roja y dorada.",
    image: "/work/polarshop.webp",
    // el rojo del banner real no matchea exacto con nuestro bordó — mejor neutro oscuro
    tone: "bg-ink text-cream",
  },
  {
    name: "Lilovet",
    category: "Veterinaria",
    description:
      "Contenido educativo semanal para dueños de mascotas, con eje en cuidados de temporada.",
    image: "/work/lilovet.webp",
    // banner real en tonos rosados — combina directo con nuestro rosa claro
    tone: "bg-pink-light text-maroon-deep",
  },
  {
    name: "Funeraria de Las Heras",
    category: "Servicios · Corrientes, desde 1987",
    description:
      "Identidad sobria para comunicar con respeto la Previsora Familiar — 'Con usted, siempre'.",
    image: "/work/funeraria-las-heras.webp",
    // banner real navy — marco claro para dar el registro sobrio que pediste
    tone: "bg-cream text-ink",
  },
  {
    name: "Kinesiocorrectiva",
    category: "Salud · Kinesiología",
    description:
      "Contenido educativo sobre postura, movilidad y bienestar corporal.",
    image: "/work/kinesiocorrectiva.webp",
    // banner real violeta — marco neutro oscuro en vez de un color que no está en la paleta
    tone: "bg-ink text-cream",
  },
];

const otherBrands = [
  "Patitas Pet Shop",
  "CK Cekie",
  "Estación Mariscal",
  "Lenoni Cocina",
  "ACEC Laboratorio",
];

export default function Work() {
  return (
    <section id="trabajo" className="border-t border-cream/10 bg-ink bg-grid">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
            Trabajo
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Marcas con las que trabajé
          </h2>
        </div>

        <div className="mt-14">
          <WorkCarousel projects={projects} />
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-cream/45">
            También trabajé con
          </p>
          <div className="mt-6">
            <BrandsMarquee brands={otherBrands} />
          </div>
        </div>
      </div>
    </section>
  );
}
