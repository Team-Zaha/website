"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

function generateParticles(count: number): Particle[] {
  const colors = [
    "var(--zaha-green)",
    "var(--zaha-orange)",
    "var(--zaha-green-light)",
    "var(--zaha-orange-light)",
    "#ffffff",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 0,
    y: 0,
    angle: (360 / count) * i + (Math.random() - 0.5) * 30,
    distance: 60 + Math.random() * 80,
    size: 3 + Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

export function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.idea) return;

      setIsSubmitting(true);
      setParticles(generateParticles(20));

      // Simulate submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    },
    [formData]
  );

  return (
    <SectionWrapper id="cta" dark fullHeight className="relative">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-zaha-orange/15 blur-[150px]" />
        <div className="absolute left-0 top-1/3 h-[400px] w-[400px] rounded-full bg-zaha-green/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <RevealOnScroll>
          <h2
            className="mb-6 font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15 }}
          >
            Pitchez-nous votre idee
          </h2>
          <p className="mb-12 text-lg text-white/60">
            30 minutes pour comprendre votre vision. Zero engagement, zero
            bullshit.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4 text-left"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/40"
                    >
                      Nom
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-white outline-none transition-colors placeholder:text-white/20 focus:border-zaha-green"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/40"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-white outline-none transition-colors placeholder:text-white/20 focus:border-zaha-green"
                      placeholder="jane@startup.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="idea"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/40"
                  >
                    Votre idee en 2 lignes
                  </label>
                  <textarea
                    id="idea"
                    name="idea"
                    required
                    rows={3}
                    value={formData.idea}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-white outline-none transition-colors placeholder:text-white/20 focus:border-zaha-green"
                    placeholder="On veut creer une app qui..."
                  />
                </div>

                {/* Submit button with particle burst */}
                <div className="relative flex justify-center pt-4">
                  {/* Particles */}
                  <AnimatePresence>
                    {isSubmitting &&
                      particles.map((p) => (
                        <motion.div
                          key={p.id}
                          className="pointer-events-none absolute rounded-full"
                          style={{
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            left: "50%",
                            top: "50%",
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x:
                              Math.cos((p.angle * Math.PI) / 180) * p.distance,
                            y:
                              Math.sin((p.angle * Math.PI) / 180) * p.distance,
                            opacity: 0,
                            scale: 0,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      ))}
                  </AnimatePresence>

                  <MagneticButton strength={0.15}>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden rounded-full bg-gradient-to-r from-zaha-green to-zaha-orange px-10 py-4 text-lg font-bold text-white disabled:opacity-70"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {isSubmitting ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Envoi en cours...
                        </motion.span>
                      ) : (
                        "Envoyer"
                      )}
                    </motion.button>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 22,
                }}
                className="rounded-2xl border border-zaha-green/30 bg-zaha-green/10 p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-zaha-green/20"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--zaha-green)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Message envoye !
                </h3>
                <p className="text-white/60">
                  On revient vers vous dans les 24h. Let&apos;s build.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
