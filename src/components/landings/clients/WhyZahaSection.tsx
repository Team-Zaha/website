"use client";

import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ParallaxSection } from "@/components/shared/ParallaxSection";
import { SplitText } from "@/components/shared/SplitText";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const propositions = [
  {
    number: 18,
    suffix: "+",
    label: "ans d'expérience",
    title: "Collectif d'experts sélectionnés",
    description:
      "Notre fondateur capitalise sur plus de 18 ans d'expérience dans le développement web. Chaque expert est sélectionné pour son excellence technique et son pragmatisme.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className="text-zaha-green"
      >
        <circle cx="20" cy="14" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: 4,
    suffix: "",
    label: "technologies cles",
    title: "Stack moderne et performante",
    description:
      "React, Next.js, Node.js, TypeScript : nous maîtrisons les technologies qui propulsent les applications web les plus exigeantes.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className="text-zaha-green"
      >
        <rect
          x="4"
          y="4"
          width="14"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="22"
          y="4"
          width="14"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="22"
          width="14"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="22"
          y="22"
          width="14"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    number: 60,
    suffix: "%",
    label: "d'économie possible",
    title: "Agrément CII",
    description:
      "Grâce à notre agrément Crédit Impôt Innovation, récupérez 20% du coût de vos projets innovants — jusqu'à 60% en outre-mer. Un avantage fiscal concret et immédiat.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className="text-zaha-orange"
      >
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
        <path
          d="M14 20l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: 100,
    suffix: "%",
    label: "remote",
    title: "Flexibilité et équipes sur mesure",
    description:
      "Équipes 100% remote, dimensionnées selon vos besoins. Nous nous adaptons à votre organisation pour une intégration fluide et efficace.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        className="text-zaha-green"
      >
        <path
          d="M8 28V12a4 4 0 014-4h16a4 4 0 014 4v16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 28h32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function WhyZahaSection() {
  return (
    <SectionWrapper id="pourquoi-zaha" className="bg-zaha-beige/30">
      <div className="mb-16 md:mb-24">
        <RevealOnScroll>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
            Pourquoi Zaha
          </p>
        </RevealOnScroll>
        <SplitText
          text="Un collectif d'experts pour vos projets les plus exigeants"
          tag="h2"
          className="text-section-title font-bold tracking-tight text-zaha-black"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {propositions.map((prop, index) => (
          <ParallaxSection
            key={prop.title}
            speed={0.1}
            direction={index % 2 === 0 ? "up" : "down"}
          >
            <RevealOnScroll delay={index * 0.15} direction="up">
              <div className="group rounded-2xl border border-zaha-black/5 bg-white p-8 transition-all duration-300 hover:border-zaha-green/20 hover:shadow-lg lg:p-10">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zaha-beige/60">
                    {prop.icon}
                  </div>
                  <div className="text-right">
                    <AnimatedCounter
                      target={prop.number}
                      suffix={prop.suffix}
                      className="text-3xl font-bold text-zaha-green"
                    />
                    <p className="mt-1 text-xs text-zaha-black/50">
                      {prop.label}
                    </p>
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-zaha-black">
                  {prop.title}
                </h3>
                <p className="leading-relaxed text-zaha-black/60">
                  {prop.description}
                </p>
              </div>
            </RevealOnScroll>
          </ParallaxSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
