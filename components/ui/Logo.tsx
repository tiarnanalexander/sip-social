import Image from "next/image";
import Link from "next/link";

/**
 * The real logo asset (extracted from Zoe's Canva export), not a type-set
 * recreation - so it's pixel-identical to the cart, the cups and the cards.
 */
export function Logo({
  className,
  priority,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Sip Social — home"
      className={`inline-flex items-center ${className ?? ""}`}
    >
      <Image
        src="/images/logo.png"
        alt="Sip Social"
        width={993}
        height={647}
        priority={priority}
        className="h-auto w-[7.5rem] sm:w-[8.5rem]"
      />
    </Link>
  );
}
