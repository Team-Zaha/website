"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LandingLayout } from "@/components/shared/LandingLayout";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";

const navLinks = [
  { label: "Compétences", href: "#competences" },
  { label: "Secteurs", href: "#secteurs" },
];

interface Competence {
  /* Formulé côté bénéfice client : c'est ce que les gens cherchent. */
  title: string;
  description: string;
  stack: string;
}

const competences: Competence[] = [
  {
    title: "Réalisez vos projets web les plus ambitieux",
    description:
      "Nos développeurs fullstack JavaScript conçoivent l'architecture de vos applications métier, du premier schéma jusqu'à la mise en production.",
    stack: "Architecture logicielle · React · Node.js · TypeScript",
  },
  {
    title: "Développez votre application web",
    description:
      "Que vous cherchiez à créer une application interactive ou à faire évoluer une existante, nos développeurs React et Next.js vous accompagnent.",
    stack: "React · Next.js · SSR · ISR · Design system",
  },
  {
    title: "Fiabilisez votre backend et vos APIs",
    description:
      "APIs robustes, microservices, traitements temps réel : une architecture pensée pour tenir la charge et rester maintenable dans la durée.",
    stack: "Node.js · REST · GraphQL · PostgreSQL",
  },
  {
    title: "Ajoutez des fonctionnalités sur mesure à votre boutique Shopify",
    description:
      "Applications Shopify, extensions de checkout, upsell, facturation : nous étendons votre boutique là où le thème s'arrête.",
    stack: "Shopify · Hydrogen · Extensions checkout",
  },
  {
    title: "Créez une expérience utilisateur mémorable",
    description:
      "Recherche utilisateur, wireframes, prototypage et design system. Une interface pensée pour la conversion, pas seulement pour la démo.",
    stack: "UX research · UI design · Design system",
  },
  {
    title: "Travaillez même là où le réseau ne passe pas",
    description:
      "Applications PWA offline-first, synchronisation bidirectionnelle et gestion de conflits pour vos équipes terrain en zone blanche.",
    stack: "PWA · Offline-first · Synchronisation",
  },
  {
    title: "Formez-vous ou formez votre équipe en React et JavaScript",
    description:
      "Nos développeurs séniors, dont un coach OpenClassrooms, transmettent les bonnes pratiques directement à vos équipes.",
    stack: "Formation · Revue de code · Pair programming",
  },
  {
    title: "Atteignez un public international",
    description:
      "Traduction de contenu et support client multilingue pour élargir votre marché sans dégrader la qualité de la relation client.",
    stack: "Espagnol · Anglais · Français",
  },
  {
    title: "Financez vos projets innovants",
    description:
      "Zaha est agréée Crédit Impôt Innovation : vos travaux de conception de logiciels innovants ouvrent droit à 20% de crédit d'impôt.",
    stack: "Agrément CII · Constitution du dossier",
  },
  {
    title: "Composez l'équipe qu'il vous faut",
    description:
      "Vous cherchez un profil précis ? Nous constituons une équipe sur mesure à partir du collectif, dimensionnée selon votre besoin réel.",
    stack: "Équipes sur mesure · 100% remote",
  },
];

const secteurs = [
  {
    href: "/industrie",
    title: "Industrie & zones blanches",
    description: "Des applications qui fonctionnent sans réseau.",
  },
  {
    href: "/luxe-ecommerce",
    title: "Luxe & e-commerce",
    description: "L'exigence du luxe appliquée à l'ingénierie web.",
  },
  {
    href: "/startup",
    title: "Startups & MVP",
    description: "De l'idée au produit, avec une base qui tient.",
  },
];

export function CompetencesLanding() {
  return (
    <LandingLayout grain navLinks={navLinks}>
      {/* Hero */}
      <SectionWrapper className="bg-zaha-white pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="text-hero font-bold tracking-tight text-zaha-black"
          >
            Nos compétences
          </motion.h1>
          <RevealOnScroll delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zaha-black/60 md:text-xl">
              Zaha rassemble des experts indépendants du web et du e-commerce.
              Vous trouverez ici nos compétences clés — si vous ne trouvez pas ce
              que vous cherchez, échangeons.
            </p>
          </RevealOnScroll>
        </div>
      </SectionWrapper>

      {/* Grille de compétences */}
      <SectionWrapper id="competences" className="bg-zaha-beige/30">
        <div className="grid gap-6 md:grid-cols-2">
          {competences.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-zaha-black/5 bg-zaha-white p-8 transition-shadow hover:shadow-lg">
                <h2 className="text-xl font-bold leading-snug tracking-tight text-zaha-black md:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-3 leading-relaxed text-zaha-black/60">
                  {item.description}
                </p>
                <p className="mt-5 text-sm font-medium text-zaha-green">
                  {item.stack}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </SectionWrapper>

      {/* Secteurs — maillage vers les landings dédiées */}
      <SectionWrapper id="secteurs" className="bg-zaha-white">
        <SplitText
          text="Nos expertises par secteur"
          tag="h2"
          className="text-section-title mb-12 font-bold tracking-tight text-zaha-black"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {secteurs.map((s, i) => (
            <RevealOnScroll key={s.href} delay={i * 0.1}>
              <Link
                href={s.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-zaha-black/10 p-8 transition-colors hover:border-zaha-green/40 hover:bg-zaha-beige/20"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zaha-black">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-zaha-black/60">
                    {s.description}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zaha-green">
                  Découvrir
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper dark>
        <div className="flex flex-col items-center text-center">
          <SplitText
            text="On travaille ensemble sur votre projet ?"
            tag="h2"
            className="text-section-title font-bold text-white"
          />
          <RevealOnScroll delay={0.3}>
            <p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
              Décrivez-nous votre besoin, nous composons l&apos;équipe qui y
              répond.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <MagneticButton
              href="/contact"
              className="mt-10 rounded-full bg-zaha-orange px-10 py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
            >
              Nous contacter
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </SectionWrapper>
    </LandingLayout>
  );
}
