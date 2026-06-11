"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface LangItem {
  lang: string;
  level: string;
  flag: string;
}

const LEVEL_WIDTHS: Record<string, number> = {
  Native: 100, Natif: 100, Anadil: 100,
  Fluent: 90, Courant: 90, "Akıcı": 90,
  Conversational: 65, Conversationnel: 65, "Konuşma Düzeyinde": 65,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Languages() {
  const t = useTranslations("languages");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const items = t.raw("items") as LangItem[];

  return (
    <section id="languages" ref={ref} className="py-32 bg-bg dark:bg-bg">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.lang}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: "#f0a832" }}
              className="group p-5 rounded-2xl border border-border-2 bg-bg-2 transition-all duration-300 cursor-default"
            >
              <div className="text-4xl mb-3">{item.flag}</div>
              <h3 className="font-playfair text-lg font-bold italic text-text-primary group-hover:text-gold transition-colors">
                {item.lang}
              </h3>
              <p className="font-mono text-xs text-text-primary-3 uppercase tracking-widest mt-1">{item.level}</p>

              {/* Level bar */}
              <div className="mt-3 h-0.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-2"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${LEVEL_WIDTHS[item.level] ?? 50}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
