import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import WorkContent from "@/components/WorkContent";

export const metadata: Metadata = {
  title: "Our Work: Live Website Prototypes",
  description:
    "Explore four full website prototypes built by Strive: a barbershop, nail studio, restaurant, and e-commerce store, each with a completely different design vibe.",
  keywords: [
    "web design portfolio",
    "website prototypes",
    "barbershop website design",
    "nail salon website design",
    "restaurant website design",
    "e-commerce website design",
    "small business website examples Canada",
  ],
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work: Live Website Prototypes | Strive",
    description:
      "Four full prototypes, four completely different vibes. See the range Strive builds across.",
    type: "website",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <WorkContent />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
