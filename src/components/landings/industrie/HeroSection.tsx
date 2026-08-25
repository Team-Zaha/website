"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

function SignalBars({ level }: { level: number }) {
  const bars = [
    { height: 20, delay: 0 },
    { height: 32, delay: 0.05 },
    { height: 44, delay: 0.1 },
    { height: 56, delay: 0.15 },
  ];

  return (
    <svg
      viewBox="0 0 80 60"
      className="h-16 w-20 md:h-24 md:w-32"
      aria-label={`Signal: ${level} sur 4 barres`}
    >
      {bars.map((bar, i) => {
        const isActive = i < level;
        const x = i * 20;
        const y = 60 - bar.height;

        return (
          <motion.rect
            key={i}
            x={x + 2}
            y={y}
            width={14}
            rx={2}
            initial={{ height: bar.height, opacity: 1 }}
            animate={{
              height: isActive ? bar.height : 8,
              y: isActive ? y : 52,
              opacity: isActive ? 1 : 0.15,
            }}
            transition={{
              duration: 0.4,
              delay: bar.delay,
              ease: [0.33, 1, 0.68, 1],
            }}
            fill={isActive ? "var(--zaha-green)" : "#333"}
          />
        );
      })}
    </svg>
  );
}

function TerminalText({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayedChars < text.length) {
      const speed = Math.random() * 60 + 30;
      const timeout = setTimeout(() => {
        setDisplayedChars((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [displayedChars, text.length, onComplete]);

  return (
    <span className="font-mono">
      {/*
        Le texte complet est rendu côté serveur pour les moteurs de recherche,
        les LLM et les lecteurs d'écran ; l'effet machine à écrire n'est qu'une
        surcouche visuelle.
      */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, displayedChars)}
        <span
          className={`inline-block w-[3px] bg-zaha-green transition-opacity ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        >
          &nbsp;
        </span>
      </span>
    </span>
  );
}

export function HeroSection() {
  const [signalLevel, setSignalLevel] = useState(4);
  const [phase, setPhase] = useState<"signal" | "title" | "subtitle">("signal");

  useEffect(() => {
    const sequence = [
      { level: 3, delay: 600 },
      { level: 2, delay: 1100 },
      { level: 1, delay: 1500 },
      { level: 0, delay: 1900 },
    ];

    const timeouts = sequence.map(({ level, delay }) =>
      setTimeout(() => setSignalLevel(level), delay),
    );

    const titleTimeout = setTimeout(() => setPhase("title"), 2600);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(titleTimeout);
    };
  }, []);

  return (
    <SectionWrapper dark fullHeight className="relative overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45,90,61,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,90,61,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Green accent glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-zaha-green/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Signal animation */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "signal" ? 1 : 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SignalBars level={signalLevel} />
        </motion.div>

        {/* Title with terminal effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "title" || phase === "subtitle"
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          <h1 className="text-hero max-w-5xl font-bold tracking-tight text-white">
            <TerminalText
              text="L'innovation offline-first pour l'industrie"
              onComplete={() => setPhase("subtitle")}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={
              phase === "subtitle"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl text-lg text-white/60 md:text-xl"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            Des applications web qui fonctionnent{" "}
            <span className="text-zaha-green-light font-medium">
              {"même là où le réseau ne passe pas."}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={
              phase === "subtitle"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#solution"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-zaha-green/30 px-6 py-3 text-sm font-medium text-zaha-green-light transition-colors hover:bg-zaha-green/10"
            >
              Découvrir
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="animate-bounce"
              >
                <path
                  d="M8 3v10m0 0l-4-4m4 4l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
