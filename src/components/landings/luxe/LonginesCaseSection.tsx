"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useIsMobile } from "@/hooks/useMediaQuery";

const caseDetails = [
  {
    label: "Contexte",
    value:
      "Site e-commerce multilingue à fort trafic pour la maison horlogère suisse Longines",
  },
  {
    label: "Mission",
    value:
      "Audit et développement Next.js, renfort d\u2019une équipe de 5 développeurs fullstack",
  },
  {
    label: "Stack",
    value: "Next.js, React, TypeScript",
  },
];

export function LonginesCaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [-100, 100]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-32 md:px-12 lg:px-24 lg:py-44"
    >
      {/* Background subtle golden gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,196,176,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Small overline */}
        <RevealOnScroll duration={1} distance={20}>
          <p className="mb-8 text-xs font-light tracking-[0.4em] uppercase text-[#D4C4B0]/40 md:mb-12">
            Cas client
          </p>
        </RevealOnScroll>

        {/* Large LONGINES text reveal */}
        <div className="overflow-hidden">
          <motion.div style={{ x: textX }}>
            <motion.h2
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="whitespace-nowrap text-[clamp(4rem,15vw,12rem)] font-light leading-none tracking-tight text-[#F5E6D3]/[0.07]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              LONGINES
            </motion.h2>
          </motion.div>
        </div>

        {/* Case study brand name */}
        <RevealOnScroll duration={1} delay={0.3} distance={30}>
          <h3
            className="-mt-8 text-4xl font-light tracking-tight text-[#F5E6D3] md:-mt-16 md:text-5xl lg:text-6xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Longines
          </h3>
        </RevealOnScroll>

        {/* Thin line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 h-px w-full max-w-xl origin-left bg-gradient-to-r from-[#D4C4B0]/20 to-transparent md:mt-14"
        />

        {/* Case details */}
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-16">
          {caseDetails.map((detail, i) => (
            <RevealOnScroll
              key={i}
              duration={1}
              delay={0.4 + i * 0.15}
              distance={30}
            >
              <div>
                <span className="mb-3 block text-xs font-light tracking-[0.3em] uppercase text-[#D4C4B0]/40">
                  {detail.label}
                </span>
                <p className="text-base font-light leading-relaxed text-[#F5E6D3]/80 md:text-lg">
                  {detail.value}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Accent decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-16 h-px w-32 origin-left md:mt-24"
          style={{
            background:
              "linear-gradient(90deg, rgba(212,196,176,0.3) 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
