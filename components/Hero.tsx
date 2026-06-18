"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const PARTICLE_COUNT = 16;

const businessTypes = [
  "restaurants",
  "salons",
  "contractors",
  "clothing brands",
  "photographers",
  "fitness coaches",
];

function FloatingParticle({ index }: { index: number }) {
  const size = 3 + (index % 6) * 2.5;
  const left = (index * 7 + 13) % 95;
  const delay = (index * 0.38) % 5;
  const duration = 7 + (index % 5) * 2;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: "-20px",
        willChange: "transform",
        background:
          index % 3 === 0
            ? "hsl(199 100% 65% / 0.25)"
            : "hsl(0 0% 100% / 0.12)",
      }}
      animate={{
        y: [0, -900],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    />
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden pt-24"
      aria-labelledby="hero-heading"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(145deg, hsl(220 40% 3%) 0%, hsl(221 60% 8%) 30%, hsl(218 70% 18%) 60%, hsl(220 35% 5%) 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 10s ease infinite",
        }}
        aria-hidden="true"
      />
      {/* Accent radial glow — bottom right */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 85% 80%, hsl(199 100% 58% / 0.12) 0%, transparent 70%), radial-gradient(ellipse 55% 60% at 10% 25%, hsl(218 90% 58% / 0.12) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      {/* Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto section-padding text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow pill */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/95 text-sm font-medium border border-white/15 backdrop-blur-md">
              <span
                className="w-2 h-2 rounded-full bg-accent animate-pulse-glow inline-block"
                aria-hidden="true"
              />
              Web design for small businesses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.08] tracking-tight text-white max-w-4xl"
          >
            Your competitors
            <br className="hidden sm:block" /> are{" "}
            <span
              className="relative inline-block"
              style={{
                background:
                  "linear-gradient(90deg, hsl(0 0% 100%), hsl(214 100% 85%))",
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

          {/* Animated subheadline with cycling type */}
          <motion.div
            variants={itemVariants}
            className="max-w-2xl text-lg sm:text-xl md:text-2xl text-white/75 leading-relaxed"
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
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="font-semibold text-accent"
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
            className="flex flex-col sm:flex-row items-center gap-4 mt-1"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-foreground bg-white hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-xl shadow-black/20 focus-visible:outline-2 focus-visible:outline-white"
            >
              Get a Free Quote
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-base border border-white/25 hover:bg-white/18 active:scale-95 transition-all duration-200 backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-white"
            >
              See Our Packages
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-1"
          >
            {/* Stacked avatars */}
            <div className="flex -space-x-2" aria-hidden="true">
              {["MT", "JR", "AK", "SC"].map((initials, i) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: [
                      "hsl(330 60% 55%)",
                      "hsl(210 70% 50%)",
                      "hsl(270 55% 55%)",
                      "hsl(160 55% 45%)",
                    ][i],
                    zIndex: 4 - i,
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm">
              <span className="text-white font-semibold">50+</span> small businesses launched across Canada
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
