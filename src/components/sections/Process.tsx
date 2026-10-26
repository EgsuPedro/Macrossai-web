import { processSteps } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-16" : "py-24 sm:py-32"}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Proceso de trabajo"
          title="De la idea a los resultados, paso a paso"
          description={
            compact ? undefined : "Un método claro para que sepas en todo momento en qué etapa está tu proyecto."
          }
        />
        <div className="relative mt-16">
          <div
            aria-hidden
            className="from-electric/0 via-electric/60 to-electric/0 absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r md:block"
          />
          <div
            aria-hidden
            className="from-electric/60 to-electric/0 absolute top-0 bottom-0 left-7 w-px bg-gradient-to-b md:hidden"
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {processSteps.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 120}
                className="relative flex gap-5 md:flex-col md:items-center md:text-center"
              >
                <div className="border-electric/40 bg-night relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border shadow-[0_0_30px_-8px_rgb(18_216_232/0.6)]">
                  <Icon className="text-electric size-6" aria-hidden />
                </div>
                <div>
                  <p className="text-teal text-xs font-semibold tracking-[0.2em] uppercase md:mt-6">Paso {i + 1}</p>
                  <h3 className="font-display text-ice mt-1 text-xl font-semibold">{title}</h3>
                  <p className="text-muted mt-2 leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
