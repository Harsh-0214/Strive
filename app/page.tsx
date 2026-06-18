import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import PainPoints from "@/components/PainPoints";
import Packages from "@/components/Packages";
import StriveCare from "@/components/StriveCare";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <PainPoints />
        <Packages />
        <StriveCare />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
