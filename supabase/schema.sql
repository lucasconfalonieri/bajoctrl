-- Ejecutar en Supabase → SQL Editor → New query → Run.
-- Crea la tabla donde caen los presupuestos del formulario /presupuesto.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'nuevo',

  nombre_apellido text not null,
  nombre_negocio text not null,
  telefono text not null,
  email text not null,
  ciudad text,
  antiguedad_negocio text,

  rubro text not null,
  detalle_rubro jsonb not null default '{}'::jsonb,

  redes_activas text,
  redes_handle text,
  tono_comunicacion text,
  objetivo_principal text,
  presupuesto_ads text,
  materiales_visuales text[],
  restricciones_marca text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS habilitado y sin policies públicas: nadie puede leer/escribir con la
-- anon key. El formulario público inserta y el panel admin lee usando la
-- service_role key desde el servidor (nunca desde el navegador), que
-- siempre bypassea RLS — así que esto es "cerrado por defecto" a propósito.
alter table public.leads enable row level security;
