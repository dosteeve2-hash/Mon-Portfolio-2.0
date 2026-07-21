"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import GlowButton from "@/components/GlowButton";

gsap.registerPlugin();

const WORDS = ["Builder.", "AI Engineer.", "Product Designer.", "Entrepreneur."];

function FloatingBadge() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-5 -right-5 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-[#D4AF37]/30 bg-[#0d1c35] shadow-2xl backdrop-blur-sm"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22d98a] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22d98a]" />
      </span>
      <span className="font-mono text-xs text-[#f5f0e8] uppercase tracking-widest whitespace-nowrap">
        Disponible pour missions
      </span>
    </motion.div>
  );
}

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const wordIndexRef = useRef(0);
  const typedRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!titleRef.current) return;
      const words = titleRef.current.querySelectorAll<HTMLElement>(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 60, rotationX: -20 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "back.out(1.2)",
          delay: 0.3,
        }
      );
    },
    { scope: titleRef }
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const word = WORDS[wordIndexRef.current % WORDS.length];
      if (!typedRef.current) return;

      if (!deleting) {
        typedRef.current.textContent = word.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        typedRef.current.textContent = word.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          wordIndexRef.current++;
        }
      }
      timeout = setTimeout(tick, deleting ? 45 : 90);
    }
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0A1628]">
      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-[#00BCD4]/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#0A1628]/80 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-4"
          >
            Hello, I&apos;m
          </motion.p>

          <h1
            ref={titleRef}
            className="font-playfair text-5xl md:text-7xl font-bold italic leading-tight perspective-[1000px]"
          >
            <span className="word inline-block text-[#f5f0e8]">Steeve</span>{" "}
            <span className="word inline-block text-[#f5f0e8]">Donald</span>
            <br />
            <span className="word inline-block text-[#D4AF37]">Compaore</span>
            <span className="word inline-block text-[#00BCD4]">.</span>
          </h1>

          <div ref={subtitleRef} className="mt-5 h-10 flex items-center">
            <span className="font-mono text-lg text-[#9ba8c4]">/&gt;&nbsp;</span>
            <span className="font-playfair text-xl md:text-2xl italic text-[#f5f0e8]">
              <span ref={typedRef} />
              <span className="inline-block w-0.5 h-6 bg-[#D4AF37] ml-1 animate-pulse" />
            </span>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <GlowButton href="#projects" variant="gold">
              <ExternalLink size={16} /> View Projects
            </GlowButton>
            <GlowButton href="#contact" variant="outline">
              Contact Me
            </GlowButton>
            <GlowButton href="/cv-steve-tr.pdf" variant="navy" target="_blank" rel="noopener noreferrer">
              <Download size={16} /> CV
            </GlowButton>
          </motion.div>
        </div>

        {/* Right — Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative w-72 lg:w-80">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#00BCD4]/15 blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-[#1f3054]" style={{ aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                alt="Steeve Donald Compaore — Developer"
                width={480}
                height={600}
                className="w-full h-full object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 to-transparent" />
            </div>
            <FloatingBadge />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-[#4e5f82] uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} className="text-[#D4AF37]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
