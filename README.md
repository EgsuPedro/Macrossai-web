# Macross AI — Sitio web corporativo

Sitio de Macross AI construido con **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4** e iconos **Lucide**.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run lint       # ESLint
npm run typecheck  # verificación de tipos
npm run format     # Prettier
```

## Configuración

Copia `.env.example` como `.env.local` y completa los valores. Todo lo que no esté configurado **no se muestra** en el sitio (no se publican datos inventados):

| Variable                                                       | Uso                                                                          |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                         | Dominio final (SEO, sitemap, Open Graph)                                     |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`                                  | Botones de WhatsApp (formato `5939XXXXXXXX`)                                 |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_PHONE` / `_ADDRESS`            | Datos de contacto en el pie y en la sección de contacto                      |
| `NEXT_PUBLIC_SOCIAL_*`                                         | Enlaces a redes sociales                                                     |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ `CONTACT_FROM_EMAIL`) | Envío del formulario por correo con [Resend](https://resend.com)             |
| `CONTACT_WEBHOOK_URL`                                          | Alternativa: envía el formulario como JSON a un webhook (Make, Zapier, n8n…) |
| `NEXT_PUBLIC_GA_ID`                                            | Google Analytics 4, se carga solo tras aceptar cookies                       |

Si el formulario no tiene Resend ni webhook configurado, avisa al usuario que el mensaje **no** se envió.

## Estructura

```
src/
├── app/                      # Rutas
│   ├── page.tsx              # Inicio (todas las secciones)
│   ├── servicios/            # Catálogo y página de detalle por servicio
│   ├── actions/contact.ts    # Server Action del formulario
│   ├── politica-de-privacidad/, terminos-y-condiciones/
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx, icon.png
├── assets/brand/             # Logo (símbolo) y mascota optimizados
├── components/
│   ├── layout/               # Header, Footer, Logo, LegalPage
│   ├── sections/             # Hero, servicios, soluciones, proceso, portafolio...
│   ├── contact/              # Formulario y sección de contacto
│   ├── analytics/            # GA4 con consentimiento
│   └── ui/                   # Botones, encabezados, animación Reveal
├── config/site.ts            # Datos de la empresa y navegación
├── data/                     # Contenido editable (servicios, soluciones, portafolio, testimonios)
└── lib/                      # Utilidades y validación (zod)
```

## Editar contenido

- **Servicios**: `src/data/services.ts` (cada servicio genera su página `/servicios/<slug>`).
- **Portafolio**: `src/data/content.ts` → `portfolio`. Los ejemplos actuales están marcados como demostraciones conceptuales; reemplázalos por proyectos reales con autorización (`isConcept: false`, `image`, `href`).
- **Testimonios**: `src/data/content.ts` → `testimonials`. Solo se muestran los que tengan `publicationAuthorized: true`; mientras esté vacío se muestran los principios de trabajo.
- **Textos legales**: son una base de referencia y deben ser revisados por un profesional legal.

Las imágenes originales del logo y la mascota están en `assets/originales/`.

Las ilustraciones de servicios (`src/assets/services/<slug>.jpg`) son recortes de la franja central de los flyers de la marca (sin el texto incrustado), a 1200 px de ancho.
