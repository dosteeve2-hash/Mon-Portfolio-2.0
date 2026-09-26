/**
 * Les certifications affichées dans la section dédiée.
 *
 * SOURCE UNIQUE. Le même tableau alimente le profil GitHub
 * (dosteeve2-hash/dosteeve2-hash, data/certifications.json) — deux copies d'une
 * liste divergent toujours, une source et deux rendus jamais.
 *
 * La section entière disparaît quand le tableau est vide : mieux vaut pas de
 * section du tout qu'une section « bientôt ».
 *
 * `url` n'est pas décoratif. Une certification sans lien de vérification est
 * une affirmation ; avec le lien, c'est une preuve. C'est exactement la
 * doctrine du dossier vérifiable de COMBINE, appliquée à soi-même.
 */
export interface Certification {
  /** Le nom exact figurant sur l'attestation. */
  titre: string;
  /** Qui l'a délivrée, et via quelle plateforme. Ex. « Google · Coursera ». */
  organisme: string;
  /** `AAAA-MM` — sert au tri, du plus récent au plus ancien. */
  date: string;
  /** Lien de vérification public. Sans lui, la carte n'affiche pas le ✔. */
  url?: string;
  /** 2 à 4 mots-clés, rendus en puces. */
  competences?: readonly string[];
  /**
   * Slug simple-icons (`google`, `cisco`, `ibm`, `coursera`…) pour la pastille.
   * Sans lui, on affiche l'initiale de l'organisme.
   */
  logo?: string;
}

/**
 * VIDE POUR L'INSTANT — et c'est un blocage assumé, pas un oubli.
 *
 * La session Claude qui a écrit ce fichier tourne dans un conteneur cloud :
 * elle n'a accès ni au disque de Steve, ni à son LinkedIn. Seul un agent qui
 * tourne sur la machine peut remplir cette liste. Répartition Règle #13 :
 *
 *   codex exec "Lis les attestations de certification dans le profil de Steve
 *   (Documents, Téléchargements, Bureau — PDF et images), et la section
 *   Licences & certifications de son LinkedIn. Remplis data/certifications.ts
 *   selon l'interface Certification, puis reporte la même liste dans
 *   data/certifications.json du dépôt dosteeve2-hash/dosteeve2-hash."
 *
 * Exemple de la forme attendue :
 *
 *   {
 *     titre: "Google Cybersecurity Professional Certificate",
 *     organisme: "Google · Coursera",
 *     date: "2026-08",
 *     url: "https://coursera.org/verify/XXXXXXXX",
 *     competences: ["SIEM", "Linux", "Python"],
 *     logo: "google",
 *   }
 */
export const CERTIFICATIONS: readonly Certification[] = [];

const MOIS_FR = ["janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"] as const;

/** `2026-08` → `août 2026`. Une date non reconnue est rendue telle quelle. */
export function dateLisible(brut: string, locale: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(brut);
  if (!m) return brut;
  const annee = m[1];
  const index = Number(m[2]) - 1;
  if (index < 0 || index > 11) return annee;
  if (locale === "fr") return `${MOIS_FR[index]} ${annee}`;
  const nom = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", { month: "long" })
    .format(new Date(Date.UTC(2000, index, 1)));
  return locale === "tr" ? `${nom} ${annee}` : `${nom} ${annee}`;
}

/** Les plus récentes d'abord. Ne mute pas la source. */
export function certificationsTriees(): Certification[] {
  return [...CERTIFICATIONS].sort((a, b) => b.date.localeCompare(a.date));
}
