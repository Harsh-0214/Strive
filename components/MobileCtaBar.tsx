"use client";

import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// A sentinel placed at the bottom of the Hero section triggers visibility
export default function MobileCtaBar() {
  // We use a sentinel div approach via a ref passed from page, but since we
  // can't easily pass refs across components we use a scroll-based approach.
  const sentinelRef = useRef<HTMLDivElement>(null);
  // We place the bar in the DOM and show it once a sentinel (rendered inside
  // this component at the top of the page) scrolls out of view.
  const heroInView = useInView(sentinelRef, { margin: "0px" });

  return (
    <>
      {/* Sentinel positioned at page top to detect when hero scrolls out */}
      <div
        ref={sentinelRef}
        className="fixed top-[100dvh] left-0 pointer-events-none"
        aria-hidden="true"
      />

      <AnimatePresence>
        {!heroInView && (
          <motion.div
            key="mobile-cta-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-safe pb-4 pt-3"
            style={{
              background: "rgba(var(--background-rgb, 255 255 255) / 0.9)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderTop: "1px solid hsl(var(--border) / 0.5)",
              backgroundColor: "hsl(var(--background) / 0.9)",
            }}
          >
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              Get a Free Quote
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
