import { z } from "zod";

/** Esquema compartido entre el formulario (cliente) y la acción del servidor. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre.").max(100, "El nombre es demasiado largo."),
  company: z.string().trim().max(120, "El nombre del negocio es demasiado largo.").optional().default(""),
  email: z.string().trim().pipe(z.email("Ingresa un correo electrónico válido.")),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Ingresa un teléfono o WhatsApp válido (solo números, espacios o +)."),
  service: z
    .string({ error: "Selecciona un servicio de interés." })
    .trim()
    .min(1, "Selecciona un servicio de interés."),
  message: z
    .string()
    .trim()
    .min(15, "Cuéntanos un poco más sobre tu necesidad (mínimo 15 caracteres).")
    .max(2000, "El mensaje es demasiado largo (máximo 2000 caracteres)."),
  privacy: z.literal("on", { error: "Debes aceptar la política de privacidad." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState = {
  status: "idle" | "success" | "invalid" | "error" | "unavailable";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

export function formDataToObject(formData: FormData) {
  return Object.fromEntries(
    ["name", "company", "email", "phone", "service", "message", "privacy"].map((key) => [
      key,
      formData.get(key) ?? undefined,
    ]),
  );
}

export function flattenErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const out: Partial<Record<ContactField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as ContactField;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
