"use client";

import { LandingLayout } from "@/components/shared/LandingLayout";
import { HeroRejoindre } from "./HeroRejoindre";
import { ManifesteSection } from "./ManifesteSection";
import { ServicesTimeline } from "./ServicesTimeline";
import { PetitsPlusSection } from "./PetitsPlusSection";
import { EquipeSection } from "./EquipeSection";
import { StepperSection } from "./StepperSection";
import { ContactSection } from "./ContactSection";

const navLinks = [
  { label: "Manifeste", href: "#manifeste" },
  { label: "Services", href: "#services" },
  { label: "Équipe", href: "#equipe" },
  { label: "Rejoindre", href: "#rejoindre" },
];

export function RejoindreLanding() {
  return (
    <LandingLayout grain navLinks={navLinks}>
      <HeroRejoindre />
      <ManifesteSection />
      <ServicesTimeline />
      <PetitsPlusSection />
      <EquipeSection />
      <StepperSection />
      <ContactSection />
    </LandingLayout>
  );
}
