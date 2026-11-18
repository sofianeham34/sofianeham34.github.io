import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

// next/font télécharge les fontes au build et les sert depuis le site : aucun appel à Google.
// Titres en Bricolage Grotesque (grotesque à caractère), texte en Instrument Sans.
export const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap", axes: ["opsz", "wdth"] });
export const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap", axes: ["wdth"] });

export const fontClasses = `${display.variable} ${sans.variable}`;
