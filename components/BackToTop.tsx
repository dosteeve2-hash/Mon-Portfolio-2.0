"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop — bouton flottant animé avec Framer Motion.
 * Apparaît après 400px de scroll.
 * Inclut un anneau SVG de progression de lecture.
 * Raccourci clavier : Alt + ArrowUp.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? scrollTop / docHeight : 0;

    setVisible(scrollTop > 400);
    setProgress(Math.min(pct, 1));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, [updateScroll]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "ArrowUp") {
        e.preventDefault();
        scrollToTop();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToTop]);

  // Anneau SVG
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Retourner en haut (Alt + ↑)"
          title="Retourner en haut (Alt + ↑)"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full
            flex items-center justify-center
            bg-bg-2/80 backdrop-blur-md
            border border-border-2
            shadow-[0_4px_24px_rgba(0,0,0,0.35)]
            focus:outline-none focus:ring-2 focus:ring-gold/50"
        >
          {/* Anneau de progression */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            {/* Fond */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="var(--border-2, #2a2a3a)"
              strokeWidth="2"
            />
            {/* Progression */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="#f0a832"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
                transition: "stroke-dashoffset 0.15s linear",
              }}
            />
          </svg>

          {/* Icône */}
          <ArrowUp
            size={18}
            strokeWidth={2.5}
            className="relative z-10 text-gold"
            style={{ color: "#f0a832" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
