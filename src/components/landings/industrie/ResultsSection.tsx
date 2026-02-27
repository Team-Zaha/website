"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

interface KPI {
  label: string;
  before: string;
  target: number;
  suffix: string;
  prefix?: string;
  detail: string;
}

const kpis: KPI[] = [
  {
    label: "Temps de collecte",
    before: "45 min",
    target: 15,
    suffix: " min",
    detail: "-66%",
  },
  {
    label: "Accès aux données",
    before: "1h - 3 jours",
    target: 0,
    suffix: "",
    prefix: "",
    detail: "Instantané",
  },
  {
    label: "Pertes de données",
    before: "Fréquentes",
    target: 0,
    suffix: "",
    detail: "Zéro perte",
  },
  {
    label: "Uptime terrain",
    before: "Variable",
    target: 100,
    suffix: "%",
    detail: "Sur 62 jours",
  },
  {
    label: "Formation",
    before: "Jours",
    target: 2,
    suffix: "h",
    detail: "Maximum",
  },
];

export function ResultsSection() {
  return (
    <SectionWrapper dark id="resultats" className="relative">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2">
        <div className="h-[400px] w-[800px] rounded-full bg-zaha-green/3 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <RevealOnScroll>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zaha-green-light">
            {"Résultats mesurés"}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <h2 className="text-section-title mx-auto mb-6 max-w-3xl text-center font-bold text-white">
            {"Des performances vérifiées sur le terrain"}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="mx-auto mb-16 max-w-xl text-center text-white/40">
            {"Données issues de déploiements réels en conditions industrielles."}
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {kpis.map((kpi, i) => (
            <RevealOnScroll key={kpi.label} delay={i * 0.1}>
              <div className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-zaha-green/20 hover:bg-white/[0.04]">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-zaha-green/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/30">
                  {kpi.before}
                </p>

                <div className="my-3">
                  {kpi.label === "Accès aux données" ? (
                    <span className="text-4xl font-bold text-zaha-green-light md:text-5xl">
                      {"<1"}<span className="text-2xl">s</span>
                    </span>
                  ) : (
                    <AnimatedCounter
                      target={kpi.target}
                      suffix={kpi.suffix}
                      prefix={kpi.prefix}
                      className="text-4xl font-bold text-zaha-green-light md:text-5xl"
                      duration={2.5}
                    />
                  )}
                </div>

                <p className="text-sm font-medium text-white/70">{kpi.label}</p>
                <p className="mt-1 text-xs text-zaha-green-light/70">
                  {kpi.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
