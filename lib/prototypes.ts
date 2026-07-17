export interface Prototype {
  slug: string;
  name: string;
  business: string;
  category: string;
  tag: string;
  tagline: string;
  description: string;
  vibe: string;
  priceTier: "Launch" | "Growth" | "Commerce";
  price: string;
  accent: string;
  accentSoft: string;
  bg: string;
  panelGradient: string;
  letter: string;
}

export const prototypes: Prototype[] = [
  {
    slug: "barbershop",
    name: "Fade & Co.",
    business: "Barbershop",
    category: "Portfolio / Booking",
    tag: "Launch",
    tagline: "Bold, dark, editorial: built to sell the cut before they sit in the chair.",
    description:
      "A moody, high-contrast one-pager for a barbershop: portfolio-first, booking CTA above the fold, editorial type that feels more magazine than menu.",
    vibe: "Dark editorial · grit & precision",
    priceTier: "Launch",
    price: "$500",
    accent: "#D4A24C",
    accentSoft: "rgba(212,162,76,0.12)",
    bg: "#0A0A0A",
    panelGradient: "linear-gradient(135deg, #1a1a1a 0%, #3a2f1f 100%)",
    letter: "F",
  },
  {
    slug: "nail-studio",
    name: "Blush & Bone",
    business: "Nail Studio",
    category: "Booking Site",
    tag: "Growth",
    tagline: "Soft, airy, tactile: a booking experience as polished as the manicures.",
    description:
      "A pastel, elegant booking site for a nail studio: service menu, gallery, and an online booking flow that feels like a spa appointment, not a form.",
    vibe: "Soft pastel · elegant & tactile",
    priceTier: "Growth",
    price: "$1,500",
    accent: "#C97B84",
    accentSoft: "rgba(201,123,132,0.12)",
    bg: "#FDF6F3",
    panelGradient: "linear-gradient(135deg, #f7d9de 0%, #e8b4bc 100%)",
    letter: "B",
  },
  {
    slug: "restaurant",
    name: "Ember & Oak",
    business: "Restaurant",
    category: "Menu / Reservations",
    tag: "Growth",
    tagline: "Warm, rich, appetite-driven: a digital dining room that makes you hungry.",
    description:
      "A warm, high-traffic restaurant site: full menu, reservation flow, chef's story, and photography-forward layout built to convert browsers into bookings.",
    vibe: "Warm & rich · appetite-driven",
    priceTier: "Growth",
    price: "$1,500",
    accent: "#E8853A",
    accentSoft: "rgba(232,133,58,0.14)",
    bg: "#1C1310",
    panelGradient: "linear-gradient(135deg, #7a3b1e 0%, #c65d2e 100%)",
    letter: "E",
  },
  {
    slug: "ecommerce",
    name: "NOVA Studio",
    business: "Clothing / E-Commerce",
    category: "Full Storefront",
    tag: "Commerce",
    tagline: "Sharp, high-contrast, fashion-forward: a full storefront built to sell.",
    description:
      "A complete clothing e-commerce experience: product grid, quick-add cart, collection drops, and checkout. The range-topping build we ship for retail brands.",
    vibe: "High-contrast fashion · bold & minimal",
    priceTier: "Commerce",
    price: "$2,000+",
    accent: "#FF3B30",
    accentSoft: "rgba(255,59,48,0.12)",
    bg: "#FFFFFF",
    panelGradient: "linear-gradient(135deg, #111111 0%, #000000 100%)",
    letter: "N",
  },
];

export function getPrototype(slug: string): Prototype | undefined {
  return prototypes.find((p) => p.slug === slug);
}
