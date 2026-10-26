import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowRight, ChevronRight, CircleCheck, MessageCircle } from "lucide-react";
import { ContactSection } from "@/components/contact/ContactSection";
import { Process } from "@/components/sections/Process";
import { ServiceCard } from "@/components/sections/ServicesCatalog";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { getService, serviceCategories, services, servicesByCategory } from "@/data/services";
import { whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicios/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      title: `${service.seo.title} | ${siteConfig.name}`,
      description: service.seo.description,
      images: [{ url: service.image.src, width: service.image.width, height: service.image.height }],
    },
  };
}

export default function ServicePage({ params }: PageProps<"/servicios/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-svh" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: { params: PageProps<"/servicios/[slug]">["params"] }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const category = serviceCategories.find((c) => c.id === service.category)!;
  const related = servicesByCategory(service.category).filter((s) => s.slug !== service.slug);
  const wa = whatsappUrl(`Hola Macross AI, me interesa el servicio de ${service.name}.`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seo.description,
    serviceType: category.name,
    areaServed: { "@type": "Country", name: siteConfig.country },
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/servicios/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,#0b2238_0%,#071827_70%)]" />
          <div className="bg-grid absolute inset-0" />
          <div className="bg-electric/15 absolute top-10 right-[10%] size-80 rounded-full blur-[110px]" />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Ruta de navegación">
            <ol className="text-muted flex flex-wrap items-center gap-1.5 text-sm">
              {[
                { label: "Inicio", href: "/" },
                { label: "Servicios", href: "/servicios" },
              ].map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  <Link href={crumb.href} className="hover:text-electric">
                    {crumb.label}
                  </Link>
                  <ChevronRight className="size-4" aria-hidden />
                </li>
              ))}
              <li aria-current="page" className="text-ice">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <Reveal>
                <p className="text-teal text-xs font-semibold tracking-[0.2em] uppercase">{category.name}</p>
                <h1 className="font-display mt-4 flex items-center gap-4 text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
                  <span className="border-electric/30 bg-electric/10 inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border sm:size-16">
                    <Icon className="text-electric size-7 sm:size-8" aria-hidden />
                  </span>
                  {service.name}
                </h1>
                <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
                  {service.intro}
                </p>
              </Reveal>
              <Reveal delay={120} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#contacto">
                  Solicitar información <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                {wa && (
                  <ExternalButton href={wa} variant="secondary">
                    <MessageCircle className="size-4" aria-hidden /> WhatsApp
                  </ExternalButton>
                )}
              </Reveal>
            </div>
            <Reveal delay={160} className="relative">
              <div aria-hidden className="bg-electric/20 absolute -inset-6 rounded-[3rem] blur-3xl" />
              <div className="border-electric/30 relative overflow-hidden rounded-[2rem] border shadow-[0_0_60px_-20px_rgb(18_216_232/0.6)]">
                <Image
                  src={service.image}
                  alt={`Ilustración de ${service.name} con la mascota de Macross AI`}
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal className="glass rounded-3xl p-8">
            <h2 className="font-display text-ice text-2xl font-semibold">Beneficios</h2>
            <ul className="mt-6 space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <CircleCheck className="text-electric mt-0.5 size-5 shrink-0" aria-hidden />
                  <span className="text-muted leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="glass rounded-3xl p-8">
            <h2 className="font-display text-ice text-2xl font-semibold">Alcance del servicio</h2>
            <ul className="mt-6 space-y-4">
              {service.scope.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="bg-electric mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden />
                  <span className="text-muted leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
            <p className="border-line text-muted mt-6 border-t pt-5 text-sm">
              El alcance final se define en una propuesta personalizada según las necesidades de tu negocio. Las
              propuestas se cotizan en dólares estadounidenses (USD).
            </p>
          </Reveal>
        </div>
      </section>

      <Process compact />

      <ContactSection
        defaultService={service.slug}
        title={`Solicita información: ${service.name}`}
        description="Cuéntanos sobre tu negocio y te enviaremos una propuesta adaptada a lo que necesitas."
      />

      {related.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-ice text-2xl font-semibold">
              Otros servicios de {category.name.toLowerCase()}
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug} className="flex">
                  <ServiceCard service={s} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
