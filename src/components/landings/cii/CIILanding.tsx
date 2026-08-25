"use client";

import { LandingLayout } from "@/components/shared/LandingLayout";
import { HeroSection } from "./HeroSection";
import { CommentCaMarcheSection } from "./CommentCaMarcheSection";
import { EligibiliteSection } from "./EligibiliteSection";
import { CasConcretSection } from "./CasConcretSection";
import { CalculateurSection } from "./CalculateurSection";
import { FaqCII } from "./FaqCII";
import { CTASection } from "./CTASection";

const navLinks = [
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Éligibilité", href: "#eligibilite" },
  { label: "Cas concret", href: "#cas-concret" },
  { label: "Calculateur", href: "#calculateur" },
];

export function CIILanding() {
  return (
    <LandingLayout dark grain navLinks={navLinks}>
      <HeroSection />
      <CommentCaMarcheSection />
      <EligibiliteSection />
      <CasConcretSection />
      <CalculateurSection />
      <FaqCII />
      <CTASection />
    </LandingLayout>
  );
}
