"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CTADual() {
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
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <RevealOnScroll>
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
            Passons &agrave; l&apos;action
          </p>
        </RevealOnScroll>

        <SplitText
          text="PRÊT À CONSTRUIRE ?"
          tag="h2"
          className="text-hero font-black uppercase tracking-tight text-white"
          staggerChildren={0.05}
        />

        <RevealOnScroll delay={0.4}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
            Deux portes d&apos;entr&eacute;e, une m&ecirc;me exigence d&apos;excellence technique et humaine.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {/* Client CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm transition-colors hover:border-zaha-green-light/20">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/40">
                Vous &ecirc;tes un client
              </p>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Lancez votre projet
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-white/50">
                D&eacute;crivez votre besoin et recevez une proposition d&apos;&eacute;quipe
                sur mesure sous 48h.
              </p>
              <MagneticButton
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-zaha-beige px-8 py-4 text-base font-semibold text-zaha-green transition-all hover:bg-white"
              >
                Nous contacter
              </MagneticButton>
            </div>

            {/* Freelance CTA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm transition-colors hover:border-zaha-orange/20">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/40">
                Vous &ecirc;tes freelance
              </p>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Rejoignez le collectif
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-white/50">
                Int&eacute;grez un r&eacute;seau de talents s&eacute;niors et acc&eacute;dez
                &agrave; des missions qualifi&eacute;es.
              </p>
              <MagneticButton
                href="/rejoindre"
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-zaha-orange bg-transparent px-8 py-4 text-base font-semibold text-zaha-orange transition-colors hover:bg-zaha-orange hover:text-white"
              >
                Nous rejoindre
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.8}>
          <p className="mt-8 text-sm text-white/30">
            R&eacute;ponse garantie sous 48h — Devis gratuit et sans engagement
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
