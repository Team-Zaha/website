"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
}

const getVariants = (
  direction: Direction,
  distance: number,
  duration: number
): Variants => {
  const isVertical = direction === "up" || direction === "down";
  const sign =
    direction === "down" || direction === "right" ? -distance : distance;

  if (isVertical) {
    return {
      hidden: { opacity: 0, y: sign },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: [0.33, 1, 0.68, 1] },
      },
    };
  }
  return {
    hidden: { opacity: 0, x: sign },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration, ease: [0.33, 1, 0.68, 1] },
    },
  };
};

export function RevealOnScroll({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 60,
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={getVariants(direction, distance, duration)}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
