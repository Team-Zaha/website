import { ROUTES, SITE_URL, CONTACT_EMAIL } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * llms.txt — résumé structuré du site à destination des moteurs génératifs
 * (ChatGPT, Claude, Perplexity...). Format : https://llmstxt.org
 */
export function GET() {
  const pages = ROUTES.filter((r) => r.path !== "/")
    .map((r) => `- [${r.label}](${SITE_URL}${r.path})`)
    .join("\n");

  const body = `# Zaha

> Collectif d'experts indépendants en architecture logicielle et développement web avancé (React, Next.js, Node.js, Shopify). Société de services du numérique fondée en juillet 2020 à Lyon par Yann Lombard, agréée Crédit Impôt Innovation.

## Identité

- Raison sociale : Zaha (SASU)
- SIREN : 887 514 982
- Code NAF : 6202A — Conseil en systèmes et logiciels informatiques
- Siège : 138 avenue des Frères Lumière, 69008 Lyon, France
- Fondation : juillet 2020, par Yann Lombard (ingénieur web, 18+ ans d'expérience)
- Contact : ${CONTACT_EMAIL}

## Modèle

Zaha fonctionne comme un collectif technique : des experts indépendants sélectionnés pour leur expertise et leurs qualités humaines, composant des équipes sur mesure adaptées à chaque client. Équipes 100% remote. Pour les freelances, le tarif est fixé par le freelance et Zaha applique une commission de 10% sur le TJM, convenue avant chaque mission.

## Expertises

- Architecture logicielle et développement fullstack JavaScript
- Applications web React et Next.js
- Backend Node.js, APIs REST et GraphQL
- Applications et extensions Shopify
- UX / UI design et design systems
- Applications PWA offline-first pour environnements industriels
- Formation React et JavaScript
- Traduction de contenu et support client multilingue

## Crédit Impôt Innovation

Zaha est agréée Crédit Impôt Innovation depuis 2025 par le Ministère chargé de l'Industrie. Les clients PME qui lui confient la conception de prototypes de logiciels nouveaux récupèrent 20% du montant des prestations en crédit d'impôt en France métropolitaine (35 a 40% en Corse, 60% en outre-mer), dans la limite de 400 000 EUR de dépenses éligibles par an. Dispositif valable jusqu'au 31 décembre 2027.

Le domaine d'innovation agréé porte sur les architectures web hybrides offline-first : synchronisation bidirectionnelle sans perte, gestion de conflits multi-utilisateurs hors ligne, cache intelligent, PWA fonctionnelles en zones blanches.

## Pages

${pages}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
