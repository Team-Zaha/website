import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { StartupLanding } from "@/components/landings/startup/StartupLanding";

export const metadata: Metadata = pageMetadata({
  title: "Startups & MVP",
  description:
    "De l'idée au produit en un temps record. Architecture scalable, stack moderne, accompagnement startup. Récupérez 20% du coût de votre MVP avec le CII.",
  path: "/startup",
});

export default function StartupPage() {
  return <StartupLanding />;
}
