"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface LetterPosition {
  char: string;
  finalX: number;
  finalY: number;
  scatterX: number;
  scatterY: number;
  scatterRotation: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildLetterPositions(
  lines: string[],
  charWidth: number,
  lineHeight: number
): LetterPosition[] {
  const rng = seededRandom(42);
  const positions: LetterPosition[] = [];

  lines.forEach((line, lineIdx) => {
    const totalWidth = line.length * charWidth;
    const startX = -totalWidth / 2;
    const y = lineIdx * lineHeight - ((lines.length - 1) * lineHeight) / 2;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === " ") continue;
      positions.push({
        char: line[i],
        finalX: startX + i * charWidth,
        finalY: y,
        scatterX: (rng() - 0.5) * 800,
        scatterY: (rng() - 0.5) * 600 + 200,
        scatterRotation: (rng() - 0.5) * 360,
      });
    }
  });
  return positions;
}

const LINES = ["De l'idee", "au produit"];
const CHAR_WIDTH_DESKTOP = 48;
const CHAR_WIDTH_MOBILE = 28;
const LINE_HEIGHT_DESKTOP = 72;
const LINE_HEIGHT_MOBILE = 46;

export function HeroSection() {
  const [phase, setPhase] = useState<
    "trail" | "scatter" | "assemble" | "done"
  >("trail");
  const trailControls = useAnimation();
  const isMobile = useIsMobile();
  const hasRun = useRef(false);

  const charWidth = isMobile ? CHAR_WIDTH_MOBILE : CHAR_WIDTH_DESKTOP;
  const lineHeight = isMobile ? LINE_HEIGHT_MOBILE : LINE_HEIGHT_DESKTOP;
  const letters = buildLetterPositions(LINES, charWidth, lineHeight);

  const runSequence = useCallback(async () => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Phase 1: Rocket trail shoots up
    await trailControls.start({
      y: [800, -200],
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    });

    // Phase 2: Letters scatter (appear in random positions)
    setPhase("scatter");

    // Phase 3: Letters magnetically assemble
    await new Promise((r) => setTimeout(r, 300));
    setPhase("assemble");

    // Phase 4: Subtitle appears
    await new Promise((r) => setTimeout(r, 1200));
    setPhase("done");
  }, [trailControls]);

  useEffect(() => {
    const timeout = setTimeout(runSequence, 400);
    return () => clearTimeout(timeout);
  }, [runSequence]);

  return (
    <SectionWrapper
      id="hero"
      dark
      fullHeight
      className="relative overflow-hidden !px-0"
    >
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/3 top-0 h-[800px] w-[800px] rounded-full bg-zaha-green/25 blur-[150px]" />
        <div className="absolute -right-1/4 bottom-0 h-[700px] w-[700px] rounded-full bg-zaha-orange/20 blur-[130px]" />
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-zaha-green/10 blur-[100px]" />
      </div>

      {/* Rocket trail */}
      <motion.div
        animate={trailControls}
        initial={{ y: 800, opacity: 0 }}
        className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2"
      >
        <div className="relative">
          {/* Main streak */}
          <div
            className="h-[300px] w-[3px] rounded-full"
            style={{
              background:
                "linear-gradient(to top, transparent, var(--zaha-green), var(--zaha-orange), white)",
            }}
          />
          {/* Glow */}
          <div
            className="absolute inset-0 h-[300px] w-[3px] blur-[12px]"
            style={{
              background:
                "linear-gradient(to top, transparent, var(--zaha-green), var(--zaha-orange))",
            }}
          />
          {/* Head glow */}
          <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-white blur-[6px]" />
        </div>
      </motion.div>

      {/* Letters that scatter then assemble */}
      <div className="relative z-20 flex h-full w-full items-center justify-center">
        <div
          className="relative"
          style={{
            width: charWidth * 12,
            height: lineHeight * 2.5,
          }}
        >
          {letters.map((letter, i) => {
            const mobileScatterX = letter.scatterX * 0.5;
            const mobileScatterY = letter.scatterY * 0.5;
            const sX = isMobile ? mobileScatterX : letter.scatterX;
            const sY = isMobile ? mobileScatterY : letter.scatterY;

            return (
              <motion.span
                key={`${letter.char}-${i}`}
                className="absolute left-1/2 top-1/2 font-black text-white"
                style={{
                  fontSize: isMobile
                    ? "clamp(1.8rem, 6vw, 2.5rem)"
                    : "clamp(2.5rem, 6vw, 4rem)",
                  lineHeight: 1,
                  textShadow:
                    phase === "assemble" || phase === "done"
                      ? "none"
                      : "0 0 20px rgba(232, 122, 58, 0.5)",
                }}
                initial={{
                  x: sX,
                  y: sY,
                  opacity: 0,
                  rotate: letter.scatterRotation,
                }}
                animate={
                  phase === "trail"
                    ? {
                        x: sX,
                        y: sY,
                        opacity: 0,
                        rotate: letter.scatterRotation,
                      }
                    : phase === "scatter"
                      ? {
                          x: sX,
                          y: sY,
                          opacity: 1,
                          rotate: letter.scatterRotation,
                        }
                      : {
                          x: letter.finalX,
                          y: letter.finalY,
                          opacity: 1,
                          rotate: 0,
                        }
                }
                transition={
                  phase === "scatter"
                    ? {
                        duration: 0.3,
                        ease: "easeOut",
                      }
                    : {
                        type: "spring",
                        stiffness: 250,
                        damping: 22,
                        delay: i * 0.02,
                      }
                }
              >
                {letter.char}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Subtitle that appears after letters assemble */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={
          phase === "done" ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
        }
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="absolute bottom-32 left-0 right-0 z-20 px-6 text-center"
      >
        <p
          className="mx-auto max-w-2xl font-light text-white/80"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
        >
          Une architecture pensee pour scaler des le jour 1.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase === "done" ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs font-medium uppercase tracking-widest">
            Scroller
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
    </SectionWrapper>
  );
}
