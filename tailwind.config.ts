import type { Config } from "tailwindcss";

/**
 * Toutes les couleurs pointent vers les tokens CSS de `app/globals.css`.
 * C'est ce qui rend le bascule sombre/clair réelle : aucun composant ne
 * référence un hex, seul `:root.light` redéfinit les variables.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "var(--c-bg)",
        bg: {
          DEFAULT: "var(--c-bg)",
          2: "var(--c-bg-2)",
          3: "var(--c-bg-3)",
        },
        surface: "var(--c-surface)",
        "text-primary": {
          DEFAULT: "var(--c-text)",
          2: "var(--c-text-2)",
          3: "var(--c-text-3)",
        },
        gold: {
          DEFAULT: "var(--c-gold)",
          2: "var(--c-gold-2)",
          3: "var(--c-gold-3)",
          ink: "var(--c-gold-ink)",
          vivid: "var(--c-gold-vivid)",
        },
        accent: {
          cyan: "var(--c-cyan)",
          "cyan-vivid": "var(--c-cyan-vivid)",
          green: "var(--c-green)",
        },
        border: {
          DEFAULT: "var(--c-border)",
          2: "var(--c-border-2)",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "glow-gold": "0 0 35px var(--glow-gold)",
        "glow-cyan": "0 0 35px var(--glow-cyan)",
      },
      animation: {
        ticker: "ticker 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "caret-blink": "caret-blink 1.1s step-end infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "caret-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
