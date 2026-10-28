/**
 * A single confident pen-stroke, redrawn to match the calm, barely-there
 * wave on Zoe's actual brand sheet (one gentle rise and fall across the
 * whole width) rather than the tightly-oscillating trace used earlier,
 * which read as jittery/broken at small sizes.
 */
export function WavyRule({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 780 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M4 9.5 C 110 4, 230 3, 360 7 S 610 13, 700 7.5 L 776 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
