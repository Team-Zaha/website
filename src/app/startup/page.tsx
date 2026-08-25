import type { Metadata } from "next";
import { StartupLanding } from "@/components/landings/startup/StartupLanding";

export const metadata: Metadata = {
  title: "Startups & MVP | Zaha",
  description:
    "De l'idée au produit en un temps record. Architecture scalable, stack moderne, accompagnement startup. Récupérez 20% du coût de votre MVP avec le CII.",
};

export default function StartupPage() {
  return <StartupLanding />;
}
