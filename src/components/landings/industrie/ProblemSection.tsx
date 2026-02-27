"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

function AnimatedSignalLoss() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bars = [
    { height: 20, label: "1" },
    { height: 32, label: "2" },
    { height: 44, label: "3" },
    { height: 56, label: "4" },
  ];

  return (
    <div ref={ref} className="flex items-end justify-center gap-6 py-12 md:gap-10">
      {bars.map((bar, i) => {
        const shouldDisappear = isInView;
        const reverseIndex = bars.length - 1 - i;

        return (
          <div key={i} className="flex flex-col items-center gap-3">
            <motion.div
              className="w-8 rounded-sm md:w-12"
              style={{ backgroundColor: "var(--zaha-green)" }}
              initial={{ height: bar.height * 1.5, opacity: 1 }}
              animate={
                shouldDisappear
                  ? {
                      height: 6,
                      opacity: 0.12,
                      backgroundColor: "#333",
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: reverseIndex * 0.4 + 0.3,
                ease: [0.33, 1, 0.68, 1],
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function ProblemSection() {
  return (
    <SectionWrapper dark className="relative">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(45,90,61,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10">
        <RevealOnScroll>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zaha-green-light">
            {"Le problème"}
          </p>
        </RevealOnScroll>

        <AnimatedSignalLoss />

        <RevealOnScroll delay={0.6}>
          <h2
            className="text-section-title mx-auto max-w-4xl text-center font-bold text-white"
          >
            {"Vos équipes terrain ne devraient "}
            <span className="text-zaha-green-light">jamais</span>
            {" être bloquées par le réseau."}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.9}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-white/50">
            {"En zone blanche, chaque minute sans accès aux outils numériques coûte de la productivité, de la précision et de la sécurité."}
          </p>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
