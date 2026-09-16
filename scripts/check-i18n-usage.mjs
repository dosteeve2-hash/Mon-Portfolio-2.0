#!/usr/bin/env node
/**
 * Troisième garde-fou i18n : vérifie que chaque clé APPELÉE dans le code
 * existe réellement dans les fichiers de messages.
 *
 * `check-messages.mjs` vérifie que les trois locales ont la même forme et
 * qu'aucune valeur n'est vide. C'est nécessaire mais pas suffisant : renommer
 * une clé dans les trois fichiers à la fois laisse ce contrôle au vert alors
 * que la page affiche désormais le chemin brut de la clé — « about.availValue »
 * en toutes lettres, à un recruteur.
 *
 * Le cas dangereux est celui des clés DYNAMIQUES. AboutSection construit ses
 * libellés depuis une table :
 *
 *     const FACTS = [{ labelKey: "locationLabel", valueKey: "locationValue" }]
 *     ...
 *     {t(fact.labelKey)}
 *
 * Aucune recherche de `t("...")` ne voit ces clés. Ce script lit donc aussi
 * les littéraux affectés à une propriété dont le nom se termine par « Key ».
 *
 * Échoue avec un code non nul : utilisable en CI.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const RACINES = ["app", "components"];
const REFERENCE = "en";

/** Aplatit les messages en un ensemble de chemins « a.b.c ». */
function chemins(valeur, prefixe = "") {
  return Object.entries(valeur).flatMap(([cle, enfant]) => {
    const chemin = prefixe ? `${prefixe}.${cle}` : cle;
    // Un tableau est une valeur terminale ici : `hero.roles` est consommé
    // entier par le code, pas clé par clé.
    if (Array.isArray(enfant)) return [chemin];
    if (enfant && typeof enfant === "object") return chemins(enfant, chemin);
    return [chemin];
  });
}

function fichiersSources(racine) {
  const trouves = [];
  const parcourir = (dossier) => {
    for (const entree of readdirSync(dossier)) {
      const chemin = join(dossier, entree);
      if (statSync(chemin).isDirectory()) parcourir(chemin);
      else if ([".tsx", ".ts"].includes(extname(chemin))) trouves.push(chemin);
    }
  };
  parcourir(racine);
  return trouves;
}

/**
 * Les espaces de noms déclarés dans un fichier.
 *
 * `useTranslations("about")` puis `t("bio1")` désigne `about.bio1`. Un fichier
 * peut en déclarer plusieurs ; on les retient tous et on considère qu'une clé
 * est bonne si elle résout dans AU MOINS un — sans analyse de portée, viser
 * juste plutôt que sévère est le bon compromis pour un garde-fou.
 */
function espacesDeNoms(source) {
  const trouves = [...source.matchAll(/useTranslations\(\s*["'`]([^"'`]+)["'`]\s*\)/g)].map(
    (m) => m[1],
  );
  // `useTranslations()` sans argument travaille à la racine.
  if (/useTranslations\(\s*\)/.test(source)) trouves.push("");
  return trouves.length ? trouves : [""];
}

/** Les clés littérales : t("x"), t.rich("x"), t.raw("x"). */
function clesStatiques(source) {
  return [...source.matchAll(/\bt(?:\.rich|\.raw|\.markup)?\(\s*["'`]([^"'`]+)["'`]/g)].map(
    (m) => m[1],
  );
}

/** Les clés de table : { labelKey: "locationLabel" }, { key: "frontend" }. */
function clesDynamiques(source) {
  return [...source.matchAll(/\b\w*[Kk]ey\s*:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
}

const messages = JSON.parse(readFileSync(`messages/${REFERENCE}.json`, "utf8"));
const definies = new Set(chemins(messages));

let echecs = 0;
let verifiees = 0;

for (const racine of RACINES) {
  for (const fichier of fichiersSources(racine)) {
    const source = readFileSync(fichier, "utf8");
    if (!source.includes("useTranslations")) continue;

    const prefixes = espacesDeNoms(source);
    const candidates = [
      ...clesStatiques(source).map((c) => ({ cle: c, dynamique: false })),
      ...clesDynamiques(source).map((c) => ({ cle: c, dynamique: true })),
    ];

    for (const { cle, dynamique } of candidates) {
      verifiees += 1;
      const resout = prefixes.some(
        (p) => definies.has(p ? `${p}.${cle}` : cle) || definies.has(cle),
      );
      if (!resout) {
        echecs += 1;
        const nature = dynamique ? "clé de table" : "clé";
        const essais = prefixes.map((p) => (p ? `${p}.${cle}` : cle)).join(" | ");
        console.error(`✗ ${fichier} — ${nature} introuvable : ${essais}`);
      }
    }
  }
}

if (echecs) {
  console.error(
    `\n${echecs} clé(s) appelée(s) dans le code n'existe(nt) pas dans messages/${REFERENCE}.json.`,
  );
  console.error("La page afficherait le chemin brut de la clé à la place du texte.");
  process.exit(1);
}

console.log(`✓ ${verifiees} clés appelées — toutes résolues dans messages/${REFERENCE}.json`);
