import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";

// next/font télécharge les fontes au build et les sert depuis le site : aucun appel à Google.
export const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", weight: ["400", "500"] });
