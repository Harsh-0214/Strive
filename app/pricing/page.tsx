import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import Packages from "@/components/Packages";
import PageHero from "@/components/PageHero";

const ComparisonTable = dynamic(() => import("@/components/ComparisonTable"));
const FAQ = dynamic(() => import("@/components/FAQ"));

export const metadata: Metadata = {
  title: "Pricing: Flat-Rate Website Packages",
  description:
    "Transparent, flat-rate web design pricing: $500 landing pages & portfolios, $1,500 booking & high-traffic business sites (restaurants, salons), $2,000+ full e-commerce stores.",
  keywords: [
    "web design pricing",
    "website cost small business",
    "landing page price",
    "restaurant website cost",
    "e-commerce website price",
    "flat rate web design",
    "Canada web design pricing",
  ],
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing at Strive Web Design",
    description:
      "Flat-rate packages from $500. No hourly billing, no surprise invoices.",
    type: "website",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Pricing"
          title="Flat-rate pricing that fits your business."
          subtitle="No hourly billing. No surprise invoices. Pick the tier that matches your business, from a one-page portfolio to a full storefront."
        />
        <Packages />
        <ComparisonTable />
        <FAQ />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
