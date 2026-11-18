import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** Toutes les pages, en français et en anglais, pour les moteurs de recherche. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...projects.map((p) => `/projets/${p.slug}/`)];
  return paths.map((path) => ({
    url: site.url + path,
    alternates: { languages: { fr: site.url + path, en: `${site.url}/en${path}` } },
    priority: path === "/" ? 1 : 0.7,
  }));
}
