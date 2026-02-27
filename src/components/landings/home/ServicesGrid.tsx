"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TiltCard } from "@/components/shared/TiltCard";

/* ─── Real tech logos as inline SVGs ─── */

function ReactLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 16 16)" />
    </svg>
  );
}

function NodeLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 2L28 9v14l-12 7L4 23V9L16 2z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 2v14l12 7M16 16L4 9" stroke="currentColor" strokeWidth="1.2" />
      <text x="16" y="20" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold" fontFamily="var(--font-geist-mono)">JS</text>
    </svg>
  );
}

function ShopifyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M22 4l2 6h4l-8 24-8-24h4l2-6h4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M14 10h8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M17 17a3 3 0 003-3M18 17a3 3 0 01-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DesignLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M20 4l8 8-16 16H4v-8L20 4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M17 7l8 8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 28l6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

const clientServices = [
  {
    icon: <ReactLogo className="h-8 w-8" />,
    title: "Dev React & Next.js",
    description: "Interfaces performantes, SSR, ISR, composants design-system. Expertise front-end de pointe.",
  },
  {
    icon: <NodeLogo className="h-8 w-8" />,
    title: "Dev Node.js backend",
    description: "APIs robustes, microservices, temps réel. Architecture scalable et maintenable.",
  },
  {
    icon: <ShopifyLogo className="h-8 w-8" />,
    title: "Apps Shopify",
    description: "Progress bars, upsell, extensions checkout. Nuxe, Toys\"R\"Us, Hozane nous font confiance.",
  },
  {
    icon: <DesignLogo className="h-8 w-8" />,
    title: "UX/UI Design",
    description: "Recherche utilisateur, wireframes, prototypage. Design centré sur la conversion.",
  },
];

const freelanceServices = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14l7 7L25 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Missions qualifiées",
    description: "Des projets ambitieux avec des clients grands comptes et startups innovantes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v8l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Coaching & support",
    description: "Accompagnement technique, revues de code, montée en compétences continue.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 11h20" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Admin simplifiée",
    description: "Facturation, contrats, relances — on gère l'administratif pour vous.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Communauté de pairs",
    description: "Échanges entre séniors, partage d'opportunités, entraide technique.",
  },
];

function ServiceCard({
  icon,
  title,
  description,
  index,
  variant,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  variant: "light" | "dark";
}) {
  const isLight = variant === "light";
  return (
    <RevealOnScroll delay={index * 0.1} direction="up" className="h-full">
      <TiltCard
        className={`flex h-full flex-col rounded-2xl border p-8 transition-colors ${
          isLight
            ? "border-zaha-black/5 bg-white hover:border-zaha-green/20 hover:shadow-lg"
            : "border-white/10 bg-white/5 backdrop-blur-sm hover:border-zaha-green-light/30"
        }`}
      >
        <div className={`mb-5 ${isLight ? "text-zaha-green" : "text-zaha-green-light"}`}>
          {icon}
        </div>
        <h3
          className={`mb-2 text-lg font-bold ${
            isLight ? "text-zaha-black" : "text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-auto text-sm leading-relaxed ${
            isLight ? "text-zaha-black/60" : "text-white/60"
          }`}
        >
          {description}
        </p>
      </TiltCard>
    </RevealOnScroll>
  );
}

export function ServicesGrid() {
  return (
    <SectionWrapper className="bg-zaha-white">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Clients column */}
        <div>
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
              Pour vous, clients
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-zaha-black md:text-3xl">
              Votre projet, nos experts
            </h2>
          </RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-2">
            {clientServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} variant="light" />
            ))}
          </div>
        </div>

        {/* Freelances column */}
        <div className="rounded-3xl bg-zaha-black p-8 md:p-10">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
              Pour vous, freelances
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Votre talent, notre réseau
            </h2>
          </RevealOnScroll>
          <div className="grid gap-6 sm:grid-cols-2">
            {freelanceServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} variant="dark" />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
