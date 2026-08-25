"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function LuxeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -60],
  );

  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Circular gradient glow */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[60vh] w-[60vh] max-h-[600px] max-w-[600px]"
        >
          {/* Primary radial glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212,196,176,0.08) 0%, rgba(245,230,211,0.03) 40%, transparent 70%)",
            }}
          />
          {/* Pulsing inner glow */}
          <motion.div
            animate={{
              opacity: [0.04, 0.08, 0.04],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-[15%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,230,211,0.1) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12"
      >
        {/* Title with clip-path reveal — un seul H1 pour les trois lignes */}
        <h1>
          <div className="overflow-hidden">
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 1.4,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-luxe-hero block font-light tracking-tight text-[#F5E6D3]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              L&apos;exigence du luxe{" "}
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 1.4,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-luxe-hero block font-light tracking-tight text-[#F5E6D3]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              mérite une ingénierie{" "}
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 1.4,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-luxe-hero block font-light italic tracking-tight text-[#D4C4B0]"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              d&apos;exception
            </motion.span>
          </div>
        </h1>

        {/* Thin line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 h-px w-24 origin-left bg-[#D4C4B0]/30"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-lg text-sm font-light tracking-widest uppercase text-[#D4C4B0]/60 md:text-base"
        >
          Nous avons construit l&apos;expérience digitale de Longines
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-light tracking-[0.3em] uppercase text-[#D4C4B0]/40">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-[#D4C4B0]/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
