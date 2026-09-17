# bajo ctrl — landing

Landing page del estudio creativo **bajo ctrl** (diseño, marketing y community
management), Corrientes, Argentina. Next.js (App Router) + TypeScript +
Tailwind CSS v4.

Diseño basado en el link-in-bio que armó la clienta: fondo bordó sólido con
grilla punteada, isotipo animado, tipografía Unbounded + Space Grotesk +
JetBrains Mono, y botones con borde grueso.

## Desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Estructura

- `src/app/` — layout, página principal y estilos globales (`globals.css`:
  paleta de marca, grilla de fondo, animación de caída del isotipo).
- `src/components/` — secciones de la landing (Header, Hero, Services, About,
  Process, Work, Testimonials, CTA, Footer) + `LinkButton` e `icons` para los
  botones de Instagram/WhatsApp.
- `src/lib/site.ts` — datos de contacto reales (Instagram, WhatsApp,
  ubicación) usados en todo el sitio.
- `public/brand/` — recortes curados del isotipo y logotipo (PNG con
  transparencia) tomados de `assets/`.
- `src/app/presupuesto/` — formulario público de solicitud de presupuesto
  (campos dinámicos según rubro, ver `src/lib/rubros.ts`).
- `src/app/admin/` — bandeja de presupuestos (login + lista + detalle),
  protegida por `src/proxy.ts`.

## Formulario de presupuesto + panel admin

El botón "Contanos tu proyecto" del Hero lleva a `/presupuesto`, un
formulario que replica el que la clienta ya usaba en JotForm: datos
generales, un bloque de campos que cambia según el rubro elegido (salud,
gastronomía, comercio, servicios, funeraria, laboratorio, otro — ver
`src/lib/rubros.ts`, fuente única de verdad para el formulario, la
validación y el panel admin), y una sección de presencia digital/objetivos.

Al enviarse: se guarda en Supabase, se manda un mail de aviso a la admin
(Resend), y queda visible en `/admin` (login con Supabase Auth) para que
desde ahí se le escriba al cliente por WhatsApp con el presupuesto.

**Para conectarlo** (no funciona hasta hacer esto — sin las variables de
entorno, el formulario y el panel admin lo avisan en pantalla en vez de
romper):

1. Creá un proyecto en [supabase.com](https://supabase.com) (gratis).
2. Corré `supabase/schema.sql` en el SQL Editor de Supabase (crea la tabla
   `leads`).
3. Creá el usuario admin en Supabase → Authentication → Users → Add user.
4. Creá una cuenta en [resend.com](https://resend.com) (gratis) y sacá una
   API key.
5. Copiá `.env.local.example` a `.env.local` y completá los valores (ver
   comentarios en ese archivo). En Vercel, cargá las mismas variables en
   Settings → Environment Variables — son secretos, no van al repo.

El proyecto necesita **Node.js 22+** (`@supabase/supabase-js` lo requiere) —
ver `engines` en `package.json`. Verificá que el proyecto en Vercel esté
configurado con esa versión.

## Paleta de marca

| Token          | Hex       | Uso                                  |
| -------------- | --------- | ------------------------------------- |
| `maroon`       | `#741C28` | Fondo base de todo el sitio           |
| `maroon-deep`  | `#591420` | Secciones/paneles de contraste        |
| `pink`         | `#FF8AE5` | Acentos, hover, dividers              |
| `pink-light`   | `#FFD2D9` | Texto secundario, botones claros      |
| `ink`          | `#2D2D2D` | Footer, bordes, botón WhatsApp        |
| `cream`        | `#FFF6F2` | Texto principal sobre fondo oscuro    |

Definidos en `src/app/globals.css`. Usalos como `bg-maroon`, `text-pink-light`,
`border-ink`, etc. gracias al `@theme inline` de Tailwind v4.

## Tipografía

Todas vía `next/font/google` (gratuitas, sin restricciones de licencia):

- **Unbounded** — títulos (`font-display`)
- **Space Grotesk** — cuerpo de texto (`font-sans`)
- **JetBrains Mono** — labels, tabs del header, eyebrows (`font-mono`)

## Contacto

Instagram y WhatsApp reales están centralizados en `src/lib/site.ts` —
actualizalos ahí si cambian.

## Deploy

Pensado para deployar en [Vercel](https://vercel.com/new). Conectá el
repositorio y Vercel detecta Next.js automáticamente.
