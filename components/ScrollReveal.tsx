"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}

function getInitial(direction: Direction) {
  switch (direction) {
    case "up":    return { opacity: 0, y: 40, x: 0 };
    case "down":  return { opacity: 0, y: -40, x: 0 };
    case "left":  return { opacity: 0, y: 0, x: 40 };
    case "right": return { opacity: 0, y: 0, x: -40 };
  }
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction)}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : getInitial(direction)
      }
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
