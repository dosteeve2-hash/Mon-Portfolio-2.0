"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { THEME_STORAGE_KEY } from "@/components/ThemeScript";
import { useAppliedTheme } from "@/lib/hooks";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export default function ThemeToggle({ className = "", size = 16 }: ThemeToggleProps) {
  const t = useTranslations("nav");
  const theme = useAppliedTheme();

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* stockage indisponible (navigation privée) : le thème tient la session */
    }
  };

  const label = theme === "light" ? t("themeToDark") : t("themeToLight");

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center rounded-full border border-border-2
        bg-bg-2/80 text-text-primary-2 transition-colors duration-200
        hover:border-gold hover:text-gold ${className}`}
    >
      {theme === "light" ? <Moon size={size} /> : <Sun size={size} />}
    </button>
  );
}
