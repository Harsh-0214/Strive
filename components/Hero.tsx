"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const businessTypes = [
  "restaurants",
  "salons",
  "contractors",
  "clothing brands",
  "photographers",
  "fitness coaches",
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
  const x = (index * 19 + 7) % 93;
  const y = (index * 29 + 11) % 82;
  const delay = (index * 0.28) % 5;
  const duration = 2.4 + (index % 4) * 0.6;
  const isCyan = index % 3 === 0;
  // Vary sizes so some stars read as bright/close, others faint/distant
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

export default function Hero() {
  const [typeIndex, setTypeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypeIndex((i) => (i + 1) % businessTypes.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* ── Aurora mesh background ── */}

      {/* Near-black base */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "hsl(220 70% 3%)" }}
        aria-hidden="true"
      />

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

      {/* Orb D — smaller cyan accent, far right */}
      <GlowOrb
        color="hsl(195 100% 45% / 0.3)"
        size={320}
        left="80%"
        top="60%"
        animX={[0, -50, 20, 0]}
        animY={[0, -60, 30, 0]}
        duration={16}
        delay={2}
      />

      {/* Top-center light cone / god ray */}
      <div
        className="absolute -z-10 top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "380px",
          height: "55%",
          background:
            "radial-gradient(ellipse 50% 100% at 50% 0%, hsl(210 90% 58% / 0.22) 0%, transparent 72%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Thin central beam */}
      <div
        className="absolute -z-10 top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "1px",
          height: "45%",
          background:
            "linear-gradient(180deg, hsl(199 100% 75% / 0.5) 0%, transparent 100%)",
          filter: "blur(1px)",
        }}
        aria-hidden="true"
      />

      {/* Occasional shooting stars — staggered so they feel like a delight */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <ShootingStar top="12%" left="8%" delay={2} repeatDelay={11} travel={520} />
        <ShootingStar top="22%" left="55%" delay={7} repeatDelay={15} travel={460} />
        <ShootingStar top="6%" left="35%" delay={13} repeatDelay={18} travel={600} />
      </div>

      {/* Sparkle field */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <Sparkle key={i} index={i} />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto section-padding text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5"
        >
          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-heading font-extrabold text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[1.06] tracking-tight text-white max-w-4xl"
          >
            Your competitors
            <br className="hidden sm:block" /> are{" "}
            <span
              style={{
                background: "linear-gradient(92deg, hsl(199 100% 72%), hsl(212 100% 82%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              online.
            </span>
            <br />
            It&apos;s time you were too.
          </motion.h1>

          {/* Subheadline with cycling type */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl text-lg sm:text-xl text-white/65 leading-relaxed"
          >
            <p>
              Strive builds fast, beautiful websites for{" "}
              <span
                className="inline-flex overflow-hidden"
                style={{ minWidth: "11rem", verticalAlign: "bottom" }}
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
                    style={{
                      background: "linear-gradient(90deg, hsl(199 100% 65%), hsl(212 90% 75%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 600,
                    }}
                  >
                    {businessTypes[typeIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              — so you can focus on what you do best.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full"
          >
            {/* Primary — glowing cyan gradient */}
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(199 100% 44%) 0%, hsl(212 90% 40%) 100%)",
                boxShadow:
                  "0 0 0 1px hsl(199 100% 60% / 0.35) inset, 0 8px 32px hsl(199 100% 44% / 0.45), 0 2px 8px hsl(212 90% 40% / 0.3)",
              }}
            >
              {/* Shimmer on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(199 100% 54%) 0%, hsl(212 90% 50%) 100%)",
                }}
                aria-hidden="true"
              />
              <span className="relative">Get a Free Quote</span>
              <ArrowRight
                size={18}
                className="relative transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            {/* Secondary — glass */}
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white/90 border border-white/20 bg-white/[0.07] backdrop-blur-sm hover:bg-white/[0.13] hover:border-white/30 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white"
            >
              View Packages
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-1"
          >
            <div className="flex -space-x-2" aria-hidden="true">
              {(["MT", "JR", "AK", "SC"] as const).map((initials, i) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full border-2 border-white/15 flex items-center justify-center text-xs font-bold text-white"
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
              <span className="text-white/90 font-semibold">50+</span> small businesses launched across Canada
            </p>
          </motion.div>
        </motion.div>
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
