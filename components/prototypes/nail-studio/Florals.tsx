"use client";

import { motion } from "framer-motion";

/** Simple 5-petal line-art flower, used as a decorative accent throughout the nail studio page. */
export function Flower({
  size = 48,
  color = "#C97B84",
  center = "#E8B4BC",
  className = "",
  style,
}: {
  size?: number;
  color?: string;
  center?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="28"
          rx="14"
          ry="22"
          fill={color}
          opacity="0.85"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="10" fill={center} />
    </svg>
  );
}

/** A small botanical sprig — stem with a few leaves, for corner ornamentation. */
export function Sprig({
  size = 90,
  color = "#C97B84",
  leaf = "#E8B4BC",
  className = "",
  style,
  flip = false,
}: {
  size?: number;
  color?: string;
  leaf?: string;
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      className={className}
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M50 140 C48 100 52 60 50 10"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {[
        { y: 100, angle: -35, s: 1 },
        { y: 80, angle: 35, s: 1.1 },
        { y: 60, angle: -30, s: 0.9 },
        { y: 42, angle: 32, s: 1 },
        { y: 26, angle: -25, s: 0.8 },
      ].map((leafDef, i) => (
        <ellipse
          key={i}
          cx="50"
          cy={leafDef.y}
          rx={16 * leafDef.s}
          ry={8 * leafDef.s}
          fill={leaf}
          opacity="0.8"
          transform={`rotate(${leafDef.angle} 50 ${leafDef.y})`}
        />
      ))}
    </svg>
  );
}

/** A single drifting petal, used for the ambient falling-petal field in the hero. */
export function FloatingPetal({ index }: { index: number }) {
  const left = (index * 13 + 6) % 96;
  const size = 10 + (index % 4) * 4;
  const duration = 9 + (index % 5) * 2.5;
  const delay = (index * 1.7) % 12;
  const drift = 30 + (index % 3) * 20;
  const colors = ["#E8B4BC", "#C97B84", "#F0DCC8"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className="absolute -z-10"
      style={{ left: `${left}%`, top: "-8%", width: size, height: size }}
      initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: ["0vh", "115vh"],
        x: [0, drift, -drift * 0.6, drift * 0.4],
        opacity: [0, 0.9, 0.9, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.08, 0.92, 1],
      }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 20 20">
        <ellipse cx="10" cy="7" rx="7" ry="10" fill={color} opacity="0.75" />
      </svg>
    </motion.div>
  );
}
