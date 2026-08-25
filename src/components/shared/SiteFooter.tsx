"use client";

import Link from "next/link";
import { NAV_GROUPS, CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/seo";

/**
 * Footer commun à toutes les pages. Il porte le maillage interne du site :
 * sans lui, les landings sectorielles ne reçoivent aucun lien entrant.
 */
export function SiteFooter({ dark = false }: { dark?: boolean }) {
  const year = new Date().getFullYear();

  const base = dark ? "text-white" : "text-zaha-black";
  const muted = dark ? "text-white/50" : "text-zaha-black/50";
  const link = dark
    ? "text-white/70 hover:text-white"
    : "text-zaha-black/70 hover:text-zaha-black";
  const border = dark ? "border-white/10" : "border-zaha-black/10";

  return (
    <footer
      className={`border-t ${border} ${dark ? "bg-zaha-black" : "bg-zaha-white"} px-6 py-16 md:px-12 lg:px-24`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Identite */}
          <div>
            <p className={`text-xl font-bold tracking-tight ${base}`}>Zaha</p>
            <p className={`mt-3 max-w-xs text-sm leading-relaxed ${muted}`}>
              Collectif d&apos;experts indépendants en architecture logicielle et
              développement web. Société agréée Crédit Impôt Innovation.
            </p>
            <address className={`mt-4 text-sm not-italic ${muted}`}>
              138 avenue des Frères Lumière
              <br />
              69008 Lyon, France
            </address>
          </div>

          {/* Colonnes de navigation */}
          {NAV_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p
                className={`text-xs font-bold uppercase tracking-widest ${muted}`}
              >
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`text-sm transition-colors ${link}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bas de footer */}
        <div
          className={`mt-14 flex flex-col gap-4 border-t ${border} pt-8 text-sm ${muted} sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>&copy; {year} Zaha. Tous droits réservés. SIREN 887 514 982.</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACT_EMAIL}`} className={`transition-colors ${link}`}>
              {CONTACT_EMAIL}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${link}`}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
