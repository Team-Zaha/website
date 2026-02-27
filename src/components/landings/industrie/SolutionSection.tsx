"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TiltCard } from "@/components/shared/TiltCard";

interface SolutionCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

function OfflineIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      <circle cx="32" cy="32" r="28" stroke="var(--zaha-green)" strokeWidth="2" opacity="0.3" />
      <circle cx="32" cy="32" r="18" stroke="var(--zaha-green)" strokeWidth="2" opacity="0.5" />
      <circle cx="32" cy="32" r="8" fill="var(--zaha-green)" />
      {/* Sync arrows */}
      <path
        d="M44 20l4 4-4 4"
        stroke="var(--zaha-green-light)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 40l-4-4 4-4"
        stroke="var(--zaha-green-light)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TreeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      {/* Root node */}
      <rect x="24" y="4" width="16" height="12" rx="3" stroke="var(--zaha-green)" strokeWidth="2" />
      {/* Vertical line */}
      <line x1="32" y1="16" x2="32" y2="26" stroke="var(--zaha-green)" strokeWidth="2" />
      {/* Horizontal line */}
      <line x1="14" y1="26" x2="50" y2="26" stroke="var(--zaha-green)" strokeWidth="2" />
      {/* Left branch */}
      <line x1="14" y1="26" x2="14" y2="34" stroke="var(--zaha-green)" strokeWidth="2" />
      <rect x="6" y="34" width="16" height="10" rx="3" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
      {/* Right branch */}
      <line x1="50" y1="26" x2="50" y2="34" stroke="var(--zaha-green)" strokeWidth="2" />
      <rect x="42" y="34" width="16" height="10" rx="3" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
      {/* Leaves */}
      <rect x="2" y="50" width="12" height="8" rx="2" fill="var(--zaha-green)" opacity="0.3" />
      <rect x="18" y="50" width="12" height="8" rx="2" fill="var(--zaha-green)" opacity="0.3" />
      <rect x="38" y="50" width="12" height="8" rx="2" fill="var(--zaha-green)" opacity="0.3" />
      <rect x="54" y="50" width="8" height="8" rx="2" fill="var(--zaha-green)" opacity="0.3" />
      {/* Left leaf lines */}
      <line x1="8" y1="44" x2="8" y2="50" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="44" x2="24" y2="50" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      {/* Right leaf lines */}
      <line x1="44" y1="44" x2="44" y2="50" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      <line x1="58" y1="44" x2="58" y2="50" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function PGDIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      {/* Phase 1 - Collect */}
      <rect x="4" y="20" width="14" height="24" rx="3" stroke="var(--zaha-green)" strokeWidth="2" />
      <line x1="8" y1="28" x2="14" y2="28" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      <line x1="8" y1="32" x2="14" y2="32" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      <line x1="8" y1="36" x2="14" y2="36" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      {/* Arrow 1 */}
      <path d="M22 32h6l-2-2m2 2l-2 2" stroke="var(--zaha-green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Phase 2 - Verify */}
      <rect x="32" y="20" width="14" height="24" rx="3" stroke="var(--zaha-green)" strokeWidth="2" />
      <path d="M36 30l3 3 5-6" stroke="var(--zaha-green-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arrow 2 */}
      <path d="M50 32h6l-2-2m2 2l-2 2" stroke="var(--zaha-green-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Phase 3 - Analyze */}
      <rect x="46" y="20" width="14" height="24" rx="3" stroke="var(--zaha-green)" strokeWidth="2" fill="var(--zaha-green)" fillOpacity="0.15" />
      <path d="M50 38l4-10 4 6 2-4" stroke="var(--zaha-green-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Labels */}
      <text x="11" y="14" textAnchor="middle" fontSize="7" fill="var(--zaha-green-light)" opacity="0.7">1</text>
      <text x="39" y="14" textAnchor="middle" fontSize="7" fill="var(--zaha-green-light)" opacity="0.7">2</text>
      <text x="53" y="14" textAnchor="middle" fontSize="7" fill="var(--zaha-green-light)" opacity="0.7">3</text>
    </svg>
  );
}

function MultiTenantIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      {/* Central server */}
      <rect x="22" y="4" width="20" height="14" rx="3" stroke="var(--zaha-green)" strokeWidth="2" />
      <circle cx="28" cy="11" r="2" fill="var(--zaha-green)" />
      <circle cx="36" cy="11" r="2" fill="var(--zaha-green)" />
      {/* Lines to databases */}
      <line x1="26" y1="18" x2="12" y2="32" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      <line x1="32" y1="18" x2="32" y2="32" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      <line x1="38" y1="18" x2="52" y2="32" stroke="var(--zaha-green)" strokeWidth="1.5" opacity="0.5" />
      {/* Database 1 */}
      <ellipse cx="12" cy="36" rx="9" ry="4" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
      <path d="M3 36v10c0 2.2 4 4 9 4s9-1.8 9-4V36" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
      {/* Database 2 */}
      <ellipse cx="32" cy="36" rx="9" ry="4" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
      <path d="M23 36v10c0 2.2 4 4 9 4s9-1.8 9-4V36" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
      {/* Database 3 */}
      <ellipse cx="52" cy="36" rx="9" ry="4" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
      <path d="M43 36v10c0 2.2 4 4 9 4s9-1.8 9-4V36" stroke="var(--zaha-green-light)" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

const solutions: SolutionCard[] = [
  {
    title: "Mode hors-ligne complet",
    subtitle: "PWA",
    description:
      "Continuité opérationnelle sans connexion. Synchronisation automatique au retour réseau. Aucune perte de données.",
    icon: <OfflineIcon />,
  },
  {
    title: "Arbres conditionnants",
    subtitle: "Saisie intelligente",
    description:
      "Saisie intuitive par listes déroulantes conditionnées. Réduction drastique des erreurs de terrain.",
    icon: <TreeIcon />,
  },
  {
    title: "Processus de Gestion de Données",
    subtitle: "PGD en 3 phases",
    description:
      "Phase 1 : collecte terrain. Phase 2 : compilation et vérification. Phase 3 : analyse stratégique.",
    icon: <PGDIcon />,
  },
  {
    title: "Architecture multi-tenant",
    subtitle: "Scalabilité",
    description:
      "Base de code unique, bases de données séparées par client. Déploiement d'une nouvelle instance en heures.",
    icon: <MultiTenantIcon />,
  },
];

export function SolutionSection() {
  return (
    <SectionWrapper dark id="solution" className="relative">
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45,90,61,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,90,61,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <RevealOnScroll>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-zaha-green-light">
            Notre solution
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <h2 className="text-section-title mx-auto mb-20 max-w-3xl text-center font-bold text-white">
            {"Quatre piliers d'innovation"}
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-12 md:gap-20">
          {solutions.map((solution, i) => (
            <RevealOnScroll key={solution.title} delay={i * 0.1} distance={80}>
              <TiltCard
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm md:p-12"
                tiltDegree={4}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-zaha-green/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border border-zaha-green/20 bg-zaha-green/5"
                  >
                    {solution.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="rounded-full bg-zaha-green/15 px-3 py-1 text-xs font-medium text-zaha-green-light">
                        {solution.subtitle}
                      </span>
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                      {solution.title}
                    </h3>
                    <p className="max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
                      {solution.description}
                    </p>
                  </div>

                  {/* Index number */}
                  <div className="hidden text-right md:block">
                    <span className="text-6xl font-bold text-zaha-green/10">
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
