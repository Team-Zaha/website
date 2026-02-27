"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface ComparisonRow {
  label: string;
  agence: string;
  zaha: string;
  agenceLevel: number; // 0-100
  zahaLevel: number; // 0-100
}

const comparisons: ComparisonRow[] = [
  {
    label: "Tarifs",
    agence: "Elevees",
    zaha: "Tarif freelance",
    agenceLevel: 90,
    zahaLevel: 40,
  },
  {
    label: "Flexibilite",
    agence: "Rigide",
    zaha: "Sur mesure",
    agenceLevel: 25,
    zahaLevel: 95,
  },
  {
    label: "Interlocuteurs",
    agence: "Multiples",
    zaha: "Expert direct",
    agenceLevel: 30,
    zahaLevel: 90,
  },
  {
    label: "Seniorite",
    agence: "Juniors caches",
    zaha: "Seniors uniquement",
    agenceLevel: 25,
    zahaLevel: 100,
  },
];

export function ComparisonSection() {
  return (
    <SectionWrapper id="collectif" dark className="relative">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-zaha-green/8 blur-[150px]" />

      <div className="relative z-10">
        <RevealOnScroll>
          <h2 className="text-section-title mb-4 font-bold tracking-tight">
            Collectif &gt; Agence
          </h2>
          <p className="mb-16 max-w-xl text-lg text-white/60">
            Pourquoi un collectif de seniors bat une agence traditionnelle.
          </p>
        </RevealOnScroll>

        <div className="mx-auto max-w-4xl space-y-8">
          {comparisons.map((row, i) => (
            <RevealOnScroll key={row.label} delay={i * 0.1}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
                <h3 className="mb-6 text-lg font-bold text-white">
                  {row.label}
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Agence */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-white/40">
                        Agence classique
                      </span>
                      <span className="text-sm font-medium text-white/60">
                        {row.agence}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-white/30"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.agenceLevel}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1 + 0.3,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                      />
                    </div>
                  </div>

                  {/* Zaha */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-zaha-green">
                        Zaha
                      </span>
                      <span className="text-sm font-bold text-zaha-green">
                        {row.zaha}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(to right, var(--zaha-green), var(--zaha-orange))",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.zahaLevel}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1 + 0.3,
                          ease: [0.33, 1, 0.68, 1],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
