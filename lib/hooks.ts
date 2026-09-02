"use client";

import { useSyncExternalStore } from "react";

/**
 * Souscrit à une media query. `useSyncExternalStore` est la primitive prévue
 * pour lire un état extérieur à React : pas de `setState` dans un effet, et le
 * rendu serveur reçoit explicitement `false`.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export type Theme = "light" | "dark";

/**
 * Thème réellement appliqué, lu sur la classe de <html> (posée avant le
 * premier paint par ThemeScript). L'observateur garde plusieurs composants
 * synchronisés — par exemple les bascules desktop et mobile de la navbar.
 */
export function useAppliedTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => (document.documentElement.classList.contains("light") ? "light" : "dark"),
    () => "dark"
  );
}
