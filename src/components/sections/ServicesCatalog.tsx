import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Service, serviceCategories, servicesByCategory } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesCatalog({ headingAs = "h2" }: { headingAs?: "h1" | "h2" }) {
  return (
    <section id="servicios" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="via-deep/40 pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-transparent"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          as={headingAs}
          eyebrow="Catálogo de servicios"
          title="Servicios para cada área de tu negocio"
          description="Doce servicios organizados en cuatro áreas para que encuentres rápido lo que necesitas, o combines varios en una solución integral."
        />

        <div className="mt-16 space-y-14">
          {serviceCategories.map((category, ci) => (
            <ul key={category.id} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal as="li" className="flex flex-col justify-center py-4 sm:col-span-2 lg:col-span-1 lg:pr-6">
                <p className="text-teal text-xs font-semibold tracking-[0.2em] uppercase">Categoría {ci + 1}</p>
                <h3 className="font-display text-ice mt-3 text-2xl leading-snug font-semibold sm:text-3xl">
                  {category.name}
                </h3>
                <p className="text-muted mt-3 leading-relaxed">{category.description}</p>
                <span aria-hidden className="from-electric mt-6 h-px w-24 bg-gradient-to-r to-transparent" />
              </Reveal>
              {servicesByCategory(category.id).map((service, i) => (
                <Reveal as="li" key={service.slug} delay={(i + 1) * 80} className="flex">
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="glass card-hover group relative flex w-full flex-col rounded-3xl p-6">
      <div className="border-electric/25 bg-electric/10 group-hover:bg-electric/20 inline-flex size-12 items-center justify-center rounded-xl border transition-colors">
        <Icon className="text-electric size-6" aria-hidden />
      </div>
      <h4 className="font-display text-ice mt-5 text-lg font-semibold">{service.name}</h4>
      <p className="text-muted mt-2 flex-1 text-[0.95rem] leading-relaxed">{service.summary}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
        <Link
          href={`/servicios/${service.slug}`}
          className="text-electric hover:text-ice inline-flex items-center gap-1.5 transition-colors after:absolute after:inset-0 after:rounded-3xl"
        >
          Conocer servicio <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          <span className="sr-only">: {service.name}</span>
        </Link>
        <Link
          href={`/servicios/${service.slug}#contacto`}
          className="text-muted hover:text-ice relative z-10 transition-colors"
        >
          Solicitar información
        </Link>
      </div>
    </article>
  );
}
