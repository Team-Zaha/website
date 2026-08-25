import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { IndustrieLanding } from "@/components/landings/industrie/IndustrieLanding";

export const metadata: Metadata = pageMetadata({
  title: "Industrie & zones blanches",
  description:
    "Des applications web qui fonctionnent même là où le réseau ne passe pas. L'innovation offline-first pour l'industrie.",
  path: "/industrie",
  ogTitle: "Industrie & zones blanches — L'innovation offline-first",
});

export default function IndustriePage() {
  return <IndustrieLanding />;
}
