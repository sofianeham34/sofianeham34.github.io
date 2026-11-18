import Link from "next/link";
import type { CSSProperties } from "react";
import { projects } from "@/content/projects";
import { education, experience, site, stack, type Step } from "@/content/site";
import { href, launchHref, projectHref, tr, ui, type Lang } from "@/lib/i18n";
import { CopyEmail } from "./CopyEmail";
import { Img } from "./Img";
import { WarmUp } from "./Launch";
import { Footer, Header } from "./Header";
import { Backdrop } from "./Backdrop";

/** Délai d'apparition, pour faire entrer les éléments d'une liste l'un après l'autre. */
export const delay = (i: number) => ({ "--d": `${i * 70}ms` }) as CSSProperties;

/** Le nom, découpé en lettres qui montent une à une au chargement. */
function Letters({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <span className="line" aria-hidden="true">
      {[...text].map((c, i) => (
        <span key={i} className="char" style={{ "--i": start + i } as CSSProperties}>
          {c}
        </span>
      ))}
    </span>
  );
}

export function Home({ lang }: { lang: Lang }) {
  const byslug = Object.fromEntries(projects.map((p) => [p.slug, p]));
  const technos = stack.flatMap((g) => g.items.map((it) => it.name));

  // Fiche « Person » : relie le nom au site, au LinkedIn et au GitHub dans les moteurs de recherche.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: lang === "fr" ? "Développeur logiciel, étudiant en Master 2 Génie logiciel" : "Software developer, MSc Software Engineering student",
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Université de Montpellier" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      {projects.map((p) => p.demo.kind === "live" && <WarmUp key={p.slug} url={p.demo.url} />)}
      <Header lang={lang} alt={href(lang === "fr" ? "en" : "fr")} />
      <main id="contenu">
        {/* ---------- Accroche ---------- */}
        <section className="wrap hero" aria-labelledby="nom">
          <Backdrop />
          <p className="hero-top fade" style={delay(2)}>
            <span>{lang === "fr" ? "Développeur logiciel" : "Software developer"}</span>
            <span>Montpellier, France</span>
          </p>
          <h1 id="nom" className="hero-name">
            <span className="sr-only">Sofiane Hammar</span>
            <Letters text="Sofiane" />
            <Letters text="Hammar" start={7} />
          </h1>
          <div className="hero-bottom">
            <p className="hero-role fade" style={delay(9)}>
              {tr(site.role, lang)}
            </p>
            <div className="hero-side fade" style={delay(11)}>
              <p className="status">
                <span className="dot" aria-hidden="true" />
                {tr(ui.available, lang)}
              </p>
              <p className="hero-links">
                <a className="btn primary" href={site.cv} download>
                  {tr(ui.cv, lang)}
                </a>
                <a className="btn" href="#contact">
                  {tr(ui.contactMe, lang)}
                </a>
              </p>
            </div>
          </div>
          <a className="scroll-hint fade" style={delay(14)} href="#projets" aria-label={tr(ui.sections.projects, lang)}>
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        {/* ---------- Bande de technos qui défile ---------- */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span key={k} className="marquee-group">
                {technos.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Projets ---------- */}
        <section id="projets" className="wrap section" aria-labelledby="projets-titre">
          <SectionHead id="projets-titre" title={tr(ui.sections.projects, lang)} count={projects.length} />

          <div className="works">
            {projects.map((p, i) => (
              <article key={p.slug} className="work">
                <div className="work-info" data-reveal>
                  <div>
                    <p className="work-kind">{i === 0 ? `${tr(ui.featured, lang)} · ${tr(p.kind, lang)}` : tr(p.kind, lang)}</p>
                    <h3>
                      <Link href={projectHref(lang, p.slug)}>{tr(p.title, lang)}</Link>
                    </h3>
                  </div>
                  <div>
                    <p className="work-lead">{tr(p.tagline, lang)}</p>
                    <p className="work-links">
                      <Link href={projectHref(lang, p.slug)} className="arrow">
                        {tr(i === 0 ? ui.seeProject : ui.tryIt, lang)}
                      </Link>
                      {p.demo.kind === "live" && (
                        <a href={launchHref(lang, p.slug)} target="_blank" rel="noopener" className="arrow out">
                          {tr(ui.tryLive, lang)}
                        </a>
                      )}
                      <a href={p.links[0].url} target="_blank" rel="noopener noreferrer" className="arrow out">
                        {tr(ui.code, lang)}
                      </a>
                    </p>
                  </div>
                </div>
                <Link href={projectHref(lang, p.slug)} className="work-media" data-grow tabIndex={-1} aria-hidden="true">
                  <Img img={p.cover} alt="" sizes="(max-width: 960px) 100vw, 880px" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Compétences ---------- */}
        <section id="stack" className="wrap section" aria-labelledby="stack-titre">
          <SectionHead id="stack-titre" title={tr(ui.sections.stack, lang)} intro={tr(ui.stackIntro, lang)} />
          <div className="stack">
            {stack.map((g, gi) => (
              <div key={g.title.fr} className="stack-group" data-reveal style={delay(gi)}>
                <h3>{tr(g.title, lang)}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <span className="skill">{it.name}</span>
                      <span className="where">
                        {it.projects.length
                          ? it.projects.map((s, k) => (
                              <span key={s}>
                                {k > 0 && ", "}
                                <Link href={projectHref(lang, s)}>{tr(byslug[s].short ?? byslug[s].title, lang)}</Link>
                              </span>
                            ))
                          : it.note && tr(it.note, lang)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Parcours ---------- */}
        <section id="parcours" className="wrap section" aria-labelledby="parcours-titre">
          <SectionHead id="parcours-titre" title={tr(ui.sections.path, lang)} />
          <div className="timeline-cols">
            <Timeline title={tr(ui.education, lang)} steps={education} lang={lang} />
            <Timeline title={tr(ui.experience, lang)} steps={experience} lang={lang} />
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="wrap section contact" aria-labelledby="contact-titre">
          <p className="contact-kicker" data-reveal>
            {tr(ui.sections.contact, lang)}
          </p>
          <h2 id="contact-titre" className="contact-title" data-reveal style={delay(1)}>
            {tr(ui.contactIntro, lang)}
          </h2>
          <div data-reveal style={delay(2)}>
            <CopyEmail email={site.email} copy={tr(ui.copy, lang)} copied={tr(ui.copied, lang)} />
          </div>
          <ul className="contact-links" data-reveal style={delay(3)}>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="arrow out">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="arrow out">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.cv} download className="arrow">
                {tr(ui.cv, lang)}
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

export function SectionHead({ id, title, intro, count }: { id: string; title: string; intro?: string; count?: number }) {
  return (
    <div className="section-head" data-reveal>
      <h2 id={id}>
        {title}
        {count !== undefined && <sup>({count})</sup>}
      </h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function Timeline({ title, steps, lang }: { title: string; steps: Step[]; lang: Lang }) {
  return (
    <div>
      <h3 className="timeline-title" data-reveal>
        {title}
      </h3>
      <ol className="timeline">
        {steps.map((s, i) => (
          <li key={s.title.fr} className={s.upcoming ? "upcoming" : undefined} data-reveal style={delay(i)}>
            <span className="when">{typeof s.when === "string" ? s.when : tr(s.when, lang)}</span>
            <div>
              <strong>{tr(s.title, lang)}</strong>
              <span className="place">{tr(s.place, lang)}</span>
              {s.detail && <span className="detail">{tr(s.detail, lang)}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
