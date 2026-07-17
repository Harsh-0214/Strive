import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false });

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Website Quote",
  description:
    "Tell us about your business and get a free, no-obligation website quote within 24 hours. Serving barbershops, salons, restaurants, contractors, and e-commerce brands across Canada.",
  keywords: [
    "get a website quote",
    "web design consultation",
    "contact web design agency",
    "free website quote Canada",
    "hire a web designer",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Strive — Get a Free Website Quote",
    description: "Tell us about your business and we'll get back to you within 24 hours.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Get in Touch"
          title="Let's build something great."
          subtitle="Tell us about your business — whether it's a barbershop, a boutique, or a full storefront — and we'll reply within 24 hours with a free quote."
        />
        <ContactForm showHeading={false} />
      </main>
      <Footer />
    </>
  );
}
