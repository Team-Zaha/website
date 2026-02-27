"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";

export function HeroRejoindre() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Warm gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, var(--zaha-beige) 0%, var(--zaha-white) 50%, var(--zaha-green-light) 120%)",
        }}
      />

      {/* Decorative soft circles */}
      <motion.div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, var(--zaha-green) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Portal opening animation */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        {/* Portal ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0, filter: "blur(40px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="mb-8 flex items-center justify-center"
        >
          <motion.div
            className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-zaha-green/30 md:h-32 md:w-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-16 w-16 rounded-full bg-zaha-green/10 md:h-20 md:w-20" />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mb-6"
        >
          <span className="inline-block rounded-full bg-zaha-green/10 px-4 py-1.5 text-sm font-medium text-zaha-green">
            Collectif de freelances
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 60, opacity: 0, filter: "blur(20px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 1, ease: [0.33, 1, 0.68, 1] }}
          className="text-hero max-w-4xl font-bold tracking-tight text-zaha-black"
        >
          Ton talent n&apos;a pas
          <br />
          <span className="text-zaha-green">de frontières.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-zaha-black/70 md:text-xl"
        >
          Des missions de qualité, un cadre humain, zéro paperasse.
          Rejoins un collectif qui prend soin de ses freelances.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10"
        >
          <MagneticButton
            href="#contact"
            className="rounded-full bg-zaha-green px-8 py-4 text-base font-semibold text-white transition-all hover:bg-zaha-green-light md:text-lg"
          >
            Rejoins le collectif
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium tracking-widest text-zaha-black/40 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-zaha-black/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
