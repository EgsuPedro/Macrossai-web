import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, description, align = "center", as: Tag = "h2" }: Props) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="text-electric mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
          <span className="bg-electric/70 h-px w-6" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-ice text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {description && <p className="text-muted mt-5 text-lg leading-relaxed text-pretty">{description}</p>}
    </Reveal>
  );
}
