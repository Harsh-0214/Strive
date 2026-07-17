"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/work" },
  { label: "Our Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        aria-label="Main navigation"
      >
        <div
          className={`pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            scrolled ? "mt-3 mx-4 rounded-2xl border border-white/[0.08]" : ""
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
            className={`max-w-[1680px] mx-auto grid grid-cols-[auto_1fr_auto] items-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              scrolled ? "h-14 px-4 sm:px-6" : "h-24 px-5 sm:px-8 lg:px-14 xl:px-20"
            }`}
          >
            {/* Logo — left */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 justify-self-start"
              aria-label="Strive — go to homepage"
            >
              <div
                className={`relative flex-shrink-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  scrolled ? "w-10 h-10" : "w-36 h-16"
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
                  scrolled ? "opacity-0 w-0" : "opacity-100"
                }`}
              >
                <span className="font-heading font-extrabold text-3xl tracking-widest uppercase text-white whitespace-nowrap">
                  Strive
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/50 font-medium whitespace-nowrap">
                  Web Design & Development
                </span>
              </div>
            </Link>

            {/* Desktop nav — centered */}
            <ul className="hidden md:flex items-center justify-center gap-0.5 justify-self-center" role="list">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                        active ? "text-white" : "text-white/50 hover:text-white/90"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                          transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2 justify-self-end">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-cyan-400"
                style={{
                  background: "linear-gradient(135deg, #00B4D8 0%, #0096B4 100%)",
                  boxShadow: "0 0 16px rgba(0,180,216,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                Get a Quote
              </Link>

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
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                        active ? "text-white bg-white/[0.06]" : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="h-px bg-white/[0.07] my-1" />
                <Link
                  href="/contact"
                  className="px-4 py-3 rounded-xl text-base font-semibold text-white text-center transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-cyan-400"
                  style={{
                    background: "linear-gradient(135deg, #00B4D8 0%, #0096B4 100%)",
                    boxShadow: "0 0 20px rgba(0,180,216,0.25)",
                  }}
                >
                  Get a Quote
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
