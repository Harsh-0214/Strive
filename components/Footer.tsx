import { Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

const footerLinks = [
  { label: "Packages", href: "#packages" },
  { label: "Strive Care", href: "#strive-care" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Get a Quote", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", Icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", Icon: Facebook, href: "https://facebook.com" },
  { label: "LinkedIn", Icon: Linkedin, href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#070b14" }} role="contentinfo">
      <div className="max-w-7xl mx-auto section-padding py-12">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="Strive — go to top"
          >
            <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden">
              <Image
                src="/Logo(s).png"
                alt=""
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col leading-none gap-1">
              <span
                className="font-heading font-extrabold text-lg tracking-widest uppercase"
                style={{ color: "#FFFFFF" }}
              >
                Strive
              </span>
              <span
                className="text-[9px] tracking-widest uppercase font-medium"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Web Design & Development
              </span>
            </div>
          </a>

          {/* Nav links — centered */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-3" role="list">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm font-medium"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      transition: "color 150ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Strive on ${label}`}
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
                  transition: "background 150ms ease, color 150ms ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.12)";
                  el.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.06)";
                  el.style.color = "rgba(255,255,255,0.5)";
                }}
              >
                <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <p>&copy; {new Date().getFullYear()} Strive. All rights reserved.</p>
          <p>
            Crafted by{" "}
            <a
              href="#"
              style={{
                color: "rgba(255,255,255,0.5)",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              Strive
            </a>{" "}
            · Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
