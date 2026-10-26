import { ArrowRight, Code2, Megaphone, Sparkles, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVideo } from "./HeroVideo";

const tags = [
  { icon: Megaphone, label: "Marketing inteligente" },
  { icon: Code2, label: "Soluciones digitales" },
  { icon: TrendingUp, label: "Crecimiento empresarial" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 lg:flex lg:min-h-[92svh] lg:items-center lg:pb-24"
    >
      <Backdrop />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <p className="border-line bg-deep/70 text-teal inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur sm:text-sm">
              <Sparkles className="text-electric size-4" aria-hidden />
              Marketing · Tecnología · Estrategia empresarial
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-6 text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Lleva tu negocio al <span className="text-gradient">siguiente nivel</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">
              Marketing, tecnología y estrategia empresarial en un solo lugar. Ayudamos a pequeñas empresas y
              emprendedores a construir marcas más fuertes, atraer clientes y crecer en el mundo digital.
            </p>
          </Reveal>
          <Reveal delay={240} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contacto">
              Quiero hacer crecer mi negocio <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/#servicios" variant="secondary">
              Explorar servicios
            </ButtonLink>
          </Reveal>
          <Reveal delay={320}>
            <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Áreas de especialidad">
              {tags.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="border-line bg-night/70 text-ice/90 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm backdrop-blur"
                >
                  <Icon className="text-electric size-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Un solo video: tarjeta debajo del texto en móvil; a sangre en la mitad derecha en escritorio */}
      <div className="border-electric/30 lg:hero-video-fade relative mx-5 mt-12 aspect-video overflow-hidden rounded-3xl border shadow-[0_0_60px_-20px_rgb(18_216_232/0.6)] sm:mx-8 lg:absolute lg:top-1/2 lg:right-0 lg:-z-10 lg:m-0 lg:w-[60%] lg:-translate-y-1/2 lg:rounded-none lg:border-0 lg:shadow-none">
        <HeroVideo />
      </div>
    </section>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,#0b2238_0%,#071827_70%)]" />
      <div className="bg-grid absolute inset-0" />
      <div className="bg-teal/10 absolute bottom-0 left-[-10%] size-[22rem] rounded-full blur-[110px]" />
    </div>
  );
}
