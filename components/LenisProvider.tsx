"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { mouvementReduit, surChangementDeMouvement } from "@/lib/mouvement";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId = 0;

    // Lenis remplace le défilement natif par une interpolation qu'il rejoue à
    // chaque image. C'est le mouvement le plus envahissant de la page, et le seul
    // que la règle CSS de globals.css ne peut pas arrêter : elle agit sur les
    // durées d'animation et de transition, pas sur une position réécrite en JS.
    // Sous « réduire les animations », on ne le démarre pas du tout — le
    // défilement natif du navigateur reprend sa place, ce qui est exactement ce
    // que le réglage demande.
    function demarrer() {
      if (lenis) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis.on("scroll", () => ScrollTrigger.update());
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      gsap.ticker.lagSmoothing(0);
    }

    function arreter() {
      if (!lenis) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
      lenis.destroy();
      lenis = null;
      // Le défilement natif a pu être laissé désactivé par Lenis ; ScrollTrigger
      // doit aussi réapprendre les positions, qu'il lisait via l'événement Lenis.
      ScrollTrigger.refresh();
    }

    if (!mouvementReduit()) demarrer();

    // Réagir au réglage qui change en cours de visite : quelqu'un qui l'active
    // vient le plus souvent d'être gêné par la page. Lui demander de recharger
    // serait répondre à côté.
    const desabonner = surChangementDeMouvement((reduit) => {
      if (reduit) arreter();
      else demarrer();
    });

    return () => {
      desabonner();
      arreter();
    };
  }, []);

  return <>{children}</>;
}
