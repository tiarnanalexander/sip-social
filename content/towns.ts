/**
 * Dormant scaffold for town-level landing pages.
 *
 * Not built or linked yet — see the brief: Sip Social is UK-wide and mobile
 * with no fixed base, and there isn't enough event history yet to back up
 * location-specific claims. Google also weights these queries heavily toward
 * established local operators regardless of page quality, so this isn't
 * where early SEO effort should go.
 *
 * To activate: add towns here, then uncomment the /coffee-cart-hire/[town]
 * route in app/ and its entry in the sitemap. Each town page should say
 * something genuinely true about serving that area, not just swap the name.
 */
export type Town = { slug: string; name: string; county: string };

export const towns: Town[] = [
  // { slug: "basingstoke", name: "Basingstoke", county: "Hampshire" },
];
