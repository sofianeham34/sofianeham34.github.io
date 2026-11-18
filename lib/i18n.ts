export type Lang = "fr" | "en";

/** Texte disponible dans les deux langues. */
export type L = { fr: string; en: string };

export const tr = (text: L, lang: Lang) => text[lang];

/** Préfixe d'URL : le français est à la racine, l'anglais sous /en. */
export const href = (lang: Lang, path = "/") =>
  lang === "fr" ? path : `/en${path === "/" ? "/" : path}`;

export const projectHref = (lang: Lang, slug: string) => href(lang, `/projets/${slug}/`);

/** Libellés de l'interface. */
export const ui = {
  nav: {
    projects: { fr: "Projets", en: "Projects" },
    stack: { fr: "Stack", en: "Stack" },
    path: { fr: "Parcours", en: "Background" },
    contact: { fr: "Contact", en: "Contact" },
  },
  skip: { fr: "Aller au contenu", en: "Skip to content" },
  theme: { fr: "Changer de thème", en: "Toggle theme" },
  langSwitch: { fr: "English version", en: "Version française" },
  available: {
    fr: "Disponible · stage de fin d'études de 6 mois · dès février 2027",
    en: "Available · 6-month end-of-studies internship · from February 2027",
  },
  cv: { fr: "Télécharger le CV", en: "Download CV (French)" },
  contactMe: { fr: "Me contacter", en: "Get in touch" },
  featured: { fr: "Projet phare", en: "Featured project" },
  seeProject: { fr: "Voir le projet", en: "View project" },
  tryIt: { fr: "Tester", en: "Try it" },
  tryLive: { fr: "Tester l'application en ligne", en: "Try the live app" },
  code: { fr: "Code source", en: "Source code" },
  sections: {
    projects: { fr: "Projets", en: "Projects" },
    stack: { fr: "Stack", en: "Stack" },
    path: { fr: "Parcours", en: "Background" },
    contact: { fr: "Contact", en: "Contact" },
  },
  stackIntro: {
    fr: "Groupée par usage, avec le projet où chaque techno a servi.",
    en: "Grouped by use, with the project where each tool was used.",
  },
  education: { fr: "Formation", en: "Education" },
  experience: { fr: "Expériences", en: "Experience" },
  contactIntro: {
    fr: "Une offre de stage, une question sur un projet : écrivez-moi, je réponds vite.",
    en: "An internship offer or a question about a project: write to me, I reply quickly.",
  },
  copy: { fr: "Copier", en: "Copy" },
  copied: { fr: "Copié", en: "Copied" },
  backHome: { fr: "Tous les projets", en: "All projects" },
  project: {
    problem: { fr: "Le problème", en: "The problem" },
    demo: { fr: "Démo", en: "Demo" },
    features: { fr: "Fonctionnalités clés", en: "Key features" },
    architecture: { fr: "Architecture", en: "Architecture" },
    decisions: { fr: "Décisions techniques", en: "Technical decisions" },
    research: { fr: "État de l'art", en: "Literature review" },
    tech: { fr: "Technologies", en: "Technologies" },
    links: { fr: "Liens", en: "Links" },
    context: { fr: "Contexte", en: "Context" },
    period: { fr: "Période", en: "Period" },
    team: { fr: "Équipe", en: "Team" },
    role: { fr: "Mon rôle", en: "My role" },
    rather: { fr: "plutôt que", en: "rather than" },
    next: { fr: "Projet suivant", en: "Next project" },
    onThisPage: { fr: "Sur cette page", en: "On this page" },
  },
  footer: {
    fr: "Site statique construit avec Next.js et hébergé sur GitHub Pages.",
    en: "Static site built with Next.js, hosted on GitHub Pages.",
  },
} satisfies Record<string, unknown>;
