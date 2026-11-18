"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Mouvements du site, tous facultatifs (le contenu reste visible sans JavaScript) :
 * défilement fluide, apparition des blocs [data-reveal], images [data-grow] qui
 * s'agrandissent au défilement, en-tête qui se cache quand on descend.
 * Rien de tout cela si l'utilisateur a demandé à réduire les animations.
 */
export function Motion() {
  const pathname = usePathname();

  // Défilement fluide : une seule instance pour tout le site.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -24 } });
    return () => lenis.destroy();
  }, []);

  // Apparitions et effets liés au défilement, à refaire à chaque page.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const blocs = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    blocs.forEach((el) => (reduit ? el.classList.add("is-in") : io.observe(el)));

    const images = [...document.querySelectorAll<HTMLElement>("[data-grow]")];
    const header = document.querySelector<HTMLElement>(".site-header");
    let dernier = window.scrollY;
    let attente = 0;

    const maj = () => {
      attente = 0;
      const y = window.scrollY;
      if (header) {
        header.classList.toggle("is-scrolled", y > 8);
        header.classList.toggle("is-hidden", y > dernier && y > 160);
      }
      dernier = y;
      const h = window.innerHeight;
      if (reduit) return;
      for (const el of images) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (h - r.top) / (h * 0.75)));
        el.style.setProperty("--p", p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!attente) attente = requestAnimationFrame(maj);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    maj();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (attente) cancelAnimationFrame(attente);
    };
  }, [pathname]);

  return null;
}
