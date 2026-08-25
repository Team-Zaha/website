"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

interface Zone {
  label: string;
  rate: number;
  rateLabel: string;
  color: string;
}

const zones: Zone[] = [
  { label: "Métropole", rate: 0.2, rateLabel: "20%", color: "var(--zaha-green)" },
  { label: "Corse", rate: 0.4, rateLabel: "35 à 40%", color: "var(--zaha-orange)" },
  { label: "Outre-mer", rate: 0.6, rateLabel: "60%", color: "var(--zaha-green-light)" },
];

// Le CII plafonne l'assiette de dépenses éligibles à 400 000 € par an.
const ELIGIBLE_CAP = 400000;

export function BonusCIISection() {
  const [amount, setAmount] = useState<number>(50000);
  const [submitted, setSubmitted] = useState(false);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d]/g, "");
      const num = parseInt(raw, 10);
      if (!isNaN(num)) {
        setAmount(num);
        setSubmitted(false);
      } else if (raw === "") {
        setAmount(0);
        setSubmitted(false);
      }
    },
    []
  );

  const handleCalculate = useCallback(() => {
    setSubmitted(true);
  }, []);

  const eligible = Math.min(amount, ELIGIBLE_CAP);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <SectionWrapper id="bonus-cii" className="relative bg-zaha-black" dark>
      {/* Accent glow */}
      <div className="pointer-events-none absolute -left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-zaha-green/15 blur-[120px]" />

      <div className="relative z-10">
        <RevealOnScroll>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zaha-green/30 bg-zaha-green/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-zaha-green" />
            <span className="text-sm font-medium text-zaha-green-light">
              Bonus PME
            </span>
          </div>
          <h2 className="text-section-title mb-6 font-bold tracking-tight">
            Le bonus CII
          </h2>
          <p className="mb-12 max-w-2xl text-xl font-light leading-relaxed text-white/80">
            Vous êtes une PME ? Récupérez{" "}
            <span className="font-bold text-zaha-green">20%</span> du coût de
            votre MVP grâce au Crédit Impôt Innovation — jusqu&apos;à{" "}
            <span className="font-bold text-zaha-orange">60%</span> si votre
            entreprise est domiciliée en outre-mer.
          </p>
        </RevealOnScroll>

        {/* Calculator */}
        <RevealOnScroll delay={0.2}>
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12">
            <label
              htmlFor="project-amount"
              className="mb-3 block text-sm font-medium uppercase tracking-widest text-white/50"
            >
              Budget projet (HT)
            </label>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <input
                  id="project-amount"
                  type="text"
                  value={amount.toLocaleString("fr-FR")}
                  onChange={handleAmountChange}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-2xl font-bold text-white outline-none transition-colors focus:border-zaha-green"
                  placeholder="50 000"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-white/40">
                  EUR
                </span>
              </div>
              <motion.button
                onClick={handleCalculate}
                className="rounded-xl bg-gradient-to-r from-zaha-green to-zaha-green-light px-8 py-4 text-lg font-bold text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                Calculer
              </motion.button>
            </div>

            {/* Results */}
            <div className="grid gap-4 md:grid-cols-3">
              {zones.map((zone) => (
                <motion.div
                  key={zone.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
                  initial={false}
                  animate={
                    submitted
                      ? { scale: [1, 1.05, 1], borderColor: "rgba(255,255,255,0.2)" }
                      : {}
                  }
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <span
                    className="mb-1 block text-sm font-medium"
                    style={{ color: zone.color }}
                  >
                    {zone.label}
                  </span>
                  <span className="mb-2 block text-xs text-white/40">
                    {zone.rateLabel} du montant
                  </span>
                  <div className="text-2xl font-black text-white md:text-3xl">
                    {submitted ? (
                      <AnimatedCounter
                        target={Math.round(eligible * zone.rate)}
                        prefix=""
                        suffix=" EUR"
                        duration={1.5}
                      />
                    ) : (
                      <span className="text-white/30">
                        {formatCurrency(eligible * zone.rate)}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-white/30">
              Estimation indicative, calculée dans la limite de 400 000 € de
              dépenses éligibles par an. Le montant réel dépend de
              l&apos;éligibilité de votre projet au CII.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
