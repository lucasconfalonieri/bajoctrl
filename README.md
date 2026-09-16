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
