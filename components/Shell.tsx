import type { ReactNode } from "react";
import { mono, sans } from "@/lib/fonts";
import type { Lang } from "@/lib/i18n";
import "@/styles/globals.css";

// Appliqué avant le premier rendu pour éviter un flash du mauvais thème.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

/** Document HTML commun aux deux mises en page racines (fr et en). */
export function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
