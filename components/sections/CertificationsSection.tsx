"use client";

import { useLocale, useTranslations } from "next-intl";
import { BadgeCheck, ExternalLink } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { certificationsTriees, dateLisible, type Certification } from "@/data/certifications";

function Pastille({ certif }: { certif: Certification }) {
  if (certif.logo) {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
          border border-border-2 bg-bg-2 transition-colors duration-300 group-hover:border-gold/40"
      >
        {/* simple-icons est servi en SVG statique : pas de JS, pas de suivi.
            `next/image` n'apporterait rien ici — l'icône fait moins de 2 Ko. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${encodeURIComponent(certif.logo)}/f0a832`}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          className="h-5 w-5"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border
        border-border-2 bg-bg-2 font-playfair text-lg italic text-gold
        transition-colors duration-300 group-hover:border-gold/40"
    >
      {certif.organisme.trim().charAt(0).toUpperCase()}
    </span>
  );
}

function Carte({ certif, locale, verifier }: {
  certif: Certification;
  locale: string;
  verifier: string;
}) {
  const corps = (
    <>
      <div className="flex items-start gap-4">
        <Pastille certif={certif} />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-primary-3">
            {certif.organisme}
          </p>
          <h3 className="mt-1.5 font-outfit text-base font-medium leading-snug text-text-primary">
            {certif.titre}
          </h3>
          <p className="mt-1 font-mono text-xs tabular-nums text-text-primary-3">
            {dateLisible(certif.date, locale)}
          </p>
        </div>
        {certif.url && (
          <span
            className="flex shrink-0 items-center gap-1 rounded-full border border-accent-green/30
              bg-accent-green/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-green"
          >
            <BadgeCheck size={12} aria-hidden />
            {verifier}
          </span>
        )}
      </div>

      {certif.competences && certif.competences.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {certif.competences.map((c) => (
            <li
              key={c}
              className="rounded-lg border border-border-2 bg-bg-2 px-2.5 py-1
                font-mono text-[11px] text-text-primary-2"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  const classes =
    "surface-card group block h-full rounded-2xl p-5 transition-all duration-300 " +
    "hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow-gold " +
    "focus-visible:-translate-y-1 focus-visible:border-gold/40 " +
    "motion-reduce:transform-none motion-reduce:transition-none";

  if (!certif.url) {
    return <div className={classes}>{corps}</div>;
  }

  return (
    <a href={certif.url} target="_blank" rel="noopener noreferrer" className={classes}>
      {corps}
      <span className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gold">
        <ExternalLink size={12} aria-hidden />
        {verifier}
      </span>
    </a>
  );
}

/**
 * Rend `null` quand il n'y a rien à montrer. Une section « certifications
 * bientôt » dit au visiteur qu'il n'y en a pas — autant ne rien dire.
 */
export default function CertificationsSection() {
  const t = useTranslations("certifications");
  const locale = useLocale();
  const certifs = certificationsTriees();

  if (certifs.length === 0) return null;

  const verifiables = certifs.filter((c) => c.url).length;

  return (
    <section id="certifications" className="relative overflow-hidden bg-bg-2 py-28 md:py-32">
      <div
        aria-hidden
        className="ambient-glow -right-32 top-10 h-[420px] w-[420px] bg-accent-cyan-vivid/[0.07]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          num={t("sectionNum")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-14"
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifs.map((certif, i) => (
            <Reveal as="li" key={`${certif.titre}-${certif.date}`} delay={i * 0.07}>
              <Carte certif={certif} locale={locale} verifier={t("verify")} />
            </Reveal>
          ))}
        </ul>

        {verifiables > 0 && (
          <Reveal delay={0.2}>
            <p className="mt-8 font-outfit text-sm text-text-primary-3">
              {t("verifiableNote", { count: verifiables, total: certifs.length })}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
