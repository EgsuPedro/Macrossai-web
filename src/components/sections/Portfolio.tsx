import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { portfolio, type PortfolioProject } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Portfolio() {
  const hasConcepts = portfolio.some((p) => p.isConcept);

  return (
    <section id="portafolio" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Portafolio"
          title="Las ideas toman forma con tecnología y estrategia"
          description="Una muestra del tipo de proyectos que desarrollamos: páginas web, campañas, tiendas online, aplicaciones y diseño empresarial."
        />
        {hasConcepts && (
          <Reveal className="text-muted mx-auto mt-6 max-w-2xl text-center text-sm">
            Los proyectos marcados como <strong className="text-ice">Demostración conceptual</strong> son ejemplos
            ilustrativos del tipo de trabajo que realizamos, no casos de clientes reales.
          </Reveal>
        )}
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((project, i) => (
            <Reveal as="li" key={project.name} delay={(i % 3) * 90} className="flex">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="glass card-hover flex w-full flex-col overflow-hidden rounded-3xl">
      <div className="border-line bg-deep relative aspect-[16/10] overflow-hidden border-b">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Captura de ${project.name}`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ConceptPreview category={project.category} />
        )}
        {project.isConcept && (
          <span className="border-electric/40 bg-night/85 text-electric absolute top-3 left-3 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur">
            Demostración conceptual
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-teal text-xs font-semibold tracking-[0.18em] uppercase">{project.category}</p>
        <h3 className="font-display text-ice mt-2 text-lg font-semibold">{project.name}</h3>
        <p className="text-muted mt-2 flex-1 leading-relaxed">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Servicios utilizados">
          {project.services.map((s) => (
            <li key={s} className="border-line text-ice/80 rounded-full border px-3 py-1 text-xs">
              {s}
            </li>
          ))}
        </ul>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric hover:text-ice mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            Ver proyecto <ExternalLink className="size-4" aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

/** Vista ilustrativa (wireframe) mientras no haya capturas reales. */
function ConceptPreview({ category }: { category: string }) {
  return (
    <div aria-hidden className="absolute inset-0 p-5 pt-12">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="border-line bg-night/70 relative h-full rounded-xl border p-4">
        <div className="flex gap-1.5">
          <span className="bg-teal/50 size-2 rounded-full" />
          <span className="bg-teal/30 size-2 rounded-full" />
          <span className="bg-teal/20 size-2 rounded-full" />
        </div>
        <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-3">
          <div className="space-y-2">
            <span className="bg-electric/60 block h-2.5 w-4/5 rounded" />
            <span className="bg-ice/15 block h-2 w-full rounded" />
            <span className="bg-ice/10 block h-2 w-3/4 rounded" />
            <span className="bg-electric/40 mt-3 block h-5 w-20 rounded-full" />
          </div>
          <div className="from-electric/30 to-teal/10 rounded-lg bg-gradient-to-br" />
        </div>
        <p className="font-display text-teal/70 absolute right-4 bottom-3 text-xs">{category}</p>
      </div>
    </div>
  );
}
