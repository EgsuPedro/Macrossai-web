import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import logoMark from "@/assets/brand/logo-mark.png";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Macross AI, ir al inicio"
    >
      <Image
        src={logoMark}
        alt=""
        priority
        className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
        sizes="68px"
      />
      <span className="font-display text-ice text-lg leading-none font-bold tracking-wide">
        MACROSS <span className="text-electric">AI</span>
      </span>
    </Link>
  );
}
