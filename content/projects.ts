import type { L } from "@/lib/i18n";

// Pour ajouter un projet : ajoutez un objet à `projects` (l'ordre du tableau est l'ordre
// d'affichage, le premier est mis en avant sur l'accueil) et ses images dans public/img/<slug>/.

export type Img = { src: string; alt: L; w: number; h: number };

export type Demo =
  /** Application hébergée ailleurs (serveur Python) : capture cliquable et lien vers la version en ligne. */
  | { kind: "live"; url: string; note: L }
  /** Application web compilée en version statique, servie depuis public/demos. */
  | { kind: "iframe"; src: string; theme: "light" | "dark"; note: L }
  /** Application Android : téléphone virtuel Appetize si une clé est fournie, sinon parcours des écrans. */
  | { kind: "phone"; appetizeKey: string; apk: string; screens: { src: string; label: L }[]; note: L };

export type Feature = { title: L; text: L; image?: Img };
export type Layer = { label: L; nodes: { name: string; detail: L }[] };
export type Decision = { choice: L; over: L; because: L };
export type Tech = { name: string; role: L };
export type Link = { label: L; url: string };

export type Research = {
  intro: L;
  stats: { value: string; label: L }[];
  /** Comparatif noté : un score par framework. */
  comparison: { name: string; score: number }[];
  max: number;
  criteria: L;
  takeaways: L[];
  links: Link[];
};

export type Project = {
  slug: string;
  title: L;
  /** Nom court, utilisé dans la section Stack. */
  short?: L;
  kind: L;
  tagline: L;
  problem: L;
  context: L;
  period: L;
  team: L;
  role: L;
  facts: L[];
  cover: Img;
  demo: Demo;
  features: Feature[];
  architecture: { layers: Layer[]; flows: L[]; caption: L };
  decisions: Decision[];
  research?: Research;
  tech: Tech[];
  links: Link[];
};

const gh = "https://github.com/sofianeham34/";

export const projects: Project[] = [
  {
    slug: "multi-agents",
    title: { fr: "Système multi-agents de recrutement", en: "Multi-agent recruiting system" },
    short: { fr: "Multi-agents", en: "Multi-agent" },
    kind: { fr: "IA agentique · backend Python", en: "Agentic AI · Python backend" },
    tagline: {
      fr: "Une fiche de poste en entrée ; des candidats trouvés et évalués en sortie, avec un message de contact rédigé pour ceux que l'humain retient.",
      en: "A job description in; candidates found and assessed out, with an outreach message drafted for those a human approves.",
    },
    problem: {
      fr: "Un recruteur technique passe des heures à fouiller GitHub et Stack Overflow pour trouver quelques profils pertinents, puis à les trier à la main. Ici, il colle une fiche de poste : le système cherche, évalue et prépare le contact des meilleurs candidats, et lui laisse la décision finale.",
      en: "A technical recruiter spends hours digging through GitHub and Stack Overflow to find a handful of relevant profiles, then sorts them by hand. Here, they paste a job description: the system searches, scores and drafts outreach for the best candidates, and leaves the final decision to them.",
    },
    context: { fr: "TER de Master 1, Université de Montpellier", en: "Master's research project, University of Montpellier" },
    period: { fr: "Déc. 2025 — Juin 2026", en: "Dec 2025 — Jun 2026" },
    team: { fr: "Équipe de 3", en: "Team of 3" },
    role: {
      fr: "Développement en équipe de 3, de l'état de l'art des frameworks d'agents jusqu'au déploiement en microservices.",
      en: "Built as a team of 3, from the review of agent frameworks to the microservice deployment.",
    },
    facts: [
      { fr: "8 agents spécialisés", en: "8 specialised agents" },
      { fr: "3 sources de candidats", en: "3 candidate sources" },
      { fr: "monolithe ou microservices", en: "monolith or microservices" },
    ],
    cover: { src: "/img/multi-agents/interface.webp", alt: { fr: "Interface web du système multi-agents", en: "Web interface of the multi-agent system" }, w: 1440, h: 900 },
    demo: {
      kind: "live",
      url: "https://recrutement-multi-agents.onrender.com",
      note: {
        fr: "L'application est en ligne : lancez une recherche à partir d'une fiche de poste, choisissez les candidats, lisez les messages rédigés. Quelques recherches par jour, de 3 à 5 minutes chacune ; le premier chargement peut prendre une minute si elle était en veille.",
        en: "The application is online: start a search from a job description, pick the candidates, read the drafted messages. A few searches a day, 3 to 5 minutes each; the first load can take a minute if it was asleep.",
      },
    },
    features: [
      {
        title: { fr: "Pipeline de bout en bout", en: "End-to-end pipeline" },
        text: {
          fr: "De la fiche de poste au rapport final : analyse du besoin, recherche, filtrage, évaluation, messages de contact personnalisés. Le suivi des agents s'affiche en direct dans l'interface.",
          en: "From job description to final report: needs analysis, search, filtering, scoring and personalised outreach. Each agent's progress is shown live in the interface.",
        },
        image: { src: "/img/multi-agents/suivi.webp", alt: { fr: "Recherche en cours : avancement des agents et choix des candidats", en: "Search in progress: agent progress and candidate selection" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Évaluation en parallèle, puis contre-vérification", en: "Parallel scoring, then cross-checking" },
        text: {
          fr: "Une instance d'évaluateur par candidat, lancées en parallèle. Un vérificateur indépendant contrôle chaque note avec des règles métier : un LLM peut surévaluer, un second agent le rattrape.",
          en: "One scoring agent per candidate, run in parallel. An independent verifier checks every score against business rules: an LLM can overrate, a second agent catches it.",
        },
      },
      {
        title: { fr: "Validation humaine", en: "Human in the loop" },
        text: {
          fr: "Le graphe s'interrompt avant la rédaction : l'utilisateur coche les candidats à retenir, y compris parmi les profils douteux. Un message est rédigé pour chacun ; rien n'est envoyé automatiquement.",
          en: "The graph pauses before drafting: the user ticks the candidates to keep, including borderline profiles. A message is drafted for each one; nothing is sent automatically.",
        },
      },
      {
        title: { fr: "Mémoire entre les recrutements", en: "Memory across searches" },
        text: {
          fr: "Les candidats évalués sont stockés dans ChromaDB et réutilisés pour des fiches de poste similaires uniquement, pour ne pas biaiser un poste avec les scores d'un autre.",
          en: "Assessed candidates are stored in ChromaDB and reused only for similar job descriptions, so one role's scores never bias another.",
        },
      },
      {
        title: { fr: "API REST et CLI", en: "REST API and CLI" },
        text: {
          fr: "Le même pipeline est accessible depuis l'interface web, une API FastAPI documentée (Swagger) et la ligne de commande.",
          en: "The same pipeline is available from the web UI, a documented FastAPI API (Swagger) and the command line.",
        },
        image: { src: "/img/multi-agents/api-docs.webp", alt: { fr: "Documentation Swagger de l'API", en: "Swagger documentation of the API" }, w: 1440, h: 900 },
      },
    ],
    architecture: {
      layers: [
        {
          label: { fr: "Entrées", en: "Entry points" },
          nodes: [
            { name: "Interface web", detail: { fr: "suivi en direct", en: "live tracking" } },
            { name: "API REST", detail: { fr: "FastAPI", en: "FastAPI" } },
            { name: "CLI", detail: { fr: "python -m src.main", en: "python -m src.main" } },
          ],
        },
        {
          label: { fr: "Orchestration", en: "Orchestration" },
          nodes: [{ name: "Graphe LangGraph", detail: { fr: "état partagé typé, routage, interruption", en: "typed shared state, routing, interrupts" } }],
        },
        {
          label: { fr: "Agents", en: "Agents" },
          nodes: [
            { name: "A1–A3", detail: { fr: "analyse, stratégie, collecte, filtre", en: "analysis, strategy, collection, filter" } },
            { name: "A6", detail: { fr: "déduplication", en: "deduplication" } },
            { name: "A4 × N · A5 × N", detail: { fr: "évaluation et vérification en parallèle", en: "parallel scoring and verification" } },
            { name: "A7 · A8", detail: { fr: "messages, persistance", en: "outreach, persistence" } },
          ],
        },
        {
          label: { fr: "Services externes et données", en: "External services and data" },
          nodes: [
            { name: "GitHub · Stack Overflow · DuckDuckGo", detail: { fr: "sources de candidats", en: "candidate sources" } },
            { name: "LLM (OpenRouter)", detail: { fr: "API compatible OpenAI", en: "OpenAI-compatible API" } },
            { name: "ChromaDB", detail: { fr: "mémoire vectorielle", en: "vector memory" } },
          ],
        },
      ],
      flows: [
        { fr: "fiche de poste", en: "job description" },
        { fr: "un nœud par agent", en: "one node per agent" },
        { fr: "appels d'outils", en: "tool calls" },
      ],
      caption: {
        fr: "En mode microservices, chaque agent tourne dans son propre conteneur FastAPI ; le graphe les appelle par HTTP.",
        en: "In microservice mode, each agent runs in its own FastAPI container and the graph calls them over HTTP.",
      },
    },
    decisions: [
      {
        choice: { fr: "Un graphe LangGraph explicite", en: "An explicit LangGraph graph" },
        over: { fr: "des agents qui dialoguent librement", en: "agents chatting freely" },
        because: {
          fr: "le déroulement est prévisible et testable, le parallélisme (Send) et l'interruption pour la validation humaine sont natifs. Choix issu du comparatif de frameworks fait pendant l'état de l'art.",
          en: "the flow is predictable and testable, and parallelism (Send) and human-approval interrupts are built in. The choice came out of the framework comparison in our literature review.",
        },
      },
      {
        choice: { fr: "Un vérificateur séparé", en: "A separate verifier" },
        over: { fr: "faire confiance à la note du LLM", en: "trusting the LLM's score" },
        because: {
          fr: "un LLM surévalue parfois un profil ; des règles métier vérifiées par un second agent (expérience, page qui n'est pas un candidat) rendent les décisions explicables.",
          en: "an LLM sometimes overrates a profile; business rules checked by a second agent (experience, pages that aren't candidates) make decisions explainable.",
        },
      },
      {
        choice: { fr: "Écarter un candidat non évaluable", en: "Dropping unscorable candidates" },
        over: { fr: "lui donner une note par défaut", en: "giving them a default score" },
        because: {
          fr: "une réponse LLM inexploitable est retentée une fois, puis le candidat est écarté : jamais de note au hasard.",
          en: "an unusable LLM answer is retried once, then the candidate is dropped: never a random score.",
        },
      },
      {
        choice: { fr: "Une API LLM au format compatible OpenAI", en: "An OpenAI-compatible LLM API" },
        over: { fr: "le SDK d'un seul fournisseur", en: "a single provider's SDK" },
        because: {
          fr: "changer de fournisseur (OpenRouter, Mistral, Groq, modèle local…) se fait dans le .env, sans toucher au code ; le débit est plafonné côté client pour rester dans l'offre gratuite.",
          en: "switching provider (OpenRouter, Mistral, Groq, a local model…) happens in the .env without touching the code; the request rate is capped client-side to stay within the free tier.",
        },
      },
      {
        choice: { fr: "Deux modes de déploiement", en: "Two deployment modes" },
        over: { fr: "microservices uniquement", en: "microservices only" },
        because: {
          fr: "le monolithe permet de développer et tester vite ; les microservices permettent de faire évoluer ou redéployer un agent seul.",
          en: "the monolith keeps development and testing fast; microservices let one agent evolve or be redeployed on its own.",
        },
      },
    ],
    research: {
      intro: {
        fr: "Avant d'écrire une ligne de code, nous avons fait l'état de l'art des systèmes multi-agents classiques et de l'IA agentique, puis comparé les frameworks existants pour choisir celui qui servirait le projet.",
        en: "Before writing any code, we reviewed the literature on classic multi-agent systems and agentic AI, then compared existing frameworks to pick the one that fit the project.",
      },
      stats: [
        { value: "17", label: { fr: "articles et cours analysés", en: "papers and courses reviewed" } },
        { value: "3", label: { fr: "synthèses rédigées", en: "written syntheses" } },
        { value: "9", label: { fr: "frameworks comparés", en: "frameworks compared" } },
        { value: "11", label: { fr: "critères notés", en: "scored criteria" } },
      ],
      comparison: [
        { name: "LangGraph", score: 51 },
        { name: "AutoGen", score: 48 },
        { name: "CrewAI", score: 47 },
        { name: "CAMEL", score: 37 },
        { name: "MetaGPT", score: 31 },
        { name: "LlamaIndex", score: 29 },
        { name: "Strands (AWS)", score: 27 },
        { name: "Semantic Kernel", score: 22 },
        { name: "OpenAI Swarm", score: 15 },
      ],
      max: 55,
      criteria: {
        fr: "Score sur 55 : architecture, coordination, support multi-agents, principes SMA, communication, négociation, mémoire, extensibilité, facilité d'apprentissage, maturité, choix du LLM.",
        en: "Score out of 55: architecture, coordination, multi-agent support, MAS principles, communication, negotiation, memory, extensibility, learning curve, maturity, LLM choice.",
      },
      takeaways: [
        {
          fr: "LangGraph rend le flux explicite : boucles, branches, parallélisme et retours en arrière, là où CrewAI impose une hiérarchie chef-équipe et où AutoGen cache la logique dans les messages.",
          en: "LangGraph makes the flow explicit: loops, branches, parallelism and backtracking, where CrewAI enforces a lead-and-team hierarchy and AutoGen hides the logic in messages.",
        },
        {
          fr: "Son point faible, la courbe d'apprentissage (2/5), a été jugé acceptable au regard de la maîtrise du flux et de la gestion d'état qu'il apporte.",
          en: "Its weak spot, the learning curve (2/5), was judged acceptable given the control over flow and state it provides.",
        },
        {
          fr: "La synthèse SMA a guidé la conception : agents autonomes aux rôles distincts, état partagé de type tableau noir, coordination explicite et humain dans la boucle.",
          en: "The MAS synthesis shaped the design: autonomous agents with distinct roles, a blackboard-style shared state, explicit coordination and a human in the loop.",
        },
      ],
      links: [
        { label: { fr: "Comparatif des frameworks (CSV)", en: "Framework comparison (CSV)" }, url: "https://github.com/sofianeham34/Multi-agent-profile-recruitment/blob/main/Etudes/comparatif_frameworks-2.csv" },
        { label: { fr: "Analyse comparative SMA et IA agentique (PDF)", en: "MAS vs agentic AI analysis (PDF, French)" }, url: "https://github.com/sofianeham34/Multi-agent-profile-recruitment/blob/main/Etudes/analyse_comparative_SMA_AgenticAI.pdf" },
        { label: { fr: "Synthèse sur les SMA (PDF)", en: "MAS synthesis (PDF, French)" }, url: "https://github.com/sofianeham34/Multi-agent-profile-recruitment/blob/main/Etudes/etudes_sma_/synthese_generale_SMA.pdf" },
      ],
    },
    tech: [
      { name: "Python", role: { fr: "langage du backend et des agents", en: "backend and agent language" } },
      { name: "LangGraph", role: { fr: "orchestration des agents", en: "agent orchestration" } },
      { name: "FastAPI", role: { fr: "API REST et microservices", en: "REST API and microservices" } },
      { name: "ChromaDB", role: { fr: "mémoire RAG", en: "RAG memory" } },
      { name: "OpenRouter", role: { fr: "LLM, interchangeable via une API compatible OpenAI", en: "LLM, swappable through an OpenAI-compatible API" } },
      { name: "Docker Compose", role: { fr: "déploiement", en: "deployment" } },
      { name: "pytest", role: { fr: "tests, dont le pipeline complet sans réseau", en: "tests, including the full pipeline offline" } },
    ],
    links: [
      { label: { fr: "Code source", en: "Source code" }, url: gh + "Multi-agent-profile-recruitment" },
      { label: { fr: "Dossier d'état de l'art", en: "Literature review folder" }, url: gh + "Multi-agent-profile-recruitment/tree/main/Etudes" },
    ],
  },

  {
    slug: "traveling",
    title: { fr: "Traveling", en: "Traveling" },
    kind: { fr: "Mobile · Android, Java", en: "Mobile · Android, Java" },
    tagline: {
      fr: "Un réseau social de photos de voyage relié à un générateur d'itinéraires avec de vrais lieux, trajets et météo.",
      en: "A travel photo social network linked to a trip planner with real places, routes and weather.",
    },
    problem: {
      fr: "Pour préparer un voyage, l'inspiration (les photos des autres) et l'organisation (l'itinéraire) se trouvent dans des applications séparées. Traveling relie les deux : une photo donne envie d'une destination, et TravelPath en génère un parcours avec de vrais lieux, trajets et météo.",
      en: "When planning a trip, inspiration (other people's photos) and organisation (the itinerary) live in separate apps. Traveling links them: a photo sparks a destination, and TravelPath builds a route with real places, travel times and weather.",
    },
    context: { fr: "Programmation mobile, Master 1, Université de Montpellier", en: "Mobile programming, Master's year 1, University of Montpellier" },
    period: { fr: "Janv. — Juin 2026", en: "Jan — Jun 2026" },
    team: { fr: "Binôme", en: "Pair project" },
    role: {
      fr: "Développement en binôme de l'application complète : TravelShare, TravelPath et la passerelle entre les deux.",
      en: "Built as a pair: TravelShare, TravelPath and the bridge between them.",
    },
    facts: [
      { fr: "2 modules reliés", en: "2 linked modules" },
      { fr: "12 entités Room", en: "12 Room entities" },
      { fr: "chat temps réel", en: "real-time chat" },
    ],
    cover: { src: "/img/traveling/apercu.webp", alt: { fr: "Écrans de l'application Traveling", en: "Traveling app screens" }, w: 1670, h: 720 },
    demo: {
      kind: "phone",
      appetizeKey: "b_boa3tibxszxjrms3j7uk26j7m4",
      apk: gh + "Traveling-android-app/releases/latest/download/Traveling.apk",
      screens: [
        { src: "/img/traveling/explorer.webp", label: { fr: "Explorer", en: "Explore" } },
        { src: "/img/traveling/detail-photo.webp", label: { fr: "Photo", en: "Photo" } },
        { src: "/img/traveling/groupes.webp", label: { fr: "Groupes", en: "Groups" } },
        { src: "/img/traveling/chat-groupe.webp", label: { fr: "Chat", en: "Chat" } },
        { src: "/img/traveling/travelpath-formulaire.webp", label: { fr: "TravelPath", en: "TravelPath" } },
        { src: "/img/traveling/travelpath-parcours.webp", label: { fr: "Parcours", en: "Route" } },
      ],
      note: {
        fr: "Parcourez les écrans, essayez l'application sur un téléphone virtuel dans un nouvel onglet (quelques secondes de chargement), ou installez l'APK sur un téléphone Android 7.0 ou plus récent.",
        en: "Browse the screens, try the app on a virtual phone in a new tab (takes a few seconds), or install the APK on an Android 7.0+ phone.",
      },
    },
    features: [
      {
        title: { fr: "Fil de photos et filtres", en: "Photo feed and filters" },
        text: {
          fr: "Fil avec 8 filtres (nature, urbain, culture, lieu, likes…), recherche texte et vocale, carte OSMDroid avec les photos géolocalisées.",
          en: "Feed with 8 filters (nature, urban, culture, place, likes…), text and voice search, OSMDroid map with geotagged photos.",
        },
        image: { src: "/img/traveling/explorer.webp", alt: { fr: "Écran Explorer", en: "Explore screen" }, w: 334, h: 720 },
      },
      {
        title: { fr: "Publication enrichie", en: "Rich posts" },
        text: {
          fr: "Plusieurs images, une note vocale, et des tags proposés automatiquement par ML Kit à partir du contenu des photos.",
          en: "Multiple images, a voice note, and tags suggested automatically by ML Kit from the photo content.",
        },
        image: { src: "/img/traveling/detail-photo.webp", alt: { fr: "Détail d'une photo", en: "Photo detail" }, w: 334, h: 720 },
      },
      {
        title: { fr: "Groupes et chat en temps réel", en: "Groups and real-time chat" },
        text: {
          fr: "Groupes publics et privés, messages directs et notifications synchronisées entre appareils via Firestore.",
          en: "Public and private groups, direct messages and notifications synced across devices through Firestore.",
        },
        image: { src: "/img/traveling/chat-groupe.webp", alt: { fr: "Chat de groupe", en: "Group chat" }, w: 334, h: 720 },
      },
      {
        title: { fr: "Itinéraires TravelPath", en: "TravelPath itineraries" },
        text: {
          fr: "Ville, activités, budget, durée : trois parcours (économique, équilibré, confort) avec de vrais lieux OpenStreetMap, des trajets OSRM, la météo par étape et un export PDF.",
          en: "City, activities, budget, duration: three routes (budget, balanced, comfort) with real OpenStreetMap places, OSRM travel times, per-stop weather and a PDF export.",
        },
        image: { src: "/img/traveling/travelpath-parcours.webp", alt: { fr: "Parcours généré", en: "Generated route" }, w: 334, h: 720 },
      },
    ],
    architecture: {
      layers: [
        { label: { fr: "Vue", en: "View" }, nodes: [{ name: "Fragments · Activities", detail: { fr: "observent les LiveData", en: "observe LiveData" } }] },
        { label: { fr: "Logique", en: "Logic" }, nodes: [{ name: "ViewModels", detail: { fr: "SharedViewModel, TravelPathViewModel", en: "SharedViewModel, TravelPathViewModel" } }] },
        {
          label: { fr: "Repository", en: "Repository" },
          nodes: [
            { name: "Room", detail: { fr: "12 entités locales", en: "12 local entities" } },
            { name: "Firebase", detail: { fr: "Auth, Firestore temps réel", en: "Auth, real-time Firestore" } },
            { name: "Cloudinary", detail: { fr: "images", en: "images" } },
          ],
        },
        {
          label: { fr: "API externes", en: "External APIs" },
          nodes: [
            { name: "Overpass · Nominatim", detail: { fr: "lieux", en: "places" } },
            { name: "OSRM", detail: { fr: "trajets", en: "routing" } },
            { name: "Open-Meteo", detail: { fr: "météo", en: "weather" } },
            { name: "ML Kit", detail: { fr: "tags d'images", en: "image labels" } },
          ],
        },
      ],
      flows: [
        { fr: "LiveData", en: "LiveData" },
        { fr: "Repository pattern", en: "Repository pattern" },
        { fr: "HTTP", en: "HTTP" },
      ],
      caption: {
        fr: "Chaque type de donnée a sa source de référence : les photos dans Firestore, les plans TravelPath dans Room, les messages dans Firestore avec un cache local.",
        en: "Each data type has its own source of truth: photos in Firestore, TravelPath plans in Room, messages in Firestore with a local cache.",
      },
    },
    decisions: [
      {
        choice: { fr: "MVVM avec Repository", en: "MVVM with a Repository" },
        over: { fr: "la logique dans les Activities", en: "logic inside Activities" },
        because: {
          fr: "l'état survit aux rotations d'écran, et les vues ignorent d'où viennent les données (Room ou Firestore).",
          en: "state survives screen rotations, and views don't know where data comes from (Room or Firestore).",
        },
      },
      {
        choice: { fr: "Une source de référence par type de donnée", en: "One source of truth per data type" },
        over: { fr: "tout synchroniser partout", en: "syncing everything everywhere" },
        because: {
          fr: "les photos sont partagées, donc dans le cloud ; les plans sont personnels, donc locaux et copiés seulement s'ils sont likés.",
          en: "photos are shared, so they live in the cloud; plans are personal, so they stay local and are copied only when liked.",
        },
      },
      {
        choice: { fr: "OpenStreetMap, OSRM et Open-Meteo", en: "OpenStreetMap, OSRM and Open-Meteo" },
        over: { fr: "des API cartographiques payantes", en: "paid mapping APIs" },
        because: {
          fr: "des services ouverts, utilisables sans clé payante, qui suffisent pour de vrais lieux, trajets et prévisions.",
          en: "open services, usable without a paid key, that are enough for real places, routes and forecasts.",
        },
      },
    ],
    tech: [
      { name: "Java", role: { fr: "langage de l'application", en: "app language" } },
      { name: "Android (MVVM, LiveData)", role: { fr: "architecture", en: "architecture" } },
      { name: "Room", role: { fr: "base locale", en: "local database" } },
      { name: "Firebase", role: { fr: "authentification et temps réel", en: "auth and real-time" } },
      { name: "OSMDroid · OSRM · Overpass", role: { fr: "cartes, lieux, trajets", en: "maps, places, routes" } },
      { name: "ML Kit", role: { fr: "tags d'images", en: "image labelling" } },
    ],
    links: [
      { label: { fr: "Code source", en: "Source code" }, url: gh + "Traveling-android-app" },
      { label: { fr: "Rapport du projet (PDF)", en: "Project report (PDF, French)" }, url: gh + "Traveling-android-app/blob/main/docs/Rapport.pdf" },
    ],
  },

  {
    slug: "ascendia",
    title: { fr: "Ascendia", en: "Ascendia" },
    kind: { fr: "Web · microservices Node.js", en: "Web · Node.js microservices" },
    tagline: {
      fr: "Publier, programmer et analyser ses posts Facebook, Instagram et X depuis un seul tableau de bord.",
      en: "Publish, schedule and analyse Facebook, Instagram and X posts from a single dashboard.",
    },
    problem: {
      fr: "Un commerçant ou un community manager publie sur Facebook, Instagram et X depuis trois applications différentes et perd de vue ce qui marche. Avec Ascendia, il rédige une fois, publie ou programme sur les trois réseaux, et suit l'engagement au même endroit.",
      en: "A shop owner or community manager posts to Facebook, Instagram and X from three different apps and loses track of what works. With Ascendia, they write once, publish or schedule to all three, and follow engagement in one place.",
    },
    context: { fr: "Projet de Licence 3, Université de Montpellier", en: "Bachelor's year 3 project, University of Montpellier" },
    period: { fr: "Déc. 2024 — Avr. 2025", en: "Dec 2024 — Apr 2025" },
    team: { fr: "Équipe de 4", en: "Team of 4" },
    role: {
      fr: "Développement en équipe de 4 : microservices, interface React et intégration des réseaux sociaux.",
      en: "Built as a team of 4: microservices, React interface and social network integration.",
    },
    facts: [
      { fr: "4 services derrière une gateway", en: "4 services behind a gateway" },
      { fr: "3 réseaux sociaux", en: "3 social networks" },
      { fr: "tests de contrôle d'accès", en: "access-control tests" },
    ],
    cover: { src: "/img/ascendia/tableau-de-bord.webp", alt: { fr: "Tableau de bord d'Ascendia", en: "Ascendia dashboard" }, w: 1440, h: 900 },
    demo: {
      kind: "iframe",
      src: "/demos/ascendia/index.html#/",
      theme: "light",
      note: {
        fr: "Version sans serveur : créez un compte avec n'importe quel identifiant, puis reliez un réseau dans « Mes réseaux » (connexion simulée, avec des publications de démonstration). La correction et la traduction appellent de vraies API.",
        en: "Serverless version: sign up with any credentials, then link a network under \"Mes réseaux\" (simulated login, with demo posts). Correction and translation call real APIs.",
      },
    },
    features: [
      {
        title: { fr: "Publication multi-réseaux", en: "Multi-network publishing" },
        text: {
          fr: "Un message, une image, et un résultat par réseau. La correction et la traduction par IA aident à rédiger avant d'envoyer.",
          en: "One message, one image, and one result per network. AI correction and translation help before sending.",
        },
        image: { src: "/img/ascendia/nouvelle-publication.webp", alt: { fr: "Rédaction d'une nouvelle publication", en: "Writing a new post" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Planification", en: "Scheduling" },
        text: {
          fr: "Les posts programmés partent automatiquement à l'heure choisie, grâce à une tâche planifiée côté serveur, et s'affichent dans un calendrier.",
          en: "Scheduled posts go out automatically at the chosen time, via a server-side scheduled job, and appear in a calendar.",
        },
        image: { src: "/img/ascendia/calendrier.webp", alt: { fr: "Calendrier des publications planifiées", en: "Calendar of scheduled posts" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Statistiques", en: "Analytics" },
        text: {
          fr: "J'aime, commentaires, engagement par mois, meilleure publication et détail de chaque post.",
          en: "Likes, comments, monthly engagement, best post and per-post detail.",
        },
        image: { src: "/img/ascendia/statistiques.webp", alt: { fr: "Page de statistiques", en: "Analytics page" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Connexion des réseaux", en: "Connecting networks" },
        text: {
          fr: "Facebook, Instagram et X se lient par OAuth. Les jetons restent sur le serveur et ne sont jamais renvoyés au navigateur.",
          en: "Facebook, Instagram and X are linked through OAuth. Tokens stay on the server and are never sent back to the browser.",
        },
        image: { src: "/img/ascendia/reseaux.webp", alt: { fr: "Gestion des réseaux connectés", en: "Managing connected networks" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Assistance IA", en: "AI assistance" },
        text: {
          fr: "Score de satisfaction calculé à partir des commentaires reçus et recommandation quotidienne fondée sur l'historique de publications.",
          en: "Satisfaction score computed from received comments and a daily recommendation based on posting history.",
        },
        image: { src: "/img/ascendia/tableau-de-bord.webp", alt: { fr: "Tableau de bord avec recommandation", en: "Dashboard with recommendation" }, w: 1440, h: 900 },
      },
    ],
    architecture: {
      layers: [
        { label: { fr: "Client", en: "Client" }, nodes: [{ name: "React", detail: { fr: "Vite, Tailwind, Recharts, FullCalendar", en: "Vite, Tailwind, Recharts, FullCalendar" } }] },
        { label: { fr: "Point d'entrée", en: "Entry point" }, nodes: [{ name: "Gateway", detail: { fr: "proxy /api, bloque les routes internes", en: "/api proxy, blocks internal routes" } }] },
        {
          label: { fr: "Microservices", en: "Microservices" },
          nodes: [
            { name: "users", detail: { fr: "comptes, bcrypt, JWT", en: "accounts, bcrypt, JWT" } },
            { name: "socialAuth", detail: { fr: "OAuth, stockage des jetons", en: "OAuth, token storage" } },
            { name: "posts", detail: { fr: "publication, stats, IA, cron", en: "publishing, stats, AI, cron" } },
          ],
        },
        {
          label: { fr: "Données et API externes", en: "Data and external APIs" },
          nodes: [
            { name: "MongoDB", detail: { fr: "base partagée", en: "shared database" } },
            { name: "Graph API Meta · API X", detail: { fr: "publication et statistiques", en: "publishing and analytics" } },
            { name: "OpenRouter", detail: { fr: "LLM", en: "LLM" } },
          ],
        },
      ],
      flows: [
        { fr: "HTTP + JWT", en: "HTTP + JWT" },
        { fr: "proxy", en: "proxy" },
        { fr: "posts → socialAuth : clé interne", en: "posts → socialAuth: internal key" },
      ],
      caption: {
        fr: "Le service posts obtient les jetons auprès de socialAuth par un appel de service à service protégé par une clé interne : le navigateur ne les voit jamais.",
        en: "The posts service gets tokens from socialAuth through a service-to-service call protected by an internal key: the browser never sees them.",
      },
    },
    decisions: [
      {
        choice: { fr: "Une gateway unique", en: "A single gateway" },
        over: { fr: "exposer chaque service", en: "exposing every service" },
        because: {
          fr: "un seul point d'entrée pour le client, et les routes internes entre services ne sont jamais accessibles depuis l'extérieur.",
          en: "one entry point for the client, and internal service-to-service routes are never reachable from outside.",
        },
      },
      {
        choice: { fr: "Jetons OAuth côté serveur", en: "Server-side OAuth tokens" },
        over: { fr: "les stocker dans le navigateur", en: "storing them in the browser" },
        because: {
          fr: "un jeton volé donnerait accès aux comptes de l'utilisateur ; ils ne quittent donc jamais le backend.",
          en: "a stolen token would give access to the user's accounts, so they never leave the backend.",
        },
      },
      {
        choice: { fr: "Planification par tâche cron serveur", en: "Server-side cron scheduling" },
        over: { fr: "un minuteur dans le navigateur", en: "a timer in the browser" },
        because: {
          fr: "le post part à l'heure prévue même si l'utilisateur a fermé l'onglet.",
          en: "the post goes out on time even if the user has closed the tab.",
        },
      },
      {
        choice: { fr: "Désactiver un réseau non configuré", en: "Disabling unconfigured networks" },
        over: { fr: "bloquer l'application", en: "blocking the app" },
        because: {
          fr: "sans clé d'API, l'application reste utilisable : comptes, planification et calendrier fonctionnent.",
          en: "without API keys the app stays usable: accounts, scheduling and calendar still work.",
        },
      },
    ],
    tech: [
      { name: "Node.js · Express", role: { fr: "microservices et gateway", en: "microservices and gateway" } },
      { name: "MongoDB", role: { fr: "base de données", en: "database" } },
      { name: "React", role: { fr: "interface", en: "interface" } },
      { name: "Passport", role: { fr: "OAuth Facebook, Instagram, X", en: "Facebook, Instagram, X OAuth" } },
      { name: "JWT · bcrypt", role: { fr: "authentification", en: "authentication" } },
      { name: "Docker Compose", role: { fr: "lancement de tous les services", en: "runs every service" } },
      { name: "node:test", role: { fr: "tests d'intégration du contrôle d'accès", en: "access-control integration tests" } },
    ],
    links: [{ label: { fr: "Code source", en: "Source code" }, url: gh + "Application-de-gestion-et-d-analyse-des-r-seaux-sociaux-" }],
  },

  {
    slug: "ace-arena",
    title: { fr: "Ace Arena", en: "Ace Arena" },
    kind: { fr: "Temps réel · Node.js, Socket.IO", en: "Real-time · Node.js, Socket.IO" },
    tagline: {
      fr: "Trois jeux de cartes multijoueurs en temps réel, avec un serveur qui arbitre chaque coup.",
      en: "Three real-time multiplayer card games, with a server that referees every move.",
    },
    problem: {
      fr: "Pour jouer aux cartes en ligne entre amis, il faut souvent installer une application, et rien n'empêche un joueur de tricher. Sur Ace Arena, on crée une salle, on partage un code de 4 lettres, on complète avec des bots, et le serveur vérifie chaque coup.",
      en: "Playing cards online with friends often means installing an app, and nothing stops a player from cheating. On Ace Arena you create a room, share a 4-letter code, fill seats with bots, and the server checks every move.",
    },
    context: { fr: "Projet de Licence 2, Université de Montpellier", en: "Bachelor's year 2 project, University of Montpellier" },
    period: { fr: "Déc. 2023 — Mai 2024", en: "Dec 2023 — May 2024" },
    team: { fr: "Équipe de 4", en: "Team of 4" },
    role: {
      fr: "Développement en équipe de 4 : moteurs de jeu, serveur temps réel et interface.",
      en: "Built as a team of 4: game engines, real-time server and interface.",
    },
    facts: [
      { fr: "3 jeux complets", en: "3 complete games" },
      { fr: "serveur arbitre", en: "authoritative server" },
      { fr: "jouable sur mobile", en: "playable on mobile" },
    ],
    cover: { src: "/img/ace-arena/6-qui-prend.webp", alt: { fr: "Partie de 6 qui prend sur Ace Arena", en: "A game of 6 Nimmt! on Ace Arena" }, w: 1440, h: 900 },
    demo: {
      kind: "iframe",
      src: "/demos/ace-arena/index.html#/jouer",
      theme: "dark",
      note: {
        fr: "Version sans serveur : le vrai moteur de jeu tourne dans votre navigateur. Créez une salle, ajoutez des bots et lancez la partie.",
        en: "Serverless version: the real game engine runs in your browser. Create a room, add bots and start the game.",
      },
    },
    features: [
      {
        title: { fr: "Trois jeux complets", en: "Three complete games" },
        text: {
          fr: "6 qui prend (manches jusqu'à 66 têtes), Bataille ouverte (choix simultané) et 8 américain (8 joker, as +2 cumulable, valet qui inverse le sens).",
          en: "6 Nimmt! (rounds up to 66 bull heads), open War (simultaneous choice) and Crazy Eights (wild 8, stackable +2 aces, jack reverses direction).",
        },
        image: { src: "/img/ace-arena/6-qui-prend.webp", alt: { fr: "Table de 6 qui prend", en: "6 Nimmt! table" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Salles privées et bots", en: "Private rooms and bots" },
        text: {
          fr: "Un code de 4 lettres à partager, une liste des salles ouvertes mise à jour en direct, un chat, et des bots pour compléter la table.",
          en: "A 4-letter code to share, a live list of open rooms, a chat, and bots to fill the table.",
        },
        image: { src: "/img/ace-arena/salle.webp", alt: { fr: "Salle d'attente avec code et bots", en: "Waiting room with code and bots" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Reconnexion", en: "Reconnection" },
        text: {
          fr: "Recharger la page ou perdre le réseau ne fait pas perdre sa place. Si un joueur abandonne, un bot prend le relais.",
          en: "Reloading the page or losing the network doesn't cost your seat. If a player leaves, a bot takes over.",
        },
        image: { src: "/img/ace-arena/8-americain.webp", alt: { fr: "Partie de 8 américain", en: "Crazy Eights game" }, w: 1440, h: 900 },
      },
      {
        title: { fr: "Comptes, classement, mobile", en: "Accounts, leaderboard, mobile" },
        text: {
          fr: "Victoires et taux de victoire par jeu, et une interface responsive jouable sur téléphone.",
          en: "Wins and win rate per game, and a responsive interface playable on a phone.",
        },
        image: { src: "/img/ace-arena/bataille.webp", alt: { fr: "Partie de Bataille ouverte", en: "Open War game" }, w: 1440, h: 900 },
      },
    ],
    architecture: {
      layers: [
        { label: { fr: "Client", en: "Client" }, nodes: [{ name: "React", detail: { fr: "tables de jeu : affichent la vue reçue", en: "game tables: render the received view" } }] },
        {
          label: { fr: "Temps réel et API", en: "Real-time and API" },
          nodes: [
            { name: "Socket.IO · RoomManager", detail: { fr: "salles, bots, reconnexion, chat", en: "rooms, bots, reconnection, chat" } },
            { name: "Express", detail: { fr: "inscription, connexion, classement", en: "sign-up, login, leaderboard" } },
          ],
        },
        {
          label: { fr: "Règles", en: "Rules" },
          nodes: [{ name: "Moteurs de jeu", detail: { fr: "fonctions pures : bataille, 6 qui prend, 8 américain", en: "pure functions: War, 6 Nimmt!, Crazy Eights" } }],
        },
        { label: { fr: "Données", en: "Data" }, nodes: [{ name: "SQLite", detail: { fr: "comptes et résultats", en: "accounts and results" } }] },
      ],
      flows: [
        { fr: "intentions ↑ · vue filtrée ↓", en: "intents ↑ · filtered view ↓" },
        { fr: "create · act · view", en: "create · act · view" },
        { fr: "résultats", en: "results" },
      ],
      caption: {
        fr: "Le client n'envoie que des intentions (« je joue le 42 ») ; le serveur répond avec une vue filtrée où chaque joueur ne voit que sa main.",
        en: "The client only sends intents (\"I play the 42\"); the server answers with a filtered view where each player only sees their own hand.",
      },
    },
    decisions: [
      {
        choice: { fr: "Un serveur arbitre et une vue filtrée", en: "An authoritative server and filtered view" },
        over: { fr: "la logique de jeu côté client", en: "game logic on the client" },
        because: {
          fr: "le serveur mélange, distribue et valide chaque coup ; les mains adverses ne sont jamais envoyées, donc impossibles à lire même en inspectant le réseau.",
          en: "the server shuffles, deals and validates every move; opponents' hands are never sent, so they can't be read even by inspecting network traffic.",
        },
      },
      {
        choice: { fr: "Des moteurs de jeu en fonctions pures", en: "Game engines as pure functions" },
        over: { fr: "des règles mêlées au code réseau", en: "rules mixed with network code" },
        because: {
          fr: "les trois jeux partagent la même interface (create, act, view, botAction) : ils se testent sans réseau, et ajouter un jeu revient à écrire un module.",
          en: "all three games share the same interface (create, act, view, botAction): they are tested without a network, and adding a game means writing one module.",
        },
      },
      {
        choice: { fr: "Le module natif node:sqlite", en: "Native node:sqlite" },
        over: { fr: "une dépendance à compiler", en: "a native dependency to compile" },
        because: {
          fr: "l'installation tient en un npm install, sans chaîne de compilation, en local comme dans Docker.",
          en: "installing is a single npm install with no build toolchain, locally and in Docker.",
        },
      },
      {
        choice: { fr: "scrypt avec sel et requêtes préparées", en: "Salted scrypt and prepared statements" },
        over: { fr: "un hachage simple et du SQL concaténé", en: "plain hashing and concatenated SQL" },
        because: {
          fr: "mots de passe protégés même si la base fuit, comparaison en temps constant, et injection SQL impossible.",
          en: "passwords stay protected even if the database leaks, comparison is constant-time, and SQL injection is ruled out.",
        },
      },
    ],
    tech: [
      { name: "Node.js", role: { fr: "serveur", en: "server" } },
      { name: "Socket.IO", role: { fr: "temps réel, salles", en: "real-time, rooms" } },
      { name: "React · Vite", role: { fr: "interface", en: "interface" } },
      { name: "SQLite", role: { fr: "comptes et classement", en: "accounts and leaderboard" } },
      { name: "node:test", role: { fr: "règles, parties simulées, intégration", en: "rules, simulated games, integration" } },
      { name: "Docker", role: { fr: "image de production", en: "production image" } },
    ],
    links: [{ label: { fr: "Code source", en: "Source code" }, url: gh + "Plateforme-de-jeux-de-cartes" }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
