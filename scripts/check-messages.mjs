#!/usr/bin/env node
/**
 * Garde-fou de la règle projet « toujours synchroniser fr.json et en.json
 * pour chaque texte » (CLAUDE.md). Vérifie que les trois locales ont
 * exactement la même forme de clés, et qu'aucune valeur n'est vide.
 *
 * Échoue avec un code non nul : utilisable en CI.
 */
import { readFileSync } from "node:fs";

const LOCALES = ["en", "fr", "tr"];
const REFERENCE = "en";

/** Aplatit un objet de messages en une liste de chemins triés. */
function shape(value, prefix = "") {
  return Object.entries(value)
    .flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (Array.isArray(child)) return [`${path}[]:${child.length}`];
      if (child && typeof child === "object") return shape(child, path);
      return [path];
    })
    .sort();
}

/** Repère les chaînes vides, qui passent le contrôle de forme sans rien dire. */
function emptyValues(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(child)) {
      return child.some((item) => typeof item === "string" && item.trim() === "")
        ? [path]
        : [];
    }
    if (child && typeof child === "object") return emptyValues(child, path);
    return typeof child === "string" && child.trim() === "" ? [path] : [];
  });
}

const messages = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8")),
  ])
);

const reference = shape(messages[REFERENCE]);
const referenceSet = new Set(reference);
let failed = false;

for (const locale of LOCALES) {
  const current = new Set(shape(messages[locale]));

  const missing = reference.filter((key) => !current.has(key));
  const extra = [...current].filter((key) => !referenceSet.has(key));
  const empty = emptyValues(messages[locale]);

  if (missing.length) {
    failed = true;
    console.error(`✗ ${locale}.json — clés manquantes : ${missing.join(", ")}`);
  }
  if (extra.length) {
    failed = true;
    console.error(`✗ ${locale}.json — clés en trop : ${extra.join(", ")}`);
  }
  if (empty.length) {
    failed = true;
    console.error(`✗ ${locale}.json — valeurs vides : ${empty.join(", ")}`);
  }
}

if (failed) {
  console.error("\nLes locales sont désynchronisées.");
  process.exit(1);
}

console.log(`✓ ${LOCALES.join("/")} synchronisés — ${reference.length} clés`);
