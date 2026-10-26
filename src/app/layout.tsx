import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/config/site";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Marketing, tecnología y crecimiento empresarial en Ecuador`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "agencia de marketing digital Ecuador",
    "publicidad en Facebook Ads",
    "manejo de redes sociales",
    "diseño de páginas web",
    "desarrollo de aplicaciones",
    "tiendas online",
    "facturación electrónica Ecuador",
    "asesoría empresarial",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#071827",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  slogan: siteConfig.slogan,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/icon-512.png`,
  areaServed: { "@type": "Country", name: siteConfig.country },
  currenciesAccepted: siteConfig.currency,
  ...(siteConfig.contact.email && { email: siteConfig.contact.email }),
  ...(siteConfig.contact.phone && { telephone: siteConfig.contact.phone }),
  ...(siteConfig.contact.address && {
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.city,
      addressCountry: "EC",
    },
  }),
  ...(siteConfig.social.length > 0 && { sameAs: siteConfig.social.map((s) => s.href) }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-EC" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Activa las animaciones de aparición solo si JavaScript está disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="flex min-h-svh flex-col font-sans">
        <a
          href="#contenido"
          className="bg-electric text-night sr-only z-[60] rounded-full px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent gaId={siteConfig.gaId} />
      </body>
    </html>
  );
}
