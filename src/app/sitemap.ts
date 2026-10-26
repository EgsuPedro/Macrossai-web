import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: `${base}/servicios/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/politica-de-privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terminos-y-condiciones`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
