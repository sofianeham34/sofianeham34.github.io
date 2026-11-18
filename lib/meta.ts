import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Lang } from "./i18n";

/** Métadonnées communes : titre, description, Open Graph (partage LinkedIn) et version dans l'autre langue. */
export function pageMeta({ lang, title, description, path, alt }: { lang: Lang; title: string; description: string; path: string; alt: string }): Metadata {
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: path, languages: { [lang === "fr" ? "en" : "fr"]: alt, [lang]: path } },
    icons: { icon: "/favicon.svg" },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: site.name,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
