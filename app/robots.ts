import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/pag1", "/pag2", "/pag3", "/gracias", "/gracias-video", "/gracias1-video"],
    },
    sitemap: "https://martinmorales.online/sitemap.xml",
  }
}
