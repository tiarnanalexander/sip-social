import siteContent from "@/content/site/index.json";

/**
 * Single source of truth for brand facts that appear in metadata, schema.org
 * markup, and the footer. The editable facts live in content/site.json
 * (a Tina-managed singleton) so Zoe can update them without touching code;
 * `url` stays here because it's derived from the deploy environment, not
 * something to hand-edit per environment.
 */
export const site = {
  ...siteContent,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sipsocial.co.uk",
} as const;
