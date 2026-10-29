import { NextResponse } from "next/server";
import { Resend } from "resend";

const DESTINATAIRE = process.env.CANDIDATURE_TO ?? "bonjour@zaha.fr";
const EXPEDITEUR = process.env.CANDIDATURE_FROM ?? "Site Zaha <site@zaha.fr>";

const LIMITES = {
  nom: 120,
  email: 200,
  specialite: 200,
  message: 4000,
} as const;

// Fenêtre glissante en mémoire : suffisant pour le volume attendu, remis à zéro
// à chaque cold start de la fonction.
const FENETRE_MS = 60_000;
const MAX_PAR_FENETRE = 3;
const envois = new Map<string, number[]>();

/** Horodatages de l'IP encore dans la fenêtre. */
function recents(ip: string, maintenant: number) {
  return (envois.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);
}

function tropDeRequetes(ip: string) {
  const maintenant = Date.now();
  const dansFenetre = recents(ip, maintenant);
  if (dansFenetre.length >= MAX_PAR_FENETRE) return true;
  dansFenetre.push(maintenant);
  envois.set(ip, dansFenetre);
  oublierPlusTard(ip);
  return false;
}

/**
 * Efface l'IP une fois sa fenêtre échue, sans attendre une autre requête :
 * les mentions légales promettent qu'elle n'est pas conservée.
 */
function oublierPlusTard(ip: string) {
  setTimeout(() => {
    const encore = recents(ip, Date.now());
    if (encore.length > 0) envois.set(ip, encore);
    else envois.delete(ip);
  }, FENETRE_MS + 1_000).unref?.();
}

function nettoyer(valeur: unknown, max: number) {
  return typeof valeur === "string" ? valeur.trim().slice(0, max) : "";
}

function emailValide(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function echapper(texte: string) {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";

  if (tropDeRequetes(ip)) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessaie dans une minute." },
      { status: 429 }
    );
  }

  let corps: unknown;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const donnees = corps as Record<string, unknown>;

  // Honeypot : rempli uniquement par les bots. On répond 200 pour ne pas
  // leur signaler que la soumission a été écartée.
  if (nettoyer(donnees.site, 200)) {
    return NextResponse.json({ ok: true });
  }

  const nom = nettoyer(donnees.nom, LIMITES.nom);
  const email = nettoyer(donnees.email, LIMITES.email);
  const specialite = nettoyer(donnees.specialite, LIMITES.specialite);
  const message = nettoyer(donnees.message, LIMITES.message);

  const erreurs: Record<string, string> = {};
  if (nom.length < 2) erreurs.nom = "Merci d'indiquer ton nom.";
  if (!emailValide(email)) erreurs.email = "Cet email ne semble pas valide.";

  if (Object.keys(erreurs).length > 0) {
    return NextResponse.json({ erreurs }, { status: 422 });
  }

  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    console.error("[candidature] RESEND_API_KEY absente");
    return NextResponse.json(
      { error: "Le formulaire est momentanément indisponible." },
      { status: 500 }
    );
  }

  const lignes = [
    ["Nom", nom],
    ["Email", email],
    ["Spécialité", specialite || "—"],
    ["Message", message || "—"],
  ] as const;

  try {
    const { error } = await new Resend(cle).emails.send({
      from: EXPEDITEUR,
      to: DESTINATAIRE,
      replyTo: email,
      subject: `Candidature — ${nom}${specialite ? ` (${specialite})` : ""}`,
      text: lignes.map(([label, valeur]) => `${label} : ${valeur}`).join("\n\n"),
      html: lignes
        .map(
          ([label, valeur]) =>
            `<p><strong>${label}</strong><br>${echapper(valeur).replace(
              /\n/g,
              "<br>"
            )}</p>`
        )
        .join(""),
    });

    if (error) {
      console.error("[candidature] Resend a refusé l'envoi", error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Écris-nous directement à bonjour@zaha.fr." },
        { status: 502 }
      );
    }
  } catch (cause) {
    console.error("[candidature] Erreur d'envoi", cause);
    return NextResponse.json(
      { error: "L'envoi a échoué. Écris-nous directement à bonjour@zaha.fr." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
