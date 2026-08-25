"use client";

import { FaqSection, type FaqItem } from "@/components/shared/FaqSection";

const items: FaqItem[] = [
  {
    question: "Combien Zaha prélève-t-il sur mes missions ?",
    answer:
      "C'est toi qui fixes ton tarif. Une commission de 10% est appliquée sur ton TJM. Le taux est discuté et convenu avec toi avant le début de toute mission : tu connais toujours à l'avance le montant exact qui te sera versé.",
  },
  {
    question: "Quand suis-je payé ?",
    answer:
      "Nous nous engageons à te payer dès réception de ta facture, sans attendre le règlement du client. La régularité des paiements est essentielle à ta sérénité financière.",
  },
  {
    question: "Qui gère le contrat avec le client ?",
    answer:
      "Zaha prend en charge toutes les formalités contractuelles avec le client : négociation, rédaction et sécurisation des conditions de la mission. Les contrats sont rédigés par un avocat spécialisé, offert pendant une mission avec Zaha.",
  },
  {
    question: "Faut-il être expérimenté pour rejoindre le collectif ?",
    answer:
      "Le collectif réunit des profils séniors, mais nous accompagnons aussi celles et ceux qui se lancent. Un service de coaching freelance débutant existe pour t'aider à définir ton offre, fixer tes tarifs et trouver tes premiers clients.",
  },
  {
    question: "Comment se passe l'intégration ?",
    answer:
      "En quatre étapes : un premier contact pour convenir d'un rendez-vous, un échange sur ton parcours et tes aspirations, une vérification que nos valeurs et objectifs correspondent, puis l'invitation à rejoindre le collectif et sa première mission.",
  },
  {
    question: "Est-ce que je dois être basé à Lyon ?",
    answer:
      "Non. Le collectif est 100% remote et nous croyons que les talents ne se trouvent pas uniquement dans les grandes villes. Nous travaillons avec des freelances partout en France et au-delà des frontières.",
  },
  {
    question: "Que se passe-t-il si je recommande un client ?",
    answer:
      "Notre programme d'apport d'affaires te reverse le chiffre d'affaires généré pendant le premier mois si ta recommandation aboutit à une collaboration d'au moins trois mois.",
  },
];

export function FaqRejoindre() {
  return <FaqSection title="Vos questions" items={items} />;
}
