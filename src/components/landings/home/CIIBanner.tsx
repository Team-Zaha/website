"use client";

import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export function CIIBanner() {
  return (
    <section
      className="relative overflow-hidden bg-zaha-green px-6 py-20 md:px-12 md:py-28 lg:px-24"
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:text-left lg:gap-16">
          {/* Left: big number */}
          <RevealOnScroll direction="left">
            <div className="relative flex-shrink-0">
              {/* Cercles concentriques centrés sur le bloc */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] md:h-[400px] md:w-[400px]" />
                <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] md:h-[620px] md:w-[620px]" />
                <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] md:h-[840px] md:w-[840px]" />
              </div>
              <div className="tabular-nums" style={{ minWidth: "3.5ch" }}>
                <AnimatedCounter
                  target={20}
                  suffix="%"
                  className="text-7xl font-bold text-white md:text-8xl lg:text-9xl"
                />
              </div>
              <p className="mt-2 text-lg font-medium text-white/70">
                d&apos;&eacute;conomie
              </p>
            </div>
          </RevealOnScroll>

          {/* Right: content */}
          <RevealOnScroll direction="right" delay={0.2}>
            <div>
              <div className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80">
                Agr&eacute;ment CII
              </div>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                R&eacute;cup&eacute;rez 20% du co&ucirc;t de votre projet innovant
              </h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                Gr&acirc;ce au Cr&eacute;dit Imp&ocirc;t Innovation, vos projets de
                d&eacute;veloppement deviennent un investissement fiscal avantageux.
                Taux port&eacute; &agrave; 35&nbsp;&agrave;&nbsp;40% en Corse et 60% en
                outre-mer. Nous vous accompagnons dans la constitution du dossier.
              </p>
              <MagneticButton
                href="/credit-impot-innovation"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-zaha-green transition-colors hover:bg-zaha-beige"
              >
                En savoir plus sur le CII
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
