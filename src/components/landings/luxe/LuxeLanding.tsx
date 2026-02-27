"use client";

import { LandingLayout } from "@/components/shared/LandingLayout";
import { LuxeHero } from "./LuxeHero";
import { ExcellenceSection } from "./ExcellenceSection";
import { LonginesCaseSection } from "./LonginesCaseSection";
import { ExpertiseSection } from "./ExpertiseSection";
import { RealisationsSection } from "./RealisationsSection";
import { ManifestoSection } from "./ManifestoSection";
import { LuxeCTA } from "./LuxeCTA";

const navLinks = [
  { label: "Excellence", href: "#excellence" },
  { label: "Cas Longines", href: "#longines" },
  { label: "Expertises", href: "#expertises" },
];

export function LuxeLanding() {
  return (
    <LandingLayout dark grain navLinks={navLinks}>
      <LuxeHero />
      <ExcellenceSection />
      <LonginesCaseSection />
      <ExpertiseSection />
      <RealisationsSection />
      <ManifestoSection />
      <LuxeCTA />
    </LandingLayout>
  );
}
