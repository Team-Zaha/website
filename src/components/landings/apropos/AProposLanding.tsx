"use client";

import { motion } from "framer-motion";
import { LandingLayout } from "@/components/shared/LandingLayout";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { EquipeSection } from "@/components/landings/rejoindre/EquipeSection";

const navLinks = [
  { label: "Histoire", href: "#histoire" },
  { label: "Manifeste", href: "#manifeste" },
  { label: "Équipe", href: "#equipe" },
];

const histoire = [
  "Zaha est une société de services du numérique fondée en juillet 2020 par Yann Lombard, ingénieur web avec plus de 18 ans d'expérience.",
  "Notre conviction est que les talents ne se trouvent pas uniquement dans les grandes villes. Avec le travail à distance, des freelances incroyables nichés en campagne ou loin des centres urbains ont désormais l'opportunité de briller.",
  "Notre ambition ? Permettre à ces professionnels de trouver des clients de qualité et de facturer à un tarif qu'ils estiment juste. Zaha, c'est aussi un soutien pour ceux qui souhaitent se lancer dans le freelancing.",
  "Enfin, nous croyons fermement au bien-être que le travail en freelance peut apporter. Flexibilité, autonomie, choix des projets : ces éléments participent à une meilleure qualité de vie, ce qui est au cœur de nos valeurs.",
];

const manifeste = [
  "Zaha est plus qu'un simple collectif de freelances. C'est une nouvelle façon de travailler, de collaborer, et d'apporter des solutions innovantes à nos clients.",
  "Chaque freelance de Zaha possède une expérience significative et est sélectionné non seulement pour son expertise technique, mais aussi pour ses qualités humaines et sa capacité à s'intégrer à une équipe, même à distance.",
  "Chaque membre du collectif s'adapte aux méthodes de travail des clients, alliant travail autonome et collaboration en équipe. Nous travaillons avec des talents et des clients au-delà des frontières, sans contrainte géographique.",
  "Zaha se veut être un intermédiaire administratif unique, simplifiant la relation entre les clients et les freelances. Nous prenons en charge le suivi administratif, permettant aux freelances de se concentrer sur le cœur de leur activité.",
  "Pour nos freelances, l'objectif est d'assurer qu'ils ne se sentent jamais seuls. Chaque mois, nous effectuons un suivi humain, pour nous assurer que chacun se sent bien intégré, soutenu et épanoui.",
  "Et pour nos clients, travailler avec Zaha, c'est avoir accès à des freelances qualifiés qui ont trouvé leur équilibre entre leur vie professionnelle et leur vie personnelle. C'est cette harmonie qui nous permet d'apporter une valeur ajoutée unique à chaque projet.",
];

const reperes = [
  { valeur: "2020", libelle: "Année de fondation" },
  { valeur: "18 ans", libelle: "D'expérience du fondateur" },
  { valeur: "100%", libelle: "Équipes en remote" },
  { valeur: "CII", libelle: "Société agréée depuis 2025" },
];

export function AProposLanding() {
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
            À propos de Zaha
          </motion.h1>
          <RevealOnScroll delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zaha-black/60 md:text-xl">
              Un collectif d&apos;experts indépendants en architecture logicielle
              et développement web avancé. Découvrez le potentiel du travail
              indépendant, tout en limitant ses inconvénients.
            </p>
          </RevealOnScroll>
        </div>

        {/* Repères */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {reperes.map((r, i) => (
            <RevealOnScroll key={r.libelle} delay={0.1 * i}>
              <div className="text-center">
                <p className="text-3xl font-black text-zaha-green md:text-4xl">
                  {r.valeur}
                </p>
                <p className="mt-2 text-sm text-zaha-black/50">{r.libelle}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </SectionWrapper>

      {/* Histoire */}
      <SectionWrapper id="histoire" className="bg-zaha-green text-white">
        <div className="mx-auto max-w-3xl">
          <SplitText
            text="L'histoire derrière Zaha"
            tag="h2"
            className="text-section-title mb-10 font-bold tracking-tight text-white"
          />
          <div className="space-y-6">
            {histoire.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-white/80">{p}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Manifeste */}
      <SectionWrapper id="manifeste" className="bg-zaha-white">
        <div className="mx-auto max-w-3xl">
          <SplitText
            text="Notre manifeste"
            tag="h2"
            className="text-section-title mb-10 font-bold tracking-tight text-zaha-black"
          />
          <div className="space-y-6">
            {manifeste.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 0.06}>
                <p className="text-lg leading-relaxed text-zaha-black/70">{p}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Équipe — composant partagé avec /rejoindre */}
      <EquipeSection />

      {/* Agrément CII */}
      <SectionWrapper className="bg-zaha-beige/40">
        <div className="mx-auto max-w-3xl text-center">
          <SplitText
            text="Société agréée Crédit Impôt Innovation"
            tag="h2"
            className="text-section-title mb-6 font-bold tracking-tight text-zaha-black"
          />
          <RevealOnScroll delay={0.2}>
            <p className="text-lg leading-relaxed text-zaha-black/60">
              Depuis 2025, Zaha est agréée par le Ministère chargé de
              l&apos;Industrie pour réaliser des travaux de conception de
              logiciels innovants pour le compte de ses clients. Nos travaux
              portent sur les architectures web hybrides offline-first destinées
              aux environnements industriels exigeants.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.35}>
            <MagneticButton
              href="/credit-impot-innovation"
              className="mt-8 inline-block rounded-full bg-zaha-green px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Comprendre le Crédit Impôt Innovation
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </SectionWrapper>

      {/* CTA double */}
      <SectionWrapper dark>
        <div className="flex flex-col items-center text-center">
          <SplitText
            text="Contactez-nous"
            tag="h2"
            className="text-section-title font-bold text-white"
          />
          <RevealOnScroll delay={0.3}>
            <p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
              Que vous soyez freelance à la recherche de soutien ou une
              entreprise à la recherche de talents, Zaha est là pour vous aider.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton
                href="/rejoindre"
                className="rounded-full border border-white/20 px-10 py-4 text-lg font-bold text-white transition-colors hover:bg-white/5"
              >
                Vous êtes freelance
              </MagneticButton>
              <MagneticButton
                href="/clients"
                className="rounded-full bg-zaha-orange px-10 py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
              >
                Vous êtes un client
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </SectionWrapper>
    </LandingLayout>
  );
}
