"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface Phase {
  number: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const phases: Phase[] = [
  {
    number: "01",
    title: "Cadrage & Architecture",
    duration: "1-2 semaines",
    description:
      "Choix de stack, architecture scalable, specs fonctionnelles. On pose des fondations solides.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: "var(--zaha-green)",
  },
  {
    number: "02",
    title: "Build",
    duration: "4-8 semaines",
    description:
      "Sprints courts, demos hebdo, iteration rapide. Vous voyez le produit evoluer en temps reel.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
    color: "var(--zaha-orange)",
  },
  {
    number: "03",
    title: "Launch & Iterate",
    duration: "En continu",
    description:
      "Deploiement, monitoring, iterations utilisateurs. Le produit vit et s'ameliore.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
    color: "var(--zaha-green-light)",
  },
];

export function ApprocheMVPSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressWidth = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);
  const progressWidthPercent = useTransform(progressWidth, (v) => `${v}%`);

  return (
    <SectionWrapper id="approche" dark className="relative">
      <div ref={sectionRef}>
        <RevealOnScroll>
          <h2 className="text-section-title mb-4 font-bold tracking-tight">
            Notre approche MVP
          </h2>
          <p className="mb-16 max-w-xl text-lg text-white/60">
            Un processus eprouve pour aller vite sans sacrifier la qualite.
          </p>
        </RevealOnScroll>

        {/* Progress bar */}
        <div className="mb-16 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: progressWidthPercent,
              background:
                "linear-gradient(to right, var(--zaha-green), var(--zaha-orange))",
            }}
          />
        </div>

        {/* Timeline phases */}
        <div className="grid gap-8 md:grid-cols-3">
          {phases.map((phase, i) => (
            <RevealOnScroll key={phase.number} delay={i * 0.15}>
              <motion.div
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                whileHover={{ y: -4 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                {/* Phase number */}
                <span
                  className="mb-4 block font-mono text-sm font-bold"
                  style={{ color: phase.color }}
                >
                  {phase.number}
                </span>

                {/* Icon */}
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${phase.color} 15%, transparent)`,
                    color: phase.color,
                  }}
                >
                  {phase.icon}
                </div>

                {/* Content */}
                <h3 className="mb-1 text-xl font-bold text-white">
                  {phase.title}
                </h3>
                <span
                  className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${phase.color} 15%, transparent)`,
                    color: phase.color,
                  }}
                >
                  {phase.duration}
                </span>
                <p className="text-sm leading-relaxed text-white/60">
                  {phase.description}
                </p>

                {/* Connector line (not on last) */}
                {i < phases.length - 1 && (
                  <div className="pointer-events-none absolute -right-4 top-1/2 hidden h-px w-8 bg-white/20 md:block" />
                )}
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
