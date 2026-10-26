import { Clock, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "./ContactForm";

type Props = {
  defaultService?: string;
  title?: string;
  description?: string;
};

export function ContactSection({
  defaultService,
  title = "Hablemos de tu negocio",
  description = "Completa el formulario y te responderemos con una propuesta adaptada a tus objetivos.",
}: Props) {
  const wa = whatsappUrl();
  const { email, phone } = siteConfig.contact;
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.name }));

  return (
    <section id="contacto" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading align="left" eyebrow="Contacto" title={title} description={description} />
          <Reveal delay={120}>
            <ul className="mt-10 space-y-5">
              <li className="flex gap-4">
                <Clock className="text-electric mt-0.5 size-5 shrink-0" aria-hidden />
                <p className="text-muted">
                  Revisamos cada solicitud y te contactamos para entender mejor tu necesidad.
                </p>
              </li>
              <li className="flex gap-4">
                <ShieldCheck className="text-electric mt-0.5 size-5 shrink-0" aria-hidden />
                <p className="text-muted">Tus datos se usan únicamente para responder a tu solicitud.</p>
              </li>
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ice hover:text-electric flex gap-4"
                  >
                    <MessageCircle className="text-electric mt-0.5 size-5 shrink-0" aria-hidden /> Escríbenos por
                    WhatsApp
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="text-ice hover:text-electric flex gap-4 break-all">
                    <Mail className="text-electric mt-0.5 size-5 shrink-0" aria-hidden /> {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-ice hover:text-electric flex gap-4">
                    <Phone className="text-electric mt-0.5 size-5 shrink-0" aria-hidden /> {phone}
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <ContactForm
            serviceOptions={serviceOptions}
            defaultService={defaultService}
            fallback={{ whatsapp: wa, email }}
          />
        </Reveal>
      </div>
    </section>
  );
}
