"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const SHARD_COUNT = 18;

const businessTypes = [
  "restaurants",
  "salons",
  "contractors",
  "clothing brands",
  "photographers",
  "fitness coaches",
];

// Angular metallic shard — echoes the faceted chevron bands of the logo
function FloatingShard({ index }: { index: number }) {
  const width = 16 + (index % 5) * 9;
  const left = (index * 9 + 6) % 95;
  const delay = (index * 0.46) % 6;
  const duration = 12 + (index % 5) * 2.4;
  const baseRotate = -25 + (index % 4) * 8;
  const bright = index % 3 === 0;

  return (
    <motion.div
      className="absolute"
      style={{
        width,
        height: width * 0.4,
        left: `${left}%`,
        bottom: "-48px",
        borderRadius: 2,
        willChange: "transform, opacity",
        // Skewed parallelogram — the building block of the logo's "S"
        clipPath: "polygon(28% 0, 100% 0, 72% 100%, 0 100%)",
        background: bright
          ? "linear-gradient(135deg, hsl(205 75% 80% / 0.55), hsl(212 60% 45% / 0.05))"
          : "linear-gradient(135deg, hsl(210 55% 62% / 0.32), transparent)",
      }}
      animate={{
        y: [0, -820],
        opacity: [0, 0.75, 0.75, 0],
        rotate: [baseRotate, baseRotate + 14],
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
      {/* ── Background: metallic faceted steel-blue, matched to the logo ── */}

      {/* Base brushed-metal gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(150deg, hsl(220 65% 4%) 0%, hsl(218 55% 10%) 30%, hsl(208 62% 22%) 52%, hsl(222 60% 9%) 74%, hsl(221 65% 4%) 100%)",
          backgroundSize: "220% 220%",
          animation: "gradient-shift 14s ease infinite",
        }}
        aria-hidden="true"
      />

      {/* Faceted angular planes — sheen along the logo's chevron angle */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 0%, hsl(205 80% 60% / 0.07) 36%, transparent 42%, transparent 58%, hsl(210 70% 55% / 0.05) 64%, transparent 72%), linear-gradient(245deg, transparent 70%, hsl(199 90% 50% / 0.05) 88%, transparent 94%)",
        }}
        aria-hidden="true"
      />

      {/* Depth glows */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 50% at 80% 78%, hsl(199 100% 58% / 0.14) 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 12% 22%, hsl(212 90% 55% / 0.12) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Large chevron motif — echoes the layered "S" of the logo */}
      <motion.div
        className="absolute -z-10 right-[-6%] top-1/2 -translate-y-1/2 hidden md:block"
        style={{ width: "52vw", maxWidth: 720, willChange: "transform" }}
        animate={{ y: ["-52%", "-48%", "-52%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[0, 38, 76].map((offset, i) => (
            <path
              key={offset}
              d={`M16 ${36 + offset} L100 ${78 + offset} L184 ${36 + offset}`}
              stroke="hsl(205 85% 78%)"
              strokeOpacity={0.07 - i * 0.015}
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </motion.div>

      {/* Diagonal metallic light sweep */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-y-[-20%] w-1/3"
          style={{
            background:
              "linear-gradient(115deg, transparent, hsl(205 90% 78% / 0.10), transparent)",
            transform: "skewX(-12deg)",
            willChange: "transform",
          }}
          animate={{ x: ["-40vw", "140vw"] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2.5,
          }}
        />
      </motion.div>

      {/* Floating metallic shards */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: SHARD_COUNT }).map((_, i) => (
          <FloatingShard key={i} index={i} />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto section-padding text-center">
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
