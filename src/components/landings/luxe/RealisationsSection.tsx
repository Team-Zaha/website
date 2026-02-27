"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useIsMobile } from "@/hooks/useMediaQuery";

const realisations = [
  {
    title: "Espace Aubade",
    role: "Lead React, équipe de 6 devs frontend",
    description:
      "Plateforme e-commerce premium pour la marque de lingerie française. Direction technique frontend et coordination d\u2019une équipe de 6 développeurs pour une refonte complète de l\u2019expérience d\u2019achat en ligne.",
    tags: ["React", "Next.js", "TypeScript", "E-commerce"],
  },
  {
    title: "E-commerce React / Shopify",
    role: "Applications React/Node.js et API métier",
    description:
      "Développement d\u2019applications headless commerce connectées à Shopify. Création d\u2019API métier sur mesure pour orchestrer les flux produits, commandes et inventaire en temps réel.",
    tags: ["React", "Node.js", "Shopify", "API"],
  },
];

function RealisationCard({
  title,
  role,
  description,
  tags,
}: {
  title: string;
  role: string;
  description: string;
  tags: string[];
}) {
  return (
    <div className="group flex h-full min-w-[85vw] flex-col justify-between border border-[#D4C4B0]/10 p-8 sm:min-w-[60vw] md:min-w-[500px] md:p-12 lg:min-w-[550px]">
      <div>
        <h3
          className="mb-3 text-2xl font-light tracking-tight text-[#F5E6D3] md:text-3xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {title}
        </h3>
        <p className="mb-6 text-sm font-light tracking-wide text-[#D4C4B0]/50">
          {role}
        </p>
        <p className="max-w-md text-sm font-light leading-relaxed text-[#D4C4B0]/40">
          {description}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="border border-[#D4C4B0]/15 px-3 py-1.5 text-xs font-light tracking-wider text-[#D4C4B0]/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function RealisationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -200]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-12 lg:px-24 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <RevealOnScroll duration={1} distance={30}>
          <p className="mb-6 text-xs font-light tracking-[0.4em] uppercase text-[#D4C4B0]/40">
            Réalisations
          </p>
        </RevealOnScroll>

        <RevealOnScroll duration={1} delay={0.1} distance={30}>
          <h2
            className="mb-16 max-w-3xl text-3xl font-light tracking-tight text-[#F5E6D3] md:mb-20 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Autres{" "}
            <span className="italic text-[#D4C4B0]/70">réalisations</span>
          </h2>
        </RevealOnScroll>

        {/* Desktop: horizontal scroll, Mobile: vertical stack */}
        {isMobile ? (
          <div className="flex flex-col gap-6">
            {realisations.map((real, i) => (
              <RevealOnScroll key={i} duration={1} delay={i * 0.15} distance={30}>
                <RealisationCard {...real} />
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div className="overflow-visible">
            <motion.div
              ref={scrollContainerRef}
              style={{ x }}
              className="flex gap-8"
            >
              {realisations.map((real, i) => (
                <RevealOnScroll
                  key={i}
                  duration={1}
                  delay={i * 0.15}
                  distance={30}
                  direction="right"
                >
                  <RealisationCard {...real} />
                </RevealOnScroll>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
