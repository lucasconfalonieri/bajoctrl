"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getRubro } from "@/lib/rubros";
import { leadSchema, sanitizeDetalleRubro } from "@/lib/validation";
import { sendNewLeadEmail } from "@/lib/email";

export type SubmitLeadState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitLead(
  _prevState: SubmitLeadState,
  formData: FormData
): Promise<SubmitLeadState> {
  const rubro = String(formData.get("rubro") ?? "");
  const rubroDef = getRubro(rubro);

  const detalle_rubro: Record<string, string | string[]> = {};
  if (rubroDef) {
    for (const field of rubroDef.fields) {
      const key = `detalle_${field.name}`;
      if (field.type === "checkbox") {
        const values = formData.getAll(key).map(String).filter(Boolean);
        if (values.length) detalle_rubro[field.name] = values;
      } else {
        const value = String(formData.get(key) ?? "").trim();
        if (value) detalle_rubro[field.name] = value;
      }
    }
  }

  const raw = {
    nombre_apellido: String(formData.get("nombre_apellido") ?? ""),
    nombre_negocio: String(formData.get("nombre_negocio") ?? ""),
    telefono: String(formData.get("telefono") ?? ""),
    email: String(formData.get("email") ?? ""),
    ciudad: String(formData.get("ciudad") ?? ""),
    antiguedad_negocio: String(formData.get("antiguedad_negocio") ?? ""),
    rubro,
    detalle_rubro,
    redes_activas: String(formData.get("redes_activas") ?? ""),
    redes_handle: String(formData.get("redes_handle") ?? ""),
    tono_comunicacion: String(formData.get("tono_comunicacion") ?? ""),
    objetivo_principal: String(formData.get("objetivo_principal") ?? ""),
    presupuesto_ads: String(formData.get("presupuesto_ads") ?? ""),
    materiales_visuales: formData.getAll("materiales_visuales").map(String),
    restricciones_marca: String(formData.get("restricciones_marca") ?? ""),
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      status: "error",
      message: firstIssue?.message || "Revisá los datos del formulario.",
    };
  }

  const data = parsed.data;
  data.detalle_rubro = sanitizeDetalleRubro(data.rubro, data.detalle_rubro);

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase no está configurado todavía (faltan variables de entorno).");
    return {
      status: "error",
      message: "El formulario todavía no está conectado. Escribinos directo por WhatsApp mientras tanto.",
    };
  }

  const supabase = createAdminClient();
  const { data: inserted, error } = await supabase
    .from("leads")
    .insert({ ...data, status: "nuevo" })
    .select("id")
    .single();

  if (error || !inserted) {
    console.error("Error insertando lead en Supabase:", error);
    return {
      status: "error",
      message: "No pudimos enviar el formulario. Probá de nuevo en un rato o escribinos por WhatsApp.",
    };
  }

  await sendNewLeadEmail({ ...data, id: inserted.id });

  return { status: "success" };
}
