import Link from "next/link";
import { projects } from "@/content/projects";
import { education, experience, site, stack, type Step } from "@/content/site";
import { href, projectHref, tr, ui, type Lang } from "@/lib/i18n";
import { CopyEmail } from "./CopyEmail";
import { Img } from "./Img";
import { Footer, Header } from "./Header";

const num = (n: number) => String(n).padStart(2, "0");

export function Home({ lang }: { lang: Lang }) {
  const byslug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  return (
    <>
      <Header lang={lang} alt={href(lang === "fr" ? "en" : "fr")} />
      <main id="contenu">
        {/* ---------- Accroche ---------- */}
        <section className="wrap hero" aria-labelledby="nom">
          <p className="status">
            <span className="live" aria-hidden="true" />
            {tr(ui.available, lang)}
          </p>
          <h1 id="nom">Sofiane Hammar</h1>
          <p className="role">{tr(site.role, lang)}</p>
          <div className="actions">
            <a className="btn primary" href={site.cv} download>
              ↓ {tr(ui.cv, lang)}
            </a>
            <a className="btn" href="#contact">
              {tr(ui.contactMe, lang)} →
            </a>
          </div>
          <p className="meta">{tr(site.meta, lang)}</p>
        </section>

        {/* ---------- Projets ---------- */}
        <section id="projets" className="wrap section" aria-labelledby="projets-titre">
          <SectionHead n={1} id="projets-titre" title={tr(ui.sections.projects, lang)} />

          <div className="works">
            {projects.map((p, i) => (
              <article key={p.slug} className="work">
                <WorkHead
                  n={i + 1}
                  kicker={i === 0 ? tr(ui.featured, lang) : tr(p.kind, lang)}
                  title={tr(p.title, lang)}
                  lead={tr(p.tagline, lang)}
                  to={projectHref(lang, p.slug)}
                  cta={tr(i === 0 ? ui.seeProject : ui.tryIt, lang)}
                  code={p.links[0].url}
                  codeLabel={tr(ui.code, lang)}
                  live={p.demo.kind === "live" ? p.demo.url : undefined}
                  liveLabel={tr(ui.tryLive, lang)}
                />
                <Link href={projectHref(lang, p.slug)} className="work-media" tabIndex={-1} aria-hidden="true">
                  <Img img={p.cover} alt="" sizes="(max-width: 1180px) 100vw, 1120px" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Stack ---------- */}
        <section id="stack" className="wrap section" aria-labelledby="stack-titre">
          <SectionHead n={2} id="stack-titre" title={tr(ui.sections.stack, lang)} intro={tr(ui.stackIntro, lang)} />
          <div className="stack">
            {stack.map((g) => (
              <div key={g.title.fr} className="stack-group">
                <h3>{tr(g.title, lang)}</h3>
                <dl>
                  {g.items.map((it) => (
                    <div key={it.name} className="stack-item">
                      <dt>{it.name}</dt>
                      <dd>
                        {it.projects.length
                          ? it.projects.map((s, k) => (
                              <span key={s}>
                                {k > 0 && ", "}
                                <Link href={projectHref(lang, s)}>{tr(byslug[s].short ?? byslug[s].title, lang)}</Link>
                              </span>
                            ))
                          : it.note && tr(it.note, lang)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Parcours ---------- */}
        <section id="parcours" className="wrap section" aria-labelledby="parcours-titre">
          <SectionHead n={3} id="parcours-titre" title={tr(ui.sections.path, lang)} />
          <div className="timeline-cols">
            <Timeline title={tr(ui.education, lang)} steps={education} lang={lang} />
            <Timeline title={tr(ui.experience, lang)} steps={experience} lang={lang} />
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="wrap section contact" aria-labelledby="contact-titre">
          <SectionHead n={4} id="contact-titre" title={tr(ui.sections.contact, lang)} />
          <p className="contact-intro">{tr(ui.contactIntro, lang)}</p>
          <CopyEmail email={site.email} copy={tr(ui.copy, lang)} copied={tr(ui.copied, lang)} />
          <ul className="contact-links">
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={site.cv} download>
                {tr(ui.cv, lang)} ↓
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

function WorkHead(props: {
  n: number;
  kicker: string;
  title: string;
  lead: string;
  to: string;
  cta: string;
  code: string;
  codeLabel: string;
  live?: string;
  liveLabel?: string;
}) {
  return (
    <header className="work-head">
      <p className="kicker">
        <span className="work-num">{num(props.n)}</span> {props.kicker}
      </p>
      <h3>
        <Link href={props.to}>{props.title}</Link>
      </h3>
      <div>
        <p className="work-lead">{props.lead}</p>
        <p className="work-links">
          <Link href={props.to}>{props.cta} →</Link>
          {props.live && (
            <a href={props.live} target="_blank" rel="noopener noreferrer">
              {props.liveLabel} ↗
            </a>
          )}
          <a href={props.code} target="_blank" rel="noopener noreferrer">
            {props.codeLabel} ↗
          </a>
        </p>
      </div>
    </header>
  );
}

export function SectionHead({ n, id, title, intro }: { n: number; id: string; title: string; intro?: string }) {
  return (
    <div className="section-head">
      <span className="section-num">{num(n)}</span>
      <h2 id={id}>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function Timeline({ title, steps, lang }: { title: string; steps: Step[]; lang: Lang }) {
  return (
    <div>
      <h3 className="timeline-title">{title}</h3>
      <ol className="timeline">
        {steps.map((s) => (
          <li key={s.title.fr} className={s.upcoming ? "upcoming" : undefined}>
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
