"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function LuxeCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-12 lg:px-24 lg:py-44">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Thin line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 h-px w-16 bg-[#D4C4B0]/20 md:mb-24"
        />

        <RevealOnScroll duration={1.2} distance={30}>
          <h2
            className="mb-10 text-3xl font-light tracking-tight text-[#F5E6D3] md:mb-14 md:text-4xl lg:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Élevons votre expérience
            <br />
            <span className="italic text-[#D4C4B0]/70">digitale</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll duration={1} delay={0.2} distance={20}>
          <MagneticButton
            href="/contact"
            className="group relative inline-block"
            strength={0.2}
          >
            <span className="text-sm font-light tracking-[0.2em] uppercase text-[#F5E6D3] transition-colors duration-700 group-hover:text-[#D4C4B0]">
              Discutons de votre projet
            </span>
            {/* Underline with elegant hover animation */}
            <span className="mt-2 block h-px w-full origin-left bg-[#D4C4B0]/30 transition-all duration-700 group-hover:bg-[#F5E6D3]/60 group-hover:scale-x-110" />
          </MagneticButton>
        </RevealOnScroll>

        {/* Small decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-24 text-[10px] font-light tracking-[0.4em] uppercase text-[#D4C4B0]/20 md:mt-32"
        >
          Zaha &mdash; Ingénierie digitale
        </motion.div>
      </div>
    </section>
  );
}
