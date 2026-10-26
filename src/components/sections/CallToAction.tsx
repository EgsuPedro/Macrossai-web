import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappUrl } from "@/lib/whatsapp";
import mascota from "@/assets/brand/mascota-recorte.png";

export function CallToAction() {
  const wa = whatsappUrl();

  return (
    <section className="px-5 py-12 sm:px-8">
      <Reveal className="border-electric/25 bg-deep relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="bg-grid absolute inset-0" />
          <div className="bg-electric/25 absolute -top-24 left-1/3 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full blur-[100px]" />
          <div className="bg-electric/20 absolute right-[8%] bottom-0 hidden size-80 rounded-full blur-[90px] lg:block" />
          <div className="via-electric absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent" />
        </div>
        <div className="relative grid items-end lg:grid-cols-[1.5fr_1fr]">
          <div className="px-6 py-16 text-center sm:px-12 sm:py-20 lg:pr-0 lg:text-left">
            <h2 className="font-display text-ice mx-auto max-w-3xl text-3xl leading-tight font-bold text-balance sm:text-5xl lg:mx-0">
              Tu próximo nivel comienza con una decisión
            </h2>
            <p className="text-muted mx-auto mt-5 max-w-2xl text-lg text-pretty lg:mx-0">
              Cuéntanos qué necesita tu negocio y construyamos juntos una solución adaptada a tus objetivos.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
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
          <div aria-hidden className="relative hidden h-full min-h-80 lg:block">
            <Image
              src={mascota}
              alt=""
              sizes="260px"
              className="mascot-fade absolute right-[18%] bottom-0 h-[92%] w-auto"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
