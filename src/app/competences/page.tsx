import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CompetencesLanding } from "@/components/landings/competences/CompetencesLanding";

export const metadata: Metadata = pageMetadata({
  title: "Nos compétences",
  description:
    "Architecture logicielle, React, Next.js, Node.js, Shopify, UX, offline-first, formation. Les compétences clés du collectif Zaha, au service de vos projets web et e-commerce.",
  path: "/competences",
  ogTitle: "Nos compétences — Architecture logicielle & développement web",
});

export default function CompetencesPage() {
  return <CompetencesLanding />;
}
