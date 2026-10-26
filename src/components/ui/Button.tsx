import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-night shadow-[0_0_24px_-6px_rgb(18_216_232/0.7)] hover:bg-[#5ee8f2] hover:shadow-[0_0_32px_-4px_rgb(18_216_232/0.8)]",
  secondary: "border border-teal/40 bg-deep/60 text-ice hover:border-electric/70 hover:bg-deep",
  ghost: "text-electric hover:text-ice",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base";

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], variant === "ghost" && "px-0 py-0", className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

type ExternalButtonProps = ComponentProps<"a"> & { variant?: Variant };

export function ExternalButton({ variant = "primary", className, ...props }: ExternalButtonProps) {
  return <a target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, className)} {...props} />;
}
