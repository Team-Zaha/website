"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const inputClass =
  "w-full rounded-xl border border-zaha-beige-dark/40 bg-zaha-beige/20 px-4 py-3 text-base text-zaha-black outline-none transition-colors placeholder:text-zaha-black/30 focus:border-zaha-green focus:ring-1 focus:ring-zaha-green/30 disabled:opacity-60";

const labelClass = "mb-2 block text-sm font-semibold text-zaha-black";

const initialState = {
  nom: "",
  email: "",
  specialite: "",
  message: "",
  site: "", // honeypot
};

export function ContactSection() {
  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [erreurGlobale, setErreurGlobale] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // La carte de confirmation est bien plus courte que le formulaire : sans ce
  // recadrage, la page raccourcit sous la position de scroll et l'utilisateur
  // se retrouve devant une zone vide.
  useEffect(() => {
    if (submitted) {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [submitted]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErreurs((prev) => {
      if (!prev[name]) return prev;
      const suivant = { ...prev };
      delete suivant[name];
      return suivant;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErreurs({});
    setErreurGlobale(null);

    try {
      const response = await fetch("/api/candidature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.erreurs) setErreurs(data.erreurs);
        setErreurGlobale(
          data.error ??
            "Une erreur est survenue. Vérifie les champs et réessaie."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setErreurGlobale(
        "Impossible d'envoyer le formulaire. Écris-nous directement à bonjour@zaha.fr."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const messageErreur = (champ: string) =>
    erreurs[champ] ? (
      <p id={`${champ}-erreur`} className="mt-2 text-sm text-red-600">
        {erreurs[champ]}
      </p>
    ) : null;

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
          /* Pas de RevealOnScroll ici : la carte remplace le formulaire alors
             que l'utilisateur a déjà scrollé, et le viewport margin la
             laisserait invisible jusqu'au prochain scroll. */
          <motion.div
            ref={successRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            role="status"
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
        ) : (
          <RevealOnScroll direction="up" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 rounded-2xl border border-zaha-beige-dark/30 bg-white p-6 shadow-sm md:p-10"
            >
              {/* Nom */}
              <div>
                <label htmlFor="nom" className={labelClass}>
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  required
                  maxLength={120}
                  autoComplete="name"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(erreurs.nom)}
                  aria-describedby={erreurs.nom ? "nom-erreur" : undefined}
                  value={formState.nom}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  className={inputClass}
                />
                {messageErreur("nom")}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(erreurs.email)}
                  aria-describedby={erreurs.email ? "email-erreur" : undefined}
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="jean@exemple.fr"
                  className={inputClass}
                />
                {messageErreur("email")}
              </div>

              {/* Specialite */}
              <div>
                <label htmlFor="specialite" className={labelClass}>
                  Spécialité
                </label>
                <input
                  type="text"
                  id="specialite"
                  name="specialite"
                  maxLength={200}
                  disabled={isSubmitting}
                  value={formState.specialite}
                  onChange={handleChange}
                  placeholder="Développeur React, Designer UX..."
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={4000}
                  disabled={isSubmitting}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Parle-nous de toi, de tes envies..."
                  className={`resize-none ${inputClass}`}
                />
              </div>

              {/* Honeypot anti-spam : invisible pour les humains */}
              <div aria-hidden className="hidden">
                <label htmlFor="site">Site</label>
                <input
                  type="text"
                  id="site"
                  name="site"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formState.site}
                  onChange={handleChange}
                />
              </div>

              {erreurGlobale && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {erreurGlobale}
                </p>
              )}

              {/* Submit */}
              <div className="flex justify-center pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? undefined : { scale: 1.03 }}
                  whileTap={isSubmitting ? undefined : { scale: 0.97 }}
                  className="w-full cursor-pointer rounded-xl bg-zaha-green px-8 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-zaha-green-light disabled:cursor-not-allowed disabled:opacity-70 md:w-auto md:rounded-full"
                >
                  {isSubmitting ? "Envoi en cours…" : "Envoyer ma candidature"}
                </motion.button>
              </div>
            </form>
          </RevealOnScroll>
        )}
      </div>
    </SectionWrapper>
  );
}
