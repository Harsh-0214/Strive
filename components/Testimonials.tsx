"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Strive built us a booking site in two weeks. We doubled our appointments the next month.",
    name: "Maria T.",
    role: "Owner, Blush Beauty Studio",
    initials: "MT",
    bg: "hsl(330 60% 55%)",
  },
  {
    quote: "I was losing jobs to competitors with better websites. Not anymore.",
    name: "James R.",
    role: "Founder, RidgeTop Contracting",
    initials: "JR",
    bg: "hsl(210 70% 50%)",
  },
  {
    quote:
      "Our online store launched perfectly. Strive handled everything, I didn't have to think about a thing.",
    name: "Aisha K.",
    role: "Founder, Kova Clothing",
    initials: "AK",
    bg: "hsl(270 55% 55%)",
  },
];

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#E8C547" aria-hidden="true">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 lg:py-20"
      style={{ background: "#F5F0E8" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="w-full section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <h2
            id="testimonials-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#0A0A0A" }}
          >
            Small businesses. <span style={{ color: "#00B4D8" }}>Real results.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {testimonials.map(({ quote, name, role, initials, bg }) => (
            <motion.article
              key={name}
              variants={itemVariants}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: "#FFFFFF", border: "1px solid rgba(10,10,10,0.08)" }}
            >
              <Stars />
              <blockquote className="mt-3 mb-5 flex-1">
                <p className="leading-relaxed text-sm" style={{ color: "#0A0A0A" }}>
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
              <footer className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(10,10,10,0.08)" }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-xs text-white flex-shrink-0"
                  style={{ background: bg }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <p className="text-xs font-medium" style={{ color: "#6B6B6B" }}>
                  {name} <span style={{ color: "#B0AAA0" }}>· {role}</span>
                </p>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
