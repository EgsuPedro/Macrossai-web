"use server";

import { getService } from "@/data/services";
import { insertContactRequest } from "@/lib/contact-db";
import { contactSchema, type ContactState, flattenErrors, formDataToObject } from "@/lib/contact-schema";
import { looksLikeBot, notify } from "@/lib/notify";
import { supabaseConfigured } from "@/lib/supabase";

/**
 * Guarda la solicitud en Supabase y, si Resend o un webhook están configurados, envía el aviso por correo.
 * Basta con que uno de los dos canales funcione; si ninguno lo hace, se informa al usuario (nunca se simula el envío).
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (looksLikeBot(formData)) {
    return { status: "error", message: "No pudimos procesar el envío. Espera unos segundos e inténtalo de nuevo." };
  }

  const parsed = contactSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    return {
      status: "invalid",
      message: "Revisa los campos marcados.",
      fieldErrors: flattenErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const serviceName = getService(data.service)?.name ?? data.service;
  const submittedAt = new Date().toISOString();

  const [saved, notified] = await Promise.allSettled([
    supabaseConfigured ? insertContactRequest(data, serviceName).then(() => true) : Promise.resolve(false),
    notify({
      subject: `Nueva solicitud: ${serviceName} — ${data.name}`,
      heading: "Nueva solicitud desde el sitio web",
      replyTo: data.email,
      rows: [
        ["Nombre", data.name],
        ["Negocio / empresa", data.company || "—"],
        ["Correo", data.email],
        ["Teléfono / WhatsApp", data.phone],
        ["Servicio de interés", serviceName],
        ["Fecha", submittedAt],
      ],
      body: { title: "Necesidad", text: data.message },
      payload: { type: "contacto", ...data, serviceName, submittedAt },
    }),
  ]);

  if (saved.status === "rejected") console.error("[contact] Error al guardar la solicitud:", saved.reason);
  if (notified.status === "rejected") console.error("[contact] Error al enviar el aviso:", notified.reason);

  const delivered = [saved, notified].some((r) => r.status === "fulfilled" && r.value);
  if (delivered) {
    return { status: "success", message: "¡Gracias! Recibimos tu solicitud y te contactaremos pronto." };
  }

  const configured = supabaseConfigured || [saved, notified].some((r) => r.status === "rejected");
  if (!configured) {
    return {
      status: "unavailable",
      message:
        "El formulario aún no está conectado a un servicio de envío, así que tu mensaje no se ha enviado. Por favor, contáctanos por otro canal.",
    };
  }
  return {
    status: "error",
    message: "Ocurrió un problema al enviar tu solicitud. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.",
  };
}
