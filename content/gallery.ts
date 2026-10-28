import type { GalleryImage } from "@/lib/content/types";
import manifest from "@/lib/content/photo-manifest.json";

/**
 * Gallery order and captions. Pulls alt text from the darkroom manifest so
 * it's written once, not duplicated between the processing script and the
 * site content.
 */
const order: { key: keyof typeof manifest; featured?: boolean }[] = [
  { key: "cart-hero", featured: true },
  { key: "zoe-portrait", featured: true },
  { key: "espresso-pour" },
  { key: "biscuits", featured: true },
  { key: "zoe-with-cart" },
  { key: "machine-plants" },
  { key: "cups-window" },
  { key: "zoe-behind-cart" },
  { key: "cart-sunlit" },
  { key: "beans" },
  { key: "cart-aboard" },
  { key: "portafilter" },
  { key: "cups-machine" },
  { key: "barista-profile" },
  { key: "cart-serving" },
  { key: "cards-fanned" },
  { key: "cards-holder" },
];

const manifestTyped = manifest as Record<string, { alt: string }>;

export const galleryImages: GalleryImage[] = order.map(({ key, featured }) => {
  const entry = manifestTyped[key as string];
  if (!entry) throw new Error(`gallery.ts: missing manifest entry for "${key}"`);
  return { base: `/images/photos/${key}`, alt: entry.alt, featured };
});
