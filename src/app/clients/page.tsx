import type { Metadata } from "next";
import { ClientsLanding } from "@/components/landings/clients/ClientsLanding";

export const metadata: Metadata = {
  title: "Zaha — Experts React, Next.js & Node.js pour vos projets web",
  description:
    "Des équipes sur mesure, composées d'experts triés sur le volet, pour vos projets web les plus ambitieux. Agrément CII : 20% d'économie sur vos projets innovants.",
};

export default function ClientsPage() {
  return <ClientsLanding />;
}
