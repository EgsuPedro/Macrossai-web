import { testimonials } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedTestimonials } from "@/lib/testimonials-db";
import { whatsappUrl } from "@/lib/whatsapp";
import { TestimonialForm } from "./TestimonialForm";
import { TestimonialSlider } from "./TestimonialSlider";

/** Con al menos este número de testimonios reales, dejan de mostrarse los de ejemplo. */
const MIN_REAL_BEFORE_HIDING_SAMPLES = 3;

export async function Testimonials() {
  const fromDb = await getPublishedTestimonials();
  const local = testimonials.filter((t) => t.publicationAuthorized && !t.isSample);
  const real = [...fromDb, ...local];
  const samples = real.length < MIN_REAL_BEFORE_HIDING_SAMPLES ? testimonials.filter((t) => t.isSample) : [];
  const visibleTestimonials = [...real, ...samples];
  const hasSamples = samples.length > 0;

  return (
    <section id="testimonios" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="via-deep/50 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
        <div className="bg-electric/10 absolute top-1/3 left-1/2 h-72 w-[40rem] max-w-full -translate-x-1/2 rounded-full blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Testimonios"
            title="Lo que dicen los negocios que crecen con nosotros"
            description="Experiencias de emprendedores y empresas que confiaron en Macross AI para impulsar su marca y sus ventas."
          />
          <Reveal delay={120} className="shrink-0">
            <TestimonialForm whatsapp={whatsappUrl("Hola Macross AI, quiero compartir mi testimonio:")} />
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-14">
          <TestimonialSlider items={visibleTestimonials} />
        </Reveal>

        {hasSamples && (
          <p className="text-muted mt-6 text-xs">
            Los testimonios marcados como “Testimonio de ejemplo” son ilustrativos y se reemplazarán por opiniones
            reales de clientes.
          </p>
        )}
      </div>
    </section>
  );
}
