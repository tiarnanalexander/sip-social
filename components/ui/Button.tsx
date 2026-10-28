import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "solid" | "outline" | "ghost" | "invert";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold " +
  "transition-[transform,background-color,color,border-color] duration-200 " +
  "active:scale-[0.97] whitespace-nowrap";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-cream hover:bg-bronze",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-cream",
  ghost: "text-ink hover:text-bronze underline decoration-2 underline-offset-4",
  invert: "bg-cream text-ink hover:bg-bronze hover:text-cream",
};

export function Button({
  href,
  variant = "solid",
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
