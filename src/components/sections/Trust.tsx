import { CircleCheck, Quote } from "lucide-react";
import { processSteps, testimonials, workPrinciples } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Trust() {
  const published = testimonials.filter((t) => t.publicationAuthorized);

  if (published.length > 0) {
    return (
      <section id="testimonios" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Testimonios" title="Lo que dicen quienes trabajan con nosotros" />
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {published.map((t, i) => (
              <Reveal as="li" key={`${t.name}-${t.company}`} delay={(i % 3) * 90} className="glass rounded-3xl p-7">
                <figure>
                  <Quote className="text-electric size-7" aria-hidden />
                  <blockquote className="text-ice/90 mt-4 leading-relaxed">“{t.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="text-ice font-semibold">{t.name}</span>
                    <span className="text-muted"> · {t.company}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="confianza" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Confianza"
          title="Cómo trabajamos contigo"
          description="Principios que guían cada proyecto y la atención que recibes desde el primer contacto."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <ul className="grid gap-5">
            {workPrinciples.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 90} className="glass flex gap-4 rounded-2xl p-6">
                <CircleCheck className="text-electric mt-0.5 size-6 shrink-0" aria-hidden />
                <div>
                  <h3 className="font-display text-ice text-lg font-semibold">{p.title}</h3>
                  <p className="text-muted mt-1.5 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal
            delay={150}
            className="border-electric/25 from-deep to-night rounded-3xl border bg-gradient-to-br p-7"
          >
            <h3 className="font-display text-ice text-xl font-semibold">Así es la atención</h3>
            <ol className="mt-6 space-y-5">
              {[
                "Nos cuentas tu necesidad por el formulario de contacto o por WhatsApp.",
                "Agendamos una conversación para entender tu negocio.",
                "Recibes una propuesta personalizada con alcance y tiempos.",
                `Comenzamos con el paso “${processSteps[0].title}” y avanzamos juntos.`,
              ].map((text, i) => (
                <li key={text} className="flex gap-4">
                  <span className="bg-electric/15 font-display text-electric inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-muted pt-1 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
