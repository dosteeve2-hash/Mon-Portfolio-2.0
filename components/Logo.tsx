"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizes = { sm: 80, md: 110, lg: 160 };
  const w = sizes[size];

  return (
    <motion.svg
      width={w}
      height={Math.round(w * 0.42)}
      viewBox="0 0 110 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer select-none ${className}`}
      whileHover="hover"
      initial="idle"
    >
      {/* SDC letters */}
      <motion.text
        x="4"
        y="36"
        fontFamily="Playfair Display, Georgia, serif"
        fontSize="40"
        fontStyle="italic"
        fontWeight="700"
        fill="#f0a832"
        variants={{
          idle: { opacity: 1 },
          hover: { opacity: 1 },
        }}
      >
        SDC
      </motion.text>

      {/* Animated underline */}
      <motion.line
        x1="4"
        y1="42"
        x2="106"
        y2="42"
        stroke="#f0a832"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          idle: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" as const }}
      />

      {/* Dot accent */}
      <motion.circle
        cx="104"
        cy="8"
        r="4"
        fill="#2dd4ff"
        variants={{
          idle: { scale: 0, opacity: 0 },
          hover: { scale: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3, delay: 0.15 }}
      />
    </motion.svg>
  );
}

export function LogoWatermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <span
        className="text-[28vw] font-playfair font-bold italic text-gold/[0.03] leading-none"
        aria-hidden="true"
      >
        SDC
      </span>
    </div>
  );
}
