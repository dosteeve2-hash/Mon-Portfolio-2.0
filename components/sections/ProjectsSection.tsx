"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import ScrollReveal from "@/components/ScrollReveal";
import projectsData from "@/data/projects.json";

interface Project {
  id: number;
  title: string;
  description: string;
  stack: string[];
  live?: string;
  github: string;
  status: "production" | "dev";
  color: string;
}

const FEATURED_IDS = [4, 6, 5, 2, 7, 3];
const AUTO_PLAY_MS = 5000;

const allProjects = projectsData as Project[];
const projects = FEATURED_IDS.map((id) =>
  allProjects.find((p) => p.id === id)
).filter(Boolean) as Project[];

function StatusDot({ status }: { status: "production" | "dev" }) {
  const color = status === "production" ? "#22d98a" : "#D4AF37";
  const label = status === "production" ? "In Production" : "In Development";
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
      <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="grid md:grid-cols-2 gap-10 items-center"
    >
      {/* Photo placeholder — colored gradient */}
      <div
        className="relative rounded-2xl overflow-hidden border border-[#1f3054] aspect-video"
        style={{ background: `linear-gradient(135deg, ${project.color}15 0%, #0A162890 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-playfair text-6xl font-bold italic opacity-20 text-[#f5f0e8]">
            {project.title.slice(0, 2)}
          </span>
        </div>
        <div
          className="absolute bottom-4 left-4 right-4 h-1 rounded-full"
          style={{ backgroundColor: project.color, opacity: 0.8 }}
        />
      </div>

      {/* Info */}
      <div className="space-y-5">
        <StatusDot status={project.status} />
        <h3
          className="font-playfair text-3xl md:text-4xl font-bold italic"
          style={{ color: project.color }}
        >
          {project.title}
        </h3>
        <p className="font-outfit text-[#9ba8c4] leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{ borderColor: `${project.color}40`, color: "#9ba8c4" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          {project.live && (
            <GlowButton href={project.live} variant="gold" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} /> Demo
            </GlowButton>
          )}
          <GlowButton href={project.github} variant="outline" target="_blank" rel="noopener noreferrer">
            Code
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % projects.length), []);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + projects.length) % projects.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section id="projects" className="py-32 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-2">04</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold italic text-[#f5f0e8]">
            Projects
          </h2>
          <p className="mt-3 font-playfair text-xl italic text-[#9ba8c4]">
            Real products. Real impact.
          </p>
        </ScrollReveal>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <ProjectCard key={projects[current].id} project={projects[current]} />
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#1f3054] hover:border-[#D4AF37]/60 text-[#9ba8c4] hover:text-[#D4AF37] flex items-center justify-center transition-all duration-200"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#1f3054] hover:border-[#D4AF37]/60 text-[#9ba8c4] hover:text-[#D4AF37] flex items-center justify-center transition-all duration-200"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            {/* Dots */}
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className="transition-all duration-300"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 h-2 bg-[#D4AF37]"
                        : "w-2 h-2 bg-[#1f3054] hover:bg-[#D4AF37]/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
