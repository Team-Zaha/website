"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { useIsMobile } from "@/hooks/useMediaQuery";

const projects = [
  {
    name: "Longines.com",
    stack: "Next.js, React, TypeScript",
    description: "E-commerce multilingue fort trafic pour la maison horlogere suisse",
    color: "bg-zaha-green",
    accent: "text-zaha-green",
    tagBg: "bg-zaha-green/10",
  },
  {
    name: "Agregio Solutions",
    stack: "React, Node.js",
    description:
      "Plateformes de prevision energies renouvelables pour le leader de l'energie",
    color: "bg-zaha-orange",
    accent: "text-zaha-orange",
    tagBg: "bg-zaha-orange/10",
  },
  {
    name: "Espace Aubade",
    stack: "React",
    description: "Lead d'une équipe de 6 développeurs frontend sur l'e-commerce salle de bain",
    color: "bg-zaha-green-light",
    accent: "text-zaha-green-light",
    tagBg: "bg-zaha-green-light/10",
  },
  {
    name: "Leila",
    stack: "Astro, React, Node.js",
    description:
      "Intelligence industrielle, PWA offline-first pour le secteur manufacturier",
    color: "bg-zaha-orange-light",
    accent: "text-zaha-orange-light",
    tagBg: "bg-zaha-orange-light/10",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0, 0] : [30, -30]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [1, 1, 1] : [0.95, 1, 0.95]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale }}
      className="group relative"
    >
      <RevealOnScroll delay={index * 0.15} direction="up">
        <div className="relative overflow-hidden rounded-2xl border border-zaha-black/5 bg-white transition-all duration-500 hover:border-zaha-black/10 hover:shadow-xl">
          {/* Top accent bar */}
          <div className={`h-1.5 w-full ${project.color}`} />

          <div className="p-8 lg:p-10">
            {/* Project number */}
            <span className="mb-4 block text-sm font-mono text-zaha-black/30">
              0{index + 1}
            </span>

            {/* Project name */}
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-zaha-black md:text-3xl">
              {project.name}
            </h3>

            {/* Stack tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.split(", ").map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${project.tagBg} ${project.accent}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-zaha-black/60">
              {project.description}
            </p>

            {/* Arrow indicator */}
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-zaha-black/40 transition-colors group-hover:text-zaha-green">
              <span>Voir le projet</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </motion.div>
  );
}

export function ShowcaseSection() {
  return (
    <SectionWrapper id="projets">
      <div className="mb-16 md:mb-24">
        <RevealOnScroll>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zaha-orange">
            Projets
          </p>
        </RevealOnScroll>
        <SplitText
          text="Des references qui parlent d'elles-memes"
          tag="h2"
          className="text-section-title font-bold tracking-tight text-zaha-black"
        />
        <RevealOnScroll delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zaha-black/60">
            De l&apos;e-commerce fort trafic aux plateformes d&apos;intelligence
            industrielle, nous accompagnons des entreprises ambitieuses sur des
            projets a fort enjeu technique.
          </p>
        </RevealOnScroll>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
