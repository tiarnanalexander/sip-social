import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getEventTypes } from "@/lib/content/get";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/about", "/packages", "/gallery", "/enquire"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const eventPages = getEventTypes().map((e) => ({
    url: `${site.url}/events/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...eventPages];
}
