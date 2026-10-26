"use client";

import Link from "next/link";
import Script from "next/script";
import { Cookie } from "lucide-react";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "macross-cookie-consent";
const EVENT = "macross-consent-change";

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
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function saveConsent(value: Consent) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Si el almacenamiento está bloqueado, la elección dura solo esta visita.
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Banner de cookies que aparece en la primera visita.
 * Google Analytics 4 solo se carga si hay un GA ID configurado y la persona acepta.
 */
export function CookieConsent({ gaId }: { gaId?: string }) {
  // "unknown" en el servidor para no mostrar el aviso antes de leer la preferencia guardada.
  const consent = useSyncExternalStore<Consent | "unknown">(subscribe, readConsent, () => "unknown");

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
      {consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-text"
          className="glass animate-cookie-in fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl p-5 shadow-2xl shadow-black/50 sm:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
            <div className="flex gap-4">
              <span className="bg-electric/10 border-electric/30 hidden size-11 shrink-0 items-center justify-center rounded-xl border sm:inline-flex">
                <Cookie className="text-electric size-5" aria-hidden />
              </span>
              <div>
                <p id="cookie-title" className="font-display text-ice font-semibold">
                  Tu privacidad es importante
                </p>
                <p id="cookie-text" className="text-muted mt-1 text-sm leading-relaxed">
                  Usamos cookies necesarias para que el sitio funcione y, solo si lo aceptas, cookies de analítica para
                  entender cómo se usa y mejorarlo.{" "}
                  <Link href="/politica-de-privacidad" className="text-electric underline-offset-4 hover:underline">
                    Política de privacidad
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
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
    </>
  );
}

/** Vuelve a mostrar el banner para cambiar la elección. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => saveConsent(null)} className={className}>
      Preferencias de cookies
    </button>
  );
}
