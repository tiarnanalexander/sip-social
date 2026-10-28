/**
 * Three small hand-drawn-style marks instead of an icon-library glyph set -
 * matches the loose, marker-drawn quality of the brand's own illustration
 * (the espresso machine sketch on the invite poster) rather than a generic
 * Lucide/Heroicons cart or gift icon.
 */
export function PackageIcon({ name, className = "" }: { name: "cart" | "gift" | "sparkle"; className?: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  if (name === "cart") {
    return (
      <svg {...common}>
        <path d="M10 15c6-3 22-3 28 0" />
        <path d="M12 15l1.5 19c.2 2 1.9 3.5 3.9 3.5h13.2c2 0 3.7-1.5 3.9-3.5L36 15" />
        <path d="M18 15V11a6 6 0 0 1 12 0v4" />
        <path d="M20 24v8M28 24v8" />
      </svg>
    );
  }
  if (name === "gift") {
    return (
      <svg {...common}>
        <path d="M8 19h32v8H8z" />
        <path d="M11 27h26l-2 13H13z" />
        <path d="M24 19v21" />
        <path d="M24 19c-2-6-7-9-10-7s0 7 10 7Z" />
        <path d="M24 19c2-6 7-9 10-7s0 7-10 7Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M24 7l2.6 8.1L35 18l-8.4 2.9L24 29l-2.6-8.1L13 18l8.4-2.9L24 7Z" />
      <path d="M11 32l1.2 3.6L16 37l-3.8 1.4L11 42l-1.2-3.6L6 37l3.8-1.4L11 32Z" />
      <path d="M37 30l.9 2.7L41 33.6l-3.1 1.1L37 38l-.9-2.7L33 34.4l3.1-1.1L37 30Z" />
    </svg>
  );
}
