"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SplitText } from "@/components/shared/SplitText";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Vous avez un projet logiciel innovant",
    description:
      "Votre entreprise développe un prototype de logiciel nouveau, supérieur à l\u2019état de l\u2019art technologique.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 text-zaha-green"
      >
        <path
          d="M24 4L6 14v20l18 10 18-10V14L24 4z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 24v20M6 14l18 10 18-10"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Zaha le conçoit",
    description:
      "En tant que société agréée CII, nous concevons et développons votre prototype logiciel avec l\u2019expertise requise.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 text-zaha-green"
      >
        <rect
          x="8"
          y="8"
          width="32"
          height="32"
          rx="4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M18 20l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Vous récupérez 20% à 60% en crédit d\u2019impôt",
    description:
      "Le montant des travaux confiés à Zaha ouvre droit à un crédit d\u2019impôt proportionnel à votre localisation.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-10 w-10 text-zaha-green"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 14v10l7 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function CommentCaMarcheSection() {
  return (
    <SectionWrapper id="comment-ca-marche" className="bg-zaha-white">
      <div className="mb-16 text-center">
        <SplitText
          text="Comment ça marche"
          tag="h2"
          className="text-section-title font-bold text-zaha-black"
        />
        <RevealOnScroll delay={0.2}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zaha-black/60">
            Trois étapes simples pour bénéficier du Crédit Impôt Innovation.
          </p>
        </RevealOnScroll>
      </div>

      <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        {/* Connecting line (desktop only) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[72px] z-0 hidden md:block">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="mx-auto h-[2px] w-[66%] origin-left bg-gradient-to-r from-zaha-green/40 via-zaha-green to-zaha-green/40"
          />
        </div>

        {steps.map((step, i) => (
          <RevealOnScroll key={step.number} delay={i * 0.2} direction="up">
            <div className="group relative z-10 flex flex-col items-center text-center">
              {/* Step circle */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-6 flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-zaha-green/20 bg-zaha-white transition-colors group-hover:border-zaha-green/50 group-hover:bg-zaha-green/5"
              >
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-zaha-green/60">
                  {step.number}
                </span>
                {step.icon}
              </motion.div>

              {/* Mobile connector */}
              {i < steps.length - 1 && (
                <div className="my-2 h-8 w-[2px] bg-zaha-green/30 md:hidden" />
              )}

              <h3 className="mb-3 text-xl font-bold text-zaha-black">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-zaha-black/60">
                {step.description}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
