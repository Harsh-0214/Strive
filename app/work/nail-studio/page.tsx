import type { Metadata } from "next";
import { getPrototype } from "@/lib/prototypes";
import NailStudioContent from "@/components/prototypes/NailStudioContent";

const proto = getPrototype("nail-studio")!;

export const metadata: Metadata = {
  title: `${proto.name} — Nail Studio Website Prototype by Strive`,
  description:
    "A soft, elegant booking-focused website prototype for a nail studio — built by Strive to showcase beauty & wellness web design with online booking.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/work/nail-studio" },
};

export default function NailStudioPage() {
  return <NailStudioContent />;
}
