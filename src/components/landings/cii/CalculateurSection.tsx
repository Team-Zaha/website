"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const RATES = [
  { name: "Métropole", rate: 0.2, color: "text-zaha-green", bg: "bg-zaha-green" },
  { name: "Corse", rate: 0.4, color: "text-zaha-orange", bg: "bg-zaha-orange" },
  { name: "Outre-mer", rate: 0.6, color: "text-zaha-green", bg: "bg-zaha-green" },
];

const MIN = 10000;
const MAX = 1000000;
const STEP = 5000;
const CREDIT_CAP = 400000;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CalculateurSection() {
  const [montant, setMontant] = useState(100000);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMontant(Number(e.target.value));
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d]/g, "");
      const val = Number(raw);
      if (!isNaN(val)) {
        setMontant(Math.min(MAX, Math.max(0, val)));
      }
    },
    []
  );

  const sliderPercent = ((montant - MIN) / (MAX - MIN)) * 100;

  return (
    <SectionWrapper id="calculateur" className="bg-zaha-white">
      <div className="mb-16 text-center">
        <SplitText
          text="Calculateur interactif"
          tag="h2"
          className="text-section-title font-bold text-zaha-black"
        />
        <RevealOnScroll delay={0.2}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zaha-black/60">
            Estimez le montant de votre crédit d&#39;impôt selon la localisation de votre entreprise.
          </p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <div className="mx-auto max-w-3xl">
          {/* Input area */}
          <div className="rounded-3xl border border-zaha-black/5 bg-zaha-beige/50 p-8 md:p-10">
            <label className="mb-6 block">
              <span className="text-sm font-bold uppercase tracking-widest text-zaha-black/40">
                Montant du projet
              </span>
              <div className="mt-3 flex items-center gap-4">
                <input
                  type="text"
                  value={formatCurrency(montant)}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-zaha-black/10 bg-zaha-white px-5 py-4 text-2xl font-black text-zaha-black outline-none transition-shadow focus:border-zaha-green/30 focus:ring-2 focus:ring-zaha-green/20 md:text-3xl"
                />
              </div>
            </label>

            {/* Slider */}
            <div className="relative mt-2 flex h-8 items-center">
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={montant}
                onChange={handleSliderChange}
                className="slider-cii absolute inset-0 z-10 w-full cursor-pointer appearance-none bg-transparent"
              />
              {/* Custom track visualization */}
              <div className="pointer-events-none absolute left-0 h-2 w-full overflow-hidden rounded-full bg-zaha-black/5">
                <div
                  className="h-full rounded-full bg-zaha-green transition-all duration-150"
                  style={{ width: `${sliderPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-2 flex justify-between text-xs text-zaha-black/30">
              <span>{formatCurrency(MIN)}</span>
              <span>{formatCurrency(MAX)}</span>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {RATES.map((r) => {
                const credit = Math.min(Math.round(montant * r.rate), CREDIT_CAP);
                return (
                  <motion.div
                    key={r.name}
                    layout
                    className="group rounded-2xl border border-zaha-black/5 bg-zaha-white p-6 text-center transition-shadow hover:shadow-lg"
                  >
                    <p className="text-sm font-bold uppercase tracking-widest text-zaha-black/40">
                      {r.name}
                    </p>
                    <p className="mt-1 text-xs text-zaha-black/30">
                      Taux : {Math.round(r.rate * 100)}%
                    </p>
                    <motion.p
                      key={credit}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-3 text-3xl font-black md:text-4xl ${r.color}`}
                    >
                      {formatCurrency(credit)}
                    </motion.p>
                    <p className="mt-2 text-xs text-zaha-black/40">
                      de crédit d&#39;impôt
                    </p>
                    {credit >= CREDIT_CAP && (
                      <p className="mt-1 text-xs font-medium text-zaha-orange">
                        Plafond atteint
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Example text */}
          <RevealOnScroll delay={0.3}>
            <p className="mt-8 text-center text-sm text-zaha-black/50">
              Pour un projet de{" "}
              <span className="font-bold text-zaha-black">
                {formatCurrency(montant)}
              </span>
              , vous récupérez jusqu&#39;à{" "}
              <span className="font-bold text-zaha-green">
                {formatCurrency(Math.min(Math.round(montant * 0.6), CREDIT_CAP))}
              </span>{" "}
              en outre-mer.
            </p>
          </RevealOnScroll>
        </div>
      </RevealOnScroll>

      {/* Slider custom styles */}
      <style jsx>{`
        .slider-cii {
          height: 100%;
          margin: 0;
        }
        .slider-cii::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--zaha-green);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .slider-cii::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--zaha-green);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .slider-cii::-webkit-slider-runnable-track {
          height: 8px;
          background: transparent;
          border-radius: 9999px;
        }
        .slider-cii::-moz-range-track {
          height: 8px;
          background: transparent;
          border-radius: 9999px;
        }
      `}</style>
    </SectionWrapper>
  );
}
