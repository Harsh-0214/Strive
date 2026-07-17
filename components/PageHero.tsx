"use client";

import { motion } from "framer-motion";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section
      className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden"
      style={{ background: "hsl(220 70% 3%)" }}
      aria-labelledby="page-hero-heading"
    >
      <div
        className="absolute -z-10 top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "600px",
          height: "60%",
          background: "radial-gradient(ellipse 50% 100% at 50% 0%, hsl(210 90% 58% / 0.18) 0%, transparent 72%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto section-padding text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-xs font-semibold uppercase tracking-widest mb-5"
          style={{ color: "#00B4D8" }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          id="page-hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          className="font-heading font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", lineHeight: 1.08 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
