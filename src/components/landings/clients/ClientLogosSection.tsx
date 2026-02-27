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
  "Leila",
  "Trackstone",
  "Reflet Communication",
];

// Duplicate the array for a seamless infinite loop
const duplicatedClients = [...clients, ...clients];

export function ClientLogosSection() {
  return (
    <SectionWrapper className="overflow-hidden bg-zaha-black py-16 lg:py-20">
      <RevealOnScroll>
        <p className="mb-12 text-center text-sm font-semibold uppercase tracking-widest text-white/40">
          Ils nous font confiance
        </p>
      </RevealOnScroll>

      <div className="relative">
        {/* Fade masks on left/right */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-zaha-black to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-zaha-black to-transparent md:w-32" />

        {/* Scrolling row 1 */}
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-12 md:gap-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedClients.map((client, i) => (
              <span
                key={`${client}-${i}`}
                className="whitespace-nowrap text-2xl font-bold tracking-tight text-white/20 transition-colors hover:text-white/50 md:text-3xl lg:text-4xl"
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scrolling row 2 - reversed */}
        <div className="mt-8 overflow-hidden">
          <motion.div
            className="flex w-max gap-12 md:gap-20"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedClients.map((client, i) => (
              <span
                key={`${client}-rev-${i}`}
                className="whitespace-nowrap text-2xl font-bold tracking-tight text-white/10 transition-colors hover:text-white/30 md:text-3xl lg:text-4xl"
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
