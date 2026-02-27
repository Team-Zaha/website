"use client";

import { LandingLayout } from "@/components/shared/LandingLayout";
import { HeroSection } from "./HeroSection";
import { RealiteSection } from "./RealiteSection";
import { ApprocheMVPSection } from "./ApprocheMVPSection";
import { StackSection } from "./StackSection";
import { BonusCIISection } from "./BonusCIISection";
import { ProjectsSection } from "./ProjectsSection";
import { ComparisonSection } from "./ComparisonSection";
import { CTASection } from "./CTASection";

const navLinks = [
  { label: "Approche", href: "#approche" },
  { label: "Stack", href: "#stack" },
  { label: "Projets", href: "#projets" },
  { label: "CII", href: "#bonus-cii" },
];

export function StartupLanding() {
  return (
    <LandingLayout dark navLinks={navLinks}>
      <HeroSection />
      <RealiteSection />
      <ApprocheMVPSection />
      <StackSection />
      <BonusCIISection />
      <ProjectsSection />
      <ComparisonSection />
      <CTASection />
    </LandingLayout>
  );
}
