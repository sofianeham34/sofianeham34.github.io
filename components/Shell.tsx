import type { ReactNode } from "react";
import { fontClasses } from "@/lib/fonts";
import type { Lang } from "@/lib/i18n";
import "@/styles/globals.css";
import { Motion } from "./Motion";

// Appliqué avant le premier rendu : thème choisi, et classe « js » qui prépare les apparitions
// au défilement (sans JavaScript, tout reste visible).
const themeScript = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

/** Document HTML commun aux deux mises en page racines (fr et en). */
export function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={fontClasses} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Motion />
      </body>
    </html>
  );
}
