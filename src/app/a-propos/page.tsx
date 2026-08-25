import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AProposLanding } from "@/components/landings/apropos/AProposLanding";

export const metadata: Metadata = pageMetadata({
  title: "À propos",
  description:
    "Fondée en 2020 par Yann Lombard, Zaha est un collectif d'experts indépendants en architecture logicielle et développement web. Notre histoire, notre manifeste et notre équipe.",
  path: "/a-propos",
  ogTitle: "À propos de Zaha — Le collectif, son histoire et son manifeste",
});

export default function AProposPage() {
  return <AProposLanding />;
}
