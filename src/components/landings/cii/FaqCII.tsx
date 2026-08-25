"use client";

import { FaqSection, type FaqItem } from "@/components/shared/FaqSection";

const items: FaqItem[] = [
  {
    question: "Qui peut bénéficier du Crédit Impôt Innovation ?",
    answer:
      "Le CII est réservé aux PME au sens européen (moins de 250 salariés, chiffre d'affaires inférieur à 50 M€ ou bilan inférieur à 43 M€), soumises à un régime réel d'imposition, impôt sur les sociétés ou impôt sur le revenu.",
  },
  {
    question: "Quel est le taux du crédit d'impôt ?",
    answer:
      "Le taux est de 20% des dépenses éligibles en France métropolitaine depuis la loi de finances 2025. Il est porté à 35% pour les moyennes entreprises et 40% pour les petites entreprises en Corse, et à 60% en outre-mer.",
  },
  {
    question: "Quel est le plafond du Crédit Impôt Innovation ?",
    answer:
      "L'assiette des dépenses éligibles est plafonnée à 400 000 € par an et par entreprise. Le crédit d'impôt maximal est donc de 80 000 € en métropole, 160 000 € en Corse et 240 000 € en outre-mer.",
  },
  {
    question: "Quels travaux sont éligibles au CII ?",
    answer:
      "Sont éligibles les travaux de conception de prototypes ou d'installations pilotes d'un produit nouveau : nouvelles fonctionnalités, performances supérieures, ergonomie ou éco-conception améliorées par rapport aux produits existants sur le marché. Pour un logiciel, il s'agit typiquement de la conception d'un prototype avant industrialisation.",
  },
  {
    question: "Pourquoi passer par une société agréée comme Zaha ?",
    answer:
      "L'agrément délivré par le Ministère chargé de l'Industrie permet à vos dépenses sous-traitées à Zaha d'entrer dans l'assiette de votre crédit d'impôt. Sans cet agrément, les prestations confiées à un prestataire externe ne sont pas éligibles.",
  },
  {
    question: "Jusqu'à quand le dispositif est-il valable ?",
    answer:
      "Le Crédit Impôt Innovation est prolongé jusqu'au 31 décembre 2027. Les dépenses engagées jusqu'à cette date ouvrent droit au crédit d'impôt.",
  },
  {
    question: "Zaha m'accompagne-t-elle dans le montage du dossier ?",
    answer:
      "Oui. Nous documentons les travaux d'innovation réalisés et fournissons les éléments nécessaires à la justification de votre crédit d'impôt. Zaha est conseillée par Finalli sur les aspects liés à l'agrément.",
  },
];

export function FaqCII() {
  return <FaqSection title="Vos questions sur le CII" items={items} />;
}
