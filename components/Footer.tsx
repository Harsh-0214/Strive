import { Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Our Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
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
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Strive — go to homepage"
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
          </Link>

          {/* Nav links — centered */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-3" role="list">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
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
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.06] text-white/50 hover:bg-white/[0.12] hover:text-white transition-all duration-150"
              >
                <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p>&copy; {new Date().getFullYear()} Strive Web Design. All rights reserved.</p>
          <p>
            Founded by Harsh Tamakuwala &amp; Rahul Modhera · Ontario, Canada
          </p>
        </div>
      </div>
    </footer>
  );
}
