import { z } from "zod";

/** Esquema compartido entre el formulario de testimonios (cliente) y la acción del servidor. */
export const testimonialSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre.").max(80, "El nombre es demasiado largo."),
  company: z.string().trim().max(120, "El nombre del negocio es demasiado largo.").optional().default(""),
  email: z.string().trim().pipe(z.email("Ingresa un correo válido para confirmar tu testimonio.")),
  rating: z.coerce
    .number({ error: "Elige una calificación." })
    .int()
    .min(1, "Elige una calificación.")
    .max(5, "Elige una calificación."),
  quote: z
    .string()
    .trim()
    .min(20, "Cuéntanos un poco más (mínimo 20 caracteres).")
    .max(600, "El testimonio es demasiado largo (máximo 600 caracteres)."),
  consent: z.literal("on", { error: "Necesitamos tu autorización para publicar el testimonio." }),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type TestimonialField = keyof TestimonialInput;

export type TestimonialState = {
  status: "idle" | "success" | "invalid" | "error" | "unavailable";
  message?: string;
  fieldErrors?: Partial<Record<TestimonialField, string>>;
};

const FIELDS: TestimonialField[] = ["name", "company", "email", "rating", "quote", "consent"];

export function testimonialFormToObject(formData: FormData) {
  return Object.fromEntries(FIELDS.map((key) => [key, formData.get(key) ?? undefined]));
}

export function testimonialErrors(error: z.ZodError): Partial<Record<TestimonialField, string>> {
  const out: Partial<Record<TestimonialField, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as TestimonialField;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
