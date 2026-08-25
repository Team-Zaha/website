import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  CONTACT_EMAIL,
  LINKEDIN_URL,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Zaha est un collectif d'experts indépendants en architecture logicielle et développement web avancé (React, Next.js, Node.js). Société agréée Crédit Impôt Innovation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zaha — Collectif d'experts React, Next.js & Node.js",
    template: "%s | Zaha",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Yann Lombard", url: LINKEDIN_URL }],
  creator: "Yann Lombard",
  publisher: SITE_NAME,
  keywords: [
    "architecture logicielle",
    "développement web",
    "React",
    "Next.js",
    "Node.js",
    "Shopify",
    "collectif de freelances",
    "Crédit Impôt Innovation",
    "CII",
    "Lyon",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    url: "/",
    title: "Zaha — Collectif d'experts React, Next.js & Node.js",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaha — Collectif d'experts React, Next.js & Node.js",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

/**
 * Données structurées : la source la plus fiable pour que les moteurs et les
 * LLM citent correctement l'identité, l'implantation et l'agrément de Zaha.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Zaha",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description: DESCRIPTION,
  foundingDate: "2020-07",
  founder: {
    "@type": "Person",
    name: "Yann Lombard",
    jobTitle: "Architecte logiciel, fondateur",
    sameAs: LINKEDIN_URL,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "138 avenue des Frères Lumière",
    postalCode: "69008",
    addressLocality: "Lyon",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Place", name: "Europe" },
  ],
  identifier: [
    { "@type": "PropertyValue", name: "SIREN", value: "887514982" },
    { "@type": "PropertyValue", name: "Code NAF", value: "6202A" },
  ],
  knowsAbout: [
    "Architecture logicielle",
    "Développement web React et Next.js",
    "Node.js et APIs",
    "Applications Shopify",
    "Applications web offline-first",
    "Crédit Impôt Innovation",
  ],
  sameAs: [LINKEDIN_URL],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT_EMAIL,
    availableLanguage: ["fr", "en", "es"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
