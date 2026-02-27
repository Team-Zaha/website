"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ParallaxSection } from "@/components/shared/ParallaxSection";

const kpis = [
  {
    value: 66,
    suffix: "%",
    label: "Temps de collecte réduit",
    detail: "De 45 min à 15 min",
  },
  {
    value: 100,
    suffix: "%",
    label: "Uptime",
    detail: "Disponibilité permanente",
  },
  {
    value: 0,
    suffix: "",
    label: "Pertes de données",
    detail: "Zéro perte constatée",
    prefix: "",
    displayRaw: "0",
  },
  {
    value: 2,
    suffix: "h",
    label: "Formation",
    detail: "Prise en main rapide",
  },
];

const secteurs = [
  "Gazière",
  "Minière",
  "Extraction",
  "Manufacture",
  "Agriculture",
];

export function CasConcretSection() {
  return (
    <SectionWrapper id="cas-concret" dark>
      <div className="mb-16">
        <RevealOnScroll>
          <span className="mb-4 inline-block rounded-full bg-zaha-orange/10 px-4 py-1.5 text-sm font-semibold text-zaha-orange">
            Cas concret
          </span>
        </RevealOnScroll>
        <SplitText
          text="LEILA — Plateforme SaaS d'intelligence industrielle"
          tag="h2"
          className="text-section-title font-bold text-white"
        />
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: context */}
        <div>
          <RevealOnScroll direction="left">
            <div className="space-y-6">
              {/* Client info card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zaha-orange">
                    <span className="text-lg font-bold text-white">L</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Leila</h3>
                    <p className="text-sm text-white/50">
                      Guyane française — Taux CII : 60%
                    </p>
                  </div>
                </div>
                <p className="leading-relaxed text-white/70">
                  Plateforme SaaS d&#39;intelligence industrielle conçue pour les PME en zones blanches. Collecte, analyse et visualisation de données industrielles en temps réel, même sans connexion internet stable.
                </p>
              </div>

              {/* Secteurs */}
              <ParallaxSection speed={0.1}>
                <div>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/40">
                    Secteurs d&#39;application
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {secteurs.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </ParallaxSection>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right: KPIs */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            {kpis.map((kpi, i) => (
              <RevealOnScroll key={kpi.label} delay={i * 0.1} direction="up">
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-zaha-green/30 hover:bg-zaha-green/5">
                  <div className="mb-2">
                    {kpi.displayRaw !== undefined ? (
                      <span className="text-4xl font-black text-zaha-green md:text-5xl">
                        {kpi.displayRaw}
                      </span>
                    ) : (
                      <AnimatedCounter
                        target={kpi.value}
                        suffix={kpi.suffix}
                        prefix={kpi.prefix}
                        className="text-4xl font-black text-zaha-green md:text-5xl"
                      />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{kpi.label}</h4>
                  <p className="mt-1 text-xs text-white/40">{kpi.detail}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Highlight */}
          <RevealOnScroll delay={0.5}>
            <div className="mt-6 rounded-2xl border border-zaha-green/20 bg-zaha-green/5 p-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-zaha-green">
                  60%
                </span>
                <div>
                  <p className="text-sm font-bold text-white">
                    de crédit d&#39;impôt applicable
                  </p>
                  <p className="text-xs text-white/50">
                    Localisation Guyane française (Outre-mer)
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </SectionWrapper>
  );
}
