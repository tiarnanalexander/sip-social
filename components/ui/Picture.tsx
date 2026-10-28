import Image from "next/image";
import manifest from "@/lib/content/photo-manifest.json";

type Crop = "wide" | "ultra" | "portrait" | "square";
type ManifestEntry = { variants: Record<Crop, { file: string; w: number; h: number }> };

/**
 * Resolves one of the four darkroom crops for a given image base and renders
 * it through next/image. Centralising this means every photo on the site
 * gets AVIF/WebP, correct intrinsic sizing, and lazy loading by default -
 * there's no path where a raw <img> sneaks onto a page.
 */
export function Picture({
  base,
  alt,
  crop,
  priority,
  sizes,
  className,
}: {
  base: string; // "/images/photos/cart-hero"
  alt: string;
  crop: Crop;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const key = base.split("/").pop() as string;
  const entry = (manifest as Record<string, ManifestEntry>)[key];
  if (!entry) {
    throw new Error(`Picture: no manifest entry for "${key}" (base="${base}")`);
  }
  const v = entry.variants[crop];
  return (
    <Image
      src={`${base}-${crop}.jpg`}
      alt={alt}
      width={v.w}
      height={v.h}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
