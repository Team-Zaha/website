"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface Sector {
  name: string;
  icon: React.ReactNode;
}

function GasIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <path
        d="M24 6c-6 8-14 14-14 24a14 14 0 0028 0C38 20 30 14 24 6z"
        stroke="var(--zaha-green-light)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 20c-3 4-6 7-6 12a6 6 0 0012 0c0-5-3-8-6-12z"
        fill="var(--zaha-green)"
        opacity="0.3"
      />
    </svg>
  );
}

function MiningIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <path
        d="M8 38l16-28 16 28H8z"
        stroke="var(--zaha-green-light)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 38l8-14 8 14"
        fill="var(--zaha-green)"
        opacity="0.2"
      />
      <line x1="24" y1="24" x2="24" y2="38" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.4" />
      <line x1="16" y1="38" x2="32" y2="38" stroke="var(--zaha-green)" strokeWidth="2" />
    </svg>
  );
}

function AgricultureIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <path
        d="M24 40V20"
        stroke="var(--zaha-green)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 20c0-8 10-14 10-14s-2 10-10 14z"
        stroke="var(--zaha-green-light)"
        strokeWidth="2"
        fill="var(--zaha-green)"
        fillOpacity="0.2"
      />
      <path
        d="M24 26c0-8-10-14-10-14s2 10 10 14z"
        stroke="var(--zaha-green-light)"
        strokeWidth="2"
        fill="var(--zaha-green)"
        fillOpacity="0.2"
      />
      <line x1="14" y1="40" x2="34" y2="40" stroke="var(--zaha-green)" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function ManufactureIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <rect x="6" y="24" width="12" height="18" rx="1" stroke="var(--zaha-green-light)" strokeWidth="2" />
      <rect x="18" y="16" width="12" height="26" rx="1" stroke="var(--zaha-green-light)" strokeWidth="2" />
      <rect x="30" y="8" width="12" height="34" rx="1" stroke="var(--zaha-green-light)" strokeWidth="2" />
      <rect x="10" y="30" width="4" height="4" rx="1" fill="var(--zaha-green)" opacity="0.4" />
      <rect x="22" y="22" width="4" height="4" rx="1" fill="var(--zaha-green)" opacity="0.4" />
      <rect x="34" y="14" width="4" height="4" rx="1" fill="var(--zaha-green)" opacity="0.4" />
    </svg>
  );
}

function FuelIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
      <rect x="10" y="12" width="20" height="28" rx="2" stroke="var(--zaha-green-light)" strokeWidth="2" />
      <path d="M30 22h6a2 2 0 012 2v10a2 2 0 01-2 2h-2" stroke="var(--zaha-green-light)" strokeWidth="2" />
      <rect x="14" y="18" width="12" height="8" rx="1" fill="var(--zaha-green)" opacity="0.25" />
      <line x1="20" y1="8" x2="20" y2="12" stroke="var(--zaha-green)" strokeWidth="2" />
      <circle cx="36" cy="18" r="3" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

const sectors: Sector[] = [
  { name: "Gazière", icon: <GasIcon /> },
  { name: "Minière", icon: <MiningIcon /> },
  { name: "Agriculture", icon: <AgricultureIcon /> },
  { name: "Manufacture", icon: <ManufactureIcon /> },
  { name: "Extraction de carburant", icon: <FuelIcon /> },
];

export function SectorsSection() {
  return (
    <SectionWrapper dark id="secteurs" className="relative">
      <div className="relative z-10">
        <RevealOnScroll>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zaha-green-light">
            Secteurs
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <h2 className="text-section-title mx-auto mb-16 max-w-3xl text-center font-bold text-white">
            {"Pensé pour les environnements exigeants"}
          </h2>
        </RevealOnScroll>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
          {sectors.map((sector, i) => (
            <RevealOnScroll key={sector.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex flex-col items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-colors hover:border-zaha-green/25 hover:bg-white/[0.05]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-zaha-green/5 transition-colors group-hover:bg-zaha-green/10">
                  {sector.icon}
                </div>
                <p className="text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                  {sector.name}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
