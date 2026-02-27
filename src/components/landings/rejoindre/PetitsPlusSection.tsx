"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface PetitPlusCard {
  icon: string;
  title: string;
  description: string;
}

const cards: PetitPlusCard[] = [
  {
    icon: "💬",
    title: "Suivi mensuel humain",
    description:
      "Un point régulier pour prendre de tes nouvelles, ajuster le cap et s'assurer que tout roule.",
  },
  {
    icon: "🫂",
    title: "Communauté de pairs et entraide",
    description:
      "Un réseau de freelances bienveillants qui partagent, s'entraident et grandissent ensemble.",
  },
  {
    icon: "⚡",
    title: "Équilibre vie pro / vie perso",
    description:
      "On croit qu'un freelance épanoui est un freelance performant. Ton bien-être est une priorité.",
  },
];

function AnimatedCard({
  card,
  index,
}: {
  card: PetitPlusCard;
  index: number;
}) {
  return (
    <RevealOnScroll direction="up" delay={index * 0.15} distance={50}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full overflow-hidden rounded-2xl border border-zaha-beige-dark/30 bg-white p-8 shadow-sm md:p-10"
      >
        {/* Hover background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zaha-green/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon */}
        <motion.div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zaha-beige/60 text-3xl"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <span role="img" aria-label={card.title}>
            {card.icon}
          </span>
        </motion.div>

        {/* Content */}
        <h3 className="mb-3 text-xl font-bold text-zaha-black">
          {card.title}
        </h3>
        <p className="text-base leading-relaxed text-zaha-black/60">
          {card.description}
        </p>
      </motion.div>
    </RevealOnScroll>
  );
}

export function PetitsPlusSection() {
  return (
    <SectionWrapper id="petits-plus" className="bg-zaha-beige/20">
      <RevealOnScroll>
        <h2 className="text-section-title mb-16 text-center font-bold tracking-tight text-zaha-black">
          Les petits plus
        </h2>
      </RevealOnScroll>

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {cards.map((card, index) => (
          <AnimatedCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
