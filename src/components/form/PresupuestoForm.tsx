"use client";

import { useActionState, useState } from "react";
import { submitLead, type SubmitLeadState } from "@/app/presupuesto/actions";
import {
  RUBROS,
  TONO_OPTIONS,
  REDES_ACTIVAS_OPTIONS,
  PRESUPUESTO_ADS_OPTIONS,
  MATERIALES_VISUALES_OPTIONS,
  getRubro,
} from "@/lib/rubros";
import {
  TextInput,
  TextareaInput,
  RadioGroup,
  CheckboxGroup,
  SelectInput,
} from "./fields";

const initialState: SubmitLeadState = { status: "idle" };

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-cream/15 bg-maroon-deep/30 p-6 sm:p-8">
      <h2 className="font-display text-lg font-semibold text-cream sm:text-xl">{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export default function PresupuestoForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [rubro, setRubro] = useState("");
  const rubroDef = getRubro(rubro);

  if (state.status === "success") {
    return (
      <div className="border-2 border-pink bg-maroon-deep/40 p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-pink-light">¡Listo!</p>
        <h2 className="mt-3 font-display text-2xl font-bold text-cream sm:text-3xl">
          Recibimos tu formulario
        </h2>
        <p className="mx-auto mt-4 max-w-md text-cream/70">
          Te vamos a contactar por WhatsApp o email en menos de 48 horas con una
          propuesta a medida.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <SectionCard title="Datos generales">
        <TextInput label="Nombre y apellido" name="nombre_apellido" required />
        <TextInput label="Nombre del negocio o marca" name="nombre_negocio" required />
        <TextInput label="Teléfono de contacto" name="telefono" type="tel" required />
        <TextInput label="Email de contacto" name="email" type="email" required />
        <TextInput label="Ciudad" name="ciudad" placeholder="Corrientes Capital, Goya…" />
        <TextInput label="¿Hace cuánto tenés el negocio?" name="antiguedad_negocio" />
        <div className="sm:col-span-2">
          <SelectInput
            label="Rubro"
            name="rubro"
            required
            value={rubro}
            onChange={setRubro}
            placeholder="Elegí tu rubro…"
            options={RUBROS.map((r) => ({ value: r.key, label: r.label }))}
          />
        </div>
      </SectionCard>

      {rubroDef && (
        <SectionCard title={`Sobre tu negocio · ${rubroDef.label}`}>
          {rubroDef.fields.map((field) => {
            const name = `detalle_${field.name}`;
            if (field.type === "textarea") {
              return <TextareaInput key={name} label={field.label} name={name} />;
            }
            if (field.type === "radio") {
              return (
                <RadioGroup key={name} label={field.label} name={name} options={field.options ?? []} />
              );
            }
            if (field.type === "checkbox") {
              return (
                <CheckboxGroup key={name} label={field.label} name={name} options={field.options ?? []} />
              );
            }
            return <TextInput key={name} label={field.label} name={name} />;
          })}
        </SectionCard>
      )}

      <SectionCard title="Presencia digital y objetivos">
        <RadioGroup label="¿Tenés redes activas hoy?" name="redes_activas" options={REDES_ACTIVAS_OPTIONS} />
        <TextInput label="Usuario de Instagram / Facebook" name="redes_handle" placeholder="@tu_marca" />
        <RadioGroup label="¿Qué tono de comunicación te representa?" name="tono_comunicacion" options={TONO_OPTIONS} />
        <RadioGroup label="¿Tenés presupuesto pensado para pauta (Meta Ads)?" name="presupuesto_ads" options={PRESUPUESTO_ADS_OPTIONS} />
        <div className="sm:col-span-2">
          <TextareaInput label="¿Cuál es tu principal objetivo en redes?" name="objetivo_principal" />
        </div>
        <div className="sm:col-span-2">
          <CheckboxGroup label="¿Con qué materiales visuales contás?" name="materiales_visuales" options={MATERIALES_VISUALES_OPTIONS} />
        </div>
        <div className="sm:col-span-2">
          <TextareaInput label="¿Hay algo de tu marca que quieras que respetemos sí o sí?" name="restricciones_marca" />
        </div>
      </SectionCard>

      {state.status === "error" && (
        <p className="border-2 border-pink/60 bg-maroon-deep/40 px-5 py-4 text-[14px] text-pink-light">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center self-start border-2 border-pink bg-pink px-8 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-pink-light disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar mi solicitud"}
      </button>
    </form>
  );
}
