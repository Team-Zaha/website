import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactLanding } from "@/components/landings/contact/ContactLanding";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Parlons de votre projet. Contactez Zaha pour construire votre équipe d'experts React, Next.js & Node.js sur mesure.",
  path: "/contact",
  ogTitle: "Contacter Zaha",
});

export default function ContactPage() {
  return <ContactLanding />;
}
