"use client";

import { LandingLayout } from "@/components/shared/LandingLayout";
import { HeroSection } from "./HeroSection";
import { WhyZahaSection } from "./WhyZahaSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { ClientLogosSection } from "./ClientLogosSection";
import { ServicesSection } from "./ServicesSection";
import { CIIBannerSection } from "./CIIBannerSection";
import { CTASection } from "./CTASection";

const navLinks = [
  { label: "Pourquoi Zaha", href: "#pourquoi-zaha" },
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
];

export function ClientsLanding() {
  return (
    <LandingLayout grain navLinks={navLinks}>
      <HeroSection />
      <WhyZahaSection />
      <ShowcaseSection />
      <ClientLogosSection />
      <ServicesSection />
      <CIIBannerSection />
      <CTASection />
    </LandingLayout>
  );
}
