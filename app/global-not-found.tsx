import type { Metadata } from "next";
import Link from "next/link";
import { fontClasses } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "Page introuvable — Sofiane Hammar" };

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClasses}>
      <body>
        <main className="wrap notfound">
          <p className="section-num">404</p>
          <h1>Page introuvable</h1>
          <p>Cette page n'existe pas, ou plus. / This page doesn't exist.</p>
          <Link className="btn primary" href="/">
            ← Accueil / Home
          </Link>
        </main>
      </body>
    </html>
  );
}
