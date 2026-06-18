import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

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
  title: "Strive — We build the web presence your business deserves.",
  description:
    "Strive builds fast, beautiful websites for small businesses — so you can focus on what you do best. Serving restaurants, salons, contractors, clothing brands and more across Canada.",
  keywords: [
    "web design",
    "small business website",
    "website builder",
    "web agency",
    "landing page",
    "e-commerce",
    "Canada",
  ],
  openGraph: {
    title: "Strive — Web Design for Small Businesses",
    description:
      "Your competitors are online. It's time you were too. Strive builds fast, beautiful websites for small businesses.",
    type: "website",
  },
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
      {/* Anti-FOUC: synchronously apply stored theme before paint */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
        }}
      />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
