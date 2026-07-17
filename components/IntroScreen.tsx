"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import StriveMark from "@/components/StriveMark";

const STORAGE_KEY = "strive-intro-shown";

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private mode, etc.) — show the intro anyway
    }

    if (alreadyShown) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const hold = shouldReduceMotion ? 500 : 1700;
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      setVisible(false);
    }, hold);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  useLayoutEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{
            opacity: 0,
            transition: { duration: shouldReduceMotion ? 0.2 : 0.6, ease: [0.23, 1, 0.32, 1] },
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: "hsl(220 70% 3%)" }}
          aria-hidden="true"
        >
          {/* Faint aurora glow to match the hero */}
          <div
            className="absolute rounded-full"
            style={{
              width: 700,
              height: 700,
              background: "radial-gradient(circle, hsl(199 100% 50% / 0.18), transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col items-center gap-5"
          >
            <div className="relative" style={{ width: "clamp(5rem, 14vw, 11rem)", height: "clamp(5rem, 14vw, 11rem)" }}>
              <StriveMark tone="light" className="w-full h-full" />
            </div>
            <div className="flex flex-col items-center leading-none gap-3">
              <span
                className="font-heading font-extrabold uppercase tracking-tight text-white"
                style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
              >
                Strive
              </span>
              <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/45 font-medium">
                Web Design &amp; Development
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
