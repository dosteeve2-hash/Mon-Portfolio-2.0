"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Send } from "lucide-react";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const SUBJECTS_KEYS = [
  "subjectProject",
  "subjectCollab",
  "subjectJob",
  "subjectOther",
] as const;

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState(SUBJECTS_KEYS[0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const subjectLabel = t(subject);
    const mailto = `mailto:docompaore2@gmail.com?subject=[Portfolio] ${encodeURIComponent(subjectLabel)} — from ${encodeURIComponent(name)}&body=${encodeURIComponent(
      `From: ${name}\nEmail: ${email}\nSubject: ${subjectLabel}\n\n${message}`
    )}`;
    window.location.href = mailto;
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 600);
  };

  const socials = [
    {
      label: t("emailLabel"),
      value: "docompaore2@gmail.com",
      href: "mailto:docompaore2@gmail.com",
      icon: <Mail size={20} />,
      color: "#d4af37",
    },
    {
      label: t("linkedinLabel"),
      value: "steeve-donald-compaore",
      href: "https://linkedin.com/in/steeve-donald-compaore",
      icon: <LinkedinIcon />,
      color: "#0A66C2",
    },
    {
      label: t("githubLabel"),
      value: "dosteeve2-hash",
      href: "https://github.com/dosteeve2-hash",
      icon: <GithubIcon />,
      color: "#9ba8c4",
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen pt-32 pb-24 bg-bg dark:bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-[#d4af37] uppercase tracking-[0.3em] mb-3"
          >
            contact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-playfair text-5xl md:text-7xl font-bold italic text-text-primary leading-tight"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 font-outfit text-lg text-text-primary-2 max-w-xl"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder={t("namePlaceholder")}
                className="w-full px-5 py-4 rounded-xl border border-border-2 bg-bg-3 text-text-primary font-outfit
                  placeholder:text-text-primary-3 focus:outline-none focus:border-[#00b4d8]/60
                  transition-colors duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder={t("emailPlaceholder")}
                className="w-full px-5 py-4 rounded-xl border border-border-2 bg-bg-3 text-text-primary font-outfit
                  placeholder:text-text-primary-3 focus:outline-none focus:border-[#00b4d8]/60
                  transition-colors duration-200"
              />
            </div>

            {/* Subject dropdown */}
            <div>
              <select
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value as typeof subject)}
                className="w-full px-5 py-4 rounded-xl border border-border-2 bg-bg-3 text-text-primary font-outfit
                  focus:outline-none focus:border-[#00b4d8]/60 transition-colors duration-200
                  appearance-none cursor-pointer"
              >
                {SUBJECTS_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {t(key)}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                required
                rows={7}
                placeholder={t("messagePlaceholder")}
                className="w-full px-5 py-4 rounded-xl border border-border-2 bg-bg-3 text-text-primary font-outfit
                  placeholder:text-text-primary-3 focus:outline-none focus:border-[#00b4d8]/60
                  transition-colors duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={sending || sent}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-[#d4af37] text-[#070e1f] font-outfit font-semibold
                flex items-center justify-center gap-2 transition-all duration-300
                hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] disabled:opacity-60"
            >
              {sent ? (
                `✓ ${t("sent")}`
              ) : sending ? (
                t("sending")
              ) : (
                <>
                  <Send size={16} />
                  {t("sendBtn")}
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="space-y-4"
          >
            <p className="font-mono text-xs text-text-primary-3 uppercase tracking-widest mb-8">
              {t("contactTitle")}
            </p>

            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-border-2 bg-bg-3
                  hover:border-[#00b4d8]/40 transition-all duration-200"
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-text-primary-2
                    group-hover:scale-105 transition-all duration-200"
                  style={{ background: `${s.color}18`, color: s.color }}
                >
                  {s.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] text-text-primary-3 uppercase tracking-widest">
                    {s.label}
                  </div>
                  <div className="font-outfit text-sm text-text-primary truncate mt-0.5">
                    {s.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Availability chip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex items-center gap-2 px-4 py-3 rounded-xl border border-[#22d98a]/25 bg-[#22d98a]/5"
            >
              <span className="w-2 h-2 rounded-full bg-[#22d98a] animate-pulse" />
              <span className="font-outfit text-sm text-[#22d98a]">Open to opportunities</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
