"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const SCRAMBLE_CHARS = "0123456789%";
const TARGET = 20;
const DURATION_MS = 2200;
const FRAME_INTERVAL = 50;

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0%");
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1);

      if (progress >= 1) {
        setDisplayValue(`${TARGET}%`);
        clearInterval(interval);
        return;
      }

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.round(eased * TARGET);

      // Add scramble effect in the early phase
      if (progress < 0.7) {
        const scrambled = String(currentNum)
          .split("")
          .map((char) =>
            Math.random() < 0.3
              ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
              : char
          )
          .join("");
        setDisplayValue(`${scrambled}%`);
      } else {
        setDisplayValue(`${currentNum}%`);
      }
    }, FRAME_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      scramble();
    }
  }, [isInView, scramble]);

  return (
    <SectionWrapper
      id="hero"
      dark
      fullHeight
      className="relative overflow-hidden"
    >
      {/* Green gradient accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-zaha-green/20 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-zaha-green-light/15 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zaha-green/10 blur-[80px]" />
      </div>

      <div ref={ref} className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-zaha-green/30 bg-zaha-green/10 px-5 py-2"
        >
          <span className="h-2 w-2 rounded-full bg-zaha-green" />
          <span className="text-sm font-medium text-zaha-green-light">
            Zaha est agréé Crédit Impôt Innovation
          </span>
        </motion.div>

        {/* Big dramatic number with gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span
            className="block font-mono font-black leading-none"
            style={{
              fontSize: "clamp(6rem, 22vw, 16rem)",
              background: "linear-gradient(135deg, #4A7C5C 0%, #2D5A3D 40%, #E87A3A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 8px 32px rgba(45, 90, 61, 0.4))",
            }}
          >
            {displayValue}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-white/80 md:text-2xl lg:text-3xl"
          style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.875rem)" }}
        >
          de crédit d&#39;impôt sur votre projet logiciel innovant
        </motion.p>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mx-auto mt-6 max-w-xl text-base text-white/50 md:text-lg"
        >
          Recevez 20% du coût de votre projet logiciel innovant en crédit d&#39;impôt grâce au Crédit Impôt Innovation — jusqu&#39;à 60% si votre entreprise est domiciliée en outre-mer.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Découvrir
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-white/30"
            >
              <path
                d="M10 3v14m0 0l-5-5m5 5l5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
