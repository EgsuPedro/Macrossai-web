import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { CallToAction } from "@/components/sections/CallToAction";
import { ServicesCatalog } from "@/components/sections/ServicesCatalog";

export const metadata: Metadata = {
  title: "Servicios de marketing, desarrollo web y asesoría empresarial",
  description:
    "Catálogo de servicios de Macross AI en Ecuador: marketing digital, Facebook Ads, redes sociales, páginas web, aplicaciones, e-commerce, facturación electrónica, contabilidad, finanzas y diseño empresarial.",
  alternates: { canonical: "/servicios" },
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <ServicesCatalog headingAs="h1" />
      <CallToAction />
      <ContactSection />
    </div>
  );
}
