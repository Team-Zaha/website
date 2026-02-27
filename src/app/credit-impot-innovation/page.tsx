import type { Metadata } from "next";
import { CIILanding } from "@/components/landings/cii/CIILanding";

export const metadata: Metadata = {
  title: "Cr\u00e9dit Imp\u00f4t Innovation | Zaha",
  description:
    "Votre projet logiciel innovant vous co\u00fbte jusqu\u2019\u00e0 60% moins cher. Zaha est agr\u00e9\u00e9 Cr\u00e9dit Imp\u00f4t Innovation. D\u00e9couvrez les taux, conditions et estimez vos \u00e9conomies.",
};

export default function CreditImpotInnovationPage() {
  return <CIILanding />;
}
