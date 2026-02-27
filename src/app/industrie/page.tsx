import type { Metadata } from "next";
import { IndustrieLanding } from "@/components/landings/industrie/IndustrieLanding";

export const metadata: Metadata = {
  title: "Industrie & Zones Blanches | Zaha",
  description:
    "Des applications web qui fonctionnent même là où le réseau ne passe pas. L'innovation offline-first pour l'industrie.",
};

export default function IndustriePage() {
  return <IndustrieLanding />;
}
