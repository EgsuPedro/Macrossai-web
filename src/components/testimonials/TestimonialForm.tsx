"use client";

import { CircleAlert, CircleCheck, LoaderCircle, MessageSquarePlus, Send, Star, X } from "lucide-react";
import { type FormEvent, startTransition, useActionState, useId, useRef, useState } from "react";
import { submitTestimonial } from "@/app/actions/testimonial";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  type TestimonialField,
  testimonialErrors,
  testimonialFormToObject,
  testimonialSchema,
  type TestimonialState,
} from "@/lib/testimonial-schema";

const initialState: TestimonialState = { status: "idle" };
const ratingLabels = ["Malo", "Regular", "Bueno", "Muy bueno", "Excelente"];

export function TestimonialForm({ whatsapp }: { whatsapp?: string | null }) {
  const [state, formAction, pending] = useActionState(submitTestimonial, initialState);
  const [clientErrors, setClientErrors] = useState<TestimonialState["fieldErrors"] | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const startedAt = useRef(0);
  const titleId = useId();

  /** Tras un envío exitoso se muestra el agradecimiento hasta que se vuelve a abrir la ventana. */
  const [thanksDismissed, setThanksDismissed] = useState(false);

  const errors = clientErrors ?? state.fieldErrors ?? {};

  function open() {
    startedAt.current = Date.now();
    setClientErrors(null);
    if (state.status === "success") {
      setThanksDismissed(true);
      setRating(0);
    }
    dialogRef.current?.showModal();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("startedAt", String(startedAt.current));

    const result = testimonialSchema.safeParse(testimonialFormToObject(formData));
    if (!result.success) {
      const fieldErrors = testimonialErrors(result.error);
      setClientErrors(fieldErrors);
      form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
      return;
    }
    setClientErrors(null);
    setThanksDismissed(false);
    startTransition(() => formAction(formData));
  }

  const field = (name: TestimonialField) => ({
    id: `testimonial-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `testimonial-${name}-error` : undefined,
  });

  const shown = hover || rating;
  const done = state.status === "success" && !clientErrors && !pending && !thanksDismissed;

  return (
    <>
      <button type="button" onClick={open} className={buttonClasses("secondary")}>
        <MessageSquarePlus className="size-4" aria-hidden /> Comparte tu experiencia
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="bg-deep text-ice border-line m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border p-0 shadow-2xl shadow-black/60 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      >
        <div className="border-line bg-deep sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-6 py-5">
          <h2 id={titleId} className="font-display text-lg font-semibold">
            Comparte tu experiencia
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar"
            className="text-muted hover:text-ice hover:bg-night inline-flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {done ? (
          <div className="px-6 py-10 text-center" role="status">
            <CircleCheck className="text-electric mx-auto size-12" aria-hidden />
            <p className="font-display mt-4 text-xl font-semibold">¡Gracias!</p>
            <p className="text-muted mx-auto mt-2 max-w-sm">{state.message}</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className={buttonClasses("primary", "mt-8")}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="relative space-y-5 px-6 py-6">
            <p className="text-muted text-sm leading-relaxed">
              Cuéntanos cómo fue trabajar con Macross AI. Revisamos cada testimonio antes de publicarlo.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" name="name" error={errors.name} required>
                <input {...field("name")} type="text" autoComplete="name" className={inputClass(errors.name)} />
              </Field>
              <Field label="Negocio o empresa" name="company" error={errors.company}>
                <input
                  {...field("company")}
                  type="text"
                  autoComplete="organization"
                  className={inputClass(errors.company)}
                />
              </Field>
            </div>

            <Field
              label="Correo electrónico"
              name="email"
              error={errors.email}
              required
              hint="No se publica; solo lo usamos para confirmar tu testimonio."
            >
              <input
                {...field("email")}
                type="email"
                autoComplete="email"
                inputMode="email"
                className={inputClass(errors.email)}
              />
            </Field>

            <fieldset aria-describedby={errors.rating ? "testimonial-rating-error" : undefined}>
              <legend className="mb-2 block text-sm font-medium">
                Calificación <span className="text-electric">*</span>
              </legend>
              <div className="flex items-center gap-3">
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="cursor-pointer" onMouseEnter={() => setHover(value)}>
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={rating === value}
                        onChange={() => setRating(value)}
                        className="peer sr-only"
                      />
                      <span className="sr-only">
                        {value} {value === 1 ? "estrella" : "estrellas"}: {ratingLabels[value - 1]}
                      </span>
                      <Star
                        aria-hidden
                        className={cn(
                          "peer-focus-visible:outline-electric size-8 rounded transition-colors peer-focus-visible:outline-2",
                          value <= shown ? "fill-electric text-electric" : "text-[#3b5b78]",
                        )}
                      />
                    </label>
                  ))}
                </div>
                {shown > 0 && <span className="text-muted text-sm">{ratingLabels[shown - 1]}</span>}
              </div>
              {errors.rating && <ErrorText id="testimonial-rating-error">{errors.rating}</ErrorText>}
            </fieldset>

            <Field label="Tu testimonio" name="quote" error={errors.quote} required>
              <textarea
                {...field("quote")}
                rows={4}
                maxLength={600}
                placeholder="¿Qué resultados o cambios notaste en tu negocio?"
                className={cn(inputClass(errors.quote), "resize-y")}
              />
            </Field>

            {/* Campo trampa anti-spam: invisible para personas */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="testimonial-website">No completes este campo</label>
              <input id="testimonial-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label className="text-muted flex items-start gap-3 text-sm">
                <input
                  {...field("consent")}
                  type="checkbox"
                  className="border-line bg-night accent-electric mt-0.5 size-5 shrink-0 rounded"
                />
                <span>Autorizo a Macross AI a publicar mi nombre, negocio y testimonio en su sitio web.</span>
              </label>
              {errors.consent && <ErrorText id="testimonial-consent-error">{errors.consent}</ErrorText>}
            </div>

            {!pending && !clientErrors && state.status !== "idle" && state.status !== "success" && (
              <div
                role="alert"
                className="flex gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-100"
              >
                <CircleAlert className="mt-0.5 size-5 shrink-0 text-rose-300" aria-hidden />
                <div>
                  <p>{state.message}</p>
                  {state.status === "unavailable" && whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block font-semibold underline underline-offset-4"
                    >
                      Enviar por WhatsApp
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="text-muted hover:text-ice rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button type="submit" disabled={pending} className={buttonClasses("primary", "sm:text-sm")}>
                {pending ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden /> Enviando…
                  </>
                ) : (
                  <>
                    Enviar testimonio <Send className="size-4" aria-hidden />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}

function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  name: TestimonialField;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`testimonial-${name}`} className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-electric"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="text-muted mt-1.5 text-xs">{hint}</p>}
      {error && <ErrorText id={`testimonial-${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-rose-300">
      {children}
    </p>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-xl border bg-night/70 px-4 py-3 text-base text-ice placeholder:text-muted/60 transition-colors focus:border-electric focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-electric/30",
    error ? "border-rose-400/70" : "border-line",
  );
}
