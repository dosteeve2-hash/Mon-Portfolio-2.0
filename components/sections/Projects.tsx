"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ExternalLink } from "lucide-react";
import projectsData from "@/data/projects.json";

const GithubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  description: string;
  descFr: string;
  descTr: string;
  stack: string[];
  live?: string;
  github: string;
  status: "production" | "dev";
  featured: boolean;
  color: string;
}

const FEATURED_IDS = [4, 6, 5, 2, 7, 3];

function StatusBadge({ status }: { status: "production" | "dev" }) {
  const t = useTranslations("projects");
  if (status === "production") {
    return (
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22d98a] animate-pulse" />
        <span className="font-mono text-[10px] text-[#22d98a] uppercase tracking-widest">
          {t("statusProduction")}
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#f7c060] animate-pulse" />
      <span className="font-mono text-[10px] text-[#f7c060] uppercase tracking-widest">
        {t("statusDev")}
      </span>
    </div>
  );
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const desc =
    locale === "fr"
      ? project.descFr
      : locale === "tr"
      ? project.descTr
      : project.description;

  const t = useTranslations("projects");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-2xl border border-border-2 bg-bg-3/80 backdrop-blur-sm p-6 cursor-pointer
          hover:border-[#00b4d8]/60 hover:shadow-[0_20px_60px_rgba(0,180,216,0.12)] transition-all duration-300"
        whileHover={{ scale: 1.025 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Color accent bar */}
        <div
          className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: project.color }}
        />

        {/* Status badge */}
        <StatusBadge status={project.status} />

        {/* Title */}
        <h3 className="font-playfair text-xl font-bold italic text-text-primary mb-3 group-hover:text-[#00b4d8] transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-outfit text-sm text-text-primary-2 leading-relaxed mb-5 line-clamp-3">
          {desc}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-border text-text-primary-3"
              style={{ borderColor: `${project.color}30` }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 mt-auto">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-outfit font-semibold transition-all duration-200 hover:shadow-lg"
              style={{ backgroundColor: project.color, color: "#070e1f" }}
            >
              <ExternalLink size={12} />
              {t("demoBtn")}
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-outfit font-semibold border border-border text-text-primary-2 hover:border-[#00b4d8]/50 hover:text-[#00b4d8] transition-all duration-200"
          >
            <GithubIcon />
            {t("codeBtn")}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Projects() {
  const t = useTranslations("projects");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allProjects = projectsData as Project[];
  const projects = FEATURED_IDS.map((id) =>
    allProjects.find((p) => p.id === id)
  ).filter(Boolean) as Project[];

  return (
    <section id="projects" ref={ref} className="py-32 bg-bg dark:bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-gold uppercase tracking-[0.3em] mb-2"
          >
            {t("sectionNum")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-playfair text-5xl md:text-6xl font-bold italic text-text-primary"
          >
            {t("sectionTitle")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 font-playfair text-xl italic text-text-primary-2"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Projects grid with stagger */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={staggerContainer}
        >
          {projects.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
