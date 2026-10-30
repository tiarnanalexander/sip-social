import { defineConfig } from "tinacms";
import manifest from "../lib/content/photo-manifest.json";

/**
 * Tina's content model for the site's editable content. Deliberately scoped
 * to the things Zoe actually needs to change herself - headline copy,
 * event-type pages, packages, gallery order/captions, FAQs, business
 * details - not page layout or design, which stays code-controlled.
 *
 * Photos are a select from the darkroom manifest rather than a raw image
 * upload everywhere they're used: every photo on the site needs four
 * pre-generated crops (wide, ultra, portrait, square - see
 * lib/content/get.ts and components/ui/Picture.tsx), which nothing in Tina
 * can produce on its own. Picking from already-processed photos keeps every
 * selection safe to render. The "Add New Photos" collection below is the one
 * place a raw upload is accepted - scripts/generate-photo-manifest.js turns
 * each one into the four crops at build time and adds it to this list
 * automatically, so a new photo shows up here within a build or two of
 * being uploaded with no manual step.
 */
const photoOptions = Object.entries(manifest as Record<string, { alt: string }>).map(
  ([key, entry]) => ({ value: key, label: `${key} — ${entry.alt}` })
);

const iconOptions = [
  { value: "cart", label: "Cart" },
  { value: "gift", label: "Gift" },
  { value: "sparkle", label: "Sparkle" },
];

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH ?? process.env.HEAD ?? "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "eventType",
        label: "Event Type Pages",
        path: "content/event-types",
        format: "json",
        ui: {
          router: ({ document }) => `/events/${document._sys.filename}`,
        },
        fields: [
          { type: "string", name: "name", label: "Page Title", isTitle: true, required: true },
          { type: "string", name: "shortName", label: "Short Name (used in menus)", required: true },
          { type: "string", name: "slug", label: "URL Slug", required: true,
            description: "Must match the filename and the page's URL — don't change this without updating links elsewhere." },
          { type: "number", name: "order", label: "Display Order", required: true,
            description: "Lower numbers show first across the site (menus, homepage cards)." },
          {
            type: "object",
            name: "heroImage",
            label: "Hero Photo",
            fields: [
              { type: "string", name: "base", label: "Photo", options: photoOptions, required: true },
              { type: "string", name: "alt", label: "Alt Text (for accessibility/SEO)", required: true },
            ],
          },
          { type: "string", name: "intro", label: "Intro Line", ui: { component: "textarea" }, required: true },
          { type: "string", name: "body", label: "Body Paragraphs", list: true, ui: { component: "textarea" } },
          { type: "string", name: "highlights", label: "Highlights (short bullet points)", list: true },
          {
            type: "string",
            name: "suggestedPackageSlugs",
            label: "Suggested Packages",
            list: true,
            options: [
              { value: "pay-as-you-go", label: "The Flexible Option" },
              { value: "all-inclusive", label: "The All-Inclusive Option" },
              { value: "branded-experience", label: "The Branded Experience" },
            ],
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQs",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.q }) },
            fields: [
              { type: "string", name: "q", label: "Question", required: true },
              { type: "string", name: "a", label: "Answer", ui: { component: "textarea" }, required: true },
            ],
          },
        ],
      },
      {
        name: "package",
        label: "Packages",
        path: "content/packages",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Package Name", isTitle: true, required: true },
          { type: "string", name: "slug", label: "URL Slug", required: true,
            description: "Must match the filename — don't change this without updating event pages that reference it." },
          { type: "number", name: "order", label: "Display Order", required: true },
          { type: "string", name: "tagline", label: "Tagline", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" }, required: true },
          { type: "string", name: "bestFor", label: "Best For (short tags)", list: true },
          { type: "string", name: "includes", label: "What's Included", list: true },
          { type: "string", name: "icon", label: "Icon", options: iconOptions, required: true },
        ],
      },
      {
        name: "howItWorks",
        label: "How It Works (homepage steps)",
        path: "content/how-it-works",
        format: "json",
        ui: { global: true, allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "steps",
            label: "Steps",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" }, required: true },
            ],
          },
        ],
      },
      {
        name: "gallery",
        label: "Gallery",
        path: "content/gallery",
        format: "json",
        ui: { global: true, allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "images",
            label: "Photos (drag to reorder)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.photo }) },
            fields: [
              { type: "string", name: "photo", label: "Photo", options: photoOptions, required: true },
              { type: "boolean", name: "featured", label: "Featured (shows larger in the grid)" },
            ],
          },
        ],
      },
      {
        name: "faqs",
        label: "Site FAQs",
        path: "content/faqs",
        format: "json",
        ui: { global: true, allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Questions",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.q }) },
            fields: [
              { type: "string", name: "q", label: "Question", required: true },
              { type: "string", name: "a", label: "Answer", ui: { component: "textarea" }, required: true },
            ],
          },
        ],
      },
      {
        name: "photoUpload",
        label: "Add New Photos",
        path: "content/photo-uploads",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "items",
            label: "Photos",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "image", name: "image", label: "Photo", required: true },
              { type: "string", name: "label", label: "Name this photo", required: true,
                description: "A short name, e.g. \"Cart at the Fenwick wedding\" — this is how you'll find it later when choosing photos elsewhere on the site." },
              { type: "string", name: "alt", label: "Short description (for accessibility & SEO)", required: true,
                description: "Describe what's in the photo in a plain sentence, e.g. \"The Sip Social cart set up under fairy lights at an evening wedding.\"" },
            ],
          },
        ],
      },
      {
        name: "site",
        label: "Business Details",
        path: "content/site",
        format: "json",
        ui: { global: true, allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "name", label: "Brand Name", required: true },
          { type: "string", name: "legalName", label: "Legal Name", required: true },
          { type: "string", name: "tagline", label: "Tagline", required: true },
          { type: "string", name: "subTagline", label: "Sub-tagline", required: true },
          { type: "string", name: "owner", label: "Owner Name", required: true },
          { type: "string", name: "description", label: "SEO Description", ui: { component: "textarea" }, required: true },
          { type: "string", name: "email", label: "Enquiry Email", required: true },
          { type: "string", name: "phone", label: "Phone (for tel: links, e.g. +447...)", required: true },
          { type: "string", name: "phoneDisplay", label: "Phone (as displayed, e.g. 07...)", required: true },
          { type: "string", name: "instagram", label: "Instagram URL", required: true },
          { type: "string", name: "instagramHandle", label: "Instagram Handle (e.g. @sip_socialuk)", required: true },
          { type: "string", name: "foundedYear", label: "Founded Year", required: true },
          { type: "string", name: "priceRange", label: "Price Range (e.g. ££)", required: true },
          { type: "string", name: "areaServed", label: "Area Served", required: true },
        ],
      },
    ],
  },
});
