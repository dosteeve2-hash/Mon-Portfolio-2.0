"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Mail, Send, ExternalLink } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import ScrollReveal from "@/components/ScrollReveal";

function GithubSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Email",
    value: "docompaore2@gmail.com",
    href: "mailto:docompaore2@gmail.com",
    Icon: () => <Mail size={18} />,
    color: "#D4AF37",
  },
  {
    label: "GitHub",
    value: "dosteeve2-hash",
    href: "https://github.com/dosteeve2-hash",
    Icon: GithubSvg,
    color: "#9ba8c4",
  },
  {
    label: "LinkedIn",
    value: "Steeve Donald Compaore",
    href: "https://www.linkedin.com/in/steeve-donald-compaoré-65ba13296",
    Icon: LinkedinSvg,
    color: "#0A66C2",
  },
];

const FIELDS = [
  { name: "name",    type: "text",  placeholder: "Your Name",    rows: undefined },
  { name: "email",   type: "email", placeholder: "Your Email",   rows: undefined },
];

const INPUT_CLASS =
  "w-full px-5 py-4 rounded-xl border border-[#1f3054] bg-[#0d1c35] text-[#f5f0e8] font-outfit placeholder:text-[#4e5f82] focus:outline-none focus:border-[#D4AF37]/60 transition-colors duration-200";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const name    = (form.elements.namedItem("name")    as HTMLInputElement).value;
    const email   = (form.elements.namedItem("email")   as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const mailto  = `mailto:docompaore2@gmail.com?subject=Portfolio contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    setTimeout(() => { setSending(false); setSent(true); }, 500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-2">05</p>
          <h2 className="font-playfair text-5xl md:text-7xl font-bold italic text-[#f5f0e8]">
            Let&apos;s Build
          </h2>
          <h3 className="font-playfair text-4xl md:text-6xl font-bold italic text-[#D4AF37]">
            Something extraordinary.
          </h3>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {FIELDS.map((f) => (
              <input
                key={f.name}
                type={f.type}
                name={f.name}
                required
                placeholder={f.placeholder}
                className={INPUT_CLASS}
              />
            ))}
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your Message"
              className={`${INPUT_CLASS} resize-none`}
            />
            <GlowButton
              type="submit"
              variant="gold"
              disabled={sending || sent}
              className="w-full justify-center"
            >
              {sent ? "✓ Sent!" : sending ? "Sending..." : <><Send size={16} /> Send Message</>}
            </GlowButton>
          </motion.form>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="font-mono text-xs text-[#4e5f82] uppercase tracking-widest mb-8">
              or reach me directly
            </p>
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-[#1f3054] bg-[#0d1c35] hover:border-[#D4AF37]/30 transition-all duration-200"
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{ background: `${s.color}15` }}
                >
                  <s.Icon />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] text-[#4e5f82] uppercase tracking-widest">{s.label}</div>
                  <div className="font-outfit text-sm text-[#f5f0e8] truncate">{s.value}</div>
                </div>
                <ExternalLink size={14} className="text-[#4e5f82] group-hover:text-[#D4AF37] transition-colors duration-200 flex-shrink-0" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
