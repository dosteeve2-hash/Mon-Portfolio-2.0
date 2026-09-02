#!/usr/bin/env node
/**
 * Vérifie que le drapeau `sourcePublic` de data/projects.json correspond à la
 * réalité, et signale les démos réellement mortes.
 *
 * Motivation : 12 des 16 dépôts liés sont privés. Un lien « Code source » vers
 * un dépôt privé renvoie un 404 à tout visiteur — le drapeau évite d'afficher
 * ces liens, mais il se périme dès qu'un dépôt change de visibilité.
 *
 * Requêtes ANONYMES : à lancer depuis un réseau normal (`npm run check:links`),
 * pas en CI. Derrière un proxy d'entreprise ou un WAF, les hôtes injoignables
 * remontent en avertissement et non en échec — seul un 404/410 est considéré
 * comme une preuve de lien mort.
 */
import { readFileSync } from "node:fs";

const projects = JSON.parse(
  readFileSync(new URL("../data/projects.json", import.meta.url), "utf8")
);

/** Statuts qui prouvent qu'une ressource n'existe pas (par opposition à « bloqué »). */
const DEFINITELY_GONE = new Set([404, 410]);

/**
 * Sonde une URL. Beaucoup d'hôtes refusent HEAD (405) ou filtrent les clients
 * sans navigateur (403) : on retente alors en GET avant de conclure.
 */
async function probe(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const response = await fetch(url, { method, redirect: "follow" });
      if (method === "HEAD" && [403, 405, 501].includes(response.status)) continue;
      return response.status;
    } catch {
      if (method === "GET") return null;
    }
  }
  return null;
}

let errors = 0;
let warnings = 0;

for (const project of projects) {
  const status = await probe(project.github);

  if (status === 200 && !project.sourcePublic) {
    errors += 1;
    console.error(`✗  ${project.title} — dépôt PUBLIC mais sourcePublic=false (lien masqué à tort)`);
  } else if (DEFINITELY_GONE.has(status) && project.sourcePublic) {
    errors += 1;
    console.error(`✗  ${project.title} — sourcePublic=true mais GitHub répond ${status} (lien mort)`);
  } else if (status !== 200 && !DEFINITELY_GONE.has(status)) {
    warnings += 1;
    console.warn(`?  ${project.title} — dépôt injoignable (${status ?? "réseau"}), non concluant`);
  }

  if (!project.live) continue;

  const liveStatus = await probe(project.live);
  if (DEFINITELY_GONE.has(liveStatus)) {
    errors += 1;
    console.error(`✗  ${project.title} — démo ${project.live} répond ${liveStatus}`);
  } else if (liveStatus !== 200) {
    warnings += 1;
    console.warn(`?  ${project.title} — démo injoignable (${liveStatus ?? "réseau"}), non concluant`);
  }
}

if (warnings) {
  console.warn(`\n${warnings} sonde(s) non concluante(s) — réseau filtré ? Relancer hors proxy.`);
}

if (errors) {
  console.error(`\n${errors} incohérence(s) à corriger.`);
  process.exit(1);
}

console.log(`✓ ${projects.length} projets — aucun lien mort détecté`);
