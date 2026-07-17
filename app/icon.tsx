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
          borderRadius: "7px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 100 100">
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
    ),
    { ...size }
  );
}
