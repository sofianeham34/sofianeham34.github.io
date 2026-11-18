"use client";

import { useEffect, useRef, useState } from "react";
import { candidates, jobPosting, repoSrc, steps, type AgentStep } from "@/content/agentRun";
import type { Lang } from "@/lib/i18n";

type Phase = "idle" | "running" | "paused" | "done";
type Status = "pending" | "active" | "done" | "skipped";

const t = {
  job: { fr: "Fiche de poste", en: "Job description" },
  run: { fr: "Lancer", en: "Run" },
  rerun: { fr: "Relancer", en: "Run again" },
  reset: { fr: "Réinitialiser", en: "Reset" },
  replay: { fr: "Exécution rejouée · candidats fictifs · aucun appel LLM", en: "Replayed run · fictional candidates · no LLM calls" },
  pending: { fr: "en attente", en: "waiting" },
  active: { fr: "en cours", en: "running" },
  done: { fr: "terminé", en: "done" },
  skipped: { fr: "sauté", en: "skipped" },
  idle: { fr: "Lancez le graphe pour voir chaque agent travailler. Cliquez sur une étape pour l'inspecter.", en: "Run the graph to watch each agent work. Click a step to inspect it." },
  approve: { fr: "Approuver", en: "Approve" },
  reject: { fr: "Rejeter", en: "Reject" },
  awaiting: { fr: "Le graphe attend votre décision.", en: "The graph is waiting for your decision." },
  rejected: { fr: "Liste rejetée : aucun message ne sera rédigé.", en: "List rejected: no message will be drafted." },
  skippedNote: { fr: "Étape sautée : la liste a été rejetée.", en: "Step skipped: the list was rejected." },
  steps: { fr: "Étapes du graphe", en: "Graph steps" },
  verifying: { fr: "contrôle…", en: "checking…" },
  scoring: { fr: "évaluation…", en: "scoring…" },
  kept: { fr: "validé", en: "kept" },
  dropped: { fr: "écarté", en: "rejected" },
  fixed: { fr: "corrigé", en: "corrected" },
} as const;

export function AgentRun({ lang }: { lang: Lang }) {
  const L = (k: keyof typeof t) => t[k][lang];
  const [phase, setPhase] = useState<Phase>("idle");
  const [current, setCurrent] = useState(-1);
  const [rejected, setRejected] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Avance d'une étape tant que le graphe tourne.
  useEffect(() => {
    if (phase !== "running") return;
    const step = steps[current];
    const delay = reduced.current ? 150 : step?.lanes ? 1400 : 700;
    const timer = setTimeout(() => {
      let next = current + 1;
      while (next < steps.length && rejected && steps[next].skipOnReject) next++;
      if (next >= steps.length) {
        setCurrent(steps.length);
        setPhase("done");
        return;
      }
      setCurrent(next);
      setSelected(null);
      if (steps[next].pause) setPhase("paused");
    }, current < 0 ? 0 : delay);
    return () => clearTimeout(timer);
  }, [phase, current, rejected]);

  const statusOf = (idx: number): Status => {
    const s = steps[idx];
    if (rejected && s.skipOnReject && idx < current) return "skipped";
    if (idx < current) return "done";
    if (idx === current) return phase === "done" ? "done" : "active";
    return "pending";
  };

  const run = () => {
    setRejected(false);
    setSelected(null);
    setCurrent(-1);
    setPhase("running");
  };
  const reset = () => {
    setPhase("idle");
    setCurrent(-1);
    setRejected(false);
    setSelected(null);
  };
  const decide = (ok: boolean) => {
    setRejected(!ok);
    setPhase("running");
  };

  const shown = selected ?? (current >= 0 ? Math.min(current, steps.length - 1) : null);

  return (
    <div className="agent-run">
      <div className="ar-top">
        <div className="ar-job">
          <span className="label">{L("job")}</span>
          <p>{jobPosting[lang]}</p>
        </div>
        <div className="ar-controls">
          <button type="button" className="btn primary" onClick={run} disabled={phase === "running" || phase === "paused"}>
            {phase === "done" ? `↻ ${L("rerun")}` : `▶ ${L("run")}`}
          </button>
          <button type="button" className="btn" onClick={reset} disabled={phase === "idle"}>
            {L("reset")}
          </button>
        </div>
      </div>

      <div className="ar-body">
        <ol className="ar-steps" aria-label={L("steps")}>
          {steps.map((s, idx) => {
            const st = statusOf(idx);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  className={`ar-step is-${st}${shown === idx ? " is-shown" : ""}`}
                  onClick={() => setSelected(idx)}
                  aria-pressed={shown === idx}
                >
                  <span className="dot" aria-hidden="true" />
                  <span className="code">{s.code}</span>
                  <span className="name">{s.name[lang]}</span>
                  <span className="st">{L(st)}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="ar-panel" aria-live="polite">
          {shown === null ? (
            <p className="ar-idle">{L("idle")}</p>
          ) : (
            <StepPanel
              step={steps[shown]}
              status={statusOf(shown)}
              lang={lang}
              awaiting={phase === "paused" && shown === current}
              rejected={rejected}
              onDecide={decide}
              L={L}
            />
          )}
        </div>
      </div>

      <p className="ar-note">{L("replay")}</p>
    </div>
  );
}

function StepPanel({
  step,
  status,
  lang,
  awaiting,
  rejected,
  onDecide,
  L,
}: {
  step: AgentStep;
  status: Status;
  lang: Lang;
  awaiting: boolean;
  rejected: boolean;
  onDecide: (ok: boolean) => void;
  L: (k: keyof typeof t) => string;
}) {
  const finished = status === "done";
  return (
    <div className="ar-detail">
      <div className="ar-detail-head">
        <span className="code">{step.code}</span>
        <h3>{step.name[lang]}</h3>
        <span className={`pill is-${status}`}>{L(status)}</span>
      </div>
      <p className="ar-role">{step.role[lang]}</p>

      {status === "skipped" && <p className="ar-out muted">{L("skippedNote")}</p>}

      {step.lanes && (status === "active" || finished) && (
        <ul className="ar-lanes">
          {candidates.map((c) => {
            const verify = step.lanes === "verify";
            const score = verify && finished && c.after ? c.after : c.score;
            const state = !finished ? "run" : verify ? c.verdict : "ok";
            return (
              <li key={c.who} className={`lane is-${state}`}>
                <span className="who">
                  {c.who} <span className="src">{c.source}</span>
                </span>
                <span className="bar" aria-hidden="true">
                  <i style={{ width: finished || verify ? `${score}%` : "0%" }} />
                </span>
                <span className="val">
                  {!finished ? (verify ? L("verifying") : L("scoring")) : verify ? verdictLabel(c.verdict, L) : score}
                </span>
                {finished && verify && c.note && <span className="why">{c.note[lang]}</span>}
              </li>
            );
          })}
        </ul>
      )}

      {(finished || (step.pause && status === "active")) && (
        <div className="ar-out">
          {step.output.map((line, i) => (
            <p key={i}>{line[lang]}</p>
          ))}
        </div>
      )}

      {awaiting && (
        <div className="ar-hitl">
          <p>{L("awaiting")}</p>
          <div className="row">
            <button type="button" className="btn primary" onClick={() => onDecide(true)}>
              {L("approve")}
            </button>
            <button type="button" className="btn" onClick={() => onDecide(false)}>
              {L("reject")}
            </button>
          </div>
        </div>
      )}
      {step.pause && finished && rejected && <p className="ar-out warn">{L("rejected")}</p>}

      <a className="ar-src" href={repoSrc + step.file} target="_blank" rel="noopener noreferrer">
        src/{step.file} ↗
      </a>
    </div>
  );
}

function verdictLabel(v: string | undefined, L: (k: keyof typeof t) => string) {
  if (v === "rejected") return L("dropped");
  if (v === "adjusted") return L("fixed");
  return L("kept");
}
