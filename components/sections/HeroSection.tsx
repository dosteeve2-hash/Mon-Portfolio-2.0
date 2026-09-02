"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import { SITE } from "@/lib/site";

function AvailabilityBadge({ label }: { label: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -right-4 bottom-2 flex items-center gap-2.5 rounded-2xl
        border border-gold/30 bg-surface px-4 py-2.5 shadow-card backdrop-blur-sm sm:-right-6"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-green" />
      </span>
      <span className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-text-primary">
        {label}
      </span>
    </motion.div>
  );
}

export default function HeroSection() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  const roles = t.raw("roles") as string[];

  useGSAP(
    () => {
      if (!titleRef.current || reduced) return;
      gsap.fromTo(
        titleRef.current.querySelectorAll<HTMLElement>(".word"),
        { opacity: 0, y: 60, rotationX: -20 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "back.out(1.2)",
          delay: 0.3,
        }
      );
    },
    { scope: titleRef, dependencies: [reduced] }
  );

  /* Machine à écrire. Avec `prefers-reduced-motion`, on affiche simplement le
     premier rôle : pas de texte qui clignote en continu. */
  useEffect(() => {
    const el = typedRef.current;
    if (!el || roles.length === 0) return;

    if (reduced) {
      el.textContent = roles[0];
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const word = roles[wordIndex % roles.length];
      if (!el) return;

      if (!deleting) {
        charIndex += 1;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex -= 1;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex += 1;
        }
      }
      timeout = setTimeout(tick, deleting ? 45 : 90);
    }

    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, [roles, reduced]);

  return (
    <section
      id="top"
      className="relative grain flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <div aria-hidden className="absolute inset-0 grid-lines opacity-60" />
      <div
        aria-hidden
        className="ambient-glow -left-40 top-1/4 h-[500px] w-[500px] bg-gold-vivid/10"
      />
      <div
        aria-hidden
        className="ambient-glow -right-40 bottom-1/4 h-[500px] w-[500px] bg-accent-cyan-vivid/10"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-gold"
          >
            {t("greeting")}
          </motion.p>

          <h1
            ref={titleRef}
            className="font-playfair text-5xl font-bold italic leading-[1.05] md:text-7xl [perspective:1000px]"
          >
            <span className="word inline-block text-text-primary">{t("name")}</span>
            <br />
            <span className="word inline-block text-gradient-gold">{t("lastName")}</span>
            <span className="word inline-block text-accent-cyan">.</span>
          </h1>

          <div className="mt-5 flex h-10 items-center">
            <span className="font-mono text-lg text-text-primary-2">/&gt;&nbsp;</span>
            <span className="font-playfair text-xl italic text-text-primary md:text-2xl">
              <span ref={typedRef} />
              <span
                aria-hidden
                className="ml-1 inline-block h-6 w-0.5 animate-caret-blink bg-gold align-middle"
              />
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-xl font-outfit text-base leading-relaxed text-text-primary-2 md:text-lg"
          >
            {t("tagline")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <GlowButton href="#projects" variant="gold">
              <ExternalLink size={16} /> {t("ctaProjects")}
            </GlowButton>
            <GlowButton href="#contact" variant="outline">
              {t("ctaContact")}
            </GlowButton>
            <GlowButton href={SITE.cv} variant="navy" target="_blank" rel="noopener noreferrer">
              <Download size={16} /> {t("ctaCv")}
            </GlowButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="hidden items-center justify-center md:flex"
        >
          <div className="relative aspect-square w-72 lg:w-80">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-vivid/25 to-accent-cyan-vivid/20 blur-2xl"
            />
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-gold shadow-glow-gold">
              <Image
                src={SITE.photo}
                alt={t("photoAlt")}
                fill
                sizes="(min-width: 1024px) 320px, 288px"
                className="object-cover"
                priority
              />
            </div>
            <AvailabilityBadge label={t("available")} />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-text-primary-3">
          {t("scroll")}
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} className="text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
