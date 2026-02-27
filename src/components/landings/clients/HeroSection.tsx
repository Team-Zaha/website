"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/shared/SplitText";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useIsMobile } from "@/hooks/useMediaQuery";

/* ─── Zaha Logo (combined inline SVG from Figma) ─── */
function ZahaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 315 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zaha"
    >
      <g transform="translate(0, 87.5) scale(1, -1)">
        <path d="M83.9677 33.9026C79.8931 33.9026 75.6153 31.2602 75.6153 29.0254C75.6153 27.8054 76.4301 26.383 77.856 24.7564L83.1525 18.8617C84.1713 17.4393 84.7829 16.4222 84.7829 15.8128C84.7829 15.2033 83.7638 12.967 79.2818 12.967C74.1891 12.967 66.2438 14.9992 55.0387 19.0646C43.9621 22.8829 35.8739 24.9109 31.1635 24.9568L102.697 87.5108H99.6743C95.6455 83.7717 91.1915 79.7545 86.444 75.5449C80.5176 75.5769 70.0234 78.3931 55.6409 84.0516C51.1589 85.6778 47.492 86.4914 44.4365 86.4914C38.528 86.4914 32.4165 83.4421 26.5083 77.5475C20.3969 71.4492 17.3407 66.1643 17.3407 61.6923C17.3407 57.6271 22.5418 55.595 26.82 55.595C31.0981 55.595 33.0275 59.0508 33.0275 61.4894C33.0275 62.0988 32.6201 63.1159 31.6014 64.7416L27.9345 70.8398C26.9161 72.4651 26.5083 73.4823 26.5083 73.8891C26.5083 75.3115 29.1571 77.141 32.4165 77.141C34.8611 77.141 40.9728 75.3115 50.9556 71.8557C60.8015 68.2473 68.4628 65.8278 73.9488 64.5917C48.932 42.8633 19.4511 18.1923 3.71337e-05 0L2.68775 0.0556019L19.0716 14.3828C24.0214 14.2518 32.2136 12.215 43.8343 8.08889C55.8539 3.81953 64.4102 1.78772 69.9109 1.78772C73.7817 1.78772 77.4485 3.61691 81.1154 7.2756C88.2459 14.1859 91.9127 20.6909 91.9127 26.5856C91.9127 30.6508 89.061 33.9026 83.9677 33.9026Z" fill="currentColor" />
      </g>
      <g transform="translate(103.3, 87.7) scale(1, -1)">
        <path d="M43.1595 16.7627V34.2626C38.9024 33.7899 34.7643 33.3168 30.5072 32.7256C20.6931 31.6613 17.264 24.8029 17.264 16.5261C17.264 9.43147 19.9835 1.98184 29.3248 1.98184C35.4733 1.98184 43.1595 7.3026 43.1595 16.7627ZM69.4092 1.50875V1.27221C53.092 -1.80156 44.2238 0.0901374 43.2773 13.6883C41.9768 6.5936 36.4195 0.326678 23.4125 0.326678C7.80429 0.326678 0.236541 5.52932 0 16.2896C0.236541 26.4587 10.2875 31.0698 24.4765 32.6068L43.1595 34.736V44.5498C43.1595 53.1815 38.4299 57.6748 29.3248 57.6748C16.0813 57.7933 10.1691 45.7325 8.51359 36.509H8.15925C-2.24635 45.9691 7.44963 58.1479 29.5614 58.1479C49.4264 58.1479 59.9501 51.6445 59.9501 39.3472V16.2896C59.832 6.94826 60.1867 2.09964 69.4092 1.50875Z" fill="currentColor" />
      </g>
      <g transform="translate(177, 86.3) scale(1, -1)">
        <path d="M59.477 36.0645V7.62939e-06H42.6861V40.6763C42.6861 49.308 40.4397 54.3922 33.9363 54.3922C27.314 54.3922 17.9734 47.5341 16.7906 31.3346V7.62939e-06H0V77.3316C6.38504 78.2778 12.5342 81.7069 16.7906 85.8456V35.5914C18.9189 48.2437 26.4866 56.8757 40.7941 56.8757C52.9736 56.8757 59.3586 49.5445 59.477 36.0645Z" fill="currentColor" />
      </g>
      <g transform="translate(245.3, 87.7) scale(1, -1)">
        <path d="M43.1592 16.7627V34.2626C38.9024 33.7899 34.7637 33.3168 30.5075 32.7256C20.6925 31.6613 17.2637 24.8029 17.2637 16.5261C17.2637 9.43147 19.9832 1.98184 29.3245 1.98184C35.4733 1.98184 43.1592 7.3026 43.1592 16.7627ZM69.4096 1.50875V1.27221C53.0917 -1.80156 44.2235 0.0901374 43.277 13.6883C41.9762 6.5936 36.4192 0.326678 23.4122 0.326678C7.80367 0.326678 0.236556 5.52932 1.52588e-05 16.2896C0.236556 26.4587 10.2869 31.0698 24.4762 32.6068L43.1592 34.736V44.5498C43.1592 53.1815 38.4293 57.6748 29.3245 57.6748C16.081 57.7933 10.1691 45.7325 8.51329 36.509H8.15895C-2.24665 45.9691 7.44902 58.1479 29.561 58.1479C49.4261 58.1479 59.9495 51.6445 59.9495 39.3472V16.2896C59.8317 6.94826 60.186 2.09964 69.4096 1.50875Z" fill="currentColor" />
      </g>
    </svg>
  );
}

/* ─── Blob definition for the mesh gradient ─── */
interface BlobProps {
  color: string;
  size: string;
  top: string;
  left: string;
  duration: number;
  delay?: number;
  path: { x: string[]; y: string[] };
}

function GradientBlob({ color, size, top, left, duration, delay = 0, path }: BlobProps) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        willChange: "transform",
      }}
      animate={{
        x: path.x,
        y: path.y,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(
    scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -150]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(
    scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 1.2]
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#1a3a28]"
    >
      {/* ── Animated mesh gradient (pure CSS, GPU-accelerated) ── */}
      <motion.div
        className="pointer-events-none absolute inset-[-50%] blur-[80px] md:blur-[120px]"
        style={{ scale: bgScale, willChange: "transform" }}
      >
        {/* Deep green — large, slow, anchors the palette */}
        <GradientBlob
          color="rgba(45, 90, 61, 0.9)"
          size="70vmax"
          top="10%"
          left="0%"
          duration={23}
          path={{ x: ["0%", "30%", "-10%"], y: ["0%", "25%", "-15%"] }}
        />
        {/* Bright green — mid, offset rhythm */}
        <GradientBlob
          color="rgba(74, 124, 92, 0.85)"
          size="55vmax"
          top="-10%"
          left="40%"
          duration={19}
          delay={2}
          path={{ x: ["0%", "-35%", "15%"], y: ["0%", "30%", "10%"] }}
        />
        {/* Orange — high contrast pop */}
        <GradientBlob
          color="rgba(232, 122, 58, 0.8)"
          size="50vmax"
          top="50%"
          left="-10%"
          duration={17}
          delay={4}
          path={{ x: ["0%", "45%", "20%"], y: ["0%", "-30%", "15%"] }}
        />
        {/* Light orange — secondary warmth */}
        <GradientBlob
          color="rgba(240, 154, 94, 0.7)"
          size="40vmax"
          top="20%"
          left="60%"
          duration={21}
          delay={6}
          path={{ x: ["0%", "-25%", "30%"], y: ["0%", "35%", "-20%"] }}
        />
        {/* Brand green #4d7e64 — center mass */}
        <GradientBlob
          color="rgba(77, 126, 100, 0.9)"
          size="65vmax"
          top="20%"
          left="20%"
          duration={27}
          delay={1}
          path={{ x: ["0%", "15%", "-20%"], y: ["0%", "-15%", "20%"] }}
        />
        {/* Beige accent — light, fleeting */}
        <GradientBlob
          color="rgba(245, 230, 211, 0.5)"
          size="35vmax"
          top="60%"
          left="50%"
          duration={15}
          delay={8}
          path={{ x: ["0%", "-30%", "10%"], y: ["0%", "-25%", "5%"] }}
        />
      </motion.div>

      {/* Top fade for nav readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#1a3a28]/50 to-transparent" />

      {/* Content with parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center md:px-12"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <ZahaLogo className="mx-auto h-14 w-auto text-zaha-beige drop-shadow-lg md:h-20 lg:h-24" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium tracking-wide text-zaha-beige backdrop-blur-sm"
        >
          Collectif d&apos;experts &middot; Agr&eacute;&eacute; CII
        </motion.div>

        <SplitText
          text="Des experts triés sur le volet pour vos projets les plus ambitieux"
          tag="h1"
          className="text-hero font-bold tracking-tight text-white drop-shadow-md"
          delay={0.9}
          staggerChildren={0.04}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2, ease: [0.33, 1, 0.68, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Des &eacute;quipes sur mesure en React, Next.js et Node.js pour
          acc&eacute;l&eacute;rer vos projets web et mobile. Jusqu&apos;&agrave;
          60% d&apos;&eacute;conomie gr&acirc;ce au Cr&eacute;dit Imp&ocirc;t Innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton
            href="/contact"
            className="rounded-full bg-zaha-beige px-8 py-4 text-base font-semibold text-zaha-green shadow-lg transition-all hover:bg-white hover:shadow-xl"
          >
            Discutons de votre projet
          </MagneticButton>
          <MagneticButton
            href="#projets"
            className="rounded-full border-2 border-white/25 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
          >
            Voir nos projets
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/25 pt-2"
        >
          <motion.div className="h-1.5 w-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
