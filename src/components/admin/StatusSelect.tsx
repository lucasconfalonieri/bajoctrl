"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/admin/actions";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/rubros";

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(() => updateLeadStatus(id, e.target.value))}
      className="border-2 border-cream/20 bg-ink/40 px-3 py-2 text-sm text-cream outline-none focus:border-pink disabled:opacity-60"
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s} value={s} className="bg-ink">
          {LEAD_STATUS_LABELS[s as LeadStatus]}
        </option>
      ))}
    </select>
  );
}
