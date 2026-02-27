import type { Metadata } from "next";
import { ContactLanding } from "@/components/landings/contact/ContactLanding";

export const metadata: Metadata = {
  title: "Contact — Zaha",
  description:
    "Parlons de votre projet. Contactez Zaha pour construire votre equipe d'experts React, Next.js & Node.js sur mesure.",
};

export default function ContactPage() {
  return <ContactLanding />;
}
