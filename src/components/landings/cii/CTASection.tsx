"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { ParallaxSection } from "@/components/shared/ParallaxSection";

export function CTASection() {
  return (
    <SectionWrapper id="cta" dark fullHeight>
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-zaha-green/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-zaha-orange/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <ParallaxSection speed={0.15}>
          <div className="flex flex-col items-center">
            <SplitText
              text="Estimez vos économies avec un expert"
              tag="h2"
              className="text-section-title font-bold text-white"
            />

            <RevealOnScroll delay={0.3}>
              <p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
                Notre équipe vous accompagne pour déterminer votre éligibilité et maximiser votre crédit d&#39;impôt innovation.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.5}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <MagneticButton
                  href="/contact"
                  className="rounded-full bg-zaha-green px-10 py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
                >
                  Prendre rendez-vous
                </MagneticButton>
                <MagneticButton
                  href="#calculateur"
                  className="rounded-full border border-white/20 bg-transparent px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-white/5"
                >
                  Simuler mon crédit
                </MagneticButton>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.7}>
              <p className="mt-8 text-sm text-white/30">
                Zaha — Société agréée Crédit Impôt Innovation
              </p>
            </RevealOnScroll>
          </div>
        </ParallaxSection>
      </div>
    </SectionWrapper>
  );
}
