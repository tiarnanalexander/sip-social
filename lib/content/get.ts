/**
 * Content getters — the seam described in types.ts.
 *
 * Pages import from here, never from content/ directly. Content now lives
 * as one JSON file per document (edited via Tina's /admin screen) rather
 * than exported arrays, so these getters read the files directly - plain
 * synchronous fs reads, same cost as the static imports they replaced, no
 * new runtime dependency on Tina itself. Tina only needs to agree with
 * these getters on the file shape (see tina/config.ts).
 */
import fs from "fs";
import path from "path";
import type {
  NavLink,
  FaqItem,
  EventType,
  Package,
  GalleryImage,
} from "./types";
import manifest from "./photo-manifest.json";
import siteFaqs from "@/content/faqs/index.json";
import howItWorksContent from "@/content/how-it-works/index.json";
import galleryContent from "@/content/gallery/index.json";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJsonDir<T>(dirName: string): T[] {
  const dir = path.join(CONTENT_DIR, dirName);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as T);
}

// --- Event types ---------------------------------------------------------

function loadEventTypes(): (EventType & { order: number })[] {
  return readJsonDir<EventType & { order: number }>("event-types").sort(
    (a, b) => a.order - b.order
  );
}

export function getEventTypes(): EventType[] {
  return loadEventTypes();
}

export function getEventTypeBySlug(slug: string): EventType | undefined {
  return loadEventTypes().find((e) => e.slug === slug);
}

// --- Packages --------------------------------------------------------------

function loadPackages(): (Package & { order: number })[] {
  return readJsonDir<Package & { order: number }>("packages").sort(
    (a, b) => a.order - b.order
  );
}

export function getPackages(): Package[] {
  return loadPackages();
}

export function getPackageBySlug(slug: string): Package | undefined {
  return loadPackages().find((p) => p.slug === slug);
}

export function getHowItWorks() {
  return howItWorksContent.steps;
}

// --- Gallery -----------------------------------------------------------

const manifestTyped = manifest as Record<string, { alt: string }>;

export function getGalleryImages(): GalleryImage[] {
  return galleryContent.images.map(({ photo, featured }) => {
    const entry = manifestTyped[photo];
    if (!entry) {
      throw new Error(`getGalleryImages: missing manifest entry for "${photo}"`);
    }
    return { base: `/images/photos/${photo}`, alt: entry.alt, featured };
  });
}

// --- Nav & site FAQs -----------------------------------------------------

export function getPrimaryNav(): NavLink[] {
  return [
    { href: "/about", label: "About" },
    { href: "/packages", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/enquire", label: "Enquire" },
  ];
}

export function getSiteFaqs(): FaqItem[] {
  return siteFaqs.items;
}
