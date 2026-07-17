import type { Metadata } from "next";
import { getPrototype } from "@/lib/prototypes";
import EcommerceContent from "@/components/prototypes/EcommerceContent";

const proto = getPrototype("ecommerce")!;

export const metadata: Metadata = {
  title: `${proto.name}: Clothing E-Commerce Website Prototype by Strive`,
  description:
    "A full clothing e-commerce prototype with product grid, cart, and checkout flow, built by Strive to showcase high-conversion online store design.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/work/ecommerce" },
};

export default function EcommercePage() {
  return <EcommerceContent />;
}
