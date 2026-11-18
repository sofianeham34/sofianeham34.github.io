"use client";

import { useEffect, useRef } from "react";

const GAP = 30; // écart entre les points (px)
const REACH = 160; // rayon d'influence de la souris (px)

/**
 * Fond de l'accroche : une grille de points qui ondule lentement et s'anime
 * autour de la souris (les points proches grossissent et passent à l'orange).
 * Couleurs lues dans le thème (clair ou sombre) ; image fixe si l'utilisateur a
 * demandé moins d'animations ; arrêt quand l'accroche n'est plus visible ou que
 * l'onglet est en arrière-plan.
 */
export function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const souris = { x: -9999, y: -9999 };
    let largeur = 0;
    let hauteur = 0;
    let visible = true;
    let image = 0;
    let encre = "#121212";
    let accent = "#ff4f12";

    const couleurs = () => {
      const style = getComputedStyle(document.documentElement);
      encre = style.getPropertyValue("--fg").trim() || encre;
      accent = style.getPropertyValue("--accent").trim() || accent;
    };

    const taille = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largeur = canvas.clientWidth;
      hauteur = canvas.clientHeight;
      canvas.width = largeur * dpr;
      canvas.height = hauteur * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const dessiner = (t: number) => {
      ctx.clearRect(0, 0, largeur, hauteur);
      const temps = t / 1000;
      for (let y = GAP / 2; y < hauteur; y += GAP) {
        for (let x = GAP / 2; x < largeur; x += GAP) {
          const vague = Math.sin(x * 0.012 + temps * 0.8) + Math.cos(y * 0.016 - temps * 0.6);
          const dx = x - souris.x;
          const dy = y - souris.y;
          const proche = Math.max(0, 1 - Math.hypot(dx, dy) / REACH);
          const r = 1 + 0.45 * vague + 2.4 * proche;
          ctx.globalAlpha = 0.15 + 0.06 * vague + 0.6 * proche;
          ctx.fillStyle = proche > 0.05 ? accent : encre;
          ctx.beginPath();
          // Les points proches s'écartent légèrement du curseur.
          ctx.arc(x - dx * proche * 0.12, y - dy * proche * 0.12, Math.max(0.4, r), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const boucle = (t: number) => {
      dessiner(t);
      image = visible && !document.hidden ? requestAnimationFrame(boucle) : 0;
    };
    const relancer = () => {
      if (!reduit && !image && visible && !document.hidden) image = requestAnimationFrame(boucle);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      souris.x = e.clientX - r.left;
      souris.y = e.clientY - r.top;
      if (reduit) dessiner(0);
    };
    const onLeave = () => {
      souris.x = souris.y = -9999;
    };
    const onResize = () => {
      taille();
      if (reduit) dessiner(0);
    };
    const onTheme = () => {
      couleurs();
      if (reduit) dessiner(0);
    };

    couleurs();
    taille();
    dessiner(0);
    relancer();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      relancer();
    });
    io.observe(canvas);
    // Changement de thème (bouton ◐ ou réglage du système) : on relit les couleurs.
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const schema = matchMedia("(prefers-color-scheme: dark)");
    schema.addEventListener("change", onTheme);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", relancer);

    return () => {
      cancelAnimationFrame(image);
      io.disconnect();
      mo.disconnect();
      schema.removeEventListener("change", onTheme);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", relancer);
    };
  }, []);

  return <canvas ref={ref} className="hero-bg" aria-hidden="true" />;
}
