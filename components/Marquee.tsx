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
      style={{
        background: 'hsl(220 28% 6%)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
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
          background:
            "linear-gradient(90deg, hsl(220 28% 6%) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, hsl(220 28% 6%) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Visually hidden static list for screen readers */}
      <ul className="sr-only" aria-label="Industries we serve">
        {items.map(({ label }) => (
          <li key={label}>{label}</li>
        ))}
      </ul>

      <div
        className="flex gap-6 w-max"
        style={{
          animation: "marquee 32s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {all.map(({ icon: Icon, label }, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/55 whitespace-nowrap text-sm font-medium select-none"
          >
            <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
