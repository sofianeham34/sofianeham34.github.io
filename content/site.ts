import type { L } from "@/lib/i18n";

export const site = {
  name: "Sofiane Hammar",
  url: "https://sofianeham34.github.io",
  email: "sofianeham34@gmail.com",
  github: "https://github.com/sofianeham34",
  linkedin: "https://www.linkedin.com/in/sofiane-hammar-573095369",
  cv: "/cv/CV-Sofiane-Hammar.pdf",
  role: {
    fr: "Je conçois des backends fiables : microservices, temps réel et agents IA, testés et conteneurisés.",
    en: "I build reliable backends: microservices, real-time systems and AI agents, tested and containerised.",
  } satisfies L,
  meta: {
    fr: "Master 2 Génie logiciel · Université de Montpellier · ouvert au remote et à la mobilité",
    en: "MSc Software Engineering, final year · University of Montpellier · open to remote and relocation",
  } satisfies L,
  description: {
    fr: "Étudiant en Master 2 Génie logiciel à Montpellier, je recherche un stage de fin d'études de 6 mois dès février 2027 en développement backend ou full-stack. Projets testables en ligne.",
    en: "Final-year Software Engineering student in Montpellier, looking for a 6-month end-of-studies internship from February 2027 in backend or full-stack development. Projects you can try online.",
  } satisfies L,
};

export type StackItem = { name: string; projects: string[]; note?: L };
export type StackGroup = { title: L; items: StackItem[] };

/** Les identifiants de projets renvoient aux slugs de content/projects.ts. */
export const stack: StackGroup[] = [
  {
    title: { fr: "Backend", en: "Backend" },
    items: [
      { name: "Python", projects: ["multi-agents"] },
      { name: "FastAPI", projects: ["multi-agents"] },
      { name: "Node.js · Express", projects: ["ascendia", "ace-arena"] },
      { name: "Socket.IO", projects: ["ace-arena"] },
      { name: "API REST · JWT · OAuth", projects: ["ascendia", "multi-agents"] },
      { name: "Java", projects: ["traveling"] },
    ],
  },
  {
    title: { fr: "IA / LLM", en: "AI / LLM" },
    items: [
      { name: "LangGraph", projects: ["multi-agents"] },
      { name: "RAG", projects: ["multi-agents"] },
      { name: "LLM via OpenRouter", projects: ["multi-agents", "ascendia"] },
      { name: "ML Kit", projects: ["traveling"] },
    ],
  },
  {
    title: { fr: "Données", en: "Data" },
    items: [
      { name: "MongoDB", projects: ["ascendia"] },
      { name: "SQLite", projects: ["ace-arena"] },
      { name: "ChromaDB", projects: ["multi-agents"] },
      { name: "Firestore · Room", projects: ["traveling"] },
      { name: "MySQL", projects: [], note: { fr: "cours de Licence", en: "university coursework" } },
    ],
  },
  {
    title: { fr: "Front / mobile", en: "Front-end / mobile" },
    items: [
      { name: "React", projects: ["ascendia", "ace-arena"] },
      { name: "Vite · Tailwind CSS", projects: ["ascendia", "ace-arena"] },
      { name: "Android (MVVM)", projects: ["traveling"] },
      { name: "React Native", projects: [], note: { fr: "cours de Master", en: "Master's coursework" } },
    ],
  },
  {
    title: { fr: "DevOps / qualité", en: "DevOps / quality" },
    items: [
      { name: "Docker · Compose", projects: ["multi-agents", "ascendia", "ace-arena"] },
      { name: "pytest", projects: ["multi-agents"] },
      { name: "node:test", projects: ["ascendia", "ace-arena"] },
      { name: "Git · GitHub · GitLab", projects: ["multi-agents", "ascendia", "ace-arena", "traveling"] },
    ],
  },
];

export type Step = { when: string | L; title: L; place: L; detail?: L; upcoming?: boolean };

export const education: Step[] = [
  {
    when: "2027",
    title: { fr: "Stage de fin d'études, 6 mois", en: "End-of-studies internship, 6 months" },
    place: { fr: "Votre équipe ? À partir de février 2027", en: "Your team? From February 2027" },
    upcoming: true,
  },
  {
    when: "2026 — 2027",
    title: { fr: "Master 2 Génie logiciel", en: "MSc Software Engineering, year 2" },
    place: { fr: "Université de Montpellier", en: "University of Montpellier" },
  },
  {
    when: "2025 — 2026",
    title: { fr: "Master 1 Génie logiciel", en: "MSc Software Engineering, year 1" },
    place: { fr: "Université de Montpellier", en: "University of Montpellier" },
    detail: {
      fr: "TER : système multi-agents de recrutement. Programmation mobile : Traveling.",
      en: "Research project: multi-agent recruiting system. Mobile programming: Traveling.",
    },
  },
  {
    when: "2022 — 2025",
    title: { fr: "Licence Informatique", en: "BSc Computer Science" },
    place: { fr: "Université de Montpellier", en: "University of Montpellier" },
    detail: {
      fr: "Projets d'équipe : Ace Arena (L2), Ascendia (L3).",
      en: "Team projects: Ace Arena (year 2), Ascendia (year 3).",
    },
  },
  {
    when: "2022",
    title: { fr: "Baccalauréat général, mention Bien", en: "French Baccalauréat, with honours" },
    place: { fr: "Lycée Jean Monnet", en: "Lycée Jean Monnet" },
  },
];

export const experience: Step[] = [
  {
    when: { fr: "Été 2025", en: "Summer 2025" },
    title: { fr: "Agent de manutention — Zara", en: "Warehouse operative — Zara" },
    place: { fr: "Montpellier · travail en équipe, rythme soutenu", en: "Montpellier · teamwork, fast pace" },
  },
  {
    when: { fr: "Été 2024", en: "Summer 2024" },
    title: { fr: "Entretien de chantiers — NS Pro", en: "Site maintenance — NS Pro" },
    place: { fr: "Montpellier · autonomie, rigueur", en: "Montpellier · autonomy, attention to detail" },
  },
];
