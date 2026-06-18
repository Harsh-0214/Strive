"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Packages", href: "#packages" },
  { label: "Strive Care", href: "#strive-care" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-sm" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto section-padding">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Wordmark */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="Strive — go to homepage"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary"
                aria-hidden="true"
              >
                <TrendingUp
                  size={18}
                  strokeWidth={2.5}
                  className="text-primary-foreground"
                />
              </motion.div>
              <span className="font-heading font-800 text-xl tracking-tight text-foreground">
                Strive
              </span>
            </a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick("#contact")}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-150 shadow-sm shadow-primary/20"
              >
                Get Started
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted transition-colors duration-150"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-foreground/20"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-50 bg-background border-b border-border shadow-lg"
            >
              <nav className="max-w-7xl mx-auto section-padding py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="mt-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground text-base font-semibold text-center hover:opacity-90 transition-opacity duration-150"
                >
                  Get Started
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
