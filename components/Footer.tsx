"use client";

import { useLocale, useTranslations } from "next-intl";
import Logo from "@/components/Logo";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Social";
import { NAV_SECTIONS, SITE } from "@/lib/site";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="border-t border-border bg-bg-2">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo size="sm" />
            <p className="mt-4 max-w-xs font-outfit text-sm leading-relaxed text-text-primary-2">
              {t("built")}
            </p>
          </div>

          <nav aria-label={t("navTitle")}>
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-text-primary-3">
              {t("navTitle")}
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a
                    href={`/${locale}#${section.id}`}
                    className="font-outfit text-sm text-text-primary-2 transition-colors hover:text-gold"
                  >
                    {tNav(section.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-text-primary-3">
              {t("elsewhereTitle")}
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-outfit text-sm text-text-primary-2 transition-colors hover:text-gold"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-outfit text-sm text-text-primary-2 transition-colors hover:text-gold"
                >
                  <GithubIcon size={14} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-outfit text-sm text-text-primary-2 transition-colors hover:text-gold"
                >
                  <LinkedinIcon size={14} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="font-mono text-xs text-text-primary-3">
            © {new Date().getFullYear()} {SITE.name} — {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
