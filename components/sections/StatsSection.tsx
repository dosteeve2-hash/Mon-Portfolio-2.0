"use client";

import { useTranslations } from "next-intl";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/ui/Reveal";
import { SHIPPED_COUNT } from "@/lib/projects";

/** Les libellés viennent d'i18n, les chiffres du code — un seul endroit chacun. */
const STATS = [
  { key: "shipped", target: SHIPPED_COUNT, suffix: "+", accent: "var(--c-gold)" },
  { key: "experience", target: 3, suffix: "+", accent: "var(--c-cyan)" },
  { key: "startups", target: 4, suffix: "", accent: "var(--c-gold)" },
  { key: "builds", target: 100, suffix: "%", accent: "var(--c-green)" },
] as const;

export default function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="overflow-hidden border-y border-border-2 bg-bg-2 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="font-playfair text-4xl font-bold italic text-text-primary md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.key} delay={i * 0.12} className="group text-center">
              <dd className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: stat.accent }}
                />
                <span
                  className="relative font-playfair text-4xl font-bold tabular-nums md:text-5xl"
                  style={{ color: stat.accent }}
                >
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={1.8} />
                </span>
              </dd>
              <dt className="mt-3 font-outfit text-sm uppercase tracking-wider text-text-primary-2">
                {t(stat.key)}
              </dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
