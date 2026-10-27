import "server-only";
import type { ContactInput } from "@/lib/contact-schema";
import { supabaseFetch } from "@/lib/supabase";

/** Guarda la solicitud en la tabla `contact_requests` para revisarla desde el panel de Supabase. */
export async function insertContactRequest(data: ContactInput, serviceName: string) {
  const res = await supabaseFetch("contact_requests", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      name: data.name,
      company: data.company,
      email: data.email.toLowerCase(),
      phone: data.phone,
      service: serviceName,
      message: data.message,
      privacy_accepted: true,
    }),
  });
  if (!res.ok) throw new Error(`Supabase respondió ${res.status}: ${await res.text()}`);
}
