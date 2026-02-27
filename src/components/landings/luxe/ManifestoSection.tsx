"use client";

import { motion } from "framer-motion";

const lines = [
  "Chaque pixel compte.",
  "Chaque milliseconde compte.",
  "Chaque interaction doit refléter",
  "l\u2019ADN de votre marque.",
  "",
  "Nous ne construisons pas des sites web.",
  "Nous créons des expériences digitales",
  "à la hauteur de votre excellence.",
];

export function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-12 lg:px-24 lg:py-44">
      {/* Subtle gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(212,196,176,0.02) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-16 text-xs font-light tracking-[0.4em] uppercase text-[#D4C4B0]/30 md:mb-24"
        >
          Manifeste
        </motion.p>

        {/* Lines with split-reveal */}
        <div className="space-y-2 md:space-y-3">
          {lines.map((line, i) => {
            if (line === "") {
              return <div key={i} className="h-6 md:h-10" />;
            }

            return (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 1,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`text-2xl font-light leading-snug tracking-tight md:text-4xl lg:text-5xl ${
                    i >= 5
                      ? "text-[#F5E6D3]"
                      : "text-[#D4C4B0]/60"
                  }`}
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {line}
                </motion.p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
