"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const AGENTS = [
  { name: "Gmail", icon: "✉️", color: "#EA4335", angle: 0 },
  { name: "GitHub", icon: "🐙", color: "#9ba8c4", angle: 45 },
  { name: "Vercel", icon: "▲", color: "#ffffff", angle: 90 },
  { name: "Notion", icon: "📝", color: "#e8e3d5", angle: 135 },
  { name: "Supabase", icon: "⚡", color: "#3ECF8E", angle: 180 },
  { name: "Slack", icon: "💬", color: "#4A154B", angle: 225 },
  { name: "Ollama", icon: "🦙", color: "#22d98a", angle: 270 },
  { name: "Linear", icon: "📊", color: "#5E6AD2", angle: 315 },
];

function getPos(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: radius * Math.cos(rad), y: radius * Math.sin(rad) };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function AISystem() {
  const t = useTranslations("ai");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const radius = 160;
  const cx = 200;
  const cy = 200;
  const viewSize = 400;

  return (
    <section id="ai" ref={ref} className="py-32 bg-bg dark:bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="font-mono text-xs text-gold uppercase tracking-[0.3em] mb-2">
            {t("sectionNum")}
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-playfair text-5xl md:text-6xl font-bold italic text-text-primary">
            {t("sectionTitle")}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 font-outfit text-text-primary-2 max-w-xl">
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="relative" style={{ width: viewSize, height: viewSize }}>
            <svg
              width={viewSize}
              height={viewSize}
              viewBox={`0 0 ${viewSize} ${viewSize}`}
              className="absolute inset-0"
            >
              {/* Connection lines */}
              {AGENTS.map((agent, i) => {
                const pos = getPos(agent.angle, radius);
                return (
                  <motion.line
                    key={agent.name}
                    x1={cx}
                    y1={cy}
                    x2={cx + pos.x}
                    y2={cy + pos.y}
                    stroke={agent.color}
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
                  />
                );
              })}

              {/* Pulse dots on lines */}
              {AGENTS.map((agent) => {
                const pos = getPos(agent.angle, radius);
                return (
                  <motion.circle
                    key={`pulse-${agent.name}`}
                    r="3"
                    fill={agent.color}
                    animate={{
                      cx: [cx, cx + pos.x],
                      cy: [cy, cy + pos.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                      ease: "linear" as const,
                    }}
                  />
                );
              })}
            </svg>

            {/* Central hub */}
            <motion.div
              className="absolute"
              style={{
                left: cx - 56,
                top: cy - 56,
                width: 112,
                height: 112,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" as const }}
            >
              <div className="w-full h-full rounded-full border border-gold/20" />
            </motion.div>

            <div
              className="absolute flex flex-col items-center justify-center rounded-full border-2 border-gold/50 bg-bg-2 shadow-[0_0_40px_rgba(240,168,50,0.2)]"
              style={{
                left: cx - 48,
                top: cy - 48,
                width: 96,
                height: 96,
              }}
            >
              <span className="text-2xl">🧠</span>
              <span className="font-playfair text-xs font-bold text-gold italic">{t("hub")}</span>
              <span className="font-mono text-[9px] text-text-primary-3 uppercase tracking-wider">{t("hubSub")}</span>
            </div>

            {/* Agent nodes */}
            {AGENTS.map((agent, i) => {
              const pos = getPos(agent.angle, radius);
              const isOllama = agent.name === "Ollama";
              return (
                <motion.div
                  key={agent.name}
                  className={`absolute flex flex-col items-center justify-center rounded-2xl border bg-bg-2 shadow-lg p-2 ${
                    isOllama ? "border-accent-green" : "border-border-2"
                  }`}
                  style={{
                    left: cx + pos.x - 36,
                    top: cy + pos.y - 36,
                    width: 72,
                    height: 72,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  whileHover={{ scale: 1.1, borderColor: agent.color }}
                >
                  <span className="text-xl">{agent.icon}</span>
                  <span className="font-mono text-[9px] text-text-primary-2 mt-0.5 uppercase tracking-wide">
                    {agent.name}
                  </span>
                  {isOllama && (
                    <span className="font-mono text-[8px] text-accent-green uppercase tracking-wider">local</span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Ollama badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-8"
        >
          <div className="inline-flex items-center gap-2 border border-accent-green/40 bg-accent-green/5 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-mono text-xs text-accent-green uppercase tracking-widest">{t("ollamaLabel")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
