"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Strive built us a booking site in two weeks. We doubled our appointments the next month.",
    name: "Maria T.",
    role: "Owner",
    business: "Blush Beauty Studio",
    location: "Toronto, ON",
    initials: "MT",
    bg: "hsl(330 60% 55%)",
    featured: true,
  },
  {
    quote:
      "I was losing jobs to competitors with better websites. Not anymore.",
    name: "James R.",
    role: "Founder",
    business: "RidgeTop Contracting",
    location: "Brampton, ON",
    initials: "JR",
    bg: "hsl(210 70% 50%)",
    featured: false,
  },
  {
    quote:
      "Our online store launched perfectly. Strive handled everything — I didn't have to think about a thing.",
    name: "Aisha K.",
    role: "Founder",
    business: "Kova Clothing",
    location: "Canada",
    initials: "AK",
    bg: "hsl(270 55% 55%)",
    featured: false,
  },
];

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#E8C547"
          aria-hidden="true"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 overflow-hidden"
      style={{ background: "#F5F0E8" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto section-padding">
        {/* Giant decorative quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-2"
          aria-hidden="true"
        >
          <span
            className="font-heading font-black leading-none select-none"
            style={{
              fontSize: "clamp(6rem, 15vw, 12rem)",
              color: "rgba(10,10,10,0.06)",
              lineHeight: 0.8,
            }}
          >
            &ldquo;
          </span>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <h2
            id="testimonials-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0A0A0A" }}
          >
            Small businesses.{" "}
            <span style={{ color: "#00B4D8" }}>Real results.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-5"
        >
          {/* Featured quote — large centered */}
          <motion.article variants={itemVariants}>
            <div
              className="rounded-2xl p-8 md:p-12 text-center"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(10,10,10,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}
            >
              <Stars />
              <blockquote className="mt-6 mb-8">
                <p
                  className="font-heading font-bold italic leading-tight"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                    color: "#0A0A0A",
                  }}
                >
                  &ldquo;{featured.quote}&rdquo;
                </p>
              </blockquote>
              <div
                className="w-12 h-px mx-auto mb-5"
                style={{ background: "rgba(10,10,10,0.15)" }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white flex-shrink-0"
                  style={{ background: featured.bg }}
                  aria-hidden="true"
                >
                  {featured.initials}
                </div>
                <div className="text-left">
                  <p
                    className="font-semibold text-sm uppercase tracking-widest"
                    style={{ color: "#0A0A0A" }}
                  >
                    {featured.name}
                  </p>
                  <p className="text-xs" style={{ color: "#6B6B6B" }}>
                    {featured.role}, {featured.business}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Two smaller quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map(({ quote, name, role, business, location, initials, bg }) => (
              <motion.article
                key={name}
                variants={itemVariants}
                className="rounded-2xl p-7"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(10,10,10,0.08)",
                }}
              >
                <Stars />
                <blockquote className="mt-4 mb-6">
                  <p
                    className="leading-relaxed"
                    style={{ color: "#0A0A0A", fontSize: "1.0625rem" }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                </blockquote>
                <footer
                  className="flex items-center gap-3 pt-4"
                  style={{ borderTop: "1px solid rgba(10,10,10,0.08)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs text-white flex-shrink-0"
                    style={{ background: bg }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm uppercase tracking-widest"
                      style={{ color: "#0A0A0A" }}
                    >
                      {name}
                    </p>
                    <p className="text-xs" style={{ color: "#6B6B6B" }}>
                      {role}, {business}
                    </p>
                  </div>
                </footer>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
