import type { Metadata } from "next";
import { HomeLanding } from "@/components/landings/home/HomeLanding";

export const metadata: Metadata = {
  title: "Zaha — Collectif d'experts React, Next.js & Node.js",
  description:
    "Architecture logicielle, développement web avancé & produits Shopify. Un collectif d'experts séniors pour vos projets les plus ambitieux. Agréé Crédit Impôt Innovation.",
};

export default function Home() {
  return <HomeLanding />;
}
