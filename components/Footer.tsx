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
  {
    label: "Instagram",
    Icon: Instagram,
    href: "https://instagram.com",
  },
  {
    label: "Facebook",
    Icon: Facebook,
    href: "https://facebook.com",
  },
  {
    label: "LinkedIn",
    Icon: Linkedin,
    href: "https://linkedin.com",
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground" role="contentinfo">
      <div className="max-w-7xl mx-auto section-padding py-14">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <a
              href="#"
              className="flex items-center gap-3 group"
              aria-label="Strive — go to top"
            >
              <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden">
                <Image
                  src="/Logo(s).png"
                  alt=""
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-col leading-none gap-1">
                <span className="font-heading font-extrabold text-xl tracking-widest uppercase text-white">
                  Strive
                </span>
                <span className="text-[10px] tracking-widest uppercase text-white/60 font-medium">
                  Web Design & Development
                </span>
              </div>
            </a>
            <p className="text-sm text-white/75 leading-relaxed">
              We build the web presence your business deserves.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Strive on ${label}`}
                  className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center text-white/75 hover:text-white hover:bg-white/20 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3" role="list">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-white/75 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Strive. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="#"
              className="text-white/75 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-white"
            >
              Strive
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
