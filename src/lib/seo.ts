import type { Metadata } from "next";

/**
 * URL canonique du site. Surchargeable par NEXT_PUBLIC_SITE_URL
 * (utile pour les preview deployments Vercel).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://zaha.fr";

export const SITE_NAME = "Zaha";
export const SITE_LOCALE = "fr_FR";

export const CONTACT_EMAIL = "bonjour@zaha.fr";
export const LINKEDIN_URL = "https://www.linkedin.com/in/yann-lombard/";

export interface RouteInfo {
  path: string;
  label: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}

/** Source unique de vérité pour le sitemap, le footer et le menu mobile. */
export const ROUTES: RouteInfo[] = [
  { path: "/", label: "Accueil", priority: 1, changeFrequency: "monthly" },
  { path: "/clients", label: "Pour les clients", priority: 0.9, changeFrequency: "monthly" },
  { path: "/competences", label: "Nos compétences", priority: 0.9, changeFrequency: "monthly" },
  { path: "/credit-impot-innovation", label: "Crédit Impôt Innovation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rejoindre", label: "Rejoindre le collectif", priority: 0.8, changeFrequency: "monthly" },
  { path: "/a-propos", label: "À propos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industrie", label: "Industrie & zones blanches", priority: 0.7, changeFrequency: "monthly" },
  { path: "/luxe-ecommerce", label: "Luxe & e-commerce", priority: 0.7, changeFrequency: "monthly" },
  { path: "/startup", label: "Startups & MVP", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", label: "Contact", priority: 0.6, changeFrequency: "yearly" },
];

const route = (path: string): RouteInfo => {
  const found = ROUTES.find((r) => r.path === path);
  if (!found) throw new Error(`Route inconnue : ${path}`);
  return found;
};

/** Regroupement utilisé par le footer et le menu mobile. */
export const NAV_GROUPS: { title: string; links: RouteInfo[] }[] = [
  {
    title: "Expertises",
    links: [route("/competences"), route("/clients"), route("/credit-impot-innovation")],
  },
  {
    title: "Secteurs",
    links: [route("/industrie"), route("/luxe-ecommerce"), route("/startup")],
  },
  {
    title: "Le collectif",
    links: [route("/a-propos"), route("/rejoindre"), route("/contact")],
  },
];

/**
 * Image de partage générée par src/app/opengraph-image.tsx.
 * Déclarée explicitement : dès qu'une page définit son propre bloc `openGraph`,
 * Next ne lui transmet plus l'image du segment parent.
 */
const OG_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Zaha — Collectif d'experts React, Next.js & Node.js. Agréé Crédit Impôt Innovation.",
};

interface PageMetadataInput {
  /** `{ absolute }` court-circuite le template "%s | Zaha" du layout. */
  title: string | { absolute: string };
  description: string;
  path: string;
  /** Titre plus long pour les partages sociaux (défaut : title). */
  ogTitle?: string;
}

/**
 * Construit les metadata d'une page : canonical, Open Graph et Twitter Card
 * cohérents, sans avoir à les répéter dans chaque page.tsx.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
}: PageMetadataInput): Metadata {
  const socialTitle =
    ogTitle ?? (typeof title === "string" ? title : title.absolute);

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
