"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const enter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a,button,input,textarea,[data-cursor-grow]")) {
        setHovered(true);
      }
    };
    const leave = () => setHovered(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-gold/60 mix-blend-difference"
        animate={{
          x: pos.x - (hovered ? 24 : 16),
          y: pos.y - (hovered ? 24 : 16),
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-gold"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.1 }}
      />
    </>
  );
}
