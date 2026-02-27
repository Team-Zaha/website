"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { ParallaxSection } from "@/components/shared/ParallaxSection";

export function ManifesteSection() {
  return (
    <SectionWrapper id="manifeste" className="bg-zaha-beige/30">
      <ParallaxSection speed={0.15}>
        <div className="mx-auto max-w-4xl py-12 md:py-20">
          <SplitText
            text="Nous croyons que les talents ne se trouvent pas uniquement dans les grandes villes. Avec le travail à distance, des freelances incroyables nichés en campagne ou loin des centres urbains ont désormais l'opportunité de briller."
            tag="h2"
            className="text-section-title font-semibold leading-snug tracking-tight text-zaha-black"
            staggerChildren={0.025}
          />
        </div>
      </ParallaxSection>
    </SectionWrapper>
  );
}
