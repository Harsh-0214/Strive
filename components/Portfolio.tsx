"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    name: "Blush Beauty Studio",
    category: "Beauty & Wellness",
    location: "Toronto, ON",
    description:
      "Full booking site with online scheduling, service menu, and Instagram gallery integration. Launched in 11 days.",
    metrics: [
      { label: "Bookings", value: "+240%", sub: "first 30 days" },
      { label: "No-shows", value: "−60%", sub: "with reminders" },
    ],
    panelGradient: "linear-gradient(135deg, #e91e8c 0%, #ff6b9d 100%)",
    panelBg: "hsl(330 60% 15%)",
    letter: "B",
    tag: "Booking Site",
  },
  {
    name: "RidgeTop Contracting",
    category: "Home Services",
    location: "Brampton, ON",
    description:
      "Lead-gen site with project gallery, quote request form, and Google reviews integration. Ranked page 1 within 6 weeks.",
    metrics: [
      { label: "Leads/mo", value: "+185%", sub: "vs. no website" },
      { label: "Avg job value", value: "+$800", sub: "higher quality" },
    ],
    panelGradient: "linear-gradient(135deg, #0070f3 0%, #00b4d8 100%)",
    panelBg: "hsl(210 70% 12%)",
    letter: "R",
    tag: "Lead Gen",
  },
  {
    name: "The Maple Leaf Diner",
    category: "Restaurant",
    location: "Mississauga, ON",
    description:
      "Menu site with online ordering, catering inquiry form, and loyalty badge. Replaced a slow Wix page in under 2 weeks.",
    metrics: [
      { label: "Online orders", value: "+310%", sub: "month over month" },
      { label: "Reservations", value: "+90%", sub: "via website" },
    ],
    panelGradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    panelBg: "hsl(28 60% 12%)",
    letter: "M",
    tag: "Restaurant",
  },
];

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
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#00B4D8" }}
          >
            Real Results
          </p>
          <h2
            id="portfolio-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFFFF" }}
          >
            Work that moves the needle
          </h2>
          <p className="mt-3 max-w-xl" style={{ color: "rgba(255,255,255,0.45)" }}>
            Every site we build is designed to convert visitors into customers — not just look good.
          </p>
        </motion.div>

        {/* Case study cards */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={inView ? { opacity: 1, clipPath: "inset(0 0 0% 0)" } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.23, 1, 0.32, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex flex-col md:flex-row rounded-2xl overflow-hidden cursor-default"
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
                className="relative md:w-48 lg:w-64 flex-shrink-0 flex items-center justify-center py-12 md:py-0"
                style={{
                  background: project.panelGradient,
                  transition: "width 300ms cubic-bezier(0.23,1,0.32,1)",
                  minHeight: "160px",
                }}
              >
                {/* Type label */}
                <div className="text-center px-4">
                  <span
                    className="font-heading font-black"
                    style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "rgba(255,255,255,0.25)", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    {project.letter}
                  </span>
                  <p
                    className="mt-2 text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {project.tag}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7 lg:p-9">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      className="font-heading font-bold"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#FFFFFF" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {project.category} · {project.location}
                    </p>
                  </div>
                </div>

                <p
                  className="text-sm leading-relaxed mb-6 max-w-2xl"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-6 mt-auto">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <p
                        className="font-heading font-black leading-none"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "#FFFFFF" }}
                      >
                        {m.value}
                      </p>
                      <p className="text-xs font-semibold mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {m.label}
                      </p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                        {m.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
