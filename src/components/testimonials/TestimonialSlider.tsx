"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/content";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 6000;

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [paused, setPaused] = useState(false);
  /** Posiciones de desplazamiento posibles (con 3 tarjetas visibles y 4 testimonios, son 2). */
  const [stops, setStops] = useState(items.length);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (dir === 1 && end) goTo(0);
      else goTo(Math.max(0, Math.min(stops - 1, active + dir)));
    },
    [active, goTo, stops],
  );

  // Sincroniza el punto activo y las flechas con el desplazamiento (también al deslizar con el dedo).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const left = track.scrollLeft;
      const maxLeft = track.scrollWidth - track.clientWidth;
      const offsets = (Array.from(track.children) as HTMLElement[]).map((c) => c.offsetLeft - track.offsetLeft);
      const reachable = offsets.filter((o) => o <= maxLeft + 4);
      let nearest = 0;
      reachable.forEach((o, i) => {
        if (Math.abs(o - left) < Math.abs(reachable[nearest] - left)) nearest = i;
      });
      setStops(Math.max(1, reachable.length));
      setActive(left >= maxLeft - 4 ? reachable.length - 1 : nearest);
      setAtStart(left <= 4);
    };
    const frame = requestAnimationFrame(onScroll);
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Avance automático, en pausa al interactuar o si se pide reducir el movimiento.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => step(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, step]);

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Testimonios de clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <ul
        ref={trackRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:gap-6 lg:px-0"
      >
        {items.map((t, i) => (
          <li
            key={`${t.name}-${t.company}`}
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${items.length}`}
            className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex gap-2">
          {Array.from({ length: stops }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la posición ${i + 1} de ${stops}`}
              aria-current={i === active}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active ? "bg-electric w-8" : "w-2 bg-[#2a4560] hover:bg-[#3b5b78]",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <SliderButton label="Testimonio anterior" disabled={atStart} onClick={() => step(-1)}>
            <ChevronLeft className="size-5" aria-hidden />
          </SliderButton>
          <SliderButton label="Testimonio siguiente" disabled={stops < 2} onClick={() => step(1)}>
            <ChevronRight className="size-5" aria-hidden />
          </SliderButton>
        </div>
      </div>
    </div>
  );
}

function SliderButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="border-line text-ice hover:border-electric/60 hover:text-electric inline-flex size-11 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const initials = t.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="glass relative flex h-full flex-col rounded-3xl p-7">
      <div className="flex items-start justify-between gap-4">
        <Quote className="text-electric/80 size-8 shrink-0" aria-hidden />
        {t.isSample && (
          <span className="border-electric/30 bg-night/70 text-electric rounded-full border px-3 py-1 text-[0.7rem] font-semibold tracking-wide">
            Testimonio de ejemplo
          </span>
        )}
      </div>
      <div className="mt-5 flex gap-1" role="img" aria-label={`Calificación: ${t.rating} de 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            aria-hidden
            className={cn("size-4", i < t.rating ? "fill-electric text-electric" : "text-[#2a4560]")}
          />
        ))}
      </div>
      <blockquote className="text-ice/90 mt-4 flex-1 leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="border-line mt-6 flex items-center gap-3 border-t pt-5">
        <span
          aria-hidden
          className="from-electric to-teal text-night inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold"
        >
          {initials}
        </span>
        <span>
          <span className="text-ice block font-semibold">{t.name}</span>
          <span className="text-muted block text-sm">{t.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}
