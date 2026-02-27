"use client";

import { LandingLayout } from "@/components/shared/LandingLayout";
import { HeroHome } from "./HeroHome";
import { ManifestoSection } from "./ManifestoSection";
import { ServicesGrid } from "./ServicesGrid";
import { ProjectsShowcase } from "./ProjectsShowcase";
import { ClientLogos } from "./ClientLogos";
import { CIIBanner } from "./CIIBanner";
import { CTADual } from "./CTADual";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "CII", href: "#cii" },
];

export function HomeLanding() {
  return (
    <LandingLayout dark grain navLinks={navLinks}>
      <HeroHome />
      <ManifestoSection />
      <div id="services">
        <ServicesGrid />
      </div>
      <ProjectsShowcase />
      <ClientLogos />
      <div id="cii">
        <CIIBanner />
      </div>
      <CTADual />
    </LandingLayout>
  );
}
