import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PresupuestoForm from "@/components/form/PresupuestoForm";

export const metadata: Metadata = {
  title: "Pedí tu presupuesto — bajo ctrl",
  description:
    "Contanos sobre tu marca y tu rubro y te mandamos una propuesta a medida por WhatsApp o email.",
};

export default async function PresupuestoPage({
  searchParams,
}: {
  searchParams: Promise<{ rubro?: string }>;
}) {
  const { rubro } = await searchParams;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-t border-cream/10">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
            <p className="font-mono text-xs uppercase tracking-widest text-pink-light">
              Pedí tu presupuesto
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
              Contanos qué necesitás
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/70">
              Completá el formulario con los datos de tu negocio o de tu
              evento. Cuantos más detalles nos des, más ajustada va a ser la
              propuesta que te mandemos por WhatsApp o email.
            </p>

            <div className="mt-12">
              <PresupuestoForm initialRubro={rubro} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
