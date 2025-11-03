import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kanit.codes"

  const routes = [
    "",
    "/about",
    "/projects",
    "/projects/titanic",
    "/projects/voicebridge",
    "/projects/echo-effect",
    "/articles",
    "/articles/titanic-survival",
    "/articles/bios-issues-ubuntu",
    "/articles/ccrb-allegations-analysis",
    "/articles/data-viz-analysis",
    "/articles/technical-blog-2",
    "/articles/technical-blog-3",
    "/contact",
  ]

  const now = new Date().toISOString()

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/projects" || route === "/articles" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/projects" || route === "/articles" ? 0.9 : 0.8,
  }))
}


