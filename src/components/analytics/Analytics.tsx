"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "macross-analytics-consent";
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

function saveConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Si el almacenamiento está bloqueado, la elección dura solo esta visita.
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Google Analytics 4 con consentimiento previo.
 * No carga ningún script hasta que la persona acepte. Si no hay GA ID configurado, no renderiza nada.
 */
export function Analytics({ gaId }: { gaId?: string }) {
  // "unknown" en el servidor para no mostrar el aviso antes de leer la preferencia guardada.
  const consent = useSyncExternalStore<Consent | "unknown">(subscribe, readConsent, () => "unknown");

  if (!gaId) return null;

  return (
    <>
      {consent === "granted" && (
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
          aria-label="Preferencias de cookies"
          className="glass fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl p-5 shadow-2xl shadow-black/40 sm:flex sm:items-center sm:gap-6"
        >
          <p className="text-muted text-sm">
            Usamos cookies de analítica para entender cómo se usa el sitio y mejorarlo, solo si nos das tu permiso.{" "}
            <Link href="/politica-de-privacidad" className="text-electric hover:underline">
              Más información
            </Link>
          </p>
          <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
            <button
              type="button"
              onClick={() => saveConsent("denied")}
              className="border-line text-ice hover:border-electric/60 rounded-full border px-4 py-2 text-sm font-semibold"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => saveConsent("granted")}
              className="bg-electric text-night rounded-full px-4 py-2 text-sm font-semibold hover:bg-[#5ee8f2]"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
