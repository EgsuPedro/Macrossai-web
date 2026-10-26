"use server";

import { getService } from "@/data/services";
import {
  contactSchema,
  type ContactInput,
  type ContactState,
  flattenErrors,
  formDataToObject,
} from "@/lib/contact-schema";

/** Tiempo mínimo (ms) entre que se muestra el formulario y se envía: los bots suelen enviar al instante. */
const MIN_FILL_TIME = 3000;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Anti-spam: campo trampa oculto + tiempo mínimo de llenado.
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  if (honeypot || !startedAt || Date.now() - startedAt < MIN_FILL_TIME) {
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
  try {
    const delivered = await deliver(data);
    if (!delivered) {
      return {
        status: "unavailable",
        message:
          "El formulario aún no está conectado a un servicio de envío, así que tu mensaje no se ha enviado. Por favor, contáctanos por otro canal.",
      };
    }
    return { status: "success", message: "¡Gracias! Recibimos tu solicitud y te contactaremos pronto." };
  } catch (error) {
    console.error("[contact] Error al enviar la solicitud:", error);
    return {
      status: "error",
      message: "Ocurrió un problema al enviar tu solicitud. Inténtalo de nuevo en unos minutos.",
    };
  }
}

/**
 * Envía la solicitud por el canal configurado.
 * Devuelve `false` si no hay ningún canal configurado (nunca se simula un envío exitoso).
 */
async function deliver(data: ContactInput): Promise<boolean> {
  const serviceName = getService(data.service)?.name ?? data.service;
  const payload = { ...data, serviceName, submittedAt: new Date().toISOString() };

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (resendKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Macross AI <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: `Nueva solicitud: ${serviceName} — ${data.name}`,
        html: emailHtml(payload),
      }),
    });
    if (!res.ok) throw new Error(`Resend respondió ${res.status}: ${await res.text()}`);
    return true;
  }

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`El webhook respondió ${res.status}`);
    return true;
  }

  return false;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function emailHtml(p: ContactInput & { serviceName: string; submittedAt: string }) {
  const rows: [string, string][] = [
    ["Nombre", p.name],
    ["Negocio / empresa", p.company || "—"],
    ["Correo", p.email],
    ["Teléfono / WhatsApp", p.phone],
    ["Servicio de interés", p.serviceName],
    ["Fecha", p.submittedAt],
  ];
  return `
    <h2 style="font-family:sans-serif">Nueva solicitud desde el sitio web</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}
    </table>
    <h3 style="font-family:sans-serif">Necesidad</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(p.message)}</p>
  `;
}
