/**
 * Content shape contracts.
 *
 * Every section component in components/sections takes props matching one of
 * these types - never imports from content/ directly. Pages call a getter in
 * lib/content/*.ts, which currently reads the static files in content/, and
 * pass the result down as props.
 *
 * This indirection is the whole point: the day this swaps to a visual
 * builder (Makeswift or otherwise), only the getters change to fetch from
 * that source. The components and their prop contracts don't move, so each
 * one maps directly onto a registerComponent() call with the same prop
 * schema. Nothing here is Makeswift-specific; it's just the seam.
 */

export type ImageAsset = {
  /** Path under /public, e.g. "/images/photos/cart-hero". Variants are
   *  resolved by the Picture component from the manifest at this base. */
  base: string;
  alt: string;
};

export type Package = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  includes: string[];
  icon: "cart" | "gift" | "sparkle";
};

export type EventType = {
  slug: string;
  name: string;
  shortName: string;
  heroImage: ImageAsset;
  intro: string;
  body: string[];
  highlights: string[];
  suggestedPackageSlugs: string[];
  faqs: { q: string; a: string }[];
};

export type GalleryImage = ImageAsset & {
  featured?: boolean;
};

export type NavLink = { href: string; label: string };

export type FaqItem = { q: string; a: string };
