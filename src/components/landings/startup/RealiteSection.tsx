"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";

export function RealiteSection() {
  return (
    <SectionWrapper id="realite" dark className="relative">
      {/* Subtle accent */}
      <div className="pointer-events-none absolute -right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-zaha-orange/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SplitText
          text="On connait votre realite"
          tag="h2"
          className="text-section-title mb-12 font-bold tracking-tight"
          staggerChildren={0.04}
        />

        <SplitText
          text="Budget serre. Deadline hier. Besoin de prouver le concept avant le prochain board."
          tag="p"
          className="mb-8 text-xl font-light leading-relaxed text-white/80 md:text-2xl lg:text-3xl"
          staggerChildren={0.025}
          delay={0.3}
        />

        <SplitText
          text="On est passes par la. On a cree Feel Food, notre propre startup. On connait la pression, les pivots, les nuits blanches."
          tag="p"
          className="text-lg font-light leading-relaxed text-white/60 md:text-xl lg:text-2xl"
          staggerChildren={0.02}
          delay={0.6}
        />
      </div>
    </SectionWrapper>
  );
}
