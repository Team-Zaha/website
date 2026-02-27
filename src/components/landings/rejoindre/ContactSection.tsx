"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function ContactSection() {
  const [formState, setFormState] = useState({
    nom: "",
    email: "",
    specialite: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend
    setSubmitted(true);
  };

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
          <div className="mb-12 text-center">
            <h2 className="text-section-title font-bold tracking-tight text-zaha-black">
              Rejoins l&apos;aventure
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-zaha-black/60">
              Laisse-nous tes coordonnées, on te recontacte rapidement pour
              faire connaissance.
            </p>
          </div>
        </RevealOnScroll>

        {submitted ? (
          <RevealOnScroll>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl border border-zaha-green/20 bg-zaha-green/5 p-8 text-center md:p-12"
            >
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="text-xl font-bold text-zaha-green md:text-2xl">
                Merci pour ton message !
              </h3>
              <p className="mt-3 text-base text-zaha-black/60">
                On te recontacte très vite pour un premier échange.
              </p>
            </motion.div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll direction="up" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-zaha-beige-dark/30 bg-white p-6 shadow-sm md:p-10"
            >
              {/* Nom */}
              <div>
                <label
                  htmlFor="nom"
                  className="mb-2 block text-sm font-semibold text-zaha-black"
                >
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  required
                  value={formState.nom}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className="w-full rounded-xl border border-zaha-beige-dark/40 bg-zaha-beige/20 px-4 py-3 text-base text-zaha-black outline-none transition-colors placeholder:text-zaha-black/30 focus:border-zaha-green focus:ring-1 focus:ring-zaha-green/30"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-zaha-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="jean@exemple.fr"
                  className="w-full rounded-xl border border-zaha-beige-dark/40 bg-zaha-beige/20 px-4 py-3 text-base text-zaha-black outline-none transition-colors placeholder:text-zaha-black/30 focus:border-zaha-green focus:ring-1 focus:ring-zaha-green/30"
                />
              </div>

              {/* Specialite */}
              <div>
                <label
                  htmlFor="specialite"
                  className="mb-2 block text-sm font-semibold text-zaha-black"
                >
                  Spécialité
                </label>
                <input
                  type="text"
                  id="specialite"
                  name="specialite"
                  value={formState.specialite}
                  onChange={handleChange}
                  placeholder="Développeur React, Designer UX..."
                  className="w-full rounded-xl border border-zaha-beige-dark/40 bg-zaha-beige/20 px-4 py-3 text-base text-zaha-black outline-none transition-colors placeholder:text-zaha-black/30 focus:border-zaha-green focus:ring-1 focus:ring-zaha-green/30"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-zaha-black"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Parle-nous de toi, de tes envies..."
                  className="w-full resize-none rounded-xl border border-zaha-beige-dark/40 bg-zaha-beige/20 px-4 py-3 text-base text-zaha-black outline-none transition-colors placeholder:text-zaha-black/30 focus:border-zaha-green focus:ring-1 focus:ring-zaha-green/30"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full cursor-pointer rounded-xl bg-zaha-green px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-zaha-green-light md:w-auto md:rounded-full"
                >
                  Envoyer ma candidature
                </motion.button>
              </div>
            </form>
          </RevealOnScroll>
        )}
      </div>
    </SectionWrapper>
  );
}
