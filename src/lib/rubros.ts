export type FieldType = "text" | "textarea" | "radio" | "checkbox";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
};

export type RubroKey =
  | "salud"
  | "gastronomia"
  | "comercio"
  | "servicios"
  | "funeraria"
  | "laboratorio"
  | "fotografia"
  | "otro";

export type RubroDef = {
  key: RubroKey;
  label: string;
  fields: FieldDef[];
  /** Custom heading + blurb shown above this rubro's fields. */
  intro?: { title: string; description: string };
  /**
   * For bookings of a one-off service (e.g. event photography) rather than
   * an ongoing business: the business name becomes optional, business
   * age and the "digital presence" section are skipped.
   */
  eventMode?: boolean;
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
    key: "fotografia",
    label: "Fotografía y cobertura de eventos",
    eventMode: true,
    intro: {
      title: "Fotografía",
      description:
        "Cada evento es diferente. Contanos qué estás organizando y armamos una propuesta según la duración, ubicación y tipo de cobertura que necesitás.",
    },
    fields: [
      {
        name: "tipo_fotografia",
        label: "¿Qué tipo de fotografía necesitás?",
        type: "radio",
        options: [
          "Evento social",
          "Cumpleaños",
          "Casamiento / civil",
          "15 años",
          "Bautismo / comunión",
          "Evento empresarial",
          "Evento gastronómico",
          "Fotografía de producto",
          "Fotografía para marca / contenido",
          "Retratos",
          "Otro",
        ],
      },
      { name: "detalle_evento", label: "Contanos un poco sobre el evento / proyecto", type: "textarea" },
      { name: "fecha", label: "¿Qué fecha es?", type: "text", placeholder: "Ej: 14/12, o «todavía no está definida»" },
      {
        name: "horario",
        label: "¿En qué horario sería?",
        type: "radio",
        options: ["Mañana", "Mediodía", "Tarde", "Noche", "Todavía no está definido"],
      },
      {
        name: "duracion",
        label: "¿Cuánto tiempo necesitás aproximadamente?",
        type: "radio",
        options: [
          "Hasta 1 hora",
          "1 a 2 horas",
          "2 a 3 horas",
          "3 a 4 horas",
          "Más de 4 horas",
          "Todavía no lo sé",
        ],
      },
      { name: "ubicacion", label: "¿Dónde se realiza?", type: "text", placeholder: "Dirección o zona" },
      {
        name: "cantidad_personas",
        label: "¿Aproximadamente cuántas personas habrá?",
        type: "radio",
        options: ["Hasta 20", "20–50", "50–100", "100–200", "Más de 200", "No sé todavía"],
      },
      {
        name: "tipo_fotos",
        label: "¿Qué tipo de fotos buscás?",
        type: "checkbox",
        options: [
          "Fotos espontáneas / momentos",
          "Fotos grupales",
          "Fotos de ambientación y detalles",
          "Fotos de productos / comida",
          "Fotos posadas",
          "Fotos para redes sociales",
          "Cobertura completa del evento",
          "Otro",
        ],
      },
      {
        name: "adicionales",
        label: "¿Necesitás algún adicional?",
        type: "checkbox",
        options: [
          "Video / clips verticales",
          "Reels",
          "Fotografía + contenido para redes",
          "Flash / iluminación",
          "Otro",
          "Ninguno",
        ],
      },
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
