"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface ComparisonRow {
  feature: string;
  zaha: boolean | string;
  ermeo: boolean | string;
  safety: boolean | string;
}

const rows: ComparisonRow[] = [
  { feature: "Mode offline complet", zaha: true, ermeo: false, safety: false },
  { feature: "PWA native", zaha: true, ermeo: false, safety: true },
  { feature: "Arbres conditionnants", zaha: true, ermeo: false, safety: false },
  { feature: "Multi-tenant isolé", zaha: true, ermeo: true, safety: true },
  { feature: "Processus en 3 phases", zaha: true, ermeo: false, safety: false },
  { feature: "Déploiement en heures", zaha: true, ermeo: false, safety: false },
  { feature: "Formation < 2h", zaha: true, ermeo: false, safety: false },
];

function CheckMark({ active, delay }: { active: boolean; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex items-center justify-center">
      {active ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay, duration: 0.4, type: "spring", stiffness: 300 }}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="var(--zaha-green-light)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: delay + 0.2, duration: 0.4 }}
            />
          </svg>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.4 } : {}}
          transition={{ delay, duration: 0.3 }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

export function ComparisonSection() {
  return (
    <SectionWrapper dark className="relative">
      <div className="relative z-10">
        <RevealOnScroll>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zaha-green-light">
            vs. la concurrence
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <h2 className="text-section-title mx-auto mb-16 max-w-3xl text-center font-bold text-white">
            {"Ce qui nous différencie"}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/5">
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-white/5 bg-white/[0.03]">
              <div className="p-4 text-sm font-medium text-white/40">
                {"Fonctionnalité"}
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-bold text-zaha-green-light">
                  Zaha
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-medium text-white/40">
                  Causeway Ermeo
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-medium text-white/40">
                  Safety Culture
                </span>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 ${
                  i < rows.length - 1 ? "border-b border-white/5" : ""
                } transition-colors hover:bg-white/[0.02]`}
              >
                <div className="flex items-center p-4 text-sm text-white/60">
                  {row.feature}
                </div>
                <div className="p-4">
                  <CheckMark
                    active={row.zaha === true}
                    delay={i * 0.08}
                  />
                </div>
                <div className="p-4">
                  <CheckMark
                    active={row.ermeo === true}
                    delay={i * 0.08 + 0.05}
                  />
                </div>
                <div className="p-4">
                  <CheckMark
                    active={row.safety === true}
                    delay={i * 0.08 + 0.1}
                  />
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
