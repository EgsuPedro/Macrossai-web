"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** Video de presentación en bucle y sin sonido. Se pausa si el sistema pide reducir el movimiento. */
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className={cn("size-full object-cover", className)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/videos/inicio-poster.jpg"
      aria-label="Video de presentación: la mascota de Macross AI muestra los servicios de la empresa"
    >
      <source src="/videos/inicio.mp4" type="video/mp4" />
    </video>
  );
}
