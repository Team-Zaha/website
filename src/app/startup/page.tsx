import type { Metadata } from "next";
import { StartupLanding } from "@/components/landings/startup/StartupLanding";

export const metadata: Metadata = {
  title: "Startups & MVP | Zaha",
  description:
    "De l'idee au produit en un temps record. Architecture scalable, stack moderne, accompagnement startup. Recuperez jusqu'a 60% avec le CII.",
};

export default function StartupPage() {
  return <StartupLanding />;
}
