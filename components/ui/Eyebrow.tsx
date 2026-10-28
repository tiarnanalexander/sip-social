import { WavyRule } from "./WavyRule";

/**
 * Sits in place of the generic tracked-out ALL-CAPS label: the brand already
 * has its own mark for "here's the lead-in" - the wavy underline from the
 * poster. Using it here instead of inventing a new label convention.
 */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block text-bronze ${className}`}>
      <span className="block text-sm font-semibold tracking-tight sm:text-base">{children}</span>
      <WavyRule className="mt-1 h-[6px] w-20 text-bronze/70" />
    </span>
  );
}
