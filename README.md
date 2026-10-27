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

El formulario de contacto guarda cada solicitud en Supabase (tabla `contact_requests`) y, si Resend o el webhook están configurados, además envía un aviso por correo. Basta con que uno de los dos funcione; si ninguno está configurado, avisa al usuario que el mensaje **no** se envió.

### Supabase (solicitudes de contacto y testimonios)

Las solicitudes del formulario de contacto quedan en **Table Editor → contact_requests** (marca `attended` cuando ya respondiste). Los testimonios enviados desde "Comparte tu experiencia" se guardan en la tabla `testimonials` y se publican al instante.

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. En **SQL Editor → New query**, pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) y pulsa **Run** (se puede volver a ejecutar sin perder datos).
3. En **Project Settings → API** copia la **Project URL** y la clave secreta (**service_role** o `sb_secret_…`).
4. Agrégalas como `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` en `.env.local` y en las variables de entorno de Vercel.

Para ocultar un testimonio: **Table Editor → testimonials**, desmarca `published` (o borra la fila). El cambio se refleja en el sitio en pocos minutos.

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
- **Testimonios**: `src/data/content.ts` → `testimonials`. Los visitantes envían testimonios desde "Comparte tu experiencia" y se publican al instante desde Supabase. Los de ejemplo (`isSample: true`, con la etiqueta "Testimonio de ejemplo") solo se muestran mientras haya menos de 3 testimonios reales.
- **Textos legales**: son una base de referencia y deben ser revisados por un profesional legal.

Las imágenes originales del logo y la mascota están en `assets/originales/`.

Las ilustraciones de servicios (`src/assets/services/<slug>.jpg`) son recortes de la franja central de los flyers de la marca (sin el texto incrustado), a 1200 px de ancho.
