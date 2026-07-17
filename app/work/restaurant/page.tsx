import type { Metadata } from "next";
import { getPrototype } from "@/lib/prototypes";
import RestaurantContent from "@/components/prototypes/RestaurantContent";

const proto = getPrototype("restaurant")!;

export const metadata: Metadata = {
  title: `${proto.name}: Restaurant Website Prototype by Strive`,
  description:
    "A warm, high-traffic restaurant website prototype with menu and reservations, built by Strive to showcase hospitality web design that converts browsers into bookings.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/work/restaurant" },
};

export default function RestaurantPage() {
  return <RestaurantContent />;
}
