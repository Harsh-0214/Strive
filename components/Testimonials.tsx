"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Strive built us a booking site in two weeks. We doubled our appointments the next month.",
    name: "Maria T.",
    role: "Owner",
    business: "Blush Beauty Studio",
    location: "Toronto, ON",
    initials: "MT",
    color: "bg-pink-100 text-pink-700",
  },
  {
    quote:
      "I was losing jobs to competitors with better websites. Not anymore.",
    name: "James R.",
    role: "Founder",
    business: "RidgeTop Contracting",
    location: "Brampton, ON",
    initials: "JR",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote:
      "Our online store launched perfectly. Strive handled everything — I didn't have to think about a thing.",
    name: "Aisha K.",
    role: "Founder",
    business: "Kova Clothing",
    location: "Canada",
    initials: "AK",
    color: "bg-purple-100 text-purple-700",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          strokeWidth={0}
          fill="currentColor"
          className="text-accent"
          aria-hidden="true"
        />
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
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2
            id="testimonials-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight"
          >
            Small businesses. Real results.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map(
            ({ quote, name, role, business, location, initials, color }) => (
              <motion.article
                key={name}
                variants={cardVariants}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <StarRating />

                <blockquote>
                  <p className="text-foreground leading-relaxed text-base">
                    &ldquo;{quote}&rdquo;
                  </p>
                </blockquote>

                <footer className="flex items-center gap-3 mt-auto pt-2 border-t border-border">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0 ${color}`}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {name} &mdash; {role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {business}, {location}
                    </p>
                  </div>
                </footer>
              </motion.article>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
