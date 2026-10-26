import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pt-40 pb-28 text-center">
      <p className="font-display text-gradient text-7xl font-bold">404</p>
      <h1 className="font-display text-ice mt-6 text-3xl font-bold">Página no encontrada</h1>
      <p className="text-muted mt-4">La página que buscas no existe o fue movida.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/servicios" variant="secondary">
          Ver servicios
        </ButtonLink>
      </div>
    </section>
  );
}
