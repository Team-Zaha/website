"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Premier contact",
    description: "Tu nous parles de toi, de tes envies et de ton parcours.",
  },
  {
    number: "02",
    title: "Échange humain",
    description:
      "On discute de tes envies et compétences autour d'un café virtuel.",
  },
  {
    number: "03",
    title: "Intégration",
    description:
      "Tu rejoins le collectif et tu découvres la communauté Zaha.",
  },
  {
    number: "04",
    title: "Première mission",
    description: "On te trouve un projet adapté à ton profil et tes aspirations.",
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative h-full">
      <RevealOnScroll
        direction="up"
        delay={index * 0.15}
        distance={40}
        className="h-full"
      >
        <div className="relative flex h-full flex-col">
          {/* Step card */}
          <motion.div
            className="relative flex flex-1 flex-col rounded-2xl border border-zaha-beige-dark/30 bg-white p-6 md:p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Step number badge (mobile only : le stepper desktop porte deja le numero) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                delay: index * 0.15 + 0.3,
                type: "spring",
                stiffness: 200,
              }}
              className="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zaha-green text-sm font-bold text-white md:hidden"
            >
              {step.number}
            </motion.div>

            {/* Content */}
            <h3 className="text-lg font-bold text-zaha-black md:text-xl">
              {step.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-zaha-black/60">
              {step.description}
            </p>
          </motion.div>

          {/* Connecting arrow (not on last item) */}
          {index < steps.length - 1 && (
            <div className="flex justify-center py-4 md:hidden">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                className="h-8 w-px origin-top bg-zaha-green/30"
              />
            </div>
          )}
        </div>
      </RevealOnScroll>
    </div>
  );
}

export function StepperSection() {
  return (
    <SectionWrapper id="rejoindre" className="bg-zaha-beige/20">
      <RevealOnScroll>
        <div className="mb-16 text-center">
          <h2 className="text-section-title font-bold tracking-tight text-zaha-black">
            Comment rejoindre Zaha
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-zaha-black/60">
            Un processus simple et humain, en quatre étapes.
          </p>
        </div>
      </RevealOnScroll>

      {/* Desktop horizontal stepper */}
      <div className="hidden md:block">
        {/* Progress bar : même grille que les cartes pour aligner les puces */}
        <div className="mb-8 grid grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex items-center">
              <RevealOnScroll delay={index * 0.2}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zaha-green text-xs font-bold text-white">
                  {step.number}
                </div>
              </RevealOnScroll>
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                  className="absolute -right-8 left-10 h-px origin-left bg-zaha-green/30"
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 items-stretch gap-6">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Mobile vertical stepper */}
      <div className="flex flex-col gap-2 md:hidden">
        {steps.map((step, index) => (
          <StepCard key={step.number} step={step} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
