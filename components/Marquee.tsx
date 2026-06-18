"use client";

import {
  UtensilsCrossed,
  Scissors,
  HardHat,
  ShoppingBag,
  Camera,
  Dumbbell,
  Scale,
  Coffee,
  Flower2,
  Car,
  Music,
  Heart,
} from "lucide-react";
import { useState } from "react";

const items = [
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Scissors, label: "Salons" },
  { icon: HardHat, label: "Contractors" },
  { icon: ShoppingBag, label: "Clothing Brands" },
  { icon: Camera, label: "Photographers" },
  { icon: Dumbbell, label: "Fitness Studios" },
  { icon: Scale, label: "Law Offices" },
  { icon: Coffee, label: "Cafés" },
  { icon: Flower2, label: "Florists" },
  { icon: Car, label: "Auto Services" },
  { icon: Music, label: "Music Studios" },
  { icon: Heart, label: "Wellness Coaches" },
];

// Duplicate for seamless loop
const all = [...items, ...items];

export default function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative py-5 overflow-hidden"
      style={{ background: "#0d1117" }}
      aria-label="Industries we serve"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #0d1117 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(270deg, #0d1117 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Screen reader list */}
      <ul className="sr-only" aria-label="Industries we serve">
        {items.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ul>

      <div
        className="flex gap-4 w-max"
        style={{
          animation: "marquee 26s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {all.map(({ icon: Icon, label }, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium select-none"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: i % 2 === 0 ? "#00B4D8" : "#E8C547" }}
              aria-hidden="true"
            />
            <Icon size={13} strokeWidth={1.6} aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
