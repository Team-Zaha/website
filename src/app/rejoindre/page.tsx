import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { RejoindreLanding } from "@/components/landings/rejoindre/RejoindreLanding";

export const metadata: Metadata = pageMetadata({
  title: "Rejoindre le collectif Zaha",
  description:
    "Rejoins un collectif où ton talent n'a pas de frontières. Des missions de qualité, un cadre humain, zéro paperasse.",
  path: "/rejoindre",
  ogTitle: "Rejoindre Zaha — Collectif de freelances",
});

export default function RejoindrePage() {
  return <RejoindreLanding />;
}
