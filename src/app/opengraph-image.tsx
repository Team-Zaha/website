import { ImageResponse } from "next/og";

export const alt =
  "Zaha — Collectif d'experts React, Next.js & Node.js. Agréé Crédit Impôt Innovation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image Open Graph générée au build. Définie à la racine de app/, elle sert de
 * visuel de partage par défaut pour toutes les pages.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c1f15",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#4A7C5C",
          }}
        >
          Zaha
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#FAFAF8",
          }}
        >
          <div style={{ display: "flex" }}>Architecture logicielle</div>
          <div style={{ display: "flex", color: "#F5E6D3" }}>
            &amp; développement web avancé
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "rgba(250, 250, 248, 0.55)",
          }}
        >
          <div style={{ display: "flex" }}>
            React · Next.js · Node.js · Shopify
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: 999,
              backgroundColor: "#E87A3A",
              color: "#0c1f15",
              fontWeight: 700,
              padding: "10px 28px",
              fontSize: 24,
            }}
          >
            Agréé CII
          </div>
        </div>
      </div>
    ),
    size
  );
}
