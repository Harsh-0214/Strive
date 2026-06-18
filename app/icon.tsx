import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #3861f5 0%, #62a4ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: "18px",
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: "-1px",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
