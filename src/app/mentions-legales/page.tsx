import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CONTACT_EMAIL, LEGAL, SITE_URL, pageMetadata } from "@/lib/seo";
import { LandingLayout } from "@/components/shared/LandingLayout";

/**
 * Portable affiché ici seulement (obligation LCEN). Volontairement hors de
 * LEGAL : cet objet est importé par le footer client et finirait dans le
 * JavaScript de toutes les pages.
 */
const TELEPHONE = "+33 7 62 57 81 99";
const TELEPHONE_HREF = `tel:${TELEPHONE.replace(/\s/g, "")}`;

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site zaha.fr : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  path: "/mentions-legales",
});

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-3 leading-relaxed text-zaha-black/70">
        {children}
      </div>
    </section>
  );
}

const lien = "underline underline-offset-2 hover:text-zaha-black";

export default function MentionsLegalesPage() {
  return (
    <LandingLayout grain={false}>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:pt-40">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Mentions légales
        </h1>

        <Section title="Éditeur du site">
          <p>
            Le site {new URL(SITE_URL).host} est édité par <strong>{LEGAL.name}</strong>,{" "}
            {LEGAL.form} au capital de {LEGAL.capital}.
          </p>
          <ul className="space-y-1">
            <li>
              Siège social : {LEGAL.street}, {LEGAL.postalCode} {LEGAL.city},
              France
            </li>
            <li>
              RCS {LEGAL.rcsCity} {LEGAL.sirenDisplay}
            </li>
            <li>TVA intracommunautaire : {LEGAL.vat}</li>
            <li>
              Téléphone :{" "}
              <a href={TELEPHONE_HREF} className={lien}>
                {TELEPHONE}
              </a>
            </li>
            <li>
              E-mail :{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={lien}>
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
          <p>Directeur de la publication : {LEGAL.director}, gérant.</p>
        </Section>

        <Section title="Hébergement">
          <p>
            Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
            États-Unis.{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className={lien}
            >
              vercel.com
            </a>
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            Les textes, visuels, logos et le code de ce site appartiennent à{" "}
            {LEGAL.name} ou à leurs auteurs respectifs. Toute reproduction sans
            autorisation écrite est interdite. Les logos des clients et
            partenaires restent la propriété de leurs titulaires.
          </p>
        </Section>

        <Section id="donnees-personnelles" title="Données personnelles">
          <p>
            Le seul formulaire du site est celui de candidature, sur la page
            « Rejoindre le collectif ». Il recueille votre nom, votre e-mail,
            votre spécialité et votre message.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Responsable du traitement : {LEGAL.name}, représentée par{" "}
              {LEGAL.director}.
            </li>
            <li>
              Finalité : étudier votre candidature et vous recontacter. Base
              légale : mesures précontractuelles prises à votre demande.
            </li>
            <li>
              Destinataires : uniquement {LEGAL.name}. Pour cela, nous faisons
              appel à trois sous-traitants : Vercel (hébergement du site),
              Resend (envoi du message par e-mail) et Google Workspace
              (messagerie de {LEGAL.name}, où la candidature est conservée). Ils
              peuvent traiter les données aux États-Unis ; ces transferts sont
              encadrés par les garanties prévues par le RGPD (Data Privacy
              Framework ou clauses contractuelles types).
            </li>
            <li>
              Durée de conservation : deux ans après le dernier échange, puis
              suppression.
            </li>
            <li>
              Votre adresse IP sert uniquement à limiter les envois abusifs :
              elle est gardée en mémoire quelques minutes au plus, puis
              effacée. Comme pour toute visite, l&apos;hébergeur peut aussi la
              consigner temporairement dans ses journaux techniques.
            </li>
          </ul>
          <p>
            Vous pouvez accéder à vos données, les rectifier, les effacer,
            limiter leur traitement, vous y opposer, demander leur portabilité
            ou définir des directives sur leur sort après votre décès, en
            écrivant à{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={lien}>
              {CONTACT_EMAIL}
            </a>
            . Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            saisir la{" "}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noopener noreferrer"
              className={lien}
            >
              CNIL
            </a>
            .
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de
            mesure d&apos;audience ni de publicité.
          </p>
        </Section>
      </article>
    </LandingLayout>
  );
}
