"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { prototypes } from "@/lib/prototypes";

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="portfolio"
      className="py-20 lg:py-28"
      style={{ background: "#0A0A0A" }}
      aria-labelledby="portfolio-heading"
    >
      <div className="w-full section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#00B4D8" }}
            >
              Four Vibes, One Range
            </p>
            <h2
              id="portfolio-heading"
              className="font-heading font-extrabold tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFFFF" }}
            >
              See how far we go
            </h2>
            <p className="mt-3 max-w-xl" style={{ color: "rgba(255,255,255,0.45)" }}>
              We built four full prototypes, each a completely different design language,
              to show you the range, not just the results.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 group"
            style={{ color: "#00B4D8" }}
          >
            View all prototypes
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Prototype cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prototypes.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <Link
                href={`/work/${p.slug}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative flex flex-col rounded-2xl overflow-hidden group"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "transform 240ms cubic-bezier(0.23,1,0.32,1), box-shadow 240ms ease",
                  transform: hoveredIndex === i ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredIndex === i ? "0 24px 60px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.2)",
                }}
              >
                {/* Colored panel */}
                <div
                  className="relative flex items-center justify-between px-7 py-10"
                  style={{ background: p.panelGradient }}
                >
                  <div>
                    <span
                      className="font-heading font-black"
                      style={{ fontSize: "3.5rem", color: "rgba(255,255,255,0.25)", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {p.letter}
                    </span>
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(0,0,0,0.3)", color: "#fff" }}
                  >
                    {p.tag} · {p.price}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className="font-heading font-bold text-xl"
                        style={{ color: "#FFFFFF" }}
                      >
                        {p.name}
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {p.business} · {p.category}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />
                  </div>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {p.tagline}
                  </p>

                  <p
                    className="text-xs font-semibold uppercase tracking-widest mt-auto"
                    style={{ color: p.accent }}
                  >
                    {p.vibe}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
