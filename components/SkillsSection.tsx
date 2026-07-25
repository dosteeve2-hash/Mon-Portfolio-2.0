"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    label: "Frontend",
    icon: "⚛",
    skills: [
      { name: "Next.js", level: 90 },
      { name: "React", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    label: "Backend",
    icon: "🔧",
    skills: [
      { name: "Supabase", level: 85 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 85 },
    ],
  },
  {
    label: "Outils",
    icon: "🛠",
    skills: [
      { name: "Git", level: 80 },
      { name: "Vercel", level: 80 },
      { name: "Figma", level: 80 },
    ],
  },
  {
    label: "Design",
    icon: "🎨",
    skills: [
      { name: "UI / UX", level: 75 },
      { name: "Framer Motion", level: 75 },
    ],
  },
] as const;

// ─── Token palette ────────────────────────────────────────────────────────────

const COLOR = {
  bg: "#0b1829",
  card: "#1e3a5f",
  cardBorder: "#2a4a72",
  trackBg: "#0d2040",
  barStart: "#00b4d8",
  barEnd: "#0096c7",
  gold: "#d4af37",
  textPrimary: "#f5f0e8",
  textMuted: "#9ba8c4",
} as const;

// ─── SkillBar ─────────────────────────────────────────────────────────────────

interface SkillBarProps {
  name: string;
  level: number;
  delay: number;
}

function SkillBar({ name, level, delay }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between items-center">
        <span
          className="text-sm font-outfit"
          style={{ color: COLOR.textPrimary }}
        >
          {name}
        </span>
        <span
          className="text-xs font-mono tabular-nums"
          style={{ color: COLOR.gold }}
        >
          {level}%
        </span>
      </div>

      {/* Track */}
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: COLOR.trackBg }}
      >
        {/* Animated fill */}
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${COLOR.barStart}, ${COLOR.barEnd})`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.3, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────

interface CategoryCardProps {
  label: string;
  icon: string;
  skills: readonly { name: string; level: number }[];
  index: number;
  parentInView: boolean;
}

function CategoryCard({
  label,
  icon,
  skills,
  index,
  parentInView,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="p-6 rounded-2xl border flex flex-col gap-5"
      style={{
        backgroundColor: COLOR.card,
        borderColor: COLOR.cardBorder,
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none" aria-hidden>
          {icon}
        </span>
        <h3
          className="text-base font-semibold font-playfair tracking-wide"
          style={{ color: COLOR.gold }}
        >
          {label}
        </h3>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-4">
        {skills.map((skill, skillIdx) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={0.25 + index * 0.1 + skillIdx * 0.08}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="skills-section"
      className="py-28"
      style={{ backgroundColor: COLOR.bg }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: COLOR.gold }}
          >
            — Compétences
          </p>
          <h2
            className="font-playfair text-5xl md:text-6xl font-bold italic"
            style={{ color: COLOR.textPrimary }}
          >
            Mon Stack
          </h2>
          <p className="mt-3 text-sm" style={{ color: COLOR.textMuted }}>
            Technologies &amp; outils maîtrisés
          </p>
        </motion.div>

        {/* ── Category grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <CategoryCard
              key={cat.label}
              label={cat.label}
              icon={cat.icon}
              skills={cat.skills}
              index={idx}
              parentInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
