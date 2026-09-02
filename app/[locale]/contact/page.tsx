"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Send } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Social";
import { SITE } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const SUBJECT_KEYS = [
  "subjectProject",
  "subjectCollab",
  "subjectJob",
  "subjectOther",
] as const;

const FIELD_CLASS =
  "w-full rounded-xl border border-border-2 bg-surface px-5 py-4 font-outfit text-text-primary " +
  "placeholder:text-text-primary-3 transition-colors duration-200 focus:border-gold/60 focus:outline-none";

type Status = "idle" | "sending" | "sent";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const tContact = useTranslations("contact");
  const tAbout = useTranslations("about");

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState<(typeof SUBJECT_KEYS)[number]>(SUBJECT_KEYS[0]);

  const socials = [
    {
      id: "email",
      label: t("emailLabel"),
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      icon: <Mail size={20} />,
      tint: "var(--c-gold)",
    },
    {
      id: "linkedin",
      label: t("linkedinLabel"),
      value: SITE.linkedinHandle,
      href: SITE.linkedin,
      icon: <LinkedinIcon size={20} />,
      tint: "var(--c-cyan)",
    },
    {
      id: "github",
      label: t("githubLabel"),
      value: SITE.githubHandle,
      href: SITE.github,
      icon: <GithubIcon size={20} />,
      tint: "var(--c-text-2)",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subjectLabel = t(subject);

    const mailSubject = encodeURIComponent(`[Portfolio] ${subjectLabel} — ${name}`);
    const body = encodeURIComponent(
      `From: ${name}\nEmail: ${email}\nSubject: ${subjectLabel}\n\n${message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${mailSubject}&body=${body}`;

    setTimeout(() => setStatus("sent"), 600);
    setTimeout(() => setStatus("idle"), 6000);
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-bg pb-24 pt-32">
      <div
        aria-hidden
        className="ambient-glow -right-40 top-0 h-[460px] w-[460px] bg-gold-vivid/[0.08]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-gold"
          >
            {tContact("eyebrow")}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-playfair text-5xl font-bold italic leading-tight text-text-primary md:text-7xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl font-outfit text-lg text-text-primary-2"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid items-start gap-16 md:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <label className="sr-only" htmlFor="page-name">{t("namePlaceholder")}</label>
            <input
              id="page-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              className={FIELD_CLASS}
            />

            <label className="sr-only" htmlFor="page-email">{t("emailPlaceholder")}</label>
            <input
              id="page-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className={FIELD_CLASS}
            />

            <label className="sr-only" htmlFor="page-subject">{t("subjectLabel")}</label>
            <select
              id="page-subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value as typeof subject)}
              className={`${FIELD_CLASS} appearance-none`}
            >
              {SUBJECT_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(key)}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="page-message">{t("messagePlaceholder")}</label>
            <textarea
              id="page-message"
              name="message"
              required
              rows={7}
              placeholder={t("messagePlaceholder")}
              className={`${FIELD_CLASS} resize-none`}
            />

            <GlowButton type="submit" variant="gold" disabled={status !== "idle"} className="w-full">
              {status === "sent" ? (
                `✓ ${t("sent")}`
              ) : status === "sending" ? (
                t("sending")
              ) : (
                <>
                  <Send size={16} /> {t("sendBtn")}
                </>
              )}
            </GlowButton>

            <p aria-live="polite" className="min-h-5 font-outfit text-xs text-text-primary-3">
              {status === "sent" ? tContact("sentHint") : ""}
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-primary-3">
              {t("contactTitle")}
            </p>

            <ul className="space-y-4">
              {socials.map((social, i) => (
                <motion.li
                  key={social.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                >
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="surface-card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40"
                  >
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                      style={{ background: "var(--c-bg-2)", color: social.tint }}
                    >
                      {social.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-text-primary-3">
                        {social.label}
                      </span>
                      <span className="mt-0.5 block truncate font-outfit text-sm text-text-primary">
                        {social.value}
                      </span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex items-center gap-2 rounded-xl border border-accent-green/25 bg-accent-green/5 px-4 py-3"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent-green" />
              <span className="font-outfit text-sm text-accent-green">
                {tAbout("availValue")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
