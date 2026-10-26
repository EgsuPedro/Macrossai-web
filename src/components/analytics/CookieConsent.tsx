"use client";

import Link from "next/link";
import Script from "next/script";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "macross-cookie-consent";
const CHANGE_EVENT = "macross-consent-change";
const OPEN_EVENT = "macross-open-cookie-settings";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function saveConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Si el almacenamiento está bloqueado, la elección dura solo esta visita.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * Gestión de cookies: banner en la primera visita, botón flotante y ventana de preferencias.
 * Google Analytics 4 solo se carga si hay un GA ID configurado y la persona acepta las analíticas.
 */
export function CookieConsent({ gaId }: { gaId?: string }) {
  // "unknown" en el servidor para no mostrar nada antes de leer la preferencia guardada.
  const consent = useSyncExternalStore<Consent | "unknown">(subscribe, readConsent, () => "unknown");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(false);
  const titleId = useId();
  const analyticsId = useId();

  useEffect(() => {
    const open = () => {
      setAnalytics(readConsent() === "granted");
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const close = () => dialogRef.current?.close();
  const savePreferences = () => {
    saveConsent(analytics ? "granted" : "denied");
    close();
  };

  return (
    <>
      {gaId && consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {/* Banner de primera visita */}
      {consent === null && (
        <div
          role="region"
          aria-label="Aviso de cookies"
          className="glass animate-cookie-in fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl p-5 shadow-2xl shadow-black/50 sm:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
            <div className="flex gap-4">
              <span className="bg-electric/10 border-electric/30 hidden size-11 shrink-0 items-center justify-center rounded-xl border sm:inline-flex">
                <Cookie className="text-electric size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-ice font-semibold">Tu privacidad es importante</p>
                <p className="text-muted mt-1 text-sm leading-relaxed">
                  Usamos cookies necesarias para que el sitio funcione y, solo si lo aceptas, cookies de analítica para
                  mejorarlo.{" "}
                  <Link href="/politica-de-privacidad" className="text-electric underline-offset-4 hover:underline">
                    Política de privacidad
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={openCookieSettings}
                className="text-muted hover:text-ice px-3 py-2.5 text-sm font-semibold underline-offset-4 transition-colors hover:underline"
              >
                Configurar
              </button>
              <button
                type="button"
                onClick={() => saveConsent("denied")}
                className="border-line text-ice hover:border-electric/60 flex-1 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors md:flex-none"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => saveConsent("granted")}
                className="bg-electric text-night flex-1 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#5ee8f2] md:flex-none"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante para administrar cookies */}
      {(consent === "granted" || consent === "denied") && (
        <button
          type="button"
          onClick={openCookieSettings}
          className="border-line bg-night/90 text-ice hover:border-electric/60 fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-sm font-semibold shadow-lg shadow-black/40 backdrop-blur transition-colors"
        >
          <span className="bg-electric/15 inline-flex size-7 items-center justify-center rounded-full">
            <Cookie className="text-electric size-4" aria-hidden />
          </span>
          Cookies
        </button>
      )}

      {/* Ventana de preferencias */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="bg-deep text-ice border-line m-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-3xl border p-0 shadow-2xl shadow-black/60 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="border-line flex items-center justify-between gap-4 border-b px-6 py-5">
          <h2 id={titleId} className="font-display flex items-center gap-3 text-lg font-semibold">
            <ShieldCheck className="text-electric size-5 shrink-0" aria-hidden />
            Preferencias de Privacidad y Cookies
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="text-muted hover:text-ice hover:bg-night inline-flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div className="space-y-4 px-6 py-6">
          <p className="text-muted text-sm leading-relaxed">
            Respetamos tu privacidad conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP) del Ecuador.
            Elige qué cookies aceptas:
          </p>

          <div className="border-line bg-night/60 flex items-start justify-between gap-4 rounded-2xl border p-4">
            <div>
              <p className="font-semibold">Cookies estrictamente necesarias</p>
              <p className="text-muted mt-1 text-sm leading-relaxed">
                Siempre activas. Esenciales para el funcionamiento técnico del sitio, como recordar esta elección. No
                recopilan información personal con fines comerciales.
              </p>
            </div>
            <span
              role="switch"
              aria-checked="true"
              aria-disabled="true"
              aria-label="Cookies estrictamente necesarias: siempre activas"
              className="relative mt-0.5 inline-flex shrink-0 cursor-not-allowed opacity-60"
            >
              <span aria-hidden className="bg-electric h-6 w-11 rounded-full" />
              <span aria-hidden className="bg-ice absolute top-0.5 left-0.5 size-5 translate-x-5 rounded-full shadow" />
            </span>
          </div>

          <label
            htmlFor={analyticsId}
            className="border-line bg-night/60 hover:border-electric/40 flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-colors"
          >
            <div>
              <p className="font-semibold">Analíticas y marketing</p>
              <p className="text-muted mt-1 text-sm leading-relaxed">
                {gaId
                  ? "Nos ayudan a entender cómo se usa el sitio (Google Analytics) para mejorarlo. Solo se activan con tu permiso."
                  : "Actualmente este sitio no utiliza servicios de analítica de terceros ni píxeles de publicidad. Si los incorporamos, solo se activarán con tu permiso."}
              </p>
            </div>
            <span className="relative mt-0.5 inline-flex shrink-0">
              <input
                id={analyticsId}
                type="checkbox"
                role="switch"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="peer-checked:bg-electric peer-focus-visible:outline-electric h-6 w-11 rounded-full bg-[#2a4560] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
              />
              <span
                aria-hidden
                className="bg-ice absolute top-0.5 left-0.5 size-5 rounded-full shadow transition-transform peer-checked:translate-x-5"
              />
            </span>
          </label>
        </div>

        <div className="border-line bg-night/40 flex items-center justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={close}
            className="text-muted hover:text-ice rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={savePreferences}
            className="bg-electric text-night rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[#5ee8f2]"
          >
            Guardar preferencias
          </button>
        </div>
      </dialog>
    </>
  );
}

/** Abre la ventana de preferencias de cookies (usado en el pie de página). */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Preferencias de cookies
    </button>
  );
}
