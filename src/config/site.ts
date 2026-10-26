/**
 * Configuración central del sitio.
 * Los datos de contacto tienen valores por defecto con la información oficial de la empresa
 * y pueden sobrescribirse con variables de entorno (ver .env.example).
 * Las redes sociales solo se muestran si su variable está definida.
 */

const clean = (value: string | undefined) => value?.trim() || undefined;

export const siteConfig = {
  name: "Macross AI",
  slogan: "Transformamos negocios en marcas que crecen",
  description:
    "Marketing digital, desarrollo web, aplicaciones, facturación electrónica y asesoría empresarial en Ecuador. Impulsamos a emprendedores y empresas a construir marcas más fuertes, atraer clientes y crecer.",
  shortDescription:
    "Socio estratégico de crecimiento empresarial: marketing, tecnología y transformación digital para emprendedores y empresas.",
  url: clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.macrossai-ec.com",
  locale: "es_EC",
  country: "Ecuador",
  city: "Quito",
  currency: "USD",
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "macrossaiinfo@gmail.com",
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? "099 869 2958",
    /** Formato internacional sin "+" ni el 0 inicial: 593 + 998692958 */
    whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "593998692958",
    address: clean(process.env.NEXT_PUBLIC_CONTACT_ADDRESS) ?? "José María Guerrero y Vicente López, Cotocollao, Quito",
  },
  social: [
    { label: "Facebook", href: clean(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
    { label: "Instagram", href: clean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
    { label: "TikTok", href: clean(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK) },
    { label: "LinkedIn", href: clean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href)),
  gaId: clean(process.env.NEXT_PUBLIC_GA_ID),
} as const;

export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
] as const;
