import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ClientsLanding } from "@/components/landings/clients/ClientsLanding";

export const metadata: Metadata = pageMetadata({
  title: "Équipes React, Next.js & Node.js sur mesure",
  description:
    "Des équipes sur mesure, composées d'experts triés sur le volet, pour vos projets web les plus ambitieux. Agrément CII : 20% d'économie sur vos projets innovants.",
  path: "/clients",
});

export default function ClientsPage() {
  return <ClientsLanding />;
}
