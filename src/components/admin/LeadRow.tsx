"use client";

import { useRouter } from "next/navigation";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/rubros";

export default function LeadRow({
  id,
  date,
  nombre,
  negocio,
  rubroLabel,
  status,
}: {
  id: string;
  date: string;
  nombre: string;
  negocio: string;
  rubroLabel: string;
  status: string;
}) {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/admin/leads/${id}`)}
      className="cursor-pointer border-b border-cream/10 last:border-0 hover:bg-cream/5"
    >
      <td className="px-4 py-3 text-cream/70">{date}</td>
      <td className="px-4 py-3 font-medium text-cream">{nombre}</td>
      <td className="px-4 py-3 text-cream/70">{negocio}</td>
      <td className="px-4 py-3 text-cream/70">{rubroLabel}</td>
      <td className="px-4 py-3">
        <span className="border border-cream/20 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-cream/70">
          {LEAD_STATUS_LABELS[status as LeadStatus] ?? status}
        </span>
      </td>
    </tr>
  );
}
