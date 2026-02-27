import type { Metadata } from "next";
import { RejoindreLanding } from "@/components/landings/rejoindre/RejoindreLanding";

export const metadata: Metadata = {
  title: "Rejoindre Zaha — Collectif de freelances",
  description:
    "Rejoins un collectif où ton talent n'a pas de frontières. Des missions de qualité, un cadre humain, zéro paperasse.",
};

export default function RejoindrePage() {
  return <RejoindreLanding />;
}
