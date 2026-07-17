import type { Metadata } from "next";
import { getPrototype } from "@/lib/prototypes";
import BarbershopContent from "@/components/prototypes/BarbershopContent";

const proto = getPrototype("barbershop")!;

export const metadata: Metadata = {
  title: `${proto.name}: Barbershop Website Prototype by Strive`,
  description:
    "A dark, editorial one-page website prototype for a barbershop, built by Strive to showcase bold portfolio-style web design for grooming & style businesses.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/work/barbershop" },
};

export default function BarbershopPage() {
  return <BarbershopContent />;
}
