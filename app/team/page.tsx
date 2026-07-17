import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import TeamContent from "@/components/TeamContent";

export const metadata: Metadata = {
  title: "Our Team: Founded by Ontario Tech Engineers",
  description:
    "Meet the founders of Strive: Harsh Tamakuwala and Rahul Modhera, software engineers and Ontario Tech University graduates building fast, beautiful websites for small businesses across Canada.",
  keywords: [
    "Strive web design team",
    "Harsh Tamakuwala",
    "Rahul Modhera",
    "Ontario Tech University engineers",
    "web design agency founders",
    "Canadian web design agency",
  ],
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Meet the Founders at Strive Web Design",
    description:
      "Two software engineers from Ontario Tech University building websites that punch above their price tag.",
    type: "website",
    url: "/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <TeamContent />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
