"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Mail, Send } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Social";
import { SITE } from "@/lib/site";

const SOCIALS = [
  {
    id: "email",
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    Icon: () => <Mail size={18} />,
    tint: "var(--c-gold)",
  },
  {
    id: "github",
    label: "GitHub",
    value: SITE.githubHandle,
    href: SITE.github,
    Icon: GithubIcon,
    tint: "var(--c-text-2)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: SITE.linkedinHandle,
    href: SITE.linkedin,
    Icon: LinkedinIcon,
    tint: "var(--c-cyan)",
  },
] as const;

const INPUT_CLASS =
  "w-full rounded-xl border border-border-2 bg-surface px-5 py-4 font-outfit text-text-primary " +
  "placeholder:text-text-primary-3 transition-colors duration-200 focus:border-gold/60 focus:outline-none";

type Status = "idle" | "sending" | "sent";

export default function ContactSection() {
  const t = useTranslations("contact");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio — ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

    // On revient à `idle` : l'ancien code laissait le bouton désactivé pour
    // toujours si le client mail ne s'ouvrait pas.
    setTimeout(() => setStatus("sent"), 500);
    setTimeout(() => setStatus("idle"), 6000);
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-bg py-28 md:py-32">
      <div
        aria-hidden
        className="ambient-glow -left-40 bottom-0 h-[460px] w-[460px] bg-gold-vivid/[0.08]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          num={t("sectionNum")}
          eyebrow={t("eyebrow")}
          title={t("title")}
          accent={t("titleAccent")}
          subtitle={t("lead")}
          className="mb-16"
        />

        <div className="grid items-start gap-16 md:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <label className="sr-only" htmlFor="contact-name">{t("formName")}</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder={t("formName")}
              className={INPUT_CLASS}
            />

            <label className="sr-only" htmlFor="contact-email">{t("formEmail")}</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t("formEmail")}
              className={INPUT_CLASS}
            />

            <label className="sr-only" htmlFor="contact-message">{t("formMessage")}</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              placeholder={t("formMessage")}
              className={`${INPUT_CLASS} resize-none`}
            />

            <GlowButton
              type="submit"
              variant="gold"
              disabled={status !== "idle"}
              className="w-full"
            >
              {status === "sent" ? (
                <>✓ {t("sent")}</>
              ) : status === "sending" ? (
                t("sending")
              ) : (
                <>
                  <Send size={16} /> {t("formBtn")}
                </>
              )}
            </GlowButton>

            <p aria-live="polite" className="min-h-5 font-outfit text-xs text-text-primary-3">
              {status === "sent" ? t("sentHint") : ""}
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-text-primary-3">
              {t("or")}
            </p>

            <ul className="space-y-4">
              {SOCIALS.map((social, i) => (
                <motion.li
                  key={social.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="surface-card group flex items-center gap-4 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40"
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "var(--c-bg-2)", color: social.tint }}
                    >
                      <social.Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-text-primary-3">
                        {social.label}
                      </span>
                      <span className="block truncate font-outfit text-sm text-text-primary">
                        {social.value}
                      </span>
                    </span>
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-text-primary-3 transition-colors duration-200 group-hover:text-gold"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
