import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { href, projectHref, tr, ui, type Lang } from "@/lib/i18n";
import { AgentRun } from "./AgentRun";
import { DemoFrame, PhoneDemo } from "./Demos";
import { Diagram } from "./Diagram";
import { Footer, Header } from "./Header";
import { Img } from "./Img";

export function ProjectPage({ project: p, lang }: { project: Project; lang: Lang }) {
  const P = ui.project;
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <Header lang={lang} alt={projectHref(lang === "fr" ? "en" : "fr", p.slug)} />
      <main id="contenu" className="wrap project">
        <nav className="crumbs" aria-label={lang === "fr" ? "Fil d'Ariane" : "Breadcrumb"}>
          <Link href={`${href(lang)}#projets`}>← {tr(ui.backHome, lang)}</Link>
          <span aria-hidden="true">/</span>
          <span>{p.slug}</span>
        </nav>

        <header className="project-head">
          <p className="kicker">{tr(p.kind, lang)}</p>
          <h1>{tr(p.title, lang)}</h1>
          <p className="lead">{tr(p.tagline, lang)}</p>
          <dl className="meta-grid">
            <div>
              <dt>{tr(P.context, lang)}</dt>
              <dd>{tr(p.context, lang)}</dd>
            </div>
            <div>
              <dt>{tr(P.period, lang)}</dt>
              <dd>{tr(p.period, lang)}</dd>
            </div>
            <div>
              <dt>{tr(P.team, lang)}</dt>
              <dd>{tr(p.team, lang)}</dd>
            </div>
            <div>
              <dt>{tr(P.role, lang)}</dt>
              <dd>{tr(p.role, lang)}</dd>
            </div>
          </dl>
          <div className="actions">
            <a className="btn primary" href="#demo">
              ▶ {tr(ui.tryIt, lang)}
            </a>
            {p.links.map((l) => (
              <a key={l.url} className="btn" href={l.url} target="_blank" rel="noopener noreferrer">
                {tr(l.label, lang)} ↗
              </a>
            ))}
          </div>
        </header>

          <div className="project-body">
            <section id="probleme" aria-labelledby="h-probleme">
              <h2 id="h-probleme">{tr(P.problem, lang)}</h2>
              <p className="problem">{tr(p.problem, lang)}</p>
            </section>

            <section id="demo" aria-labelledby="h-demo">
              <h2 id="h-demo">{tr(P.demo, lang)}</h2>
              <Demo p={p} lang={lang} />
            </section>

            <section id="fonctionnalites" aria-labelledby="h-fonc">
              <h2 id="h-fonc">{tr(P.features, lang)}</h2>
              <ol className="features">
                {p.features.map((f, i) => (
                  <li key={f.title.fr} className={f.image ? (f.image.h > f.image.w ? "has-img tall" : "has-img") : undefined}>
                    <div className="feature-text">
                      <span className="feature-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{tr(f.title, lang)}</h3>
                      <p>{tr(f.text, lang)}</p>
                    </div>
                    {f.image && (
                      <Img img={f.image} alt={tr(f.image.alt, lang)} sizes="(max-width: 760px) 100vw, 480px" />
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <section id="architecture" aria-labelledby="h-archi">
              <h2 id="h-archi">{tr(P.architecture, lang)}</h2>
              <Diagram arch={p.architecture} lang={lang} />
            </section>

            {p.research && (
              <section id="etat-de-l-art" aria-labelledby="h-research">
                <h2 id="h-research">{tr(P.research, lang)}</h2>
                <p className="problem">{tr(p.research.intro, lang)}</p>
                <dl className="stats">
                  {p.research.stats.map((st) => (
                    <div key={st.label.fr}>
                      <dt>{st.value}</dt>
                      <dd>{tr(st.label, lang)}</dd>
                    </div>
                  ))}
                </dl>
                <figure className="ranking">
                  <ol>
                    {p.research.comparison.map((c, i) => (
                      <li key={c.name} className={i === 0 ? "top" : undefined}>
                        <span className="rk-name">{c.name}</span>
                        <span className="rk-bar" aria-hidden="true">
                          <i style={{ width: `${(c.score / p.research!.max) * 100}%` }} />
                        </span>
                        <span className="rk-score">
                          {c.score}/{p.research!.max}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <figcaption>{tr(p.research.criteria, lang)}</figcaption>
                </figure>
                <ul className="takeaways">
                  {p.research.takeaways.map((t) => (
                    <li key={t.fr}>{tr(t, lang)}</li>
                  ))}
                </ul>
                <ul className="doc-links">
                  {p.research.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer">
                        {tr(l.label, lang)} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section id="decisions" aria-labelledby="h-dec">
              <h2 id="h-dec">{tr(P.decisions, lang)}</h2>
              <ol className="decisions">
                {p.decisions.map((d) => (
                  <li key={d.choice.fr}>
                    <p className="choice">
                      <strong>{tr(d.choice, lang)}</strong> <span className="over">{tr(P.rather, lang)} {tr(d.over, lang)}</span>
                    </p>
                    <p>{tr(d.because, lang).replace(/^./, (c) => c.toUpperCase())}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="technologies" aria-labelledby="h-tech">
              <h2 id="h-tech">{tr(P.tech, lang)}</h2>
              <ul className="tech">
                {p.tech.map((x) => (
                  <li key={x.name}>
                    <span className="tag">{x.name}</span>
                    <span>{tr(x.role, lang)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Link href={projectHref(lang, next.slug)} className="next">
              <span className="label">{tr(P.next, lang)}</span>
              <span className="next-title">{tr(next.title, lang)} →</span>
              <span className="muted">{tr(next.tagline, lang)}</span>
            </Link>
          </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}

const live = {
  text: {
    fr: "Ci-dessus, une exécution rejouée. La vraie application est aussi en ligne : vrais agents, vraie recherche de profils publics, LLM gratuit. Quelques recherches par jour, de 3 à 5 minutes chacune ; le premier chargement peut prendre une minute si elle était en veille.",
    en: "Above is a replayed run. The real application is online too: real agents, a real search of public profiles, a free LLM. A few searches a day, 3 to 5 minutes each; the first load can take a minute if it was asleep.",
  },
  cta: { fr: "Tester la vraie application", en: "Try the real application" },
};

function Demo({ p, lang }: { p: Project; lang: Lang }) {
  const d = p.demo;
  if (d.kind === "agents")
    return (
      <>
        <AgentRun lang={lang} />
        {d.live && (
          <div className="live-demo">
            <p>{tr(live.text, lang)}</p>
            <a className="btn primary" href={d.live} target="_blank" rel="noopener noreferrer">
              ▶ {tr(live.cta, lang)} ↗
            </a>
          </div>
        )}
      </>
    );
  if (d.kind === "iframe")
    return (
      <>
        <DemoFrame src={d.src} theme={d.theme} title={`${tr(p.title, lang)} — démo`} poster={p.cover} lang={lang} />
        <p className="demo-note">{tr(d.note, lang)}</p>
      </>
    );
  return <PhoneDemo appetizeKey={d.appetizeKey} apk={d.apk} screens={d.screens} note={d.note} lang={lang} />;
}
