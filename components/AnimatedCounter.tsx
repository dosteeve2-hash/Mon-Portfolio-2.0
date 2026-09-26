"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { mouvementReduit, surChangementDeMouvement } from "@/lib/mouvement";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ecrire = (valeur: number) => {
      el.textContent = `${prefix}${valeur}${suffix}`;
    };

    let ctx: gsap.Context | null = null;

    function animer() {
      if (ctx) return;
      ctx = gsap.context(() => {
        const obj = { value: 0 };
        ScrollTrigger.create({
          trigger: el!,
          start: "top 85%",
          once: true,
          onEnter: () => {
            // Le compteur ne repart de zéro qu'à l'instant où il entre dans le
            // champ, donc juste avant de remonter. Le reste du temps, le nombre
            // affiché est le vrai.
            ecrire(0);
            gsap.to(obj, {
              value: target,
              duration,
              ease: "power2.out",
              onUpdate: () => ecrire(Math.floor(obj.value)),
              onComplete: () => ecrire(target),
            });
          },
        });
      });
    }

    function arreter() {
      ctx?.revert();
      ctx = null;
      ecrire(target);
    }

    // GSAP interpole un nombre en JavaScript : la règle `prefers-reduced-motion`
    // de globals.css, qui agit sur les durées CSS, ne l'atteint pas. Sans ce
    // test, le compteur défilait quel que soit le réglage système.
    if (!mouvementReduit()) animer();

    const desabonner = surChangementDeMouvement((reduit) => {
      if (reduit) arreter();
      else animer();
    });

    return () => {
      desabonner();
      ctx?.revert();
    };
  }, [target, suffix, prefix, duration]);

  // La valeur FINALE est rendue dès le serveur, pas un zéro.
  //
  // Avant, le balisage contenait `0` et seul le déclencheur de défilement le
  // remplaçait. Sur un Android d'entrée de gamme en 2G, pendant que le bundle
  // charge — ou si le déclencheur ne part jamais — le portfolio affichait
  // « 0 projets ». Un chiffre faux, pas un chiffre absent. Ici le pire cas
  // affiche la vérité sans l'animation, ce qui est la bonne dégradation.
  return (
    <span ref={ref} className={className}>
      {prefix}
      {target}
      {suffix}
    </span>
  );
}
