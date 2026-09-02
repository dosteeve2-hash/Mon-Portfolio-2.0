/**
 * Noms de technologies = noms propres : ils ne passent pas par i18n.
 * Seuls le libellé de catégorie et le libellé de niveau sont traduits
 * (clés `skills.*` dans messages/).
 */

export type SkillTier = "core" | "strong" | "working";

export interface Skill {
  name: string;
  tier: SkillTier;
}

export interface SkillCategory {
  /** Clé de traduction sous `skills.` */
  key: "frontend" | "backend" | "ai" | "tooling";
  accent: "gold" | "cyan" | "green";
  skills: Skill[];
}

/** Poids de la barre de progression, dérivé du palier — pas de chiffre arbitraire. */
export const TIER_WEIGHT: Record<SkillTier, number> = {
  core: 100,
  strong: 75,
  working: 50,
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: "frontend",
    accent: "gold",
    skills: [
      { name: "Next.js", tier: "core" },
      { name: "React", tier: "core" },
      { name: "TypeScript", tier: "core" },
      { name: "Tailwind CSS", tier: "core" },
      { name: "Framer Motion", tier: "strong" },
      { name: "GSAP", tier: "strong" },
    ],
  },
  {
    key: "backend",
    accent: "cyan",
    skills: [
      { name: "Supabase", tier: "core" },
      { name: "PostgreSQL", tier: "strong" },
      { name: "Node.js", tier: "strong" },
      { name: "Python", tier: "strong" },
      { name: "Zod", tier: "strong" },
      { name: "Better Auth", tier: "working" },
    ],
  },
  {
    key: "ai",
    accent: "green",
    skills: [
      { name: "Claude API", tier: "core" },
      { name: "Ollama", tier: "strong" },
      { name: "Agents & RAG", tier: "strong" },
      { name: "Prompt engineering", tier: "strong" },
    ],
  },
  {
    key: "tooling",
    accent: "gold",
    skills: [
      { name: "Git & GitHub", tier: "core" },
      { name: "Vercel", tier: "core" },
      { name: "Figma", tier: "strong" },
      { name: "UI / UX", tier: "strong" },
      { name: "Recharts", tier: "working" },
    ],
  },
];
