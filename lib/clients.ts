export interface Client {
  name: string;
  category: string;
  url: string;
  /** Used for the corner glow, hover border/shadow tint, and the "Visit Live Site" label — must read clearly on a dark navy background. */
  accent: string;
  /** Background for the initial badge — solid color or gradient, matches the client's real brand palette. */
  badge: string;
  /** True if the badge needs dark text instead of white for contrast. */
  textDark?: boolean;
  initial: string;
}

export const clients: Client[] = [
  {
    name: "ScalXe Leads",
    category: "Marketing Agency",
    url: "https://scalxeleads.com/",
    accent: "#E5E5E5",
    badge: "#0A0A0A",
    initial: "S",
  },
  {
    name: "Glammed by DT",
    category: "Nail Technician",
    url: "https://glammed-by-dt.vercel.app/",
    accent: "#FF1F8F",
    badge: "linear-gradient(135deg, #FF1F8F 0%, #0A0A0A 100%)",
    initial: "G",
  },
  {
    name: "DQ Blendz",
    category: "Barber",
    url: "https://dq-blendz.vercel.app/",
    accent: "#D4A24C",
    badge: "#D4A24C",
    initial: "D",
  },
  {
    name: "Sia's Makeup",
    category: "Makeup Artist & Photographer",
    url: "https://siasmakeup-zrtl.vercel.app/",
    accent: "#8FA37E",
    badge: "linear-gradient(135deg, #D9C2A6 0%, #8FA37E 100%)",
    textDark: true,
    initial: "S",
  },
  {
    name: "JN Entertainment",
    category: "DJ / AV / MC",
    url: "https://jnentertainment.vercel.app/",
    accent: "#E11D2E",
    badge: "linear-gradient(135deg, #E11D2E 0%, #0A0A0A 100%)",
    initial: "J",
  },
  {
    name: "Unified Energy Interface",
    category: "Energy Management Web App",
    url: "https://uei-cloud.vercel.app/",
    accent: "#F5C518",
    badge: "#F5C518",
    textDark: true,
    initial: "U",
  },
  {
    name: "Back2Life",
    category: "Haircuts & Tattoos",
    url: "https://back2life-beta.vercel.app/",
    accent: "#C9A227",
    badge: "linear-gradient(135deg, #9CA3AF 0%, #C9A227 100%)",
    initial: "B",
  },
];
