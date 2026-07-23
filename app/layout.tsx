import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import IntroScreen from "@/components/IntroScreen";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://striveweb.ca"),
  title: {
    default: "Strive: Websites As Ambitious As Your Business",
    template: "%s | Strive Web Design",
  },
  description:
    "Strive is a web design agency building fast, beautiful, custom websites for small businesses, from $500 portfolio sites to $2,000+ e-commerce stores. Barbershops, salons, restaurants, contractors, and retail brands across Canada.",
  keywords: [
    "web design agency",
    "web design agency Canada",
    "small business website design",
    "custom website design",
    "landing page design",
    "portfolio website design",
    "restaurant website design",
    "booking website design",
    "barbershop website design",
    "nail salon website design",
    "e-commerce website design",
    "clothing brand website",
    "affordable web design",
    "flat rate web design",
    "Ontario web design agency",
    "web developer Ontario Tech University",
  ],
  authors: [{ name: "Harsh Tamakuwala" }, { name: "Rahul Modhera" }],
  creator: "Strive Web Design",
  publisher: "Strive Web Design",
  openGraph: {
    title: "Strive: Websites As Ambitious As Your Business",
    description:
      "Custom websites for small businesses, from $500 portfolio sites to full e-commerce stores. See our range across barbershops, salons, restaurants, and retail brands.",
    type: "website",
    siteName: "Strive Web Design",
    locale: "en_CA",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strive: Websites As Ambitious As Your Business",
    description:
      "Custom websites for small businesses, from $500 portfolio sites to full e-commerce stores.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Strive Web Design",
  description:
    "Web design agency building custom websites for small businesses: landing pages, booking sites, and e-commerce stores.",
  url: "https://striveweb.ca",
  areaServed: "CA",
  founders: [
    { "@type": "Person", name: "Harsh Tamakuwala" },
    { "@type": "Person", name: "Rahul Modhera" },
  ],
  priceRange: "$500 - $2000+",
  makesOffer: [
    { "@type": "Offer", name: "Launch: Landing/Portfolio Website", price: "500", priceCurrency: "USD" },
    { "@type": "Offer", name: "Growth: Booking & High-Traffic Website", price: "1500", priceCurrency: "USD" },
    { "@type": "Offer", name: "Commerce: E-Commerce Website", price: "2000", priceCurrency: "USD" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable}`}
    >
      <head>
        {/* Anti-FOUC: synchronously apply stored theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Skip to main content — keyboard accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <IntroScreen />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
