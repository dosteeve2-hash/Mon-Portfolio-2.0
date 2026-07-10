"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

const STATS: StatItem[] = [
  { value: 9,  label: "Repos publics",        suffix: "+",  color: "#f0a832" },
  { value: 5,  label: "Projets en production", suffix: "",   color: "#00d4ff" },
  { value: 4,  label: "Langages maîtrisés",    suffix: "+",  color: "#3fb950" },
  { value: 3,  label: "Années de code",         suffix: "+",  color: "#a78bfa" },
];

const CONTRIBUTIONS = [
  { month: "Jan", commits: 12 },
  { month: "Fév", commits: 28 },
  { month: "Mar", commits: 19 },
  { month: "Avr", commits: 34 },
  { month: "Mai", commits: 41 },
  { month: "Juin", commits: 56 },
];

function AnimatedCounter({ value, suffix = "", color }: { value: number; suffix?: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono font-black" style={{ color }}>
      {count}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function GitHubStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const maxCommits = Math.max(...CONTRIBUTIONS.map((c) => c.commits));

  return (
    <section id="stats" ref={ref} className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-gold uppercase tracking-[0.3em] mb-2"
          >
            08
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair text-5xl md:text-6xl font-bold italic text-text-primary"
          >
            GitHub Stats
          </motion.h2>
        </motion.div>

        {/* KPI grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col gap-2 p-6 rounded-2xl border border-border-2 bg-bg-3/60 backdrop-blur-sm"
            >
              <span className="text-4xl font-black">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
              </span>
              <span className="font-outfit text-sm text-text-primary-2">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-border-2 bg-bg-3/60 backdrop-blur-sm p-8"
        >
          <p className="font-mono text-xs text-text-primary-3 uppercase tracking-widest mb-6">
            Contributions — 2026
          </p>
          <div className="flex items-end gap-3 h-36">
            {CONTRIBUTIONS.map((c, i) => (
              <div key={c.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full rounded-t-md"
                  style={{ background: `rgba(240,168,50,${0.3 + (c.commits / maxCommits) * 0.7})` }}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${(c.commits / maxCommits) * 100}%` } : { height: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                />
                <span className="font-mono text-[10px] text-text-primary-3">{c.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
