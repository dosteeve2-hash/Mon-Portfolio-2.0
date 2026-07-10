"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";
import Logo from "./Logo";

const LOCALES = ["EN", "FR", "TR"] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved !== "light";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const switchLocale = (loc: string) => {
    const seg = pathname.split("/");
    seg[1] = loc.toLowerCase();
    router.push(seg.join("/"));
  };

  const links = [
    { href: "#about", label: t("about") },
    { href: "#skills", label: t("skills") },
    { href: "#projects", label: t("projects") },
    { href: "#ai", label: t("ai") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/80 dark:bg-bg/80 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Logo size="sm" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-primary-2 hover:text-gold transition-colors duration-200 font-outfit text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Locale toggle */}
            <div className="flex items-center gap-1 bg-bg-2/80 border border-border rounded-full px-1 py-1">
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`font-mono text-xs px-2.5 py-1 rounded-full transition-all duration-200 ${
                    locale.toUpperCase() === loc
                      ? "bg-gold text-bg font-bold"
                      : "text-text-primary-2 hover:text-gold"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-border bg-bg-2/80 flex items-center justify-center text-text-primary-2 hover:text-gold hover:border-gold transition-all duration-200"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-text-primary-2 hover:text-gold transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-6 p-8 mt-20">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-playfair font-bold italic text-text-primary hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="flex items-center gap-4 mt-4">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                    className={`font-mono text-sm px-3 py-1.5 rounded-full border transition-all duration-200 ${
                      locale.toUpperCase() === loc
                        ? "bg-gold text-bg border-gold font-bold"
                        : "border-border text-text-primary-2 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
                <button
                  onClick={toggleTheme}
                  className="ml-auto w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary-2 hover:text-gold"
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
