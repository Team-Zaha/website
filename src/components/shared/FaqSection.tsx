"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SplitText } from "@/components/shared/SplitText";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export interface FaqItem {
  question: string;
  /* Texte brut : il alimente aussi le JSON-LD FAQPage. */
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  items: FaqItem[];
  dark?: boolean;
  className?: string;
}

/**
 * Section FAQ + données structurées FAQPage. Les réponses sont rendues en
 * clair dans le HTML (et non repliées derrière du JavaScript) afin que les
 * moteurs et les LLM puissent les citer directement.
 */
export function FaqSection({
  title = "Questions fréquentes",
  items,
  dark = false,
  className = "",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const border = dark ? "border-white/10" : "border-zaha-black/10";
  const heading = dark ? "text-white" : "text-zaha-black";
  const body = dark ? "text-white/70" : "text-zaha-black/65";

  return (
    <SectionWrapper id="faq" dark={dark} className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <SplitText
          text={title}
          tag="h2"
          className={`text-section-title mb-12 font-bold tracking-tight ${heading}`}
        />

        <dl className={`border-t ${border}`}>
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question} className={`border-b ${border}`}>
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`text-lg font-bold leading-snug ${heading} md:text-xl`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`mt-1 shrink-0 transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      } ${dark ? "text-white/50" : "text-zaha-black/40"}`}
                      aria-hidden="true"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 4v12M4 10h12"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </dt>

                {/*
                  La réponse reste montée dans le DOM : seule sa hauteur est
                  animée. Replier ne doit pas retirer le texte du HTML servi.
                */}
                <AnimatePresence initial={false}>
                  <motion.dd
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <p className={`pb-6 pr-10 leading-relaxed ${body}`}>
                      {item.answer}
                    </p>
                  </motion.dd>
                </AnimatePresence>
              </div>
            );
          })}
        </dl>

        <RevealOnScroll delay={0.2}>
          <p className={`mt-10 text-center ${body}`}>
            Une autre question ?{" "}
            <a
              href="/contact"
              className={`font-semibold underline underline-offset-4 ${heading}`}
            >
              Écrivez-nous
            </a>
            , nous répondons sous 48h.
          </p>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
