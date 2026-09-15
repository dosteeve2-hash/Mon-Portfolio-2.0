#!/usr/bin/env node
/**
 * Garde-fou du réglage système « réduire les animations ».
 *
 * Pourquoi ce script existe : `app/globals.css` porte la règle générale qui ramène
 * les durées à 0.001ms sous `prefers-reduced-motion: reduce`. Elle couvre les
 * animations et transitions CSS — donc tout sauf le mouvement que JavaScript pilote
 * lui-même. Le 15 septembre 2026, les deux seuls endroits du portfolio hors de sa
 * portée l'ignoraient tous les deux : `LenisProvider` réécrivait la position de
 * défilement à chaque image, et `AnimatedCounter` faisait défiler ses chiffres via
 * GSAP. Rien ne le signalait, parce que tout le reste — Framer Motion — respectait
 * le réglage et donnait au fichier CSS l'air d'une couverture complète.
 *
 * Trois contrôles :
 *   1. tout fichier qui importe gsap ou lenis doit consulter le réglage ;
 *   2. globals.css doit garder son bloc `prefers-reduced-motion: reduce` ;
 *   3. lib/mouvement.ts doit réellement interroger la media query — sans quoi les
 *      deux premiers contrôles resteraient verts autour d'un module vidé.
 *
 * Échoue avec un code non nul : utilisable en CI.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const MODULE_MOUVEMENT = "lib/mouvement.ts";
const FICHIER_CSS = "app/globals.css";
const REQUETE = "(prefers-reduced-motion: reduce)";

/**
 * Les fichiers versionnés ET les non-versionnés non ignorés. `git ls-files` seul
 * saute les fichiers pas encore ajoutés — un contrôle local passerait alors au vert
 * sur un fichier que la CI verra bel et bien après le commit.
 */
function fichiersSources() {
  return execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    encoding: "utf8",
  })
    .split("\n")
    .filter((f) => /^(app|components|lib)\/.+\.tsx?$/.test(f));
}

/** Retire commentaires de bloc et de ligne : un import commenté n'est pas un import. */
function sansCommentaires(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const erreurs = [];

// ── 1. gsap / lenis sans consultation du réglage ─────────────────────────────
for (const fichier of fichiersSources()) {
  if (fichier === MODULE_MOUVEMENT) continue;
  const code = sansCommentaires(readFileSync(fichier, "utf8"));
  const importeMoteur = /from\s+["'](gsap|lenis)(\/[^"']*)?["']/.test(code);
  if (!importeMoteur) continue;

  const consulte =
    /from\s+["'](@\/lib\/mouvement|\.{1,2}\/[^"']*\/?mouvement)["']/.test(code) ||
    /useReducedMotion/.test(code);

  if (!consulte) {
    erreurs.push(
      `${fichier} anime en JavaScript (gsap/lenis) sans consulter le réglage « réduire les ` +
        `animations ». La règle CSS de ${FICHIER_CSS} ne l'atteint pas : importe ` +
        `mouvementReduit() depuis @/lib/mouvement, ou useReducedMotion de framer-motion.`
    );
  }
}

// ── 2. la règle CSS générale ─────────────────────────────────────────────────
const css = readFileSync(FICHIER_CSS, "utf8");
if (!css.includes("prefers-reduced-motion")) {
  erreurs.push(
    `${FICHIER_CSS} n'a plus de bloc @media (prefers-reduced-motion: reduce) : tout le ` +
      `mouvement CSS du site redevient inconditionnel.`
  );
}

// ── 3. le module lui-même ────────────────────────────────────────────────────
// Sans ce contrôle, vider mouvementReduit() en `return false` laisserait les deux
// précédents au vert pendant que plus rien ne respecte le réglage.
const mouvement = readFileSync(MODULE_MOUVEMENT, "utf8");
if (!mouvement.includes(REQUETE)) {
  erreurs.push(
    `${MODULE_MOUVEMENT} n'interroge plus « ${REQUETE} » : les fichiers qui l'appellent ` +
      `croient consulter le réglage et ne consultent rien.`
  );
}
if (!/matchMedia/.test(mouvement)) {
  erreurs.push(`${MODULE_MOUVEMENT} n'appelle plus matchMedia : il ne peut rien lire du système.`);
}

// ── Verdict ──────────────────────────────────────────────────────────────────
if (erreurs.length > 0) {
  console.error("❌ Mouvement réduit — le réglage système n'est plus respecté :");
  for (const e of erreurs) console.error(`   - ${e}`);
  process.exit(1);
}

console.log("✅ Mouvement réduit — gsap et lenis passent tous par le réglage système.");
