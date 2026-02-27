"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltDegree = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isMobile = useIsMobile();

  const handleMouse = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setRotateX(-y * tiltDegree);
    setRotateY(x * tiltDegree);
  };

  const reset = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
