import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappUrl } from "@/lib/whatsapp";

export function CallToAction() {
  const wa = whatsappUrl();

  return (
    <section className="px-5 py-12 sm:px-8">
      <Reveal className="border-electric/25 bg-deep relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border px-6 py-16 text-center sm:px-12 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid absolute inset-0" />
          <div className="bg-electric/25 absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full blur-[100px]" />
          <div className="via-electric absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent" />
        </div>
        <div className="relative">
          <h2 className="font-display text-ice mx-auto max-w-3xl text-3xl leading-tight font-bold text-balance sm:text-5xl">
            Tu próximo nivel comienza con una decisión
          </h2>
          <p className="text-muted mx-auto mt-5 max-w-2xl text-lg text-pretty">
            Cuéntanos qué necesita tu negocio y construyamos juntos una solución adaptada a tus objetivos.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/#contacto">
              Solicitar asesoría <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            {wa && (
              <ExternalButton href={wa} variant="secondary">
                <MessageCircle className="size-4" aria-hidden /> Contactar por WhatsApp
              </ExternalButton>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
