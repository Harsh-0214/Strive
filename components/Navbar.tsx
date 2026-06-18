"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/lib/theme";

const navLinks = [
  { label: "Packages", href: "#packages" },
  { label: "Strive Care", href: "#strive-care" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggle } = useTheme();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Focus trap
  useEffect(() => {
    if (!menuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); return; }
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <>
      {/* Full-width fixed wrapper — pointer-events-none so only the inner pill captures clicks */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        aria-label="Main navigation"
      >
        {/* Pill container */}
        <div
          className={`pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            scrolled ? "mt-3 mx-4 max-w-3xl rounded-2xl border border-white/[0.08]" : ""
          }`}
          style={
            scrolled
              ? {
                  background: "rgba(5, 9, 18, 0.88)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                }
              : {}
          }
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              scrolled ? "h-[3.5rem] px-5" : "h-24 px-4 sm:px-8 lg:px-14"
            }`}
          >
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 flex-shrink-0"
              aria-label="Strive — go to homepage"
            >
              <div
                className={`relative flex-shrink-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  scrolled ? "w-9 h-9" : "w-36 h-16"
                }`}
              >
                <Image
                  src="/Logo(s).png"
                  alt="Strive logo"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div
                className={`flex flex-col leading-none gap-0.5 transition-all duration-300 overflow-hidden ${
                  scrolled ? "opacity-0 max-w-0" : "opacity-100 max-w-xs"
                }`}
              >
                <span className="font-heading font-extrabold text-3xl tracking-widest uppercase text-white whitespace-nowrap">
                  Strive
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium whitespace-nowrap">
                  Web Design & Development
                </span>
              </div>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-0.5" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                        isActive ? "text-white" : "text-white/50 hover:text-white/90"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                          transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/[0.07] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun size={16} strokeWidth={1.75} aria-hidden />
                ) : (
                  <Moon size={16} strokeWidth={1.75} aria-hidden />
                )}
              </button>

              <button
                onClick={() => handleNavClick("#contact")}
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-cyan-400"
                style={{
                  background: "linear-gradient(135deg, #00B4D8 0%, #0096B4 100%)",
                  boxShadow: "0 0 16px rgba(0,180,216,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                Get Started
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/[0.07] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={18} aria-hidden />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={18} aria-hidden />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50"
              style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              ref={drawerRef}
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="fixed top-[4.5rem] left-3 right-3 z-50 rounded-2xl border border-white/[0.08] overflow-hidden"
              style={{
                background: "rgba(5, 9, 18, 0.96)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <nav className="p-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="h-px bg-white/[0.07] my-1" />
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="px-4 py-3 rounded-xl text-base font-semibold text-white text-center transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-cyan-400"
                  style={{
                    background: "linear-gradient(135deg, #00B4D8 0%, #0096B4 100%)",
                    boxShadow: "0 0 20px rgba(0,180,216,0.25)",
                  }}
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
