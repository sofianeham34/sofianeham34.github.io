"use client";

import { useState } from "react";
import type { Img as ImgData } from "@/content/projects";
import type { L, Lang } from "@/lib/i18n";
import { Img } from "./Img";

const t = {
  launch: { fr: "Lancer la démo", en: "Launch the demo" },
  full: { fr: "Plein écran ↗", en: "Full screen ↗" },
  apk: { fr: "Télécharger l'APK", en: "Download the APK" },
  start: { fr: "Essayer sur un téléphone virtuel", en: "Try it on a virtual phone" },
  screens: { fr: "Écrans de l'application", en: "App screens" },
} as const;

/** Démo web chargée seulement au clic, pour garder la page légère. */
export function DemoFrame({ src, theme, title, poster, lang }: { src: string; theme: "light" | "dark"; title: string; poster: ImgData; lang: Lang }) {
  const [on, setOn] = useState(false);
  const address = `sofianeham34.github.io${src.replace(/index\.html.*$/, "")}`;

  return (
    <div className={`browser theme-${theme}`}>
      <div className="browser-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="url">{address}</span>
        <a href={src} target="_blank" rel="noopener" className="full">
          {t.full[lang]}
        </a>
      </div>
      <div className="browser-view">
        {on ? (
          <iframe src={src} title={title} loading="lazy" allow="clipboard-write" />
        ) : (
          <button type="button" className="poster" onClick={() => setOn(true)}>
            <Img img={poster} alt="" sizes="(max-width: 960px) 100vw, 880px" />
            <span className="play">▶ {t.launch[lang]}</span>
          </button>
        )}
      </div>
    </div>
  );
}

/** Application Android : ses vrais écrans, et un lien vers le téléphone virtuel Appetize si une clé est fournie. */
export function PhoneDemo({
  appetizeKey,
  apk,
  screens,
  note,
  lang,
}: {
  appetizeKey: string;
  apk: string;
  screens: { src: string; label: L }[];
  note: L;
  lang: Lang;
}) {
  const [screen, setScreen] = useState(0);

  return (
    <div className="phone-demo">
      <div className="phone">
        <img src={screens[screen].src} alt={screens[screen].label[lang]} width={334} height={720} decoding="async" />
      </div>
      <div className="phone-side">
        <div className="screen-tabs" role="group" aria-label={t.screens[lang]}>
          {screens.map((s, i) => (
            <button key={s.src} type="button" aria-pressed={i === screen} onClick={() => setScreen(i)}>
              {s.label[lang]}
            </button>
          ))}
        </div>
        <p className="muted">{note[lang]}</p>
        <div className="actions">
          {appetizeKey && (
            <a className="btn primary" href={`https://appetize.io/app/${appetizeKey}?device=pixel7`} target="_blank" rel="noopener noreferrer">
              ▶ {t.start[lang]} ↗
            </a>
          )}
          <a className="btn" href={apk}>
            ↓ {t.apk[lang]}
          </a>
        </div>
      </div>
    </div>
  );
}
