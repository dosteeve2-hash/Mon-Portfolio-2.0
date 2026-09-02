"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  SKILL_CATEGORIES,
  TIER_WEIGHT,
  type SkillCategory,
  type SkillTier,
} from "@/data/skills";

const ACCENT: Record<SkillCategory["accent"], string> = {
  gold: "var(--c-gold)",
  cyan: "var(--c-cyan)",
  green: "var(--c-green)",
};

const TIER_KEY: Record<SkillTier, "levelCore" | "levelStrong" | "levelWorking"> = {
  core: "levelCore",
  strong: "levelStrong",
  working: "levelWorking",
};

function SkillRow({
  name,
  tier,
  accent,
  delay,
}: {
  name: string;
  tier: SkillTier;
  accent: string;
  delay: number;
}) {
  const t = useTranslations("skills");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const width = `${TIER_WEIGHT[tier]}%`;

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-outfit text-sm text-text-primary">{name}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
          {t(TIER_KEY[tier])}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-bg-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }}
          initial={{ width: 0 }}
          animate={inView ? { width } : { width: 0 }}
          transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="relative overflow-hidden bg-bg-2 py-28 md:py-32">
      <div
        aria-hidden
        className="ambient-glow -right-32 top-1/3 h-[420px] w-[420px] bg-accent-cyan-vivid/[0.07]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          num={t("sectionNum")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-16"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, i) => {
            const accent = ACCENT[category.accent];
            return (
              <Reveal key={category.key} delay={i * 0.1}>
                <div className="surface-card flex h-full flex-col gap-5 rounded-2xl p-6 transition-colors duration-300 hover:border-gold/40">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-8 w-1 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <h3 className="font-playfair text-lg font-bold italic text-text-primary">
                      {t(category.key)}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4">
                    {category.skills.map((skill, j) => (
                      <SkillRow
                        key={skill.name}
                        name={skill.name}
                        tier={skill.tier}
                        accent={accent}
                        delay={0.2 + i * 0.08 + j * 0.06}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
