"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ExternalLink, Lock, Pause, Play } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import ProjectLogo from "@/components/ProjectLogo";
import Reveal from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/icons/Social";
import SectionHeading from "@/components/ui/SectionHeading";
import { FEATURED_PROJECTS, PROJECTS, describe, type Project } from "@/lib/projects";

const AUTO_PLAY_MS = 6000;

function StatusDot({ status }: { status: Project["status"] }) {
  const t = useTranslations("projects");
  const production = status === "production";
  const color = production ? "var(--c-green)" : "var(--c-gold)";

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <span
        className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full"
        style={{ backgroundColor: color }}
      />
      <span
        className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest"
        style={{ color }}
      >
        {production ? t("statusProduction") : t("statusDev")}
      </span>
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <motion.article
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="grid items-center gap-10 md:grid-cols-2"
    >
      <div
        className="relative aspect-video overflow-hidden rounded-2xl border border-border-2"
        style={{ background: `linear-gradient(135deg, ${project.color}22 0%, var(--c-bg-2) 100%)` }}
      >
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-playfair
            text-7xl font-bold italic text-text-primary opacity-15"
        >
          {project.title.slice(0, 2)}
        </span>
        <ProjectLogo
          id={project.id}
          color={project.color}
          className="absolute left-4 top-4 rounded-[10px] shadow-lg"
        />
        <span
          aria-hidden
          className="absolute inset-x-4 bottom-4 h-1 rounded-full opacity-80"
          style={{ backgroundColor: project.color }}
        />
      </div>

      <div className="space-y-5">
        <StatusDot status={project.status} />
        <h3
          className="project-ink font-playfair text-3xl font-bold italic md:text-4xl"
          style={{ "--project-color": project.color } as React.CSSProperties}
        >
          {project.title}
        </h3>
        <p className="font-outfit leading-relaxed text-text-primary-2">
          {describe(project, locale)}
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <li
              key={tag}
              className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-text-primary-2"
              style={{ borderColor: `${project.color}55` }}
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.live && (
            <GlowButton
              href={project.live}
              variant="gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} /> {t("demo")}
            </GlowButton>
          )}
          {project.sourcePublic ? (
            <GlowButton
              href={project.github}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={14} /> {t("code")}
            </GlowButton>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-border-2 px-5 py-2 font-mono text-[11px] uppercase tracking-wider text-text-primary-3">
              <Lock size={12} /> {t("sourcePrivate")}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <Reveal as="li" delay={Math.min(index, 5) * 0.06}>
      <article className="surface-card group flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
        <div className="flex items-start justify-between gap-3">
          <h4
            className="project-ink font-playfair text-xl font-bold italic"
            style={{ "--project-color": project.color } as React.CSSProperties}
          >
            {project.title}
          </h4>
          <StatusDot status={project.status} />
        </div>

        <p className="line-clamp-3 flex-1 font-outfit text-sm leading-relaxed text-text-primary-2">
          {describe(project, locale)}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border-2 px-2 py-0.5 font-mono text-[10px] text-text-primary-3"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 border-t border-border pt-4">
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gold transition-colors hover:text-gold-2"
            >
              <ExternalLink size={12} /> {t("demo")}
            </a>
          ) : (
            project.sourcePublic && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-primary-3">
                {t("noLive")}
              </span>
            )
          )}
          {project.sourcePublic ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-primary-2 transition-colors hover:text-gold"
            >
              <GithubIcon size={12} /> {t("code")}
            </a>
          ) : (
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-primary-3">
              <Lock size={11} /> {t("sourcePrivate")}
            </span>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectsSection() {
  const t = useTranslations("projects");
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  const count = FEATURED_PROJECTS.length;
  const next = useCallback(() => setCurrent((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (!playing || reduced || count < 2) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [playing, reduced, next, count]);

  const project = FEATURED_PROJECTS[current];
  if (!project) return null;

  return (
    <section id="projects" className="relative overflow-hidden bg-bg py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          num={t("sectionNum")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-16"
        />

        <div
          className="relative"
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
          onFocusCapture={() => setPlaying(false)}
        >
          <AnimatePresence mode="wait">
            <FeaturedCard key={project.id} project={project} />
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label={t("prev")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-2 text-text-primary-2 transition-all duration-200 hover:border-gold/60 hover:text-gold"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label={t("next")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-2 text-text-primary-2 transition-all duration-200 hover:border-gold/60 hover:text-gold"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? t("pause") : t("play")}
                aria-pressed={!playing}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-2 text-text-primary-2 transition-all duration-200 hover:border-gold/60 hover:text-gold"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
            </div>

            <div className="flex gap-2">
              {FEATURED_PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setCurrent(i)}
                  aria-label={t("goTo", { n: i + 1 })}
                  aria-current={i === current ? "true" : undefined}
                  className="py-2"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === current
                        ? "h-2 w-6 bg-gold"
                        : "h-2 w-2 bg-border-2 hover:bg-gold/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Le catalogue complet : les projets non « featured » n'apparaissaient
            nulle part sur le site alors qu'ils sont dans projects.json. */}
        <div className="mt-28">
          <Reveal className="mb-10">
            <h3 className="font-playfair text-3xl font-bold italic text-text-primary md:text-4xl">
              {t("allTitle")}
            </h3>
            <p className="mt-2 font-outfit text-text-primary-2">{t("allSubtitle")}</p>
          </Reveal>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <ProjectTile key={p.id} project={p} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
