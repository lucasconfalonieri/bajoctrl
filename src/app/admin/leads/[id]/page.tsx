import Link from "next/link";
import { notFound } from "next/navigation";
import AdminTopbar from "@/components/admin/AdminTopbar";
import StatusSelect from "@/components/admin/StatusSelect";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { getRubro } from "@/lib/rubros";
import type { Lead } from "@/lib/validation";

export const dynamic = "force-dynamic";

async function getLead(id: string): Promise<Lead | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data as Lead;
}

function waLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const withCountry = digits.length <= 10 ? `549${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-wide text-cream/45">{label}</dt>
      <dd className="mt-1 text-[15px] text-cream">{value}</dd>
    </div>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  const rubroDef = getRubro(lead.rubro);
  const hasDigital = Boolean(
    lead.redes_activas ||
      lead.redes_handle ||
      lead.tono_comunicacion ||
      lead.presupuesto_ads ||
      lead.objetivo_principal ||
      lead.materiales_visuales?.length ||
      lead.restricciones_marca
  );
  const detalleEntries = rubroDef
    ? rubroDef.fields
        .map((field) => {
          const value = lead.detalle_rubro[field.name];
          if (!value) return null;
          return { label: field.label, value: Array.isArray(value) ? value.join(", ") : value };
        })
        .filter((entry): entry is { label: string; value: string } => entry !== null)
    : [];

  return (
    <>
      <AdminTopbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Link href="/admin" className="font-mono text-xs uppercase tracking-widest text-cream/50 hover:text-pink-light">
            ← Volver a la bandeja
          </Link>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-cream sm:text-3xl">
                {lead.nombre_apellido}
              </h1>
              <p className="mt-1 text-cream/60">
                {lead.nombre_negocio ? `${lead.nombre_negocio} · ` : ""}
                {rubroDef?.label ?? lead.rubro}
              </p>
            </div>
            <StatusSelect id={lead.id} status={lead.status} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(lead.telefono)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-pink bg-pink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-pink-light"
            >
              Escribir por WhatsApp
            </a>
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex items-center justify-center border-2 border-cream/20 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream"
            >
              Escribir por email
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <section className="border-2 border-cream/15 bg-maroon-deep/30 p-6">
              <h2 className="font-display text-base font-semibold text-cream">Datos generales</h2>
              <dl className="mt-4 flex flex-col gap-4">
                <Row label="Teléfono" value={lead.telefono} />
                <Row label="Email" value={lead.email} />
                <Row label="Ciudad" value={lead.ciudad} />
                <Row label="Antigüedad del negocio" value={lead.antiguedad_negocio} />
              </dl>
            </section>

            {detalleEntries.length > 0 && (
              <section className="border-2 border-cream/15 bg-maroon-deep/30 p-6">
                <h2 className="font-display text-base font-semibold text-cream">
                  {rubroDef?.eventMode ? "Sobre el evento o proyecto" : `Sobre el negocio · ${rubroDef?.label}`}
                </h2>
                <dl className="mt-4 flex flex-col gap-4">
                  {detalleEntries.map((entry) => (
                    <Row key={entry.label} label={entry.label} value={entry.value} />
                  ))}
                </dl>
              </section>
            )}

            {hasDigital && (
            <section className="border-2 border-cream/15 bg-maroon-deep/30 p-6 sm:col-span-2">
              <h2 className="font-display text-base font-semibold text-cream">
                Presencia digital y objetivos
              </h2>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Row label="Redes activas" value={lead.redes_activas} />
                <Row label="Usuario Instagram/Facebook" value={lead.redes_handle} />
                <Row label="Tono de comunicación" value={lead.tono_comunicacion} />
                <Row label="Presupuesto para pauta" value={lead.presupuesto_ads} />
                <Row label="Objetivo principal" value={lead.objetivo_principal} />
                <Row
                  label="Materiales visuales disponibles"
                  value={lead.materiales_visuales?.join(", ")}
                />
                <Row label="Restricciones de marca" value={lead.restricciones_marca} />
              </dl>
            </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
