import { pillars } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValueProposition() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Propuesta de valor"
          title="Todo lo que tu negocio necesita para crecer"
          description="Centraliza tus necesidades de marketing, tecnología y gestión empresarial con un equipo estratégico enfocado en ayudarte a avanzar."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 100}
              className="glass card-hover group relative overflow-hidden rounded-3xl p-8"
            >
              <div
                aria-hidden
                className="bg-electric/10 absolute -top-16 -right-16 size-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60"
              />
              <span aria-hidden className="font-display text-electric/50 absolute top-7 right-8 text-sm font-semibold">
                0{i + 1}
              </span>
              <div className="border-electric/30 bg-electric/10 inline-flex size-14 items-center justify-center rounded-2xl border">
                <Icon className="text-electric size-7" aria-hidden />
              </div>
              <h3 className="font-display text-ice mt-6 text-2xl font-semibold">{title}</h3>
              <p className="text-muted mt-3 leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
