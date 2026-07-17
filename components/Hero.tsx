"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import StriveMark from "@/components/StriveMark";
import { INTRO_STORAGE_KEY, INTRO_DISMISSED_EVENT } from "@/components/IntroScreen";

const businessTypes = [
  "Barbershops",
  "Nail Studios",
  "Restaurants",
  "Clothing Brands",
  "Contractors",
  "E-Commerce Stores",
];

// Large blurred orb — the core of the aurora mesh effect
function GlowOrb({
  color,
  size,
  left,
  top,
  animX,
  animY,
  duration,
  delay = 0,
}: {
  color: string;
  size: number;
  left: string;
  top: string;
  animX: number[];
  animY: number[];
  duration: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full -z-10"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: "blur(72px)",
        willChange: "transform",
      }}
      animate={{ x: animX, y: animY }}
      transition={{ duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

// Occasional shooting star — streaks diagonally then fades
function ShootingStar({
  top,
  left,
  delay,
  repeatDelay,
  travel,
}: {
  top: string;
  left: string;
  delay: number;
  repeatDelay: number;
  travel: number;
}) {
  return (
    <motion.div
      className="absolute -z-10"
      style={{ top, left, willChange: "transform, opacity" }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, travel],
        y: [0, travel * 0.42],
      }}
      transition={{
        duration: 1.1,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: "easeOut",
        times: [0, 0.1, 0.7, 1],
      }}
      aria-hidden="true"
    >
      {/* Trailing tail */}
      <div
        style={{
          width: 140,
          height: 1.5,
          transform: "rotate(23deg)",
          transformOrigin: "left center",
          background:
            "linear-gradient(90deg, transparent, hsl(199 100% 85% / 0.9))",
          borderRadius: 9999,
        }}
      />
      {/* Bright head */}
      <div
        className="absolute rounded-full"
        style={{
          top: -1.5,
          left: 0,
          width: 4,
          height: 4,
          background: "hsl(0 0% 100%)",
          boxShadow:
            "0 0 8px 2px hsl(199 100% 80% / 0.9), 0 0 16px 5px hsl(199 100% 70% / 0.5)",
        }}
      />
    </motion.div>
  );
}

// Twinkling sparkle point
function Sparkle({ index }: { index: number }) {
  const x = (index * 19 + 7) % 45;
  const y = (index * 29 + 11) % 92;
  const delay = (index * 0.28) % 5;
  const duration = 2.4 + (index % 4) * 0.6;
  const isCyan = index % 3 === 0;
  const size = 2.5 + (index % 4) * 1.25;

  return (
    <motion.div
      className="absolute rounded-full -z-10"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: isCyan ? "hsl(199 100% 85%)" : "hsl(0 0% 100%)",
        boxShadow: isCyan
          ? "0 0 10px 3px hsl(199 100% 72% / 0.8), 0 0 18px 6px hsl(199 100% 65% / 0.4)"
          : "0 0 8px 2px hsl(0 0% 100% / 0.6), 0 0 14px 4px hsl(210 100% 90% / 0.3)",
      }}
      animate={{ opacity: [0.2, 1, 0.4, 0.9, 0.2], scale: [0.7, 1.5, 0.8, 1.3, 0.7] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const bentoContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const bentoItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

function StatsBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={bentoContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-2 gap-4 w-full"
    >
      {/* Big hero stat */}
      <motion.div
        variants={bentoItem}
        className="col-span-2 rounded-2xl p-7 sm:p-9"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
          Total Businesses Launched
        </p>
        <div
          className="font-heading font-black leading-none mb-2 tabular-nums text-white"
          style={{ fontSize: "clamp(3.5rem, 7vw, 5.75rem)" }}
          aria-label="50+ businesses launched"
        >
          <Counter target={50} suffix="+" active={inView} />
        </div>
        <p className="text-base font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
          businesses across Canada
        </p>
      </motion.div>

      {/* Launch time */}
      <motion.div
        variants={bentoItem}
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderTop: "2px solid #00B4D8",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Avg. Launch Time
        </p>
        <div className="font-heading font-black leading-none" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#00B4D8" }}>
          1–2 Weeks
        </div>
      </motion.div>

      {/* Satisfaction */}
      <motion.div
        variants={bentoItem}
        className="rounded-2xl p-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderTop: "2px solid #E8C547",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          Satisfaction Rate
        </p>
        <div className="font-heading font-black leading-none tabular-nums" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#E8C547" }}>
          <Counter target={100} suffix="%" active={inView} />
        </div>
      </motion.div>

      {/* Quote */}
      <motion.div
        variants={bentoItem}
        className="col-span-2 rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <blockquote>
          <p className="font-heading font-bold italic leading-snug" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.75)" }}>
            &ldquo;Your website should work as hard as you do.&rdquo;
          </p>
          <footer className="mt-2 text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Strive Design Agency
          </footer>
        </blockquote>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [typeIndex, setTypeIndex] = useState(0);
  const [bgActive, setBgActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setTypeIndex((i) => (i + 1) % businessTypes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Defer the heavy animated background (blurred orbs, sparkles) until the intro
  // screen is dismissed — no point burning CPU/GPU on it while it's fully covered.
  useEffect(() => {
    if (shouldReduceMotion) return;
    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    } catch {
      // sessionStorage unavailable — just show the background right away
      alreadyDismissed = true;
    }
    if (alreadyDismissed) {
      setBgActive(true);
      return;
    }
    const onDismiss = () => setBgActive(true);
    window.addEventListener(INTRO_DISMISSED_EVENT, onDismiss);
    const fallback = window.setTimeout(() => setBgActive(true), 2500);
    return () => {
      window.removeEventListener(INTRO_DISMISSED_EVENT, onDismiss);
      window.clearTimeout(fallback);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 lg:min-h-dvh lg:flex lg:flex-col lg:justify-center"
      aria-labelledby="hero-heading"
    >
      {/* ── Aurora mesh background ── */}

      {/* Near-black base */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "hsl(220 70% 3%)" }}
        aria-hidden="true"
      />

      {bgActive && (
        <>
          {/* Orb A — electric blue, top-left, drifts right-down */}
          <GlowOrb
            color="hsl(218 90% 48% / 0.6)"
            size={560}
            left="-10%"
            top="-8%"
            animX={[0, 80, 30, 0]}
            animY={[0, 60, 110, 0]}
            duration={18}
          />

          {/* Orb B — vivid cyan, center-right, drifts left */}
          <GlowOrb
            color="hsl(199 100% 50% / 0.45)"
            size={480}
            left="55%"
            top="20%"
            animX={[0, -90, -40, 0]}
            animY={[0, 50, -30, 0]}
            duration={20}
            delay={3}
          />

          {/* Orb C — indigo, bottom-center, slow pulse */}
          <GlowOrb
            color="hsl(240 70% 38% / 0.5)"
            size={520}
            left="25%"
            top="55%"
            animX={[0, 60, -30, 0]}
            animY={[0, -40, 20, 0]}
            duration={22}
            delay={7}
          />

          {/* Occasional shooting stars — staggered so they feel like a delight */}
          <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <ShootingStar top="12%" left="8%" delay={2} repeatDelay={11} travel={420} />
            <ShootingStar top="8%" left="30%" delay={9} repeatDelay={16} travel={480} />
          </div>

          {/* Sparkle field — kept to the left half so it doesn't clash with the stats grid */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <Sparkle key={i} index={i} />
            ))}
          </div>
        </>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 w-full section-padding">
        {/* Mobile / tablet layout (below lg): logo-led, centered, one screen ending at social proof — then a distinct second block on scroll. */}
        <div className="lg:hidden flex flex-col">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center gap-7 justify-center"
            style={{ minHeight: "calc(100dvh - 11rem)" }}
          >
            {/* Brand lockup — big, centered, the dominant element on first screen */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
              <div className="relative shrink-0" style={{ width: "clamp(5rem, 26vw, 8rem)", height: "clamp(5rem, 26vw, 8rem)" }}>
                <StriveMark tone="light" className="w-full h-full" />
              </div>
              <div className="flex flex-col items-center leading-none gap-2">
                <h1
                  id="hero-heading"
                  className="font-heading font-extrabold uppercase tracking-tight text-white"
                  style={{ fontSize: "clamp(2.5rem, 13vw, 4rem)", lineHeight: 0.95 }}
                >
                  Strive
                </h1>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/45 font-medium">
                  Web Design &amp; Development
                </span>
              </div>
            </motion.div>

            {/* Slogan */}
            <motion.p
              variants={itemVariants}
              className="font-heading font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 8vw, 2.5rem)",
                background: "linear-gradient(92deg, hsl(199 100% 72%), hsl(212 100% 82%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We Build, You Grow.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-3.5 w-full max-w-xs">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-white overflow-hidden w-full"
                style={{
                  background: "linear-gradient(135deg, hsl(199 100% 44%) 0%, hsl(212 90% 40%) 100%)",
                  boxShadow:
                    "0 0 0 1px hsl(199 100% 60% / 0.35) inset, 0 8px 32px hsl(199 100% 44% / 0.45), 0 2px 8px hsl(212 90% 40% / 0.3)",
                }}
              >
                <span className="relative">Get a Free Quote</span>
                <ArrowRight size={18} className="relative" aria-hidden="true" />
              </a>

              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white/90 border border-white/20 bg-white/[0.07] backdrop-blur-sm active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white w-full"
              >
                View Packages
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {(["MT", "JR", "AK", "SC"] as const).map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full border-2 border-white/15 flex items-center justify-center text-[10px] font-bold text-white"
                    style={{
                      background: (["hsl(330 60% 55%)", "hsl(210 70% 50%)", "hsl(270 55% 55%)", "hsl(160 55% 45%)"])[i],
                      zIndex: 4 - i,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-sm">
                <span className="text-white/90 font-semibold">50+</span> businesses launched across Canada
              </p>
            </motion.div>
          </motion.div>

          {/* Second block, revealed on scroll: what we build + stats */}
          <div className="flex flex-col gap-12 pt-8 pb-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col items-center text-center gap-3"
            >
              <motion.p
                variants={itemVariants}
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#00B4D8" }}
              >
                What We Build
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="font-heading font-extrabold text-white leading-[1.1]"
                style={{ fontSize: "clamp(1.85rem, 8vw, 2.5rem)" }}
              >
                Fast, Beautiful Websites For
              </motion.h2>
              <motion.span
                variants={itemVariants}
                className="overflow-hidden flex justify-center w-full py-1"
                style={{ height: "clamp(3rem, 12vw, 3.75rem)" }}
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={typeIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="font-heading font-black"
                    style={{
                      fontSize: "clamp(2rem, 9vw, 2.75rem)",
                      lineHeight: 1.15,
                      background: "linear-gradient(90deg, hsl(199 100% 65%), hsl(212 90% 75%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "block",
                    }}
                  >
                    {businessTypes[typeIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
              <motion.p variants={itemVariants} className="text-white/55 mt-1" style={{ fontSize: "1.05rem" }}>
                Freeing you to focus on what you do best.
              </motion.p>
            </motion.div>

            <StatsBento />
          </div>
        </div>

        {/* Desktop layout (lg+): two columns side by side, single screen */}
        <div className="hidden lg:grid max-w-[2200px] mx-auto lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
          {/* Left — brand */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6 text-left"
          >
            {/* Brand lockup — the hero headline */}
            <motion.div variants={itemVariants} className="flex items-center gap-7">
              <div className="relative shrink-0" style={{ width: "clamp(2.75rem, 9vw, 7.5rem)", height: "clamp(2.75rem, 9vw, 7.5rem)" }}>
                <StriveMark tone="light" className="w-full h-full" />
              </div>
              <div className="flex flex-col leading-none gap-2.5 min-w-0">
                <span
                  className="font-heading font-extrabold uppercase tracking-tight text-white"
                  style={{ fontSize: "clamp(2.1rem, 8.5vw, 7.5rem)", lineHeight: 0.95 }}
                >
                  Strive
                </span>
                <span className="text-base tracking-[0.25em] uppercase text-white/45 font-medium">
                  Web Design &amp; Development
                </span>
              </div>
            </motion.div>

            {/* Slogan */}
            <motion.p
              variants={itemVariants}
              className="font-heading font-bold tracking-tight"
              style={{
                fontSize: "clamp(1.85rem, 4vw, 3.25rem)",
                background: "linear-gradient(92deg, hsl(199 100% 72%), hsl(212 100% 82%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We Build, You Grow.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row items-center gap-4 mt-3 w-full"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg text-white transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, hsl(199 100% 44%) 0%, hsl(212 90% 40%) 100%)",
                  boxShadow:
                    "0 0 0 1px hsl(199 100% 60% / 0.35) inset, 0 8px 32px hsl(199 100% 44% / 0.45), 0 2px 8px hsl(212 90% 40% / 0.3)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, hsl(199 100% 54%) 0%, hsl(212 90% 50%) 100%)",
                  }}
                  aria-hidden="true"
                />
                <span className="relative">Get a Free Quote</span>
                <ArrowRight
                  size={20}
                  className="relative transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href="#packages"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold text-lg text-white/90 border border-white/20 bg-white/[0.07] backdrop-blur-sm hover:bg-white/[0.13] hover:border-white/30 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white"
              >
                View Packages
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2" aria-hidden="true">
                {(["MT", "JR", "AK", "SC"] as const).map((initials, i) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full border-2 border-white/15 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: (["hsl(330 60% 55%)", "hsl(210 70% 50%)", "hsl(270 55% 55%)", "hsl(160 55% 45%)"])[i],
                      zIndex: 4 - i,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-white/50 text-base">
                <span className="text-white/90 font-semibold">50+</span> businesses launched across Canada
              </p>
            </motion.div>
          </motion.div>

          {/* Right — subheadline + stats bento */}
          <div className="flex flex-col gap-10 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start gap-2 text-left"
            >
              <motion.p
                variants={itemVariants}
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#00B4D8" }}
              >
                What We Build
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="font-heading font-extrabold text-white leading-[1.1]"
                style={{ fontSize: "clamp(1.85rem, 2.6vw, 2.5rem)" }}
              >
                Fast, Beautiful Websites For
              </motion.h2>
              <motion.span
                variants={itemVariants}
                className="overflow-hidden flex justify-start w-full py-1"
                style={{ height: "clamp(2.75rem, 4.2vw, 3.5rem)" }}
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={typeIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="font-heading font-black"
                    style={{
                      fontSize: "clamp(1.85rem, 3.4vw, 2.75rem)",
                      lineHeight: 1.15,
                      background: "linear-gradient(90deg, hsl(199 100% 65%), hsl(212 90% 75%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "block",
                    }}
                  >
                    {businessTypes[typeIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
              <motion.p variants={itemVariants} className="text-white/55 mt-1" style={{ fontSize: "1.1rem" }}>
                Freeing you to focus on what you do best.
              </motion.p>
            </motion.div>

            <StatsBento />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/35 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
