"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  fullHeight?: boolean;
}

export function SectionWrapper({
  children,
  className = "",
  id,
  dark = false,
  fullHeight = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`
        relative w-full overflow-hidden px-6 py-20 md:px-12 lg:px-24 lg:py-32
        ${fullHeight ? "min-h-svh flex items-center" : ""}
        ${dark ? "bg-zaha-black text-white" : ""}
        ${className}
      `}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </motion.section>
  );
}
