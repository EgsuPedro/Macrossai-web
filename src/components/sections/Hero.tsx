import Image from "next/image";
import { ArrowRight, ChartColumn, Code2, Megaphone, Sparkles, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import mascota from "@/assets/brand/mascota-recorte.png";

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

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <p className="border-line bg-deep/60 text-teal inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide sm:text-sm">
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
                  className="border-line bg-night/60 text-ice/90 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm"
                >
                  <Icon className="text-electric size-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <HeroIllustration />
        </Reveal>
      </div>
    </section>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_30%,#0b2238_0%,#071827_70%)]" />
      <div className="bg-grid absolute inset-0" />
      <div className="animate-pulse-soft bg-electric/15 absolute top-1/4 right-[8%] size-[28rem] rounded-full blur-[120px]" />
      <div className="bg-teal/10 absolute bottom-0 left-[-10%] size-[22rem] rounded-full blur-[110px]" />
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem]">
      {/* Red de conexiones */}
      <svg viewBox="0 0 400 500" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id="hero-line" x1="0" x2="1">
            <stop offset="0" stopColor="#12D8E8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#12D8E8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#43B8D0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#hero-line)" strokeWidth="1" fill="none">
          <path d="M20 90 L130 150 L200 60 L300 120 L385 70" />
          <path d="M10 330 L90 280 L200 360 L310 300 L395 360" />
          <path d="M60 460 L150 410 L250 470 L360 420" />
          <path d="M130 150 L90 280 M300 120 L310 300 M200 360 L250 470" />
        </g>
        <g fill="#12D8E8">
          {[
            [130, 150],
            [200, 60],
            [300, 120],
            [90, 280],
            [200, 360],
            [310, 300],
            [150, 410],
            [250, 470],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" className="animate-pulse-soft" />
          ))}
        </g>
      </svg>

      {/* Anillos holográficos */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <div className="from-electric/25 via-teal/10 absolute size-[82%] rounded-full bg-radial to-transparent blur-2xl" />
        <div className="border-electric/20 animate-spin-slow absolute size-[86%] rounded-full border border-dashed" />
        <div className="border-teal/25 absolute size-[66%] rounded-full border" />
        <div className="border-electric/10 absolute size-[100%] rounded-full border" />
      </div>

      {/* Plataforma luminosa */}
      <div aria-hidden className="absolute inset-x-[18%] bottom-[5%] h-[9%]">
        <div className="border-electric/50 absolute inset-0 rounded-[50%] border bg-[radial-gradient(ellipse_at_center,rgb(18_216_232/0.45),rgb(18_216_232/0.08)_55%,transparent_72%)] shadow-[0_0_50px_rgb(18_216_232/0.35)]" />
        <div className="border-electric/25 absolute inset-x-[12%] inset-y-[22%] rounded-[50%] border" />
      </div>

      {/* Mascota recortada */}
      <div className="animate-float absolute inset-x-[20%] top-[4%] bottom-[9%]">
        <Image
          src={mascota}
          alt="Mascota de Macross AI: un zorro robótico, asistente inteligente de la marca"
          fill
          priority
          sizes="(min-width: 1024px) 300px, 60vw"
          className="mascot-fade object-contain object-bottom"
        />
      </div>

      {/* Paneles flotantes */}
      <FloatingCard className="top-[12%] -left-1 sm:-left-6" title="Crecimiento" icon={TrendingUp}>
        <svg viewBox="0 0 120 40" className="mt-2 h-10 w-28" aria-hidden>
          <polyline
            points="0,34 20,30 40,32 60,20 80,22 100,10 120,4"
            fill="none"
            stroke="#12D8E8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </FloatingCard>

      <FloatingCard className="top-[45%] -right-1 sm:-right-8" title="Campañas" icon={ChartColumn} delay>
        <div className="mt-2 flex h-10 items-end gap-1.5" aria-hidden>
          {[40, 65, 50, 85, 70].map((h, i) => (
            <span
              key={i}
              className="from-teal/60 to-electric w-3 rounded-sm bg-gradient-to-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[22%] -left-1 sm:-left-4" title="Web y apps" icon={Code2}>
        <div className="mt-2 space-y-1.5" aria-hidden>
          <span className="bg-electric/70 block h-1.5 w-24 rounded" />
          <span className="bg-teal/50 block h-1.5 w-16 rounded" />
          <span className="bg-teal/30 block h-1.5 w-20 rounded" />
        </div>
      </FloatingCard>
    </div>
  );
}

function FloatingCard({
  className,
  title,
  icon: Icon,
  delay,
  children,
}: {
  className: string;
  title: string;
  icon: typeof TrendingUp;
  delay?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden
      className={`glass animate-float absolute rounded-2xl px-4 py-3 shadow-xl shadow-black/30 ${className}`}
      style={delay ? { animationDelay: "-3.5s" } : undefined}
    >
      <p className="text-ice flex items-center gap-2 text-xs font-semibold">
        <Icon className="text-electric size-3.5" />
        {title}
      </p>
      {children}
    </div>
  );
}
