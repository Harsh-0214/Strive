export interface Client {
  name: string;
  category: string;
  url: string;
  accent: string;
  initial: string;
}

export const clients: Client[] = [
  {
    name: "ScalXe Leads",
    category: "Marketing Agency",
    url: "https://scalxeleads.com/",
    accent: "#0EA5E9",
    initial: "S",
  },
  {
    name: "Glammed by DT",
    category: "Nail Technician",
    url: "https://glammed-by-dt.vercel.app/",
    accent: "#E8B4BC",
    initial: "G",
  },
  {
    name: "DQ Blendz",
    category: "Barber",
    url: "https://dq-blendz.vercel.app/",
    accent: "#D4A24C",
    initial: "D",
  },
  {
    name: "Sia's Makeup",
    category: "Makeup Artist & Photographer",
    url: "https://siasmakeup-zrtl.vercel.app/",
    accent: "#C97B84",
    initial: "S",
  },
  {
    name: "JN Entertainment",
    category: "DJ / AV / MC",
    url: "https://jnentertainment.vercel.app/",
    accent: "#7C3AED",
    initial: "J",
  },
  {
    name: "Unified Energy Interface",
    category: "Energy Management Web App",
    url: "https://uei-cloud.vercel.app/",
    accent: "#16A34A",
    initial: "U",
  },
  {
    name: "Back2Life",
    category: "Haircuts & Tattoos",
    url: "https://back2life-beta.vercel.app/",
    accent: "#EF4444",
    initial: "B",
  },
];
