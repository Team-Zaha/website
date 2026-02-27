"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";

export function ManifestoSection() {
  return (
    <SectionWrapper className="bg-zaha-white" fullHeight>
      <div className="flex items-center justify-center py-12 md:py-20">
        <div className="max-w-[55rem]">
          <SplitText
            text="Nous sommes un collectif d'experts indépendants. Pas une agence. Pas une ESN classique. Un réseau de talents séniors, sélectionnés pour leurs qualités humaines et leur recherche de l'excellence technique."
            tag="h2"
            className="text-section-title font-bold leading-snug tracking-tight text-zaha-black"
            staggerChildren={0.02}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
