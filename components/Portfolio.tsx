"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";

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
    accent: "hsl(330 60% 55%)",
    accentBg: "hsl(330 60% 55% / 0.08)",
    tag: "Booking Site",
  },
  {
    name: "RidgeTop Contracting",
    category: "Home Services",
    location: "Brampton, ON",
    description:
      "Lead-gen site with project gallery, quote request form, and Google reviews integration. Ranked page 1 within 6 weeks.",
    metrics: [
      { label: "Leads / mo", value: "+185%", sub: "vs. no website" },
      { label: "Avg job value", value: "+$800", sub: "higher quality leads" },
    ],
    accent: "hsl(210 70% 50%)",
    accentBg: "hsl(210 70% 50% / 0.08)",
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
      { label: "Table reservations", value: "+90%", sub: "via website" },
    ],
    accent: "hsl(28 90% 52%)",
    accentBg: "hsl(28 90% 52% / 0.08)",
    tag: "Restaurant",
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="portfolio" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[hsl(var(--accent))] mb-3">
            Real Results
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground">
            Work that moves the needle
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Every site we build is designed to convert visitors into customers — not just look good.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Color bar */}
              <div className="h-1.5 w-full" style={{ background: project.accent }} />

              <div className="flex flex-col flex-1 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className="inline-block text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2"
                      style={{ background: project.accentBg, color: project.accent }}
                    >
                      {project.tag}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-foreground leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.location}</p>
                  </div>
                  <span className="mt-1 text-muted-foreground group-hover:text-foreground transition-colors">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <TrendingUp size={12} style={{ color: project.accent }} />
                        <span
                          className="font-heading font-extrabold text-xl"
                          style={{ color: project.accent }}
                        >
                          {m.value}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">{m.label}</p>
                      <p className="text-[10px] text-muted-foreground/70">{m.sub}</p>
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
