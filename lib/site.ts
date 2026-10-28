/**
 * Single source of truth for brand facts that appear in metadata, schema.org
 * markup, and the footer. Change the business's real-world details here.
 */
export const site = {
  name: "Sip Social",
  legalName: "Sip Social",
  tagline: "Elevating events one sip at a time",
  subTagline: "Your favourite café, brought to you",
  owner: "Zoe Stone",
  description:
    "Mobile coffee cart hire for weddings, corporate events and private parties across the UK. Barista-made coffee, wherever your event is.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sipsocial.co.uk",
  email: "sipsocialuk@outlook.com",
  phone: "+447414211071",
  phoneDisplay: "07414 211071",
  instagram: "https://www.instagram.com/sip_socialuk",
  instagramHandle: "@sip_socialuk",
  foundedYear: "2026",
  priceRange: "££",
  areaServed: "United Kingdom",
} as const;
