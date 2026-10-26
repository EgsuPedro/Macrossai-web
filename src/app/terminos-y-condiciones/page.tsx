import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de uso del sitio web de Macross AI.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Términos y condiciones" updated="octubre de 2026">
      <section>
        <h2>1. Objeto</h2>
        <p>
          Estos términos regulan el uso del sitio web de {siteConfig.name}. Al navegar en el sitio aceptas estas
          condiciones.
        </p>
      </section>
      <section>
        <h2>2. Información de los servicios</h2>
        <p>
          La información publicada sobre los servicios es referencial. El alcance, los plazos y los valores de cada
          servicio se establecen en una propuesta o contrato específico, expresados en dólares estadounidenses (USD).
          {` ${siteConfig.name}`} no garantiza resultados comerciales específicos, ya que estos dependen de múltiples
          factores ajenos a nuestro control.
        </p>
      </section>
      <section>
        <h2>3. Propiedad intelectual</h2>
        <p>
          La marca, el logotipo, la mascota, los textos y los diseños de este sitio pertenecen a {siteConfig.name} o a
          sus respectivos titulares, y no pueden ser utilizados sin autorización.
        </p>
      </section>
      <section>
        <h2>4. Uso adecuado</h2>
        <p>
          Te comprometes a no usar el sitio ni sus formularios para fines ilícitos, envío de spam o actividades que
          afecten su funcionamiento.
        </p>
      </section>
      <section>
        <h2>5. Enlaces a terceros</h2>
        <p>
          El sitio puede incluir enlaces a plataformas de terceros (por ejemplo, WhatsApp o redes sociales), cuyas
          políticas son responsabilidad de cada proveedor.
        </p>
      </section>
      <section>
        <h2>6. Legislación aplicable</h2>
        <p>Estos términos se rigen por la legislación de la República del Ecuador.</p>
      </section>
    </LegalPage>
  );
}
