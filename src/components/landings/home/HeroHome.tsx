"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useIsMobile } from "@/hooks/useMediaQuery";

/* ─── Clip-reveal wrapper (text slides up from below) ─── */
function ClipReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 1.1,
          delay,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Floating cards ─── */
const freelances = [
  {
    name: "Yann",
    talent: "Architecte Fullstack",
    tags: ["E-commerce", "Performance"],
    style: { top: "8%", right: "34%" },
    rotate: -6,
    floatDuration: 5.2,
    floatDelay: 0,
    floatY: 12,
  },
  {
    name: "Paula",
    talent: "Traductrice",
    tags: ["Espagnol", "Anglais", "Français"],
    style: { top: "14%", right: "6%" },
    rotate: 4,
    floatDuration: 7,
    floatDelay: 1.8,
    floatY: 14,
  },
  {
    name: "Thibaud",
    talent: "Développeur React Senior",
    tags: ["Développement web", "Architecture logicielle"],
    style: { top: "30%", right: "22%" },
    rotate: -3,
    floatDuration: 6.4,
    floatDelay: 1.2,
    floatY: 16,
  },
  {
    name: "Maxime",
    talent: "UX & UI Designer",
    tags: ["UX/UI Design", "Design System"],
    style: { top: "42%", right: "4%" },
    rotate: 5,
    floatDuration: 5.8,
    floatDelay: 0.6,
    floatY: 10,
  },
];

function FloatingCard({
  f,
  index,
}: {
  f: (typeof freelances)[number];
  index: number;
}) {
  return (
    <motion.div
      className="pointer-events-auto absolute cursor-grab active:cursor-grabbing"
      style={f.style}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 1.2 + index * 0.2,
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      }}
      drag
      dragMomentum={false}
      dragElastic={0.15}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
    >
      <motion.div
        animate={{ y: [-f.floatY / 2, f.floatY / 2, -f.floatY / 2] }}
        transition={{
          duration: f.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: f.floatDelay,
        }}
      >
        <CardContent f={f} />
      </motion.div>
    </motion.div>
  );
}

function CardContent({ f }: { f: (typeof freelances)[number] }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-zaha-beige px-2.5 py-2 shadow-[0_0_30px_rgba(245,230,211,0.25),0_0_60px_rgba(232,122,58,0.1)] lg:rounded-2xl lg:px-5 lg:py-4"
      style={{ transform: `rotate(${f.rotate}deg)` }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-zaha-orange/20 via-zaha-orange to-zaha-orange/20 lg:h-[3px]" />

      <p className="relative text-[10px] font-medium tracking-wide text-[#0c1f15] lg:text-sm">
        {f.name}
      </p>
      <p className="relative mt-0.5 text-[8px] font-light uppercase tracking-[0.15em] text-zaha-orange lg:mt-1 lg:text-[11px]">
        {f.talent}
      </p>
      <div className="relative mt-1 flex flex-wrap gap-0.5 lg:mt-2.5 lg:gap-1.5">
        {f.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#0c1f15]/15 px-1.5 py-px text-[7px] font-normal tracking-wider text-[#0c1f15]/60 lg:px-2.5 lg:py-0.5 lg:text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 mx-auto hidden max-w-[1400px] lg:block">
      {freelances.map((f, i) => (
        <FloatingCard key={f.name} f={f} index={i} />
      ))}
    </div>
  );
}

/* ─── Hero Home ─── */
export function HeroHome() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  /* Scroll-based parallax */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [0, -120],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#0c1f15]"
    >
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top fade for nav readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-[#0c1f15]/60 to-transparent" />

      {/* Floating cards — right side */}
      <FloatingCards />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full px-6 md:px-12 lg:px-20"
      >
        {/* Massive editorial typography — H1 de la page */}
        <h1>
          <div>
            {/* Line 1: TECH & — filled white */}
            <ClipReveal delay={0.2}>
              <span className="hero-display block font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
                TECH &amp;{" "}
              </span>
            </ClipReveal>

            {/* Line 2: CRÉATIFS, — filled beige */}
            <ClipReveal delay={0.35}>
              <span className="hero-display block font-black uppercase leading-[0.85] tracking-[-0.04em] text-zaha-beige">
                CR&Eacute;ATIFS,{" "}
              </span>
            </ClipReveal>
          </div>

          {/* Line 3: AU COLLECTIF. — outlined / stroke */}
          <ClipReveal delay={0.5}>
            <span className="hero-display hero-outline block font-black uppercase leading-[0.85] tracking-[-0.04em]">
              AU COLLECTIF.{" "}
            </span>
          </ClipReveal>

          {/* Complement porteur de sens pour les moteurs et les LLM :
              le titre visuel seul ne dit pas ce que fait Zaha. */}
          <span className="sr-only">
            {" "}
            — Zaha, collectif d&apos;experts en architecture logicielle et
            d&eacute;veloppement web React, Next.js et Node.js.
          </span>
        </h1>

        {/* Bottom row: subtitle left + CTAs right */}
        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.7,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="max-w-md text-base font-light leading-relaxed text-white/45 md:text-lg"
          >
            Un collectif de talents s&eacute;niors — tech et cr&eacute;atifs —
            pour vos projets m&eacute;tier, web, e-commerce, mobile les plus
            ambitieux.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton
              href="/contact"
              className="flex items-center justify-center rounded-full bg-zaha-beige px-8 py-4 text-center text-base font-semibold text-[#0c1f15] transition-all hover:shadow-[0_0_40px_rgba(245,230,211,0.25)]"
            >
              Lancer un projet
            </MagneticButton>
            <MagneticButton
              href="/rejoindre"
              className="flex items-center justify-center rounded-full border border-white/15 px-8 py-4 text-center text-base font-semibold text-white/60 transition-all hover:border-white/30 hover:text-white"
            >
              Rejoindre le collectif
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 pt-2"
        >
          <motion.div className="h-1.5 w-1.5 rounded-full bg-white/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
