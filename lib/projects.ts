import projectsData from "@/data/projects.json";
import type { Locale } from "@/lib/site";

export type ProjectStatus = "production" | "dev";

export interface Project {
  id: number;
  title: string;
  description: string;
  descFr?: string;
  descTr?: string;
  stack: string[];
  live?: string;
  github: string;
  status: ProjectStatus;
  featured: boolean;
  color: string;
}

export const PROJECTS = projectsData as Project[];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const SHIPPED_COUNT = PROJECTS.filter((p) => p.status === "production").length;

/**
 * `projects.json` porte déjà les traductions (`descFr` / `descTr`).
 * Avant, seul l'anglais était affiché, quelle que soit la locale.
 */
export function describe(project: Project, locale: Locale | string): string {
  if (locale === "fr") return project.descFr ?? project.description;
  if (locale === "tr") return project.descTr ?? project.description;
  return project.description;
}
