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

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 overflow-hidden bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto section-padding">
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
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-5"
        >
          {/* Featured testimonial: full width */}
          <motion.article
            variants={cardVariants}
            className="relative rounded-2xl border border-primary/30 overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, hsl(221 90% 10%), hsl(218 84% 22%))",
            }}
          >
            <div className="relative p-8 md:p-10 md:flex md:items-center md:gap-10">
              {/* Left: quote */}
              <div className="flex-1">
                <StarRating />
                <blockquote className="mt-4">
                  <p className="text-white text-xl md:text-2xl leading-relaxed font-medium">
                    &ldquo;{featured.quote}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Right: attribution */}
              <div className="mt-6 md:mt-0 md:shrink-0 md:text-right flex md:flex-col items-center md:items-end gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-heading font-bold text-lg text-white shrink-0"
                  style={{ background: featured.bg }}
                >
                  {featured.initials}
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {featured.name} &mdash; {featured.role}
                  </p>
                  <p className="text-sm text-white/60">
                    {featured.business}, {featured.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Two non-featured cards side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map(({ quote, name, role, business, location, initials, bg }) => (
              <motion.article
                key={name}
                variants={cardVariants}
                className="relative rounded-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden bg-card border border-border shadow-sm hover:shadow-md"
              >
                <div className="relative p-7 flex flex-col gap-4">
                  <StarRating />
                  <blockquote className="flex-1">
                    <p className="text-foreground leading-relaxed text-[0.9375rem]">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </blockquote>
                  <footer className="flex items-center gap-3 pt-4 border-t border-border">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white shrink-0"
                      style={{ background: bg }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
