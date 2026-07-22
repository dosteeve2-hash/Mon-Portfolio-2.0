"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
  color: string;
}

const SKILLS: Skill[] = [
  { name: "React",          icon: "⚛️",  color: "#61DAFB" },
  { name: "Next.js",        icon: "▲",   color: "#f5f0e8" },
  { name: "TypeScript",     icon: "TS",  color: "#3178C6" },
  { name: "Supabase",       icon: "⚡",  color: "#3ECF8E" },
  { name: "GSAP",           icon: "🟢",  color: "#88CE02" },
  { name: "Framer Motion",  icon: "🔮",  color: "#00BCD4" },
  { name: "Python",         icon: "🐍",  color: "#F7CC42" },
  { name: "Tailwind",       icon: "🌊",  color: "#38BDF8" },
  { name: "Node.js",        icon: "🟩",  color: "#5FA04E" },
  { name: "Claude API",     icon: "🤖",  color: "#D4AF37" },
  { name: "Vercel",         icon: "▲",   color: "#9ba8c4" },
  { name: "Git",            icon: "🔀",  color: "#F05032" },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.88 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            delay: (index % 4) * 0.08,
            ease: "back.out(1.4)",
          }
        );
      },
    });

    return () => { trigger.kill(); };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#1f3054] bg-[#0d1c35]/80 hover:border-[#D4AF37]/30 transition-all duration-300 cursor-default opacity-0"
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${skill.color}18 0%, transparent 70%)` }}
      />
      <span className="text-2xl select-none relative z-10">{skill.icon}</span>
      <span
        className="font-mono text-xs uppercase tracking-wider text-[#9ba8c4] group-hover:text-[#D4AF37] transition-colors duration-300 relative z-10 text-center"
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-[#0d1c35]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-2">03</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold italic text-[#f5f0e8]">
            Skills
          </h2>
          <p className="mt-3 font-playfair text-xl italic text-[#9ba8c4]">
            Tools I use to build Africa&apos;s tech future.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
