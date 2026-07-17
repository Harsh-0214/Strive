export default function StriveMark({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "dark" = navy mark for light backgrounds. "light" = white mark for dark backgrounds. */
  tone?: "dark" | "light";
}) {
  const primary = tone === "dark" ? "#0B1739" : "#FFFFFF";
  const accent = "#1E5FE8";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Strive logo mark"
    >
      <path
        d="M78 22H45C34 22 27 29 27 38c0 8 5 14 15 16l16 3c6 1 9 4 9 8 0 5-4 8-11 8H24"
        fill="none"
        stroke={primary}
        strokeWidth="13"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path d="M14 65L30 65L18 80L2 80Z" fill={accent} />
    </svg>
  );
}
