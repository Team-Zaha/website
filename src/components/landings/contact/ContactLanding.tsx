"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LandingLayout } from "@/components/shared/LandingLayout";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useIsMobile } from "@/hooks/useMediaQuery";

const contactInfo = [
  {
    label: "Email",
    value: "bonjour@zaha.fr",
    href: "mailto:bonjour@zaha.fr",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Yann Lombard",
    href: "https://www.linkedin.com/in/yann-lombard/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Bureau",
    value: "Note Up, Lyon",
    href: "https://note-up.fr/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export function ContactLanding() {
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const circleScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [1, 1, 1] : [0.9, 1.1, 1]
  );

  return (
    <LandingLayout dark grain>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-svh items-center justify-center overflow-hidden bg-zaha-black px-6 md:px-12 lg:px-24"
      >
        {/* Background circles */}
        <motion.div className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ scale: circleScale }}
            className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 md:h-[800px] md:w-[800px]"
          />
          <motion.div
            style={{ scale: circleScale }}
            className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 md:h-[600px] md:w-[600px]"
          />
          <motion.div
            style={{ scale: circleScale }}
            className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 md:h-[400px] md:w-[400px]"
          />

          {/* Accent dots */}
          <div className="absolute left-[12%] top-[25%] h-2 w-2 rounded-full bg-zaha-orange/30" />
          <div className="absolute bottom-[30%] right-[15%] h-3 w-3 rounded-full bg-zaha-green/20" />
          <div className="absolute bottom-[45%] left-[20%] h-1.5 w-1.5 rounded-full bg-zaha-orange/20" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <div className="text-center">
            <RevealOnScroll>
              <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
                Contact
              </p>
            </RevealOnScroll>

            <SplitText
              text="Parlons de votre projet"
              tag="h1"
              className="text-hero font-bold tracking-tight text-white"
              delay={0.2}
              staggerChildren={0.05}
            />

            <RevealOnScroll delay={0.6}>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
                Une question, un projet, une envie de collaborer ? &Eacute;crivez-nous,
                on vous r&eacute;pond sous 48h.
              </p>
            </RevealOnScroll>
          </div>

          {/* Contact cards */}
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {contactInfo.map((item, i) => (
              <RevealOnScroll key={item.label} delay={0.8 + i * 0.15} className="h-full">
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-10 text-center backdrop-blur-sm transition-colors hover:border-zaha-orange/30 hover:bg-white/[0.06]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-zaha-orange/10 text-zaha-orange transition-colors group-hover:bg-zaha-orange/20">
                    {item.icon}
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/40">
                    {item.label}
                  </p>
                  <p className="text-lg font-medium text-white/80 transition-colors group-hover:text-white">
                    {item.value}
                  </p>
                </a>
              </RevealOnScroll>
            ))}
          </div>

          {/* CTA */}
          <RevealOnScroll delay={1.3}>
            <div className="mt-16 flex justify-center">
              <MagneticButton
                href="mailto:bonjour@zaha.fr"
                className="rounded-full bg-zaha-orange px-10 py-5 text-lg font-semibold text-white transition-colors hover:bg-zaha-orange-light"
              >
                Nous écrire
              </MagneticButton>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={1.5}>
            <p className="mt-8 text-center text-sm text-white/30">
              R&eacute;ponse garantie sous 48h
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </LandingLayout>
  );
}
