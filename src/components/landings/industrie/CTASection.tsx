"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ParallaxSection } from "@/components/shared/ParallaxSection";

export function CTASection() {
  return (
    <SectionWrapper dark fullHeight className="relative">
      {/* Green radial glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-zaha-green/6 blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45,90,61,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,90,61,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <ParallaxSection speed={0.15}>
          <RevealOnScroll>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-zaha-green-light">
              {"Passez à l'action"}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <h2 className="text-section-title mx-auto mb-6 max-w-3xl font-bold text-white">
              {"Demandez une démo terrain"}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <p className="mx-auto mb-12 max-w-xl text-lg text-white/40">
              {"Découvrez comment nos solutions offline-first transforment les opérations industrielles en zone blanche."}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.45}>
            <MagneticButton
              href="/contact"
              className="rounded-full bg-zaha-green px-10 py-4 text-base font-semibold text-white transition-all hover:bg-zaha-green-light hover:shadow-[0_0_40px_rgba(45,90,61,0.3)]"
            >
              {"Planifier une démo"}
            </MagneticButton>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <p className="mt-8 text-sm text-white/25">
              {"Démonstration gratuite \u00B7 Sans engagement \u00B7 Réponse sous 24h"}
            </p>
          </RevealOnScroll>
        </ParallaxSection>
      </div>
    </SectionWrapper>
  );
}
