"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TiltCard } from "@/components/shared/TiltCard";

interface Project {
  name: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}

const projects: Project[] = [
  {
    name: "Barooders",
    description:
      "Marketplace e-commerce de seconde main sport. Storefront headless React sur Shopify.",
    tags: ["React", "Shopify", "Headless", "E-commerce"],
  },
  {
    name: "Livemeup",
    description:
      "Application web sur mesure de gestion d'evenements live avec streaming integre.",
    tags: ["Next.js", "Node.js", "WebSocket", "Sur mesure"],
  },
  {
    name: "Leila",
    description:
      "SaaS d'intelligence industrielle. PWA offline-first pour les operateurs terrain.",
    tags: ["PWA", "Offline-first", "SaaS", "Industrie"],
  },
  {
    name: "Feel Food",
    description:
      "Notre propre startup ! Incubateur de food trucks. Cree de zero, pivote, et lance.",
    tags: ["Startup", "React", "Node.js", "Notre creation"],
    highlight: true,
  },
];

export function ProjectsSection() {
  return (
    <SectionWrapper id="projets" dark className="relative">
      {/* Accent */}
      <div className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-zaha-orange/10 blur-[120px]" />

      <div className="relative z-10">
        <RevealOnScroll>
          <h2 className="text-section-title mb-4 font-bold tracking-tight">
            Ils ont lance avec nous
          </h2>
          <p className="mb-16 max-w-xl text-lg text-white/60">
            Des startups qui nous ont fait confiance pour leur MVP.
          </p>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.name} delay={i * 0.1}>
              <TiltCard
                className={`h-full rounded-2xl border p-8 backdrop-blur-sm ${
                  project.highlight
                    ? "border-zaha-orange/30 bg-gradient-to-br from-zaha-orange/10 to-transparent"
                    : "border-white/10 bg-white/5"
                }`}
                tiltDegree={6}
              >
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {project.name}
                    </h3>
                    {project.highlight && (
                      <span className="rounded-full bg-zaha-orange/20 px-3 py-1 text-xs font-bold text-zaha-orange">
                        By Zaha
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-white/60">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
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
