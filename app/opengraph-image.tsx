import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Strive — Websites As Ambitious As Your Business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0d1226 0%, #1a2d6b 40%, #2055c8 75%, #151e42 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,165,0,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 100 100">
              <path
                d="M78 22H45C34 22 27 29 27 38c0 8 5 14 15 16l16 3c6 1 9 4 9 8 0 5-4 8-11 8H24"
                fill="none"
                stroke="#0B1739"
                strokeWidth="14"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path d="M14 65L30 65L18 80L2 80Z" fill="#1E5FE8" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "52px",
              fontWeight: 800,
              background: "linear-gradient(90deg, #4d7fff, #7db8ff)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            Strive
          </span>
        </div>

        {/* Main copy */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            maxWidth: "880px",
            marginBottom: "24px",
          }}
        >
          Websites as ambitious
          <br />
          as your business.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: "640px",
          }}
        >
          Custom sites from $500 — barbershops to full e-commerce stores.
        </div>

        {/* CTA pill */}
        <div
          style={{
            marginTop: "40px",
            padding: "14px 32px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #f59500, #e07800)",
            color: "#fff",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          Get a Free Quote →
        </div>
      </div>
    ),
    { ...size }
  );
}
