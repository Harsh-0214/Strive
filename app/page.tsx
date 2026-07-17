import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import MobileCtaBar from "@/components/MobileCtaBar";

// Lazy-load everything below the fold — splits the JS bundle so only
// Navbar + Hero JS ships on initial load.
const Stats = dynamic(() => import("@/components/Stats"));
const Marquee = dynamic(() => import("@/components/Marquee"));
const PainPoints = dynamic(() => import("@/components/PainPoints"));
const Packages = dynamic(() => import("@/components/Packages"));
const ComparisonTable = dynamic(() => import("@/components/ComparisonTable"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Results = dynamic(() => import("@/components/Results"));
const GuaranteeStrip = dynamic(() => import("@/components/GuaranteeStrip"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Marquee />
        <PainPoints />
        <Packages />
        <ComparisonTable />
        <HowItWorks />
        <Portfolio />
        <Testimonials />
        <Results />
        <GuaranteeStrip />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
