import type { Metadata } from "next";
import { ClientsLanding } from "@/components/landings/clients/ClientsLanding";

export const metadata: Metadata = {
  title: "Zaha — Experts React, Next.js & Node.js pour vos projets web",
  description:
    "Des equipes sur mesure, composees d'experts tries sur le volet, pour vos projets web les plus ambitieux. Agrement CII, jusqu'a 60% d'economie.",
};

export default function ClientsPage() {
  return <ClientsLanding />;
}
