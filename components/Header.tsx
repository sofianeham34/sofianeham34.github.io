import Link from "next/link";
import { href, tr, ui, type Lang } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";

/** `alt` : la même page dans l'autre langue. */
export function Header({ lang, alt }: { lang: Lang; alt: string }) {
  const home = href(lang);
  const anchors = [
    ["projets", ui.nav.projects],
    ["stack", ui.nav.stack],
    ["parcours", ui.nav.path],
    ["contact", ui.nav.contact],
  ] as const;

  return (
    <>
      <a className="skip" href="#contenu">
        {tr(ui.skip, lang)}
      </a>
      <header className="site-header">
        <div className="wrap header-row">
          <Link href={home} className="brand">
            sofiane-hammar
          </Link>
          <nav aria-label={lang === "fr" ? "Sections" : "Sections"} className="nav">
            {anchors.map(([id, label]) => (
              <Link key={id} href={`${home}#${id}`}>
                {tr(label, lang)}
              </Link>
            ))}
          </nav>
          <div className="header-tools">
            <Link href={alt} className="lang" hrefLang={lang === "fr" ? "en" : "fr"} aria-label={`${lang === "fr" ? "EN" : "FR"} — ${tr(ui.langSwitch, lang)}`}>
              {lang === "fr" ? "EN" : "FR"}
            </Link>
            <ThemeToggle label={tr(ui.theme, lang)} />
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <span>© 2026 Sofiane Hammar</span>
        <span>{tr(ui.footer, lang)}</span>
      </div>
    </footer>
  );
}
