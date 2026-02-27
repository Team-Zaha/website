"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface StackBlockData {
  name: string;
  description: string;
  color: string;
  textColor: string;
}

const stackBlocks: StackBlockData[] = [
  {
    name: "Vercel / Digital Ocean",
    description: "Deploiement instantane, scaling automatique",
    color: "var(--zaha-black)",
    textColor: "#ffffff",
  },
  {
    name: "TypeScript",
    description: "Fiabilite et maintenabilite du code",
    color: "var(--zaha-green)",
    textColor: "#ffffff",
  },
  {
    name: "Node.js",
    description: "Backend performant et scalable",
    color: "var(--zaha-green-light)",
    textColor: "#ffffff",
  },
  {
    name: "React",
    description: "UI composants reutilisables",
    color: "var(--zaha-orange)",
    textColor: "#ffffff",
  },
  {
    name: "Next.js",
    description: "Front + API routes, SSR, ISR",
    color: "var(--zaha-orange-light)",
    textColor: "#0A0A0A",
  },
];

function StackBlock({
  block,
  index,
  scrollYProgress,
  isMobile,
}: {
  block: StackBlockData;
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const start = 0.1 + index * 0.12;
  const end = start + 0.15;
  const slideFrom = index % 2 === 0 ? -400 : 400;

  const x = useTransform(
    scrollYProgress,
    [start, end],
    isMobile ? [0, 0] : [slideFrom, 0]
  );
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ x, opacity }}
      className="group relative w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl border-2 px-8 py-6 transition-all"
        style={{
          backgroundColor: block.color,
          borderColor: isHovered
            ? "rgba(255,255,255,0.4)"
            : "rgba(255,255,255,0.1)",
          color: block.textColor,
        }}
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Hover glow effect */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
            }}
          />
        )}

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold md:text-xl">{block.name}</h3>
            <p className="mt-1 text-sm opacity-70">{block.description}</p>
          </div>
          {/* Lego-style connector dots */}
          <div className="flex gap-1.5 opacity-40">
            <div
              className="h-3 w-3 rounded-full border"
              style={{ borderColor: block.textColor }}
            />
            <div
              className="h-3 w-3 rounded-full border"
              style={{ borderColor: block.textColor }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function StackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <SectionWrapper id="stack" dark className="relative">
      <div ref={sectionRef}>
        <RevealOnScroll>
          <h2 className="text-section-title mb-4 font-bold tracking-tight">
            Stack startup-ready
          </h2>
          <p className="mb-16 max-w-xl text-lg text-white/60">
            Des technologies eprouvees qui scalent avec votre business.
          </p>
        </RevealOnScroll>

        {/* Lego-style stack */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
          {stackBlocks.map((block, i) => (
            <StackBlock
              key={block.name}
              block={block}
              index={i}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
