import Image from "next/image";
import Link from "next/link";

/**
 * The bubble mark is the real hand-drawn asset (extracted from Zoe's Canva
 * export), pixel-identical to the cart, cups and cards. "SOCIAL" used to be
 * baked into that same flattened PNG underneath it - but the source art
 * draws SIP about four times the height of SOCIAL, so scaling the combined
 * image down to a nav-bar height shrank SOCIAL to a few pixels, unreadable
 * at any size. SOCIAL is set here as live type instead (Plus Jakarta Sans,
 * the closest open match to the brand sheet's geometric grotesque - see
 * lib/fonts.ts), so it stays crisp at any size and the gap underneath the
 * mark is a deliberate margin rather than whatever the flattened artwork
 * happened to leave.
 */
export function Logo({
  className,
  markClassName,
  labelClassName,
  priority,
}: {
  className?: string;
  markClassName?: string;
  labelClassName?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Sip Social — home"
      className={`inline-flex flex-col items-start ${className ?? ""}`}
    >
      <Image
        src="/images/logo-mark.png"
        alt="Sip"
        width={1005}
        height={578}
        priority={priority}
        className={markClassName ?? "h-8 w-auto sm:h-9"}
      />
      <span
        className={
          labelClassName ??
          "-mt-0.5 ml-0.5 font-sans text-[0.65rem] font-bold tracking-[0.25em] sm:text-[0.7rem]"
        }
      >
        SOCIAL
      </span>
    </Link>
  );
}
