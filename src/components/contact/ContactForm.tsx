"use client";

import Link from "next/link";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { type FormEvent, startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  type ContactField,
  type ContactState,
  contactSchema,
  flattenErrors,
  formDataToObject,
} from "@/lib/contact-schema";

type Props = {
  serviceOptions: { value: string; label: string }[];
  defaultService?: string;
  fallback: { whatsapp?: string | null; email?: string };
};

const initialState: ContactState = { status: "idle" };

export function ContactForm({ serviceOptions, defaultService, fallback }: Props) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [clientErrors, setClientErrors] = useState<ContactState["fieldErrors"] | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  const errors = clientErrors ?? state.fieldErrors ?? {};

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("startedAt", String(startedAt.current));

    const result = contactSchema.safeParse(formDataToObject(formData));
    if (!result.success) {
      const fieldErrors = flattenErrors(result.error);
      setClientErrors(fieldErrors);
      const first = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setClientErrors(null);
    startTransition(() => formAction(formData));
  }

  const fieldProps = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="glass relative rounded-3xl p-6 sm:p-9"
      aria-describedby="contact-status"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="name" error={errors.name} required>
          <input {...fieldProps("name")} type="text" autoComplete="name" className={inputClass(errors.name)} />
        </Field>
        <Field label="Nombre del negocio o empresa" name="company" error={errors.company}>
          <input
            {...fieldProps("company")}
            type="text"
            autoComplete="organization"
            className={inputClass(errors.company)}
          />
        </Field>
        <Field label="Correo electrónico" name="email" error={errors.email} required>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Teléfono o WhatsApp" name="phone" error={errors.phone} required>
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+593 ..."
            className={inputClass(errors.phone)}
          />
        </Field>
        <Field label="Servicio de interés" name="service" error={errors.service} required className="sm:col-span-2">
          <select
            {...fieldProps("service")}
            defaultValue={defaultService ?? ""}
            className={cn(inputClass(errors.service), "appearance-none")}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
            <option value="no-estoy-seguro">Aún no estoy seguro / varios servicios</option>
          </select>
        </Field>
        <Field
          label="Descripción de la necesidad"
          name="message"
          error={errors.message}
          required
          className="sm:col-span-2"
        >
          <textarea
            {...fieldProps("message")}
            rows={5}
            placeholder="Cuéntanos sobre tu negocio y qué te gustaría lograr."
            className={cn(inputClass(errors.message), "resize-y")}
          />
        </Field>
      </div>

      {/* Campo trampa anti-spam: invisible para personas */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">No completes este campo</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <label className="text-muted flex items-start gap-3 text-sm">
          <input
            {...fieldProps("privacy")}
            type="checkbox"
            className="border-line bg-night accent-electric mt-0.5 size-5 shrink-0 rounded"
          />
          <span>
            He leído y acepto la{" "}
            <Link
              href="/politica-de-privacidad"
              target="_blank"
              className="text-electric underline-offset-4 hover:underline"
            >
              política de privacidad
            </Link>{" "}
            y autorizo el uso de mis datos para responder a mi solicitud.
          </span>
        </label>
        {errors.privacy && <ErrorText id="contact-privacy-error">{errors.privacy}</ErrorText>}
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className={buttonClasses("primary", "sm:min-w-56")}>
          {pending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden /> Enviando…
            </>
          ) : (
            <>
              Solicitar asesoría <Send className="size-4" aria-hidden />
            </>
          )}
        </button>
        <p className="text-muted text-xs">Los campos marcados con * son obligatorios.</p>
      </div>

      <div id="contact-status" aria-live="polite" className="mt-6 empty:hidden">
        {!pending && !clientErrors && state.status !== "idle" && state.message && (
          <StatusMessage state={state} fallback={fallback} />
        )}
      </div>
    </form>
  );
}

function StatusMessage({ state, fallback }: { state: ContactState; fallback: Props["fallback"] }) {
  const ok = state.status === "success";
  const Icon = ok ? CircleCheck : CircleAlert;
  return (
    <div
      role={ok ? "status" : "alert"}
      className={cn(
        "flex gap-3 rounded-2xl border p-4 text-sm",
        ok ? "border-electric/40 bg-electric/10 text-ice" : "border-rose-400/40 bg-rose-500/10 text-rose-100",
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", ok ? "text-electric" : "text-rose-300")} aria-hidden />
      <div>
        <p>{state.message}</p>
        {state.status === "unavailable" && (fallback.whatsapp || fallback.email) && (
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-semibold">
            {fallback.whatsapp && (
              <a
                href={fallback.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Escribir por WhatsApp
              </a>
            )}
            {fallback.email && (
              <a href={`mailto:${fallback.email}`} className="underline underline-offset-4">
                Enviar un correo
              </a>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  required,
  className,
  children,
}: {
  label: string;
  name: ContactField;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${name}`} className="text-ice mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-electric"> *</span>}
      </label>
      {children}
      {error && <ErrorText id={`contact-${name}-error`}>{error}</ErrorText>}
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
