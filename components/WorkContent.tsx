"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { prototypes } from "@/lib/prototypes";
import { clients } from "@/lib/clients";

export default function WorkContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const gridRef = useRef<HTMLElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const clientsRef = useRef<HTMLElement>(null);
  const clientsInView = useInView(clientsRef, { once: true, margin: "-80px" });
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden"
        style={{ background: "hsl(220 70% 3%)" }}
        aria-labelledby="work-hero-heading"
      >
        <div
          className="absolute -z-10 top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "600px",
            height: "60%",
            background:
              "radial-gradient(ellipse 50% 100% at 50% 0%, hsl(210 90% 58% / 0.18) 0%, transparent 72%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto section-padding text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "#00B4D8" }}
          >
            Our Work
          </motion.p>
          <motion.h1
            id="work-hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="font-heading font-extrabold tracking-tight text-white mb-6"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.08 }}
          >
            Four businesses. Four vibes. One team.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            We built four full prototypes from scratch, not templates, to prove we can design
            for anyone. A barbershop doesn&apos;t need to look like a nail studio. A restaurant
            shouldn&apos;t look like a clothing store. Click through and see for yourself.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section ref={gridRef} className="py-16 lg:py-24" style={{ background: "#0d1117" }}>
        <div className="w-full section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prototypes.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 32 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  href={`/work/${p.slug}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex flex-col rounded-2xl overflow-hidden group h-full"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "transform 240ms cubic-bezier(0.23,1,0.32,1), box-shadow 240ms ease",
                    transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: hovered === i ? "0 28px 64px rgba(0,0,0,0.45)" : "0 2px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    className="relative flex items-end justify-between px-8 py-14"
                    style={{ background: p.panelGradient, minHeight: "200px" }}
                  >
                    <span
                      className="font-heading font-black"
                      style={{ fontSize: "5rem", color: "rgba(255,255,255,0.22)", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {p.letter}
                    </span>
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-1"
                      style={{ background: "rgba(0,0,0,0.35)", color: "#fff" }}
                    >
                      {p.vibe}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-8">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="font-heading font-bold text-2xl text-white">{p.name}</h2>
                        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {p.business} · {p.category}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={22}
                        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      />
                    </div>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {p.description}
                    </p>
                    <div
                      className="flex items-center justify-between mt-auto pt-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: p.accent }}>
                        {p.priceTier} Package
                      </span>
                      <span className="font-heading font-bold text-lg text-white">{p.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2
            className="font-heading font-extrabold tracking-tight mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#0A0A0A" }}
          >
            Don&apos;t see your industry? We&apos;ll design for it anyway.
          </h2>
          <p className="text-lg mb-8" style={{ color: "#6B6B6B" }}>
            These four prototypes are a taste of our range, not the limit of it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white active:scale-95 transition-transform duration-200"
            style={{ background: "#0A0A0A", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          >
            Start Your Project
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Real client work */}
      <section
        ref={clientsRef}
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "hsl(220 70% 3%)" }}
      >
        <div
          className="absolute -z-0 top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "900px",
            height: "60%",
            background: "radial-gradient(ellipse 50% 100% at 50% 0%, hsl(210 90% 58% / 0.14) 0%, transparent 72%)",
          }}
          aria-hidden="true"
        />
        <div className="relative w-full section-padding">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#00B4D8" }}>
              Live Sites, Real Clients
            </p>
            <h2
              className="font-heading font-extrabold tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#FFFFFF" }}
            >
              Real client work
            </h2>
            <p className="mt-3 max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
              Not prototypes. These are live websites we&apos;ve built and shipped for actual
              businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((c, i) => (
              <motion.a
                key={c.url}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredClient(i)}
                onMouseLeave={() => setHoveredClient(null)}
                initial={{ opacity: 0, y: 24 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                className="relative flex flex-col rounded-2xl p-7 overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredClient === i ? `${c.accent}55` : "rgba(255,255,255,0.08)"}`,
                  transition: "transform 220ms cubic-bezier(0.23,1,0.32,1), box-shadow 220ms ease, border-color 220ms ease",
                  transform: hoveredClient === i ? "translateY(-5px)" : "translateY(0)",
                  boxShadow: hoveredClient === i ? `0 24px 56px -12px ${c.accent}40` : "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                {/* Soft accent glow in the corner */}
                <div
                  className="absolute -z-0 rounded-full transition-opacity duration-300"
                  style={{
                    width: 180,
                    height: 180,
                    top: -70,
                    right: -70,
                    background: `radial-gradient(circle, ${c.accent}30, transparent 70%)`,
                    opacity: hoveredClient === i ? 1 : 0.5,
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-heading font-black text-lg shrink-0"
                    style={{
                      background: c.badge,
                      color: c.textDark ? "#0A0A0A" : "#FFFFFF",
                      boxShadow: `0 8px 20px -4px ${c.accent}80`,
                      border: c.badge === "#0A0A0A" ? "1px solid rgba(255,255,255,0.18)" : "none",
                    }}
                    aria-hidden="true"
                  >
                    {c.initial}
                  </div>
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: hoveredClient === i ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="relative font-heading font-bold text-lg mb-1" style={{ color: "#FFFFFF" }}>
                  {c.name}
                </h3>
                <p className="relative text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {c.category}
                </p>
                <span
                  className="relative mt-auto text-xs font-semibold uppercase tracking-widest pt-4"
                  style={{ color: c.accent, borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  Visit Live Site
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
