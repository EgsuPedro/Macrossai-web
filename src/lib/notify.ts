import "server-only";

/** Tiempo mínimo (ms) entre que se muestra un formulario y se envía: los bots suelen enviar al instante. */
const MIN_FILL_TIME = 3000;

/** Anti-spam: campo trampa oculto + tiempo mínimo de llenado. */
export function looksLikeBot(formData: FormData) {
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  return Boolean(honeypot) || !startedAt || Date.now() - startedAt < MIN_FILL_TIME;
}

type Notification = {
  subject: string;
  heading: string;
  rows: [string, string][];
  /** Texto largo (mensaje, testimonio). */
  body: { title: string; text: string };
  replyTo?: string;
  /** Datos crudos para el webhook. */
  payload: Record<string, unknown>;
};

/**
 * Envía la notificación por el canal configurado (Resend o webhook).
 * Devuelve `false` si no hay ningún canal configurado: nunca se simula un envío exitoso.
 */
export async function notify(n: Notification): Promise<boolean> {
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
        ...(n.replyTo && { reply_to: n.replyTo }),
        subject: n.subject,
        html: emailHtml(n),
      }),
    });
    if (!res.ok) throw new Error(`Resend respondió ${res.status}: ${await res.text()}`);
    return true;
  }

  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(n.payload),
    });
    if (!res.ok) throw new Error(`El webhook respondió ${res.status}`);
    return true;
  }

  return false;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function emailHtml(n: Notification) {
  return `
    <h2 style="font-family:sans-serif">${escapeHtml(n.heading)}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${n.rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}
    </table>
    <h3 style="font-family:sans-serif">${escapeHtml(n.body.title)}</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(n.body.text)}</p>
  `;
}
