"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SplitText } from "@/components/shared/SplitText";
import { motion } from "framer-motion";

const conditions = [
  {
    text: "Être une PME",
    detail:
      "Au sens communautaire : moins de 250 salariés, CA inférieur à 50 M€ ou bilan inférieur à 43 M€.",
  },
  {
    text: "Être soumis à un régime réel d'impôt (IS ou IR)",
    detail:
      "Les entreprises soumises au régime micro-fiscal ne sont pas éligibles.",
  },
  {
    text: "Travaux concernant la conception de prototypes d'un logiciel nouveau",
    detail:
      "Le logiciel doit présenter des performances supérieures à l'état de l'art technologique.",
  },
];

export function EligibiliteSection() {
  return (
    <SectionWrapper id="eligibilite" className="bg-zaha-beige">
      <div className="mb-16">
        <SplitText
          text="Conditions d'éligibilité"
          tag="h2"
          className="text-section-title font-bold text-zaha-black"
        />
        <RevealOnScroll delay={0.2}>
          <p className="mt-4 max-w-xl text-lg text-zaha-black/60">
            Vérifiez que votre entreprise remplit les conditions pour bénéficier du CII.
          </p>
        </RevealOnScroll>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        {conditions.map((cond, i) => (
          <RevealOnScroll key={i} delay={i * 0.15} direction="left">
            <motion.div
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group flex gap-5 rounded-2xl border border-zaha-green/10 bg-zaha-white p-6 transition-shadow hover:shadow-lg"
            >
              {/* Checkmark */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zaha-green/10">
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-zaha-green"
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  />
                </motion.svg>
              </div>

              <div>
                <h3 className="text-lg font-bold text-zaha-black">
                  {cond.text}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zaha-black/50">
                  {cond.detail}
                </p>
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Info badge — plafond only */}
      <RevealOnScroll delay={0.5}>
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-zaha-orange/20 bg-zaha-white px-6 py-3">
            <span className="text-sm font-medium text-zaha-black/60">
              Plafond annuel
            </span>
            <span className="text-lg font-black text-zaha-orange">
              400 000 €
            </span>
          </div>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
