"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const PARTICLE_COUNT = 20;

function FloatingParticle({
  index,
}: {
  index: number;
}) {
  const size = 4 + (index % 5) * 3;
  const left = (index * 7 + 13) % 95;
  const delay = (index * 0.4) % 4;
  const duration = 6 + (index % 4) * 2;

  return (
    <motion.div
      className="absolute rounded-full bg-primary-foreground/10"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: "-20px",
      }}
      animate={{
        y: [0, -(typeof window !== "undefined" ? window.innerHeight + 40 : 800)],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    />
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, hsl(220 85% 20%) 0%, hsl(220 85% 35%) 40%, hsl(217 91% 50%) 70%, hsl(33 98% 50% / 0.3) 100%)",
          backgroundSize: "300% 300%",
          animation: "gradient-shift 8s ease infinite",
        }}
        aria-hidden="true"
      />

      {/* Mesh overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, hsl(var(--accent) / 0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(220 85% 60% / 0.4) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto section-padding text-center text-primary-foreground">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow inline-block" />
              Web design for small businesses
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white"
          >
            Your competitors are online.
            <br />
            <span className="text-accent">It&apos;s time you were too.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg sm:text-xl text-white/80 leading-relaxed"
          >
            Strive builds fast, beautiful websites for small businesses — so
            you can focus on what you do best.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-white font-semibold text-base hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg shadow-accent/30"
            >
              Get a Free Quote
              <ArrowRight size={18} />
            </a>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 text-white font-semibold text-base border border-white/30 hover:bg-white/25 active:scale-95 transition-all duration-200 backdrop-blur-sm"
            >
              See Our Packages
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
