"use client";

import { LandingLayout } from "@/components/shared/LandingLayout";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { SolutionSection } from "./SolutionSection";
import { ResultsSection } from "./ResultsSection";
import { SectorsSection } from "./SectorsSection";
import { ComparisonSection } from "./ComparisonSection";
import { CTASection } from "./CTASection";

const navLinks = [
  { label: "Solution", href: "#solution" },
  { label: "Résultats", href: "#resultats" },
  { label: "Secteurs", href: "#secteurs" },
];

export function IndustrieLanding() {
  return (
    <LandingLayout dark grain navLinks={navLinks}>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ResultsSection />
      <SectorsSection />
      <ComparisonSection />
      <CTASection />
    </LandingLayout>
  );
}
