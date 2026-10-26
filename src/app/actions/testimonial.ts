"use server";

import { looksLikeBot, notify } from "@/lib/notify";
import {
  testimonialErrors,
  testimonialFormToObject,
  testimonialSchema,
  type TestimonialState,
} from "@/lib/testimonial-schema";

/**
 * Recibe un testimonio y lo envía para moderación.
 * No se publica automáticamente: se agrega a `src/data/content.ts` una vez revisado.
 */
export async function submitTestimonial(_prev: TestimonialState, formData: FormData): Promise<TestimonialState> {
  if (looksLikeBot(formData)) {
    return { status: "error", message: "No pudimos procesar el envío. Espera unos segundos e inténtalo de nuevo." };
  }

  const parsed = testimonialSchema.safeParse(testimonialFormToObject(formData));
  if (!parsed.success) {
    return { status: "invalid", message: "Revisa los campos marcados.", fieldErrors: testimonialErrors(parsed.error) };
  }

  const data = parsed.data;
  const submittedAt = new Date().toISOString();
  try {
    const delivered = await notify({
      subject: `Nuevo testimonio (${data.rating}★) — ${data.name}`,
      heading: "Nuevo testimonio para revisar",
      replyTo: data.email,
      rows: [
        ["Nombre", data.name],
        ["Negocio / empresa", data.company || "—"],
        ["Correo", data.email],
        ["Calificación", `${"★".repeat(data.rating)}${"☆".repeat(5 - data.rating)} (${data.rating}/5)`],
        ["Autoriza publicación", "Sí"],
        ["Fecha", submittedAt],
      ],
      body: { title: "Testimonio", text: data.quote },
      payload: { type: "testimonio", ...data, submittedAt },
    });
    if (!delivered) {
      return {
        status: "unavailable",
        message:
          "El formulario aún no está conectado a un servicio de envío, así que tu testimonio no se ha enviado. Puedes compartirlo con nosotros por WhatsApp.",
      };
    }
    return {
      status: "success",
      message: "¡Gracias por tu testimonio! Lo revisaremos y lo publicaremos pronto.",
    };
  } catch (error) {
    console.error("[testimonial] Error al enviar el testimonio:", error);
    return { status: "error", message: "Ocurrió un problema al enviar tu testimonio. Inténtalo de nuevo más tarde." };
  }
}
