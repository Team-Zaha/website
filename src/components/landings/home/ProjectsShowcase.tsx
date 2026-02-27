"use client";

import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SplitText } from "@/components/shared/SplitText";
import { TiltCard } from "@/components/shared/TiltCard";

const projects = [
  {
    name: "Longines",
    description: "E-commerce luxe multilingue",
    tags: ["Next.js", "React", "TypeScript"],
  },
  {
    name: "EDF Store & Forecast",
    description: "Prévision énergies renouvelables",
    tags: ["React", "Node.js"],
  },
  {
    name: "Agregio Solutions",
    description: "Plateforme énergie verte",
    tags: ["React", "Node.js"],
  },
  {
    name: "Leila",
    description: "SaaS intelligence industrielle, offline-first",
    tags: ["Astro", "React", "Node.js"],
  },
  {
    name: "Espace Aubade",
    description: "Lead technique, équipe de 6 devs",
    tags: ["React"],
  },
  {
    name: "Nuxe",
    description: "Yaco Progress Bar — conversion e-commerce",
    tags: ["Shopify"],
  },
  {
    name: "Toys\"R\"Us",
    description: "Yaco Progress Bar — panier moyen +18%",
    tags: ["Shopify"],
  },
  {
    name: "Razorfish",
    description: "Conseil digital & transformation web",
    tags: ["React", "Node.js"],
  },
  {
    name: "SQLI",
    description: "Plateforme e-commerce & intégration",
    tags: ["React", "TypeScript"],
  },
];

export function ProjectsShowcase() {
  return (
    <SectionWrapper dark id="projets">
      <RevealOnScroll>
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-zaha-green-light">
          R&eacute;f&eacute;rences
        </p>
      </RevealOnScroll>

      <SplitText
        text="ILS NOUS FONT CONFIANCE"
        tag="h2"
        className="mb-16 text-center text-section-title font-black uppercase tracking-tight text-white"
        staggerChildren={0.04}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.name} delay={i * 0.08} direction="up">
            <TiltCard className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-zaha-green-light/30">
              <h3 className="mb-2 text-xl font-bold text-white">
                {project.name}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-white/50">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          </RevealOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
