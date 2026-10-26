import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 pt-36 pb-24 sm:px-8">
      <h1 className="font-display text-ice text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="text-muted mt-4 text-sm">Última actualización: {updated}</p>
      <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
        Documento base de referencia. Debe ser revisado y completado por un profesional legal antes de su publicación
        definitiva.
      </div>
      <div className="text-muted [&_h2]:font-display [&_h2]:text-ice mt-10 space-y-8 leading-relaxed [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2">
        {children}
      </div>
    </article>
  );
}
