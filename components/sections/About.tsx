"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Globe, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  const t = useTranslations("about");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const rows = [
    { icon: <MapPin size={15} />, label: t("locationLabel"), value: t("locationValue") },
    { icon: <Clock size={15} />, label: t("availLabel"), value: t("availValue") },
    { icon: <Globe size={15} />, label: t("langsLabel"), value: t("langsValue") },
    { icon: <Mail size={15} />, label: t("emailLabel"), value: t("emailValue") },
  ];

  return (
    <section id="about" ref={ref} className="py-32 bg-bg-2 dark:bg-bg-2">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="font-mono text-xs text-gold uppercase tracking-[0.3em] mb-2">
            {t("sectionNum")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-5xl md:text-6xl font-bold italic text-text-primary">
            {t("sectionTitle")}
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-6"
          >
            <motion.p variants={fadeUp} className="font-outfit text-lg text-text-primary-2 leading-relaxed">
              {t("bio1")}
            </motion.p>
            <motion.p variants={fadeUp} className="font-outfit text-lg text-text-primary-2 leading-relaxed">
              {t("bio2")}
            </motion.p>

            {/* Pull quote */}
            <motion.blockquote
              variants={fadeUp}
              className="border-l-2 border-accent-cyan pl-6 py-2 mt-8"
            >
              <p className="font-playfair text-xl italic text-accent-cyan">
                &ldquo;{t("quote")}&rdquo;
              </p>
            </motion.blockquote>

            {/* Data rows */}
            <motion.div variants={stagger} className="mt-8 space-y-4">
              {rows.map((row) => (
                <motion.div
                  key={row.label}
                  variants={fadeUp}
                  className="flex items-start gap-4 pb-4 border-b border-border"
                >
                  <span className="text-gold mt-0.5 flex-shrink-0">{row.icon}</span>
                  <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-text-primary-3 w-28 flex-shrink-0">
                      {row.label}
                    </span>
                    <span className="font-outfit text-text-primary text-sm">{row.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Portrait placeholder */}
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/10 to-accent-cyan/10 blur-2xl" />
              <div className="relative h-full rounded-3xl border border-border-2 bg-bg-3 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-[120px] font-playfair font-bold italic text-gold/20 leading-none">
                    SDC
                  </div>
                  <div className="mt-4 font-outfit text-text-primary-2 text-sm">
                    Steve Donald Compaore
                  </div>
                  <div className="mt-1 font-mono text-xs text-text-primary-3 uppercase tracking-widest">
                    Ouagadougou → Tokat → World
                  </div>
                </div>
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-xl" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
