"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import StriveMark from "@/components/StriveMark";

export const INTRO_STORAGE_KEY = "strive-intro-shown";
export const INTRO_DISMISSED_EVENT = "strive:intro-dismissed";
const STORAGE_KEY = INTRO_STORAGE_KEY;

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
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
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    window.dispatchEvent(new Event(INTRO_DISMISSED_EVENT));
  };

  return (
    <AnimatePresence>
      {visible && ready && (
        <motion.div
          key="intro"
          exit={{
            opacity: 0,
            transition: { duration: shouldReduceMotion ? 0.2 : 0.6, ease: [0.23, 1, 0.32, 1] },
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center cursor-pointer px-6"
          style={{ background: "hsl(220 70% 3%)" }}
          role="button"
          tabIndex={0}
          aria-label="Enter Strive"
          onClick={dismiss}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") dismiss();
          }}
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
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col items-center gap-7 text-center"
          >
            <div className="flex flex-col items-center gap-5">
              <div className="relative" style={{ width: "clamp(4.5rem, 13vw, 9rem)", height: "clamp(4.5rem, 13vw, 9rem)" }}>
                <StriveMark tone="light" className="w-full h-full" />
              </div>
              <div className="flex flex-col items-center leading-none gap-3">
                <span
                  className="font-heading font-extrabold uppercase tracking-tight text-white"
                  style={{ fontSize: "clamp(1.85rem, 5.5vw, 3.5rem)" }}
                >
                  Strive
                </span>
                <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/45 font-medium">
                  Web Design &amp; Development
                </span>
              </div>
            </div>

            <p
              className="font-heading font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                background: "linear-gradient(92deg, hsl(199 100% 72%), hsl(212 100% 82%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We Build, You Grow.
            </p>

            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white active:scale-95 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-white"
              style={{
                background: "linear-gradient(135deg, hsl(199 100% 44%) 0%, hsl(212 90% 40%) 100%)",
                boxShadow:
                  "0 0 0 1px hsl(199 100% 60% / 0.35) inset, 0 8px 32px hsl(199 100% 44% / 0.45)",
              }}
              animate={shouldReduceMotion ? {} : { scale: [1, 1.035, 1] }}
              transition={shouldReduceMotion ? {} : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              Enter Site
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </motion.button>

            <span className="text-xs text-white/30 tracking-wide">Tap anywhere to continue</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
