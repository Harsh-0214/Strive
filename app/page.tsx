import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import PainPoints from "@/components/PainPoints";
import Packages from "@/components/Packages";
import StriveCare from "@/components/StriveCare";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import MobileCtaBar from "@/components/MobileCtaBar";

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <PainPoints />
        <Packages />
        <StriveCare />
        <HowItWorks />
        <Testimonials />
        <Results />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
