/**
 * Content getters — the seam described in types.ts.
 *
 * Pages import from here, never from content/ directly. Every function is
 * synchronous today because the source is static files, but the signatures
 * are already async-safe to call (see getNav/getFaqs) so swapping an
 * implementation to an async CMS fetch later doesn't change any call site.
 */
import { packages, howItWorks } from "@/content/packages";
import { eventTypes, getEventTypeBySlug } from "@/content/event-types";
import { galleryImages } from "@/content/gallery";
import { towns } from "@/content/towns";
import type { NavLink, FaqItem } from "./types";

export function getPackages() {
  return packages;
}

export function getPackageBySlug(slug: string) {
  return packages.find((p) => p.slug === slug);
}

export function getHowItWorks() {
  return howItWorks;
}

export function getEventTypes() {
  return eventTypes;
}

export { getEventTypeBySlug };

export function getGalleryImages() {
  return galleryImages;
}

export function getTowns() {
  return towns;
}

export function getPrimaryNav(): NavLink[] {
  return [
    { href: "/about", label: "About" },
    { href: "/packages", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/enquire", label: "Enquire" },
  ];
}

export function getSiteFaqs(): FaqItem[] {
  return [
    {
      q: "How does pricing work?",
      a: "Every event is different, so we don't publish a fixed price list. Send us your event type, guest numbers and duration through the enquiry form and we'll come back with a tailored quote.",
    },
    {
      q: "Do you only do weddings?",
      a: "No — we cover weddings, corporate events, product launches, private parties and community pop-ups. See our packages page for how each works.",
    },
    {
      q: "Are you insured?",
      a: "Yes, Sip Social is fully insured. We're happy to share details with your venue if they need them.",
    },
    {
      q: "How far do you travel?",
      a: "Sip Social is fully mobile and takes bookings across the UK. Tell us your location when you enquire and we'll confirm availability.",
    },
    {
      q: "What if it rains?",
      a: "The cart can work undercover or indoors — let us know your venue and any backup plan when you enquire, so we can plan around the weather together.",
    },
  ];
}
