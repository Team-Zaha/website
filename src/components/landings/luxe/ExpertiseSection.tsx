"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const expertises = [
  {
    title: "Shopify Partner certifié",
    description:
      "Expertise approfondie de l\u2019écosystème Shopify pour des boutiques en ligne performantes et évolutives.",
  },
  {
    title: "Next.js / React headless",
    description:
      "Architectures découplées pour une liberté créative totale et des performances optimales.",
  },
  {
    title: "Architecture performante & Core Web Vitals",
    description:
      "Optimisation obsessionnelle pour des scores parfaits et une expérience utilisateur irréprochable.",
  },
  {
    title: "Internationalisation & multilingue",
    description:
      "Déploiement multi-marchés avec gestion fine des langues, devises et contenus localisés.",
  },
  {
    title: "UX premium & craft",
    description:
      "Interfaces soignées au pixel près, animations fluides, interactions mémorables.",
  },
  {
    title: "Intégration API & back-office",
    description:
      "Connexion seamless avec vos outils : ERP, PIM, CRM, systèmes de paiement et logistique.",
  },
];

function ExpertiseCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <RevealOnScroll
      duration={1}
      delay={index * 0.1}
      distance={30}
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-[#D4C4B0]/10 p-8 transition-colors duration-700 md:p-10"
        style={{ background: "#0A0A0A" }}
      >
        {/* Subtle light effect on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.06 : 0,
          }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(245,230,211,1) 0%, transparent 60%)",
          }}
        />

        {/* Border glow on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0 rounded-sm border border-[#D4C4B0]/25"
        />

        <div className="relative z-10">
          <h3
            className="mb-4 text-xl font-light tracking-tight text-[#F5E6D3] md:text-2xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {title}
          </h3>
          <p className="text-sm font-light leading-relaxed text-[#D4C4B0]/50">
            {description}
          </p>
        </div>

        {/* Index */}
        <span className="relative z-10 mt-8 block text-xs font-light tracking-[0.3em] text-[#D4C4B0]/20">
          0{index + 1}
        </span>
      </motion.div>
    </RevealOnScroll>
  );
}

export function ExpertiseSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <RevealOnScroll duration={1} distance={30}>
          <p className="mb-6 text-xs font-light tracking-[0.4em] uppercase text-[#D4C4B0]/40">
            Expertises
          </p>
        </RevealOnScroll>

        <RevealOnScroll duration={1} delay={0.1} distance={30}>
          <h2
            className="mb-16 max-w-3xl text-3xl font-light tracking-tight text-[#F5E6D3] md:mb-24 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Notre expertise{" "}
            <span className="italic text-[#D4C4B0]/70">e-commerce</span>
          </h2>
        </RevealOnScroll>

        {/* Cards grid - 2x3 */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2">
          {expertises.map((expertise, i) => (
            <ExpertiseCard
              key={i}
              title={expertise.title}
              description={expertise.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
