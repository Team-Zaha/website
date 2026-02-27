"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ParallaxSection } from "@/components/shared/ParallaxSection";

const points = [
  {
    label: "Performance sub-seconde",
    description: "Chaque milliseconde est optimisée pour une expérience fluide et immédiate.",
  },
  {
    label: "Expérience multilingue seamless",
    description: "Une navigation naturelle dans chaque langue, chaque marché.",
  },
  {
    label: "Gestion de fort trafic",
    description: "Une architecture pensée pour absorber les pics sans compromis.",
  },
  {
    label: "Pixel-perfect, chaque détail compte",
    description: "L\u2019exécution irréprochable des designs les plus exigeants.",
  },
  {
    label: "Attention obsessionnelle au craft",
    description: "Le soin du détail qui distingue l\u2019exceptionnel de l\u2019ordinaire.",
  },
];

export function ExcellenceSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto max-w-7xl">
        {/* Section title */}
        <ParallaxSection speed={0.15} direction="up">
          <RevealOnScroll duration={1} distance={40}>
            <h2
              className="max-w-4xl text-luxe-section font-light tracking-tight text-[#F5E6D3]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              L&apos;excellence technique
              <br />
              <span className="italic text-[#D4C4B0]/70">
                au service du luxe
              </span>
            </h2>
          </RevealOnScroll>
        </ParallaxSection>

        {/* Thin separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-px w-full origin-left bg-[#D4C4B0]/15 md:mt-24"
        />

        {/* Points - editorial layout */}
        <div className="mt-16 md:mt-24">
          {points.map((point, i) => (
            <RevealOnScroll
              key={i}
              duration={1}
              delay={i * 0.1}
              distance={30}
            >
              <div
                className={`group flex flex-col gap-4 border-b border-[#D4C4B0]/10 py-10 md:flex-row md:items-baseline md:gap-12 md:py-14 ${
                  i === 0 ? "border-t border-[#D4C4B0]/10" : ""
                }`}
              >
                {/* Index number */}
                <span className="font-light text-xs tracking-[0.3em] uppercase text-[#D4C4B0]/30 md:w-16">
                  0{i + 1}
                </span>

                {/* Point label - large text */}
                <h3
                  className="text-2xl font-light tracking-tight text-[#F5E6D3] transition-colors duration-700 md:w-1/2 md:text-3xl lg:text-4xl"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {point.label}
                </h3>

                {/* Description - smaller body text */}
                <p className="max-w-sm text-sm font-light leading-relaxed text-[#D4C4B0]/50 md:ml-auto md:text-base">
                  {point.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
