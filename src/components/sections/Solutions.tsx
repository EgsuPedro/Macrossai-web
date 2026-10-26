import { ArrowRight } from "lucide-react";
import { solutions } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Solutions() {
  return (
    <section id="soluciones" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Soluciones"
          title="Soluciones diseñadas para cada etapa de tu negocio"
          description="No todos los negocios necesitan lo mismo. Adaptamos la combinación de servicios a tu momento y a tus objetivos."
        />
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 90} className="flex">
              <article className="card-hover border-line from-deep to-night relative flex w-full flex-col overflow-hidden rounded-3xl border bg-gradient-to-br p-7">
                <div
                  aria-hidden
                  className="via-electric/60 absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
                />
                <Icon className="text-electric size-8" aria-hidden />
                <h3 className="font-display text-ice mt-5 text-xl font-semibold">{title}</h3>
                <p className="text-muted mt-3 flex-1 leading-relaxed">{text}</p>
              </article>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12 text-center">
          <ButtonLink href="/#contacto" variant="secondary">
            Encuentra tu solución <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
