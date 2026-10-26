"use server";

import { updateTag } from "next/cache";
import { looksLikeBot, notify } from "@/lib/notify";
import {
  testimonialErrors,
  testimonialFormToObject,
  testimonialSchema,
  type TestimonialState,
} from "@/lib/testimonial-schema";
import { insertTestimonial, TESTIMONIALS_TAG, testimonialsDbConfigured } from "@/lib/testimonials-db";

/**
 * Guarda el testimonio en Supabase y lo publica de inmediato en el slider.
 * Si Resend o un webhook están configurados, además envía un aviso para poder revisarlo.
 */
export async function submitTestimonial(_prev: TestimonialState, formData: FormData): Promise<TestimonialState> {
  if (looksLikeBot(formData)) {
    return { status: "error", message: "No pudimos procesar el envío. Espera unos segundos e inténtalo de nuevo." };
  }

  const parsed = testimonialSchema.safeParse(testimonialFormToObject(formData));
  if (!parsed.success) {
    return { status: "invalid", message: "Revisa los campos marcados.", fieldErrors: testimonialErrors(parsed.error) };
  }

  if (!testimonialsDbConfigured) {
    return {
      status: "unavailable",
      message:
        "La publicación de testimonios aún no está conectada, así que tu testimonio no se ha guardado. Puedes compartirlo con nosotros por WhatsApp.",
    };
  }

  const data = parsed.data;
  try {
    const result = await insertTestimonial(data);
    if (result === "duplicate") {
      return {
        status: "invalid",
        message: "Ya recibimos un testimonio con este correo. ¡Gracias por compartir tu experiencia!",
        fieldErrors: { email: "Este correo ya tiene un testimonio publicado." },
      };
    }
  } catch (error) {
    console.error("[testimonial] Error al guardar el testimonio:", error);
    return { status: "error", message: "Ocurrió un problema al guardar tu testimonio. Inténtalo de nuevo más tarde." };
  }

  // Refresca el slider al instante para todos los visitantes.
  updateTag(TESTIMONIALS_TAG);

  // Aviso opcional por correo/webhook; si falla o no está configurado, el testimonio ya quedó publicado.
  notify({
    subject: `Nuevo testimonio publicado (${data.rating}★) — ${data.name}`,
    heading: "Se publicó un nuevo testimonio en el sitio",
    replyTo: data.email,
    rows: [
      ["Nombre", data.name],
      ["Negocio / empresa", data.company || "—"],
      ["Correo", data.email],
      ["Calificación", `${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)} (${data.rating}/5)`],
    ],
    body: { title: "Testimonio", text: data.quote },
    payload: { type: "testimonio", ...data, submittedAt: new Date().toISOString() },
  }).catch((error) => console.error("[testimonial] No se pudo enviar el aviso:", error));

  return { status: "success", message: "¡Gracias por tu testimonio! Ya está publicado en nuestra página." };
}
