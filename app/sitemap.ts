import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://martinmorales.online/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
