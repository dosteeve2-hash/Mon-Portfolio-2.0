"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface Skill {
  name: string;
  level: number;
}

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-outfit text-sm text-text-primary">{skill.name}</span>
        <span className="font-mono text-xs text-gold">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-bg-3 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold to-gold-2"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay, ease: "easeOut" as const }}
        />
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Skills() {
  const t = useTranslations("skills");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techSkills = t.raw("tech") as Skill[];
  const digitalSkills = t.raw("digital") as Skill[];

  return (
    <section id="skills" ref={ref} className="py-32 bg-bg-2 dark:bg-bg-2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="font-mono text-xs text-gold uppercase tracking-[0.3em] mb-2">
            {t("sectionNum")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-5xl md:text-6xl font-bold italic text-text-primary">
            {t("sectionTitle")}
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Technical */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-playfair text-2xl italic text-gold mb-8">{t("techTitle")}</h3>
            <div className="space-y-5">
              {techSkills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={0.3 + i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Digital */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-playfair text-2xl italic text-gold mb-8">{t("digitalTitle")}</h3>
            <div className="space-y-5">
              {digitalSkills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={0.4 + i * 0.1} />
              ))}
            </div>

            {/* Stack badges */}
            <div className="mt-10">
              <p className="font-mono text-xs text-text-primary-3 uppercase tracking-widest mb-4">Stack</p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Python", "Supabase", "Tailwind", "Framer Motion", "Claude API", "Vercel", "Git"].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs border border-border hover:border-gold/50 text-text-primary-2 hover:text-gold rounded-full px-3 py-1 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
