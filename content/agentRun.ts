import type { L } from "@/lib/i18n";

// Exécution enregistrée du graphe (src/graph.py du dépôt), rejouée dans le navigateur.
// Les candidats sont fictifs : la démo publique n'appelle ni LLM ni API externe.

export type Lane = { who: string; source: string; score: number; verdict?: "ok" | "adjusted" | "rejected"; note?: L; after?: number };

export type AgentStep = {
  id: string;
  code: string;
  name: L;
  role: L;
  file: string;
  /** Lignes affichées une fois l'agent terminé. */
  output: L[];
  /** Exécution parallèle : une ligne par candidat. */
  lanes?: "score" | "verify";
  pause?: boolean;
  /** Sauté si la liste est rejetée. */
  skipOnReject?: boolean;
};

export const jobPosting: L = {
  fr: "Développeur backend Python — FastAPI, Docker, PostgreSQL. 3 ans d'expérience minimum. Montpellier ou télétravail.",
  en: "Python backend developer — FastAPI, Docker, PostgreSQL. 3+ years of experience. Montpellier or remote.",
};

export const candidates: Lane[] = [
  { who: "m-durand", source: "GitHub", score: 88, verdict: "ok" },
  { who: "lea.codes", source: "GitHub", score: 81, verdict: "ok" },
  { who: "py-occitanie", source: "GitHub", score: 76, verdict: "rejected", note: { fr: "compte d'organisation, pas un candidat", en: "organisation account, not a candidate" } },
  { who: "k-benali", source: "Stack Overflow", score: 72, verdict: "ok" },
  { who: "t-roux", source: "Web", score: 69, verdict: "adjusted", after: 58, note: { fr: "expérience estimée < 3 ans", en: "estimated experience < 3 years" } },
];

export const steps: AgentStep[] = [
  {
    id: "a1", code: "A1", file: "agents/orchestrateur.py",
    name: { fr: "Orchestrateur", en: "Orchestrator" },
    role: { fr: "Valide la fiche de poste et initialise l'état partagé du graphe.", en: "Validates the job description and initialises the graph's shared state." },
    output: [{ fr: "fiche valide · état initialisé", en: "valid description · state initialised" }],
  },
  {
    id: "a2", code: "A2", file: "agents/analyste.py",
    name: { fr: "Analyste", en: "Analyst" },
    role: { fr: "Extrait un profil de compétences structuré.", en: "Extracts a structured skills profile." },
    output: [
      { fr: "compétences : Python, FastAPI, Docker, PostgreSQL", en: "skills: Python, FastAPI, Docker, PostgreSQL" },
      { fr: "niveau : confirmé (3 ans et plus)", en: "level: mid-level (3+ years)" },
      { fr: "lieu : Montpellier · télétravail accepté", en: "location: Montpellier · remote OK" },
    ],
  },
  {
    id: "a3a", code: "A3a", file: "agents/chercheur_stratege.py",
    name: { fr: "Stratège", en: "Strategist" },
    role: { fr: "Génère des requêtes adaptées à chaque source.", en: "Generates queries tailored to each source." },
    output: [
      { fr: "GitHub : language:python location:montpellier fastapi", en: "GitHub: language:python location:montpellier fastapi" },
      { fr: "Stack Overflow : tags fastapi, docker", en: "Stack Overflow: tags fastapi, docker" },
      { fr: "Web : « développeur FastAPI Montpellier »", en: "Web: \"FastAPI developer Montpellier\"" },
    ],
  },
  {
    id: "a3b", code: "A3b", file: "agents/chercheur_collecteur.py",
    name: { fr: "Collecteur", en: "Collector" },
    role: { fr: "Interroge les API GitHub et Stack Overflow et la recherche web.", en: "Queries the GitHub and Stack Overflow APIs and web search." },
    output: [{ fr: "52 résultats : GitHub 24 · Stack Overflow 11 · web 17", en: "52 results: GitHub 24 · Stack Overflow 11 · web 17" }],
  },
  {
    id: "a3c", code: "A3c", file: "agents/chercheur_filtre.py",
    name: { fr: "Filtre", en: "Filter" },
    role: { fr: "Élimine le bruit et garde les profils individuels.", en: "Removes noise and keeps individual profiles." },
    output: [{ fr: "52 → 19 : offres d'emploi, articles et listes écartés", en: "52 → 19: job ads, articles and lists removed" }],
  },
  {
    id: "a6", code: "A6", file: "agents/deduplicateur.py",
    name: { fr: "Déduplicateur", en: "Deduplicator" },
    role: { fr: "Fusionne les profils d'une même personne trouvés sur plusieurs sources.", en: "Merges profiles of the same person found on several sources." },
    output: [{ fr: "19 → 14 profils uniques (5 fusions)", en: "19 → 14 unique profiles (5 merges)" }],
  },
  {
    id: "a4", code: "A4 × N", file: "agents/evaluateur.py", lanes: "score",
    name: { fr: "Évaluateurs", en: "Scorers" },
    role: { fr: "Une instance par candidat, en parallèle (Send) : chacune note l'adéquation au poste.", en: "One instance per candidate, in parallel (Send): each scores fit for the role." },
    output: [{ fr: "14 candidats notés en parallèle · 5 premiers ci-dessous", en: "14 candidates scored in parallel · top 5 below" }],
  },
  {
    id: "a5", code: "A5 × N", file: "agents/verificateur.py", lanes: "verify",
    name: { fr: "Vérificateurs", en: "Verifiers" },
    role: { fr: "Contrôle indépendant de chaque note avec des règles métier.", en: "Independent check of every score against business rules." },
    output: [{ fr: "1 profil écarté · 1 note corrigée", en: "1 profile rejected · 1 score corrected" }],
  },
  {
    id: "rag", code: "RAG", file: "agents/injection_rag.py",
    name: { fr: "Mémoire", en: "Memory" },
    role: { fr: "Réinjecte les candidats déjà évalués pour des fiches similaires.", en: "Reinjects candidates already assessed for similar roles." },
    output: [{ fr: "fiche similaire trouvée : 2 scores réutilisés depuis ChromaDB", en: "similar role found: 2 scores reused from ChromaDB" }],
  },
  {
    id: "hitl", code: "HITL", file: "graph.py", pause: true,
    name: { fr: "Validation humaine", en: "Human approval" },
    role: { fr: "Le graphe s'interrompt : un humain approuve ou rejette la liste avant tout contact.", en: "The graph pauses: a human approves or rejects the list before any outreach." },
    output: [{ fr: "3 candidats proposés : m-durand, lea.codes, k-benali", en: "3 candidates proposed: m-durand, lea.codes, k-benali" }],
  },
  {
    id: "a7", code: "A7", file: "agents/recruteur.py", skipOnReject: true,
    name: { fr: "Recruteur", en: "Recruiter" },
    role: { fr: "Rédige un message personnalisé pour chaque candidat approuvé.", en: "Writes a personalised message for each approved candidate." },
    output: [
      { fr: "3 messages rédigés. Extrait pour m-durand :", en: "3 messages written. Excerpt for m-durand:" },
      {
        fr: "« Bonjour, votre API FastAPI de réservation sur GitHub a retenu notre attention : son découpage en services et ses tests correspondent au poste… »",
        en: "\"Hi, your FastAPI booking API on GitHub caught our attention: its service split and test suite match the role…\"",
      },
    ],
  },
  {
    id: "rapport", code: "Rapport", file: "graph.py",
    name: { fr: "Rapport final", en: "Final report" },
    role: { fr: "Synthèse : candidats retenus, scores, justifications.", en: "Summary: shortlisted candidates, scores, reasons." },
    output: [{ fr: "rapport produit : retenus, écartés et justification de chaque décision", en: "report written: kept, rejected and the reason for each decision" }],
  },
  {
    id: "a8", code: "A8", file: "agents/persistance.py",
    name: { fr: "Persistance", en: "Persistence" },
    role: { fr: "Enregistre les candidats évalués pour les prochains recrutements.", en: "Stores assessed candidates for future searches." },
    output: [{ fr: "14 profils enregistrés dans ChromaDB", en: "14 profiles stored in ChromaDB" }],
  },
];

export const repoSrc = "https://github.com/sofianeham34/Multi-agent-profile-recruitment/blob/main/src/";
