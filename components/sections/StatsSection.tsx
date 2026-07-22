"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";

interface Stat {
  target: number;
  suffix: string;
  label: string;
  color: string;
}

const STATS: Stat[] = [
  { target: 5, suffix: "+", label: "Projets livrés", color: "#D4AF37" },
  { target: 3, suffix: "+", label: "Ans d'expérience", color: "#00BCD4" },
  { target: 4, suffix: "", label: "Startups accompagnées", color: "#D4AF37" },
  { target: 100, suffix: "%", label: "Builds passing", color: "#22d98a" },
];

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 bg-[#0d1c35] border-y border-[#1f3054] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-2">
            En chiffres
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold italic text-[#f5f0e8]">
            Impact réel
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.12} className="text-center group">
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: stat.color }}
                />
                <div className="relative text-4xl md:text-5xl font-playfair font-bold" style={{ color: stat.color }}>
                  {isInView && (
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      duration={1.8}
                    />
                  )}
                </div>
              </div>
              <p className="mt-3 font-outfit text-sm text-[#9ba8c4] uppercase tracking-wider">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
