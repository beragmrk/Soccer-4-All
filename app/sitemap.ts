import type { MetadataRoute } from "next";
import { navItems, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...navItems.filter((item) => item.href !== "/").map((item) => item.href), "/donate"];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
