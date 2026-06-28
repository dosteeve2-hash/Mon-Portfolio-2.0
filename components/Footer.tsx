"use client";

import { useTranslations } from "next-intl";
import Logo from "./Logo";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-bg py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo size="sm" />
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center">
          <span className="font-mono text-xs text-text-primary-3">{t("built")}</span>
          <span className="hidden sm:block text-text-primary-3">·</span>
          <span className="font-mono text-xs text-text-primary-3">
            © {new Date().getFullYear()} Steeve Donald Compaore — {t("rights")}
          </span>
        </div>
        <a
          href="mailto:docompaore2@gmail.com"
          className="font-mono text-xs text-text-primary-3 hover:text-gold transition-colors duration-200"
        >
          docompaore2@gmail.com
        </a>
      </div>
    </footer>
  );
}
