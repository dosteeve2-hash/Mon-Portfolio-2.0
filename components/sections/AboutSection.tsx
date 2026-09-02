"use client";

import { useTranslations } from "next-intl";
import { Compass, Languages, MapPin, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const FACTS = [
  { icon: MapPin, labelKey: "locationLabel", valueKey: "locationValue", accent: "text-gold" },
  { icon: Sparkles, labelKey: "availLabel", valueKey: "availValue", accent: "text-accent-green" },
  { icon: Languages, labelKey: "langsLabel", valueKey: "langsValue", accent: "text-accent-cyan" },
  { icon: Compass, labelKey: "focusLabel", valueKey: "focusValue", accent: "text-gold" },
] as const;

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative overflow-hidden bg-bg py-28 md:py-32">
      <div
        aria-hidden
        className="ambient-glow -left-32 top-0 h-[420px] w-[420px] bg-gold-vivid/[0.07]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          num={t("sectionNum")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <Reveal>
              <p className="font-outfit text-lg leading-relaxed text-text-primary-2">
                {t("bio1")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-outfit text-lg leading-relaxed text-text-primary-2">
                {t("bio2")}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote
                className="mt-8 border-l-2 border-gold pl-6 font-playfair text-2xl
                  italic leading-snug text-text-primary md:text-3xl"
              >
                “{t("quote")}”
              </blockquote>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {FACTS.map((fact, i) => (
              <Reveal as="li" key={fact.labelKey} delay={0.1 + i * 0.08} direction="left">
                <div className="surface-card group flex items-start gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-gold/40">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                      border border-border-2 bg-bg-2 transition-colors duration-300 group-hover:border-gold/40"
                  >
                    <fact.icon size={18} className={fact.accent} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-primary-3">
                      {t(fact.labelKey)}
                    </p>
                    <p className="mt-1 font-outfit text-sm text-text-primary">
                      {t(fact.valueKey)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
