export type FieldType = "text" | "textarea" | "radio" | "checkbox";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
};

export type RubroKey =
  | "salud"
  | "gastronomia"
  | "comercio"
  | "servicios"
  | "funeraria"
  | "laboratorio"
  | "otro";

export type RubroDef = {
  key: RubroKey;
  label: string;
  fields: FieldDef[];
};

export const RUBROS: RubroDef[] = [
  {
    key: "salud",
    label: "Salud",
    fields: [
      {
        name: "especialidad",
        label: "Especialidad",
        type: "checkbox",
        options: [
          "Odontología",
          "Medicina general/clínica",
          "Medicina estética",
          "Pediatría",
          "Cirugía",
          "Kinesiología",
          "Nutrición",
          "Psicología",
          "Otra",
        ],
      },
      { name: "formacion", label: "Formación / credenciales", type: "textarea" },
      {
        name: "cobertura",
        label: "Cobertura",
        type: "radio",
        options: ["Solo particular", "Obras sociales y particular", "Solo obras sociales"],
      },
      { name: "obras_sociales", label: "¿Qué obras sociales?", type: "text" },
      { name: "horarios", label: "Días y horarios de atención", type: "text" },
      { name: "tratamiento_destacado", label: "Tratamiento o servicio destacado", type: "textarea" },
    ],
  },
  {
    key: "gastronomia",
    label: "Gastronomía",
    fields: [
      {
        name: "tipo_establecimiento",
        label: "Tipo de establecimiento",
        type: "radio",
        options: ["Restaurante", "Bar", "Cafetería", "Servicio de catering/eventos", "Otro"],
      },
      { name: "descripcion_menu", label: "Descripción del menú", type: "textarea" },
      {
        name: "modalidad",
        label: "Modalidad de servicio",
        type: "checkbox",
        options: ["Salón", "Take away", "Delivery"],
      },
      { name: "rango_precios", label: "Rango de precios", type: "text" },
      { name: "promos_recurrentes", label: "Promos o eventos recurrentes", type: "textarea" },
    ],
  },
  {
    key: "comercio",
    label: "Comercio / Retail",
    fields: [
      { name: "tipo_producto", label: "Tipo de producto", type: "textarea" },
      {
        name: "formato_venta",
        label: "Formato de venta",
        type: "radio",
        options: ["Presencial", "Online", "Ambas"],
      },
      { name: "rango_precios", label: "Rango de precios", type: "text" },
      { name: "publico_objetivo", label: "Público objetivo", type: "text" },
    ],
  },
  {
    key: "servicios",
    label: "Servicios profesionales o empresas",
    fields: [
      { name: "descripcion_servicio", label: "Descripción del servicio", type: "textarea" },
      { name: "zona_cobertura", label: "Zona de cobertura", type: "text" },
      {
        name: "tipo_cliente",
        label: "Tipo de cliente",
        type: "radio",
        options: ["Particulares", "Empresas", "Ambos"],
      },
    ],
  },
  {
    key: "funeraria",
    label: "Funeraria",
    fields: [
      {
        name: "servicios_ofrecidos",
        label: "Servicios ofrecidos",
        type: "checkbox",
        options: [
          "Cobertura de servicios fúnebres",
          "Sala velatorio",
          "Cochería",
          "Planes de ahorro/previsión",
          "Cremación",
          "Otro",
        ],
      },
      { name: "zona_cobertura", label: "Zona de cobertura", type: "text" },
    ],
  },
  {
    key: "laboratorio",
    label: "Laboratorio",
    fields: [
      {
        name: "tipo_laboratorio",
        label: "Tipo de laboratorio",
        type: "radio",
        options: ["Análisis clínicos", "Laboratorio farmacéutico/producción", "Otro"],
      },
      { name: "servicios_estudios", label: "Servicios / estudios que realizan", type: "textarea" },
    ],
  },
  {
    key: "otro",
    label: "Otro",
    fields: [{ name: "descripcion", label: "Contanos sobre tu rubro", type: "textarea" }],
  },
];

export function getRubro(key: string): RubroDef | undefined {
  return RUBROS.find((r) => r.key === key);
}

export const TONO_OPTIONS = [
  "Cercano y de confianza",
  "Profesional y serio",
  "Moderno e innovador",
  "Cálido y familiar",
  "Premium",
  "Otro",
];

export const REDES_ACTIVAS_OPTIONS = [
  "No, todavía no tengo",
  "Sí, pero las uso poco",
  "Sí, las manejo activamente",
];

export const PRESUPUESTO_ADS_OPTIONS = ["Sí", "No", "Todavía no lo definí"];

export const MATERIALES_VISUALES_OPTIONS = [
  "Sí, fotos",
  "Sí, videos",
  "Sí, logos y piezas gráficas",
  "No por ahora",
  "Prefiero contarlo en detalle",
];

export const LEAD_STATUSES = [
  "nuevo",
  "contactado",
  "presupuesto_enviado",
  "ganado",
  "perdido",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  presupuesto_enviado: "Presupuesto enviado",
  ganado: "Ganado",
  perdido: "Perdido",
};
