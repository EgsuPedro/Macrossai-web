import Image from "next/image";
import { differentiators } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import logoMark from "@/assets/brand/logo-mark.png";

export function Differentiators() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="bg-electric/8 absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Nosotros"
            title="Más que servicios, un aliado para tu crecimiento"
            description="Macross AI une marketing, tecnología y gestión empresarial para que los negocios avancen con una sola visión estratégica, en lugar de coordinar proveedores desconectados."
          />
          <Reveal delay={150} className="relative mt-12 hidden max-w-sm lg:block">
            <Image
              src={logoMark}
              alt=""
              sizes="384px"
              className="w-full [mask-image:linear-gradient(to_bottom,black_70%,transparent)] opacity-90"
            />
          </Reveal>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {differentiators.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 90} className="glass card-hover rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="bg-electric/10 inline-flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-electric size-5" aria-hidden />
                </span>
                <h3 className="font-display text-ice font-semibold">{title}</h3>
              </div>
              <p className="text-muted mt-3 leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
