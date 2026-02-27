"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const locations = [
  {
    name: "M\u00e9tropole",
    rate: 20,
    maxRate: 20,
    label: "20%",
    color: "bg-zaha-green",
    description: "France m\u00e9tropolitaine",
  },
  {
    name: "Corse",
    rate: 40,
    maxRate: 40,
    label: "35% \u00e0 40%",
    color: "bg-zaha-orange",
    description: "\u00cele de Corse",
  },
  {
    name: "Outre-mer",
    rate: 60,
    maxRate: 60,
    label: "60%",
    color: "bg-zaha-green",
    description: "DROM-COM",
  },
];

function AnimatedBar({
  rate,
  color,
  label,
  name,
  description,
  delay,
}: {
  rate: number;
  color: string;
  label: string;
  name: string;
  description: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="group">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <h3 className="text-xl font-bold text-white md:text-2xl">{name}</h3>
          <p className="text-sm text-white/50">{description}</p>
        </div>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.6 }}
          className="text-2xl font-black text-zaha-green md:text-3xl"
        >
          {label}
        </motion.span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-white/10 md:h-5">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(rate / 60) * 100}%` } : {}}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.33, 1, 0.68, 1],
          }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

export function TauxSection() {
  return (
    <SectionWrapper id="taux" dark>
      <div className="mb-16">
        <SplitText
          text="Taux par localisation"
          tag="h2"
          className="text-section-title font-bold text-white"
        />
        <RevealOnScroll delay={0.2}>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Le taux du cr&eacute;dit d&apos;imp&ocirc;t varie selon la localisation de votre entreprise. Plus vous &ecirc;tes &eacute;loign&eacute; de la m&eacute;tropole, plus le taux est avantageux.
          </p>
        </RevealOnScroll>
      </div>

      <div className="mx-auto max-w-3xl space-y-10">
        {locations.map((loc, i) => (
          <AnimatedBar
            key={loc.name}
            rate={loc.rate}
            color={loc.color}
            label={loc.label}
            name={loc.name}
            description={loc.description}
            delay={i * 0.2}
          />
        ))}
      </div>

      {/* Visual accent */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-zaha-green/5 blur-[100px]" />
    </SectionWrapper>
  );
}
