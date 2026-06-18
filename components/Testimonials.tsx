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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
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
      className="py-20 lg:py-28 bg-background overflow-hidden"
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
            Small businesses.{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Real results.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {testimonials.map(({ quote, name, role, business, location, initials, bg, featured }) => (
            <motion.article
              key={name}
              variants={cardVariants}
              className={`relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                featured
                  ? "border-primary/30 shadow-lg shadow-primary/8 bg-card"
                  : "border-border shadow-sm bg-card hover:shadow-md"
              }`}
            >
              {/* Giant decorative quotation mark */}
              <span
                className="absolute top-3 left-5 font-heading font-extrabold text-8xl leading-none select-none pointer-events-none"
                style={{ color: `${bg}18` }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Featured top bar */}
              {featured && (
                <div
                  className="h-1 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                  }}
                  aria-hidden="true"
                />
              )}

              <div className="relative p-7 flex flex-col gap-4 flex-1">
                <StarRating />

                <blockquote className="flex-1">
                  <p className="text-foreground leading-relaxed text-[0.9375rem] pt-1">
                    &ldquo;{quote}&rdquo;
                  </p>
                </blockquote>

                <footer className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white shrink-0"
                    style={{ background: bg }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground leading-tight">
                      {name} &mdash; {role}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {business}, {location}
                    </p>
                  </div>
                </footer>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
