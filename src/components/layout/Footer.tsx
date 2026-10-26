import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { mainNav, siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";
import { CookiePreferencesButton } from "@/components/analytics/CookieConsent";
import { Logo } from "./Logo";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const { contact, social } = siteConfig;
  const wa = whatsappUrl();
  const hasContact = Boolean(contact.email || contact.phone || contact.address || wa);

  return (
    <footer className="border-line relative border-t bg-[#05121f]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="text-muted mt-5 max-w-sm leading-relaxed">{siteConfig.shortDescription}</p>
          <p className="font-display text-electric mt-4 font-semibold">“{siteConfig.slogan}”</p>
          {social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Redes sociales">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-line text-muted hover:border-electric/60 hover:text-ice inline-flex rounded-full border px-4 py-2 text-sm transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Servicios" className="lg:col-span-3">
          <h2 className="font-display text-ice font-semibold">Servicios</h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="text-muted hover:text-electric text-sm transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Navegación del pie" className="lg:col-span-2">
          <h2 className="font-display text-ice font-semibold">Navegación</h2>
          <ul className="mt-4 space-y-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-electric text-sm transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/servicios" className="text-muted hover:text-electric text-sm transition-colors">
                Catálogo completo
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="font-display text-ice font-semibold">Contacto</h2>
          {hasContact ? (
            <ul className="text-muted mt-4 space-y-3 text-sm">
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-electric inline-flex items-center gap-2.5"
                  >
                    <MessageCircle className="text-electric size-4" aria-hidden /> WhatsApp
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-electric inline-flex items-center gap-2.5 break-all"
                  >
                    <Mail className="text-electric size-4 shrink-0" aria-hidden /> {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="hover:text-electric inline-flex items-center gap-2.5"
                  >
                    <Phone className="text-electric size-4" aria-hidden /> {contact.phone}
                  </a>
                </li>
              )}
              {contact.address && (
                <li className="inline-flex items-start gap-2.5">
                  <MapPin className="text-electric mt-0.5 size-4 shrink-0" aria-hidden /> {contact.address}
                </li>
              )}
            </ul>
          ) : (
            <p className="text-muted mt-4 text-sm">
              Escríbenos desde el{" "}
              <Link href="/#contacto" className="text-electric hover:underline">
                formulario de contacto
              </Link>
              .
            </p>
          )}
          <p className="text-muted mt-6 text-sm">Atendemos negocios en {siteConfig.country}.</p>
        </div>
      </div>

      <div className="border-line border-t">
        <div className="text-muted mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/politica-de-privacidad" className="hover:text-electric">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/terminos-y-condiciones" className="hover:text-electric">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <CookiePreferencesButton className="hover:text-electric cursor-pointer" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
