import { z } from "zod";
import { RUBROS, getRubro } from "./rubros";

const rubroKeys = RUBROS.map((r) => r.key) as [string, ...string[]];

export const leadSchema = z.object({
  nombre_apellido: z.string().trim().min(1, "Falta el nombre y apellido"),
  nombre_negocio: z.string().trim().min(1, "Falta el nombre del negocio o marca"),
  telefono: z.string().trim().min(6, "Falta un teléfono válido"),
  email: z.string().trim().email("El email no es válido"),
  ciudad: z.string().trim().optional().default(""),
  antiguedad_negocio: z.string().trim().optional().default(""),
  rubro: z.enum(rubroKeys, { message: "Elegí un rubro" }),
  // Loosely typed on purpose — the actual shape depends on the chosen
  // rubro (see src/lib/rubros.ts). Sanitized against that rubro's real
  // field list in sanitizeDetalleRubro() below before it ever hits the DB.
  detalle_rubro: z.record(z.string(), z.union([z.string(), z.array(z.string())])).default({}),
  redes_activas: z.string().trim().optional().default(""),
  redes_handle: z.string().trim().optional().default(""),
  tono_comunicacion: z.string().trim().optional().default(""),
  objetivo_principal: z.string().trim().optional().default(""),
  presupuesto_ads: z.string().trim().optional().default(""),
  materiales_visuales: z.array(z.string()).optional().default([]),
  restricciones_marca: z.string().trim().optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type Lead = LeadInput & {
  id: string;
  created_at: string;
  status: string;
};

/** Drops any detalle_rubro keys that don't belong to the chosen rubro's
 * field list, so the stored jsonb only ever contains fields that were
 * actually shown to that user. */
export function sanitizeDetalleRubro(
  rubro: string,
  detalle: Record<string, string | string[]>
): Record<string, string | string[]> {
  const def = getRubro(rubro);
  if (!def) return {};
  const validNames = new Set(def.fields.map((f) => f.name));
  const clean: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(detalle)) {
    if (!validNames.has(key)) continue;
    if (Array.isArray(value)) {
      if (value.length > 0) clean[key] = value;
    } else if (value.trim() !== "") {
      clean[key] = value;
    }
  }
  return clean;
}
