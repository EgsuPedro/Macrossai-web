import { siteConfig } from "@/config/site";

const DEFAULT_MESSAGE = "Hola Macross AI, me gustaría recibir asesoría para mi negocio.";

/** Devuelve el enlace de WhatsApp o `null` si el número no está configurado. */
export function whatsappUrl(message: string = DEFAULT_MESSAGE): string | null {
  const number = siteConfig.contact.whatsapp?.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
