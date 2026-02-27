"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

const services: ServiceItem[] = [
  {
    title: "Coaching freelance débutant",
    description: "Accompagnement pour se lancer sereinement dans le freelancing",
    icon: "🚀",
  },
  {
    title: "Coaching technique",
    description: "Support technique entre pairs pour progresser ensemble",
    icon: "🧠",
  },
  {
    title: "Missions qualifiées",
    description: "Zaha te dégotte des clients aux petits oignons",
    icon: "🎯",
  },
  {
    title: "Apport d'affaire",
    description: "Mise en relation avec des clients qui te correspondent",
    icon: "🤝",
  },
  {
    title: "Assistance administrative",
    description: "Gestion administrative simplifiée pour te concentrer sur ton métier",
    icon: "📋",
  },
  {
    title: "Contrats par un avocat",
    description: "Support juridique pour sécuriser tes missions",
    icon: "⚖️",
  },
  {
    title: "Comptabilité",
    description: "Suivi comptable pour garder l'esprit tranquille",
    icon: "📊",
  },
];

function TimelineItem({
  service,
  index,
  isLast,
}: {
  service: ServiceItem;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative flex gap-6 pb-12 md:gap-10 md:pb-16">
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zaha-green text-xl shadow-lg md:h-14 md:w-14"
        >
          <span role="img" aria-label={service.title}>
            {service.icon}
          </span>
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div className="relative mt-2 w-px flex-1 bg-zaha-beige-dark/40">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-zaha-green"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <RevealOnScroll direction="left" delay={index * 0.05} distance={40}>
        <div className="pt-2">
          <h3 className="text-lg font-bold text-zaha-black md:text-xl">
            {service.title}
          </h3>
          <p className="mt-1 text-base leading-relaxed text-zaha-black/60 md:text-lg">
            {service.description}
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}

export function ServicesTimeline() {
  return (
    <SectionWrapper id="services">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll>
          <h2 className="text-section-title mb-16 font-bold tracking-tight text-zaha-black md:mb-20">
            Ce qu&apos;on t&apos;apporte
          </h2>
        </RevealOnScroll>

        <div className="ml-2 md:ml-6">
          {services.map((service, index) => (
            <TimelineItem
              key={service.title}
              service={service}
              index={index}
              isLast={index === services.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
