"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
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

/* ─── Infinite horizontal marquee ─── */
function Marquee() {
  const services = [
    "Architecture logicielle",
    "Développement web",
    "UX/UI Design",
    "Applications Shopify",
    "React & Next.js",
    "Design System",
    "E-commerce",
    "Performance",
  ];

  return (
    <div className="relative overflow-hidden border-y border-white/10 py-3 md:py-4">
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
          >
            {services.map((s) => (
              <span
                key={`${i}-${s}`}
                className="flex items-center gap-6 text-sm font-medium uppercase tracking-[0.2em] text-zaha-orange/50 md:gap-10 md:text-base"
              >
                {s}
                <span className="text-zaha-beige/20">&#x25C6;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
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
    isMobile ? [0, 0] : [0, -120]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* Mouse spotlight */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 40, damping: 25 });
  const smy = useSpring(my, { stiffness: 40, damping: 25 });
  const spotX = useTransform(smx, (v) => v * 100);
  const spotY = useTransform(smy, (v) => v * 100);
  const spotlightBg = useMotionTemplate`radial-gradient(900px circle at ${spotX}% ${spotY}%, rgba(232,122,58,0.07) 0%, transparent 70%)`;

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my]
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouse}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#0c1f15]"
    >
      {/* Mouse spotlight overlay */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: spotlightBg }}
        />
      )}

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

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full px-6 md:px-12 lg:px-20"
      >
        {/* Massive editorial typography */}
        <div>
          {/* Line 1: TECH & — filled white */}
          <ClipReveal delay={0.2}>
            <p className="hero-display font-black uppercase leading-[0.85] tracking-[-0.04em] text-white">
              TECH &amp;
            </p>
          </ClipReveal>

          {/* Line 2: CRÉATIFS, — filled beige */}
          <ClipReveal delay={0.35}>
            <p className="hero-display font-black uppercase leading-[0.85] tracking-[-0.04em] text-zaha-beige">
              CR&Eacute;ATIFS,
            </p>
          </ClipReveal>
        </div>

        {/* Marquee strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="my-3 md:my-5"
        >
          <Marquee />
        </motion.div>

        {/* Line 3: AU COLLECTIF. — outlined / stroke */}
        <ClipReveal delay={0.5}>
          <p className="hero-display hero-outline font-black uppercase leading-[0.85] tracking-[-0.04em]">
            AU COLLECTIF.
          </p>
        </ClipReveal>

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
              className="rounded-full bg-zaha-beige px-8 py-4 text-base font-semibold text-[#0c1f15] transition-all hover:shadow-[0_0_40px_rgba(245,230,211,0.25)]"
            >
              Lancer un projet
            </MagneticButton>
            <MagneticButton
              href="/rejoindre"
              className="rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white/60 transition-all hover:border-white/30 hover:text-white"
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
