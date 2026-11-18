"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

const t = {
  steps: {
    fr: ["Réveil du serveur…", "Démarrage de l'API et des agents…", "Chargement de l'interface…", "Encore quelques secondes…"],
    en: ["Waking up the server…", "Starting the API and the agents…", "Loading the interface…", "A few more seconds…"],
  },
  why: {
    fr: "L'application est hébergée gratuitement : elle se met en veille sans visite et met jusqu'à une minute à se réveiller. Elle s'ouvrira toute seule.",
    en: "The app is hosted for free: it sleeps when idle and takes up to a minute to wake up. It will open by itself.",
  },
  direct: { fr: "Ouvrir sans attendre ↗", en: "Open without waiting ↗" },
  back: { fr: "← Retour au projet", en: "← Back to the project" },
} as const;

/** Vrai quand l'application répond : son icône se charge (la page d'attente de l'hébergeur n'est pas une image). */
function repond(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const fin = (ok: boolean) => () => {
      clearTimeout(minuteur);
      resolve(ok);
    };
    const minuteur = setTimeout(fin(false), 8000);
    img.onload = fin(true);
    img.onerror = fin(false);
    img.src = `${url}/favicon.ico?t=${Date.now()}`;
  });
}

/** Lance le réveil de l'application dès l'arrivée sur la page, sans rien afficher. */
export function WarmUp({ url }: { url: string }) {
  useEffect(() => {
    repond(url);
  }, [url]);
  return null;
}

/** Écran de chargement du portfolio, affiché à la place de celui de l'hébergeur. */
export function Launcher({ url, title, back, lang }: { url: string; title: string; back: string; lang: Lang }) {
  const [secondes, setSecondes] = useState(0);

  useEffect(() => {
    let actif = true;
    const debut = Date.now();
    const chrono = setInterval(() => setSecondes(Math.round((Date.now() - debut) / 1000)), 1000);
    (async () => {
      while (actif) {
        if (await repond(url)) {
          if (actif) window.location.replace(url);
          return;
        }
        await new Promise((r) => setTimeout(r, 2000));
      }
    })();
    return () => {
      actif = false;
      clearInterval(chrono);
    };
  }, [url]);

  const etapes = t.steps[lang];
  const etape = etapes[Math.min(etapes.length - 1, Math.floor(secondes / 15))];

  return (
    <main id="contenu" className="launch">
      <div className="launch-box" role="status" aria-live="polite">
        <span className="launch-spinner" aria-hidden="true" />
        <h1>{title}</h1>
        <p className="launch-step">
          {etape} <span className="launch-time">{secondes} s</span>
        </p>
        <p className="launch-why">{t.why[lang]}</p>
        <p className="launch-links">
          <a href={url}>{t.direct[lang]}</a>
          <a href={back}>{t.back[lang]}</a>
        </p>
      </div>
    </main>
  );
}
