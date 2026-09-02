"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { LOCALES, NAV_SECTIONS, isLocale } from "@/lib/site";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const onHome = pathname === `/${locale}` || pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Surligne le lien de la section visible. Les ancres pointent désormais
     vers des sections qui existent réellement dans la page. */
  useEffect(() => {
    if (!onHome) return;
    const targets = NAV_SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  // Bloque le scroll de la page quand le tiroir mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const switchLocale = useCallback(
    (next: string) => {
      const segments = pathname.split("/");
      if (isLocale(segments[1] ?? "")) segments[1] = next;
      else segments.splice(1, 0, next);
      router.push(segments.join("/") || `/${next}`);
    },
    [pathname, router]
  );

  // Hors de la home, les ancres doivent repasser par la page d'accueil.
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/${locale}#${id}`);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          <a
            href={onHome ? "#top" : `/${locale}`}
            aria-label={t("home")}
            className="rounded-md"
          >
            <Logo size="sm" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_SECTIONS.map((section) => {
              const isActive = onHome && active === section.id;
              return (
                <a
                  key={section.id}
                  href={hrefFor(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative font-outfit text-sm tracking-wide transition-colors duration-200 ${
                    isActive ? "text-gold" : "text-text-primary-2 hover:text-gold"
                  }`}
                >
                  {t(section.key)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div
              role="group"
              aria-label={t("language")}
              className="flex items-center gap-1 rounded-full border border-border bg-bg-2/80 p-1"
            >
              {LOCALES.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  aria-pressed={locale === loc}
                  className={`rounded-full px-2.5 py-1 font-mono text-xs uppercase transition-all duration-200 ${
                    locale === loc
                      ? "bg-gold font-bold text-gold-ink"
                      : "text-text-primary-2 hover:text-gold"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            <ThemeToggle className="h-9 w-9" />
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center text-text-primary-2 transition-colors hover:text-gold md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="mt-20 flex flex-col gap-6 p-8">
              {NAV_SECTIONS.map((section, i) => (
                <motion.a
                  key={section.id}
                  href={hrefFor(section.id)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className="font-playfair text-3xl font-bold italic text-text-primary transition-colors hover:text-gold"
                >
                  {t(section.key)}
                </motion.a>
              ))}

              <div className="mt-4 flex items-center gap-3">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      switchLocale(loc);
                      setMenuOpen(false);
                    }}
                    aria-pressed={locale === loc}
                    className={`rounded-full border px-3 py-1.5 font-mono text-sm uppercase transition-all duration-200 ${
                      locale === loc
                        ? "border-gold bg-gold font-bold text-gold-ink"
                        : "border-border text-text-primary-2 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
                <ThemeToggle className="ml-auto h-10 w-10" size={18} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
