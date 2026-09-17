import Link from "next/link";
import AdminTopbar from "@/components/admin/AdminTopbar";
import LeadRow from "@/components/admin/LeadRow";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase/admin";
import { getRubro } from "@/lib/rubros";
import type { Lead } from "@/lib/validation";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

async function getLeads(page: number): Promise<{ leads: Lead[]; total: number }> {
  if (!isSupabaseConfigured()) return { leads: [], total: 0 };
  const supabase = createAdminClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error leyendo leads:", error);
    return { leads: [], total: 0 };
  }
  return { leads: (data ?? []) as Lead[], total: count ?? 0 };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const configured = isSupabaseConfigured();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const { leads, total } = configured ? await getLeads(page) : { leads: [], total: 0 };
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <AdminTopbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h1 className="font-display text-2xl font-bold text-cream">
            Presupuestos recibidos
          </h1>
          <p className="mt-1 text-sm text-cream/55">
            {!configured
              ? "Supabase todavía no está conectado — esta bandeja va a mostrar los presupuestos apenas se configure."
              : total === 0
              ? "Todavía no llegó ninguno."
              : `${total} en total, más reciente primero.`}
          </p>

          {leads.length > 0 && (
            <>
              <div className="mt-8 overflow-x-auto border-2 border-cream/15">
                <table className="w-full min-w-180 text-left text-sm">
                  <thead>
                    <tr className="border-b border-cream/15 font-mono text-[11px] uppercase tracking-wide text-cream/50">
                      <th className="px-4 py-3">Fecha</th>
                      <th className="px-4 py-3">Nombre</th>
                      <th className="px-4 py-3">Negocio</th>
                      <th className="px-4 py-3">Rubro</th>
                      <th className="px-4 py-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <LeadRow
                        key={lead.id}
                        id={lead.id}
                        date={formatDate(lead.created_at)}
                        nombre={lead.nombre_apellido}
                        negocio={lead.nombre_negocio}
                        rubroLabel={getRubro(lead.rubro)?.label ?? lead.rubro}
                        status={lead.status}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={`/admin?page=${page - 1}`}
                    aria-disabled={page <= 1}
                    className={`border-2 border-cream/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-pink hover:text-pink-light ${
                      page <= 1 ? "pointer-events-none opacity-30" : ""
                    }`}
                  >
                    ← Anterior
                  </Link>
                  <p className="font-mono text-xs uppercase tracking-widest text-cream/50">
                    Página {page} de {totalPages}
                  </p>
                  <Link
                    href={`/admin?page=${page + 1}`}
                    aria-disabled={page >= totalPages}
                    className={`border-2 border-cream/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-pink hover:text-pink-light ${
                      page >= totalPages ? "pointer-events-none opacity-30" : ""
                    }`}
                  >
                    Siguiente →
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
