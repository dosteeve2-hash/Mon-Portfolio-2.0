"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown, ExternalLink } from "lucide-react";
import { LogoWatermark } from "../Logo";

function useTypewriter(words: string[], speed = 90) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const delay = isDeleting ? speed / 2 : speed;

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, text.length + 1);
        setText(next);
        if (next === currentWord) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        const next = currentWord.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, delay);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [text, isDeleting, wordIndex, words, speed]);

  return text;
}

function Counter({ target, label }: { target: string; label: string }) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(target.replace(/\D/g, ""));
          const suffix = target.replace(/[0-9]/g, "");
          if (!isNaN(num)) {
            animate(0, num, {
              duration: 2,
              ease: "easeOut" as const,
              onUpdate: (v) => setDisplayed(Math.floor(v) + suffix),
            });
          } else {
            setDisplayed(target);
          }
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-playfair font-bold text-gold">{displayed}</div>
      <div className="text-xs font-mono text-text-primary-2 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Hero() {
  const t = useTranslations("hero");
  const roles = t.raw("roles") as string[];
  const typed = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-bg dark:bg-bg">
      <Particles />
      <LogoWatermark />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="z-10">
          <motion.p variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-4">
            {t("greeting")}
          </motion.p>

          <motion.h1 variants={fadeUp} className="font-playfair text-5xl md:text-7xl font-bold italic leading-tight">
            <span className="text-text-primary">{t("name")}</span>
            <br />
            <span className="text-gold">{t("lastName").replace(".", "")}</span>
            <span className="text-accent-cyan">.</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-4 h-10 flex items-center">
            <span className="font-mono text-lg text-text-primary-2">/&gt;&nbsp;</span>
            <span className="font-playfair text-xl md:text-2xl italic text-text-primary">
              {typed}
              <span className="inline-block w-0.5 h-6 bg-gold ml-1 animate-pulse" />
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 my-10 border-y border-border py-6">
            <Counter target={t("stat1Value")} label={t("stat1Label")} />
            <Counter target={t("stat2Value")} label={t("stat2Label")} />
            <Counter target={t("stat3Value")} label={t("stat3Label")} />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-gold hover:bg-gold-2 text-bg font-outfit font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(240,168,50,0.4)] flex items-center gap-2"
            >
              {t("cta1")} <ExternalLink size={16} />
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-gold/50 hover:border-gold text-gold hover:bg-gold/5 font-outfit font-semibold rounded-full transition-all duration-300"
            >
              {t("cta2")}
            </a>
            <a
              href="/cv-steve-donald-compaore.html"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#f0a832]/40 text-[#f0a832] font-mono text-sm uppercase tracking-widest rounded-lg hover:bg-[#f0a832]/10 transition-all duration-300"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative w-72 lg:w-80">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f0a832]/20 to-[#2dd4ff]/20 blur-2xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative rounded-2xl overflow-hidden border border-[#1f3054]"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src="/steve-photo.jpg"
                alt="Steeve Donald Compaore"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1f]/40 to-transparent" />
            </motion.div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-bg-2 border border-border rounded-2xl px-4 py-2 flex items-center gap-2 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-xs font-mono text-text-primary-2 uppercase tracking-wider">Available</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-text-primary-3 uppercase tracking-widest">{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
