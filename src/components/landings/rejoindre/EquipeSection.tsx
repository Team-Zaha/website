"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface TeamMember {
  name: string;
  role: string;
  detail: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Yann Lombard",
    role: "Fondateur",
    detail: "Architecte fullstack JS — 18+ ans",
    initials: "YL",
  },
  {
    name: "Benoît Barnéoud",
    role: "UX Architect",
    detail: "Digital planner — 20 ans",
    initials: "BB",
  },
  {
    name: "César Bonte",
    role: "Développeur React",
    detail: "Coach OpenClassroom",
    initials: "CB",
  },
  {
    name: "Thibaud Dutoit",
    role: "Développeur senior",
    detail: "Lyon",
    initials: "TD",
  },
  {
    name: "Maxime Barnier",
    role: "UX & UI Designer",
    detail: "Sciences comportementales",
    initials: "MB",
  },
  // {
  //   name: "Toon van Ramshorst",
  //   role: "Svelte Developer",
  //   detail: "10 ans d'expérience",
  //   initials: "TR",
  // },
  {
    name: "Paula Sanchi Sancho",
    role: "Traductrice",
    detail: "Espagnol, Anglais, Français",
    initials: "PS",
  },
];

function MemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <RevealOnScroll direction="up" delay={index * 0.1} distance={40}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative flex flex-col items-center rounded-2xl border border-zaha-beige-dark/20 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md md:p-8"
      >
        {/* Avatar placeholder */}
        <motion.div
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-zaha-green to-zaha-green-light text-xl font-bold text-white"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {member.initials}
        </motion.div>

        {/* Info */}
        <h3 className="text-lg font-bold text-zaha-black">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold text-zaha-green">
          {member.role}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zaha-black/50">
          {member.detail}
        </p>

        {/* Hover accent line */}
        <motion.div
          className="absolute bottom-0 left-1/2 h-1 -translate-x-1/2 rounded-full bg-zaha-orange"
          initial={{ width: 0 }}
          whileHover={{ width: "40%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </RevealOnScroll>
  );
}

export function EquipeSection() {
  return (
    <SectionWrapper id="equipe">
      <RevealOnScroll>
        <div className="mb-16 text-center">
          <h2 className="text-section-title font-bold tracking-tight text-zaha-black">
            L&apos;équipe
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-zaha-black/60">
            Des profils complémentaires, unis par la passion du craft et
            l&apos;envie de bien faire.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <MemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
