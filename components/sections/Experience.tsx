"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface ExpItem {
  year: string;
  title: string;
  company: string;
  desc: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function TimelineItem({ item, index, total }: { item: ExpItem; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-8"
    >
      {/* Timeline line + dot */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-3 h-3 rounded-full border-2 border-gold bg-bg mt-1 flex-shrink-0 z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        />
        {index < total - 1 && (
          <motion.div
            className="w-px bg-gradient-to-b from-gold/40 to-border flex-1 mt-2"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <span className="font-mono text-xs text-gold uppercase tracking-widest">{item.year}</span>
        <h3 className="font-playfair text-xl font-bold italic text-text-primary mt-1">{item.title}</h3>
        <p className="font-mono text-sm text-text-primary-3 uppercase tracking-wide mt-0.5">{item.company}</p>
        <p className="font-outfit text-text-primary-2 text-sm mt-2 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const t = useTranslations("experience");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const items = t.raw("items") as ExpItem[];

  return (
    <section id="experience" ref={ref} className="py-32 bg-bg-2 dark:bg-bg-2">
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

        <div className="max-w-2xl">
          {items.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} total={items.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
