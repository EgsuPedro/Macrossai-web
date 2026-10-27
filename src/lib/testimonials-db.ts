import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { Testimonial } from "@/data/content";
import { supabaseConfigured, supabaseFetch } from "@/lib/supabase";
import type { TestimonialInput } from "@/lib/testimonial-schema";

/** Etiqueta de caché: se invalida con `updateTag` al publicar un testimonio nuevo. */
export const TESTIMONIALS_TAG = "testimonials";

export const testimonialsDbConfigured = supabaseConfigured;

type Row = { name: string; company: string; quote: string; rating: number; created_at: string };

/** Testimonios publicados, más recientes primero. Nunca selecciona el correo. */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheTag(TESTIMONIALS_TAG);
  cacheLife("minutes");

  if (!testimonialsDbConfigured) return [];
  try {
    const res = await supabaseFetch(
      "testimonials?select=name,company,quote,rating,created_at&published=eq.true&order=created_at.desc&limit=30",
    );
    if (!res.ok) throw new Error(`Supabase respondió ${res.status}: ${await res.text()}`);
    const rows = (await res.json()) as Row[];
    return rows.map((r) => ({
      name: r.name,
      company: r.company,
      quote: r.quote,
      rating: r.rating,
      publicationAuthorized: true,
    }));
  } catch (error) {
    // Si la base de datos falla, la página sigue funcionando con los testimonios locales.
    console.error("[testimonials] No se pudieron leer los testimonios:", error);
    return [];
  }
}

export type InsertResult = "ok" | "duplicate";

export async function insertTestimonial(data: TestimonialInput): Promise<InsertResult> {
  const res = await supabaseFetch("testimonials", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      name: data.name,
      company: data.company,
      email: data.email.toLowerCase(),
      rating: data.rating,
      quote: data.quote,
      consent: true,
    }),
  });
  if (res.status === 409) return "duplicate";
  if (!res.ok) throw new Error(`Supabase respondió ${res.status}: ${await res.text()}`);
  return "ok";
}
