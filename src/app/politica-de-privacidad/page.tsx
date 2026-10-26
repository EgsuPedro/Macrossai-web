import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Macross AI recopila, usa y protege los datos personales de quienes visitan el sitio y nos contactan.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PrivacyPage() {
  const email = siteConfig.contact.email;
  return (
    <LegalPage title="Política de privacidad" updated="octubre de 2026">
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          {siteConfig.name} es responsable del tratamiento de los datos personales recopilados a través de este sitio
          web, de conformidad con la Ley Orgánica de Protección de Datos Personales del Ecuador y su normativa
          aplicable.
          {email ? (
            <>
              {" "}
              Puedes contactarnos en{" "}
              <a href={`mailto:${email}`} className="text-electric">
                {email}
              </a>
              .
            </>
          ) : (
            <>
              {" "}
              Puedes contactarnos a través del{" "}
              <Link href="/#contacto" className="text-electric">
                formulario de contacto
              </Link>
              .
            </>
          )}
        </p>
      </section>
      <section>
        <h2>2. Datos que recopilamos</h2>
        <ul>
          <li>
            Datos que nos entregas en el formulario: nombre, negocio o empresa, correo electrónico, teléfono, servicio
            de interés y la descripción de tu necesidad.
          </li>
          <li>Datos de navegación anónimos o seudonimizados, solo si aceptas las cookies de analítica.</li>
        </ul>
      </section>
      <section>
        <h2>3. Finalidad</h2>
        <p>
          Usamos tus datos para responder a tu solicitud, preparar propuestas comerciales y dar seguimiento a la
          relación contigo. Con tu consentimiento, usamos datos de analítica para mejorar el sitio.
        </p>
      </section>
      <section>
        <h2>4. Base legal</h2>
        <p>
          El tratamiento se basa en tu consentimiento, otorgado al marcar la casilla del formulario o al aceptar las
          cookies de analítica, y en la ejecución de medidas precontractuales que solicitas.
        </p>
      </section>
      <section>
        <h2>5. Conservación</h2>
        <p>
          Conservamos los datos durante el tiempo necesario para atender tu solicitud y cumplir las obligaciones legales
          aplicables.
        </p>
      </section>
      <section>
        <h2>6. Encargados y transferencias</h2>
        <p>
          Podemos apoyarnos en proveedores tecnológicos (por ejemplo, servicios de correo electrónico, alojamiento web o
          analítica) que tratan datos por nuestra cuenta y bajo medidas de seguridad adecuadas. No vendemos tus datos
          personales.
        </p>
      </section>
      <section>
        <h2>7. Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación y actualización, eliminación, oposición, portabilidad y
          suspensión del tratamiento, así como revocar tu consentimiento en cualquier momento, escribiéndonos por los
          canales indicados.
        </p>
      </section>
      <section>
        <h2>8. Cookies</h2>
        <p>
          Este sitio solo utiliza cookies de analítica si las aceptas en el aviso correspondiente. Puedes cambiar tu
          elección en cualquier momento desde el enlace “Preferencias de cookies” al pie de cada página.
        </p>
      </section>
    </LegalPage>
  );
}
