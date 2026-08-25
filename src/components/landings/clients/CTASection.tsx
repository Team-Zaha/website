"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/shared/SplitText";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [100, -100]
  );

  const circleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [1, 1, 1] : [0.8, 1.1, 0.9]
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-zaha-black px-6 md:px-12 lg:px-24"
    >
      {/* Background decorations */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          style={{ scale: circleScale }}
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 md:h-[800px] md:w-[800px]"
        />
        <motion.div
          style={{ scale: circleScale }}
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 md:h-[600px] md:w-[600px]"
        />
        <motion.div
          style={{ scale: circleScale }}
          className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 md:h-[400px] md:w-[400px]"
        />

        {/* Accent dots */}
        <div className="absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-zaha-orange/30" />
        <div className="absolute bottom-[25%] right-[20%] h-3 w-3 rounded-full bg-zaha-green/20" />
        <div className="absolute bottom-[40%] left-[25%] h-1.5 w-1.5 rounded-full bg-zaha-orange/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <RevealOnScroll>
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
            Pret a demarrer ?
          </p>
        </RevealOnScroll>

        <SplitText
          text="Parlons de votre projet"
          tag="h2"
          className="text-hero font-bold tracking-tight text-white"
          delay={0.2}
          staggerChildren={0.05}
        />

        <RevealOnScroll delay={0.6}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
            D&eacute;crivez-nous votre besoin et recevez une proposition d&apos;&eacute;quipe
            sur mesure sous 48h.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              href="/contact"
              className="rounded-full bg-zaha-orange px-10 py-5 text-lg font-semibold text-white transition-colors hover:bg-zaha-orange-light"
            >
              Nous contacter
            </MagneticButton>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={1}>
          <p className="mt-8 text-sm text-white/30">
            R&eacute;ponse garantie sous 48h — Devis gratuit et sans engagement
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
