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
  return (
    <div
      className="relative py-5 overflow-hidden bg-background border-y border-border"
      aria-label="Industries we serve"
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, hsl(var(--background)) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="flex gap-6 w-max"
        style={{
          animation: "marquee 32s linear infinite",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {all.map(({ icon: Icon, label }, i) => (
          <div
            key={`${label}-${i}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted text-muted-foreground whitespace-nowrap text-sm font-medium select-none"
          >
            <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
