import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CIILanding } from "@/components/landings/cii/CIILanding";

export const metadata: Metadata = pageMetadata({
  title: "Crédit Impôt Innovation",
  description:
    "Votre projet logiciel innovant vous coûte 20% moins cher, et jusqu’à 60% en outre-mer. Zaha est agréé Crédit Impôt Innovation. Découvrez les taux, conditions et estimez vos économies.",
  path: "/credit-impot-innovation",
});

export default function CreditImpotInnovationPage() {
  return <CIILanding />;
}
