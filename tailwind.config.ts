import type { Config } from "tailwindcss";

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
        bg: {
          DEFAULT: "#070e1f",
          2: "#0c1528",
          3: "#111d34",
        },
        "text-primary": {
          DEFAULT: "#f5f0e8",
          2: "#9ba8c4",
          3: "#4e5f82",
        },
        gold: {
          DEFAULT: "#f0a832",
          2: "#f7c060",
          3: "#c07d10",
        },
        accent: {
          cyan: "#2dd4ff",
          green: "#22d98a",
        },
        border: {
          DEFAULT: "#16233d",
          2: "#1f3054",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Menlo", "monospace"],
      },
      animation: {
        "ticker": "ticker 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
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
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
