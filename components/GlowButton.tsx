"use client";

import { ReactNode } from "react";

type Variant = "gold" | "navy" | "outline" | "ghost";
type Size = "sm" | "md";

interface GlowButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold text-gold-ink border border-gold hover:shadow-glow-gold",
  navy: "bg-bg-2 text-gold border border-gold/40 hover:border-gold/80 hover:shadow-glow-gold",
  outline: "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 hover:shadow-glow-gold",
  ghost: "border border-border-2 text-text-primary-2 hover:text-gold hover:border-gold/50",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2 text-xs gap-1.5",
  md: "px-7 py-3 text-sm gap-2",
};

const BASE =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full " +
  "font-outfit font-semibold transition-[color,background-color,border-color,box-shadow,transform] " +
  "duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 " +
  "disabled:pointer-events-none whitespace-nowrap";

/**
 * Le reflet est piloté en CSS depuis `group-hover` : il vit à l'intérieur du
 * même élément positionné que le bouton, ce qui n'était pas le cas avant.
 */
function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12
        bg-gradient-to-r from-transparent via-white/25 to-transparent
        transition-[left] duration-700 ease-out group-hover:left-[150%]
        motion-reduce:hidden"
    />
  );
}

export default function GlowButton({
  children,
  variant = "gold",
  size = "md",
  href,
  onClick,
  className = "",
  target,
  rel,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: GlowButtonProps) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      <Shine />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
}
