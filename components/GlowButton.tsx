"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "gold" | "navy" | "outline";

interface GlowButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const STYLES: Record<Variant, string> = {
  gold: "bg-[#D4AF37] text-[#0A1628] hover:bg-[#e8c93e] hover:shadow-[0_0_35px_rgba(212,175,55,0.55)]",
  navy: "bg-[#0A1628] text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]",
  outline: "border border-[#D4AF37]/50 text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]",
};

const BASE = "relative inline-flex items-center gap-2 px-8 py-3 rounded-full font-outfit font-semibold overflow-hidden transition-all duration-300 text-sm";

function Inner({ children, variant }: { children: ReactNode; variant: Variant }) {
  return (
    <>
      <motion.span
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-150%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
      <span className={`${BASE} ${STYLES[variant]}`}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </span>
    </>
  );
}

export default function GlowButton({
  children,
  variant = "gold",
  href,
  onClick,
  className = "",
  target,
  rel,
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`inline-block ${className}`}>
        <Inner variant={variant}>{children}</Inner>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-block disabled:opacity-60 ${className}`}
    >
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
