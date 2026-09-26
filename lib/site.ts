/** Constantes d'identité du site — une seule source de vérité. */

import { CERTIFICATIONS } from "@/data/certifications";

export const SITE = {
  name: "Steeve Donald Compaore",
  shortName: "SDC",
  email: "docompaore2@gmail.com",
  github: "https://github.com/dosteeve2-hash",
  githubHandle: "dosteeve2-hash",
  linkedin: "https://www.linkedin.com/in/steeve-donald-compaoré-65ba13296",
  linkedinHandle: "Steeve Donald Compaore",
  cv: "/cv-steve-tr.pdf",
  photo: "/steve-photo.jpg",
  url: "https://steeve-portfolio-mocha.vercel.app",
} as const;

export const LOCALES = ["en", "fr", "tr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

const TOUTES_SECTIONS = [
  { id: "about", key: "about" },
  { id: "projects", key: "projects" },
  { id: "skills", key: "skills" },
  { id: "certifications", key: "certifications" },
  { id: "contact", key: "contact" },
] as const;

/**
 * Ancres de navigation — partagées par la navbar (desktop + mobile) et le footer.
 *
 * « Certifications » n'apparaît que lorsqu'il y a quelque chose à montrer : la
 * section entière ne se rend pas quand la liste est vide, et un lien de menu
 * qui défile vers le néant est un bug visible pour le visiteur.
 */
export const NAV_SECTIONS = TOUTES_SECTIONS.filter(
  (s) => s.id !== "certifications" || CERTIFICATIONS.length > 0,
);
