"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  as?: "div" | "li" | "section";
}

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Révélation au scroll. Respecte `prefers-reduced-motion` : le contenu
 * apparaît alors immédiatement, sans translation.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const from = reduced ? { opacity: 0, x: 0, y: 0 } : { opacity: 0, ...OFFSET[direction] };
  // Les 3 balises ont des types de ref incompatibles entre elles ; on aligne
  // sur motion.div (le rendu réel reste bien la balise demandée).
  const Motion = motion[as] as typeof motion.div;

  return (
    <Motion
      ref={ref}
      initial={from}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : from}
      transition={{ duration: reduced ? 0.2 : 0.7, delay: reduced ? 0 : delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Motion>
  );
}
