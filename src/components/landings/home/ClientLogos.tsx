"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const clients = [
  "EDF Store & Forecast",
  "Agregio Solutions",
  "Longines",
  "Espace Aubade",
  "Barooders",
  "Livemeup",
  "Trackstone",
  "Leila",
  "Reflet Communication",
  "Nuxe",
  "Toys\"R\"Us",
  "Hozane",
  "Otis",
  "SQLI",
  "Razorfish",
];

const duplicated = [...clients, ...clients];

export function ClientLogos() {
  return (
    <SectionWrapper className="overflow-hidden bg-zaha-beige py-16 lg:py-20">
      <RevealOnScroll>
        <p className="mb-12 text-center text-sm font-semibold uppercase tracking-widest text-zaha-black/50">
          Nos clients
        </p>
      </RevealOnScroll>

      <div className="relative">
        {/* Fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zaha-beige to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zaha-beige to-transparent md:w-40" />

        {/* Row 1 — left to right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-12 md:gap-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicated.map((client, i) => (
              <span
                key={`${client}-${i}`}
                className="whitespace-nowrap text-2xl font-bold tracking-tight text-zaha-black/30 transition-colors hover:text-zaha-black/60 md:text-3xl lg:text-4xl"
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Row 2 — right to left */}
        <div className="mt-8 overflow-hidden">
          <motion.div
            className="flex w-max gap-12 md:gap-20"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 70,
                ease: "linear",
              },
            }}
          >
            {duplicated.map((client, i) => (
              <span
                key={`${client}-rev-${i}`}
                className="whitespace-nowrap text-2xl font-bold tracking-tight text-zaha-black/15 transition-colors hover:text-zaha-black/40 md:text-3xl lg:text-4xl"
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
