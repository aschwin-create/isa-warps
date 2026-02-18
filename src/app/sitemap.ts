import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { updates } from "@/data/updates";

const SITE_URL = "https://www.isawarps.com";

const pages = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/matches", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/partnerships", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/media-kit", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/updates", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages for all locales
  for (const page of pages) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // Dynamic update pages
  for (const update of updates) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/updates/${update.slug}`,
        lastModified: new Date(update.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      });
    }
  }

  return entries;
}
