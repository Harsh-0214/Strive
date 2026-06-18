"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Palette, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation & Discovery",
    body: "Tell us about your business, goals, and vision. We'll map out exactly what you need — no fluff, no jargon, just clarity.",
    detail: "~30 min call",
  },
  {
    number: "02",
    icon: Palette,
    title: "Design & Build",
    body: "Our team handles everything — design, development, copy, and testing. You review and we refine until every pixel is right.",
    detail: "1–4 weeks",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & Grow",
    body: "We push your site live, walk you through everything, and hand you the keys. Then the growth starts.",
    detail: "Day 1 live",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 lg:py-32 bg-white"
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 lg:mb-24"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#6B6B6B" }}
          >
            The Process
          </p>
          <h2
            id="how-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#0A0A0A",
            }}
          >
            Getting online has never been easier
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col" aria-label="Steps to get started">
          {steps.map(({ number, icon: Icon, title, body, detail }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 py-10 lg:py-14">
                {/* Big number */}
                <div className="flex-shrink-0 relative">
                  <span
                    className="font-heading font-black leading-none select-none"
                    style={{
                      fontSize: "clamp(5rem, 10vw, 8rem)",
                      color: "#F0F0F0",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                  {/* Step number overlay */}
                  <span
                    className="absolute top-1/2 left-1/2 font-heading font-black text-lg"
                    style={{
                      transform: "translate(-50%, -50%)",
                      color: "#0A0A0A",
                    }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "#F5F0E8" }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.75}
                        style={{ color: "#00B4D8" }}
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className="font-heading font-bold"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "#0A0A0A" }}
                    >
                      {title}
                    </h3>
                  </div>
                  <p
                    className="leading-relaxed max-w-xl"
                    style={{ color: "#6B6B6B", fontSize: "1.0625rem" }}
                  >
                    {body}
                  </p>
                </div>

                {/* Right: detail label */}
                <div className="lg:flex-shrink-0 lg:text-right">
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      background: i === 0 ? "rgba(0,180,216,0.08)" : i === 1 ? "rgba(232,197,71,0.12)" : "rgba(10,10,10,0.06)",
                      color: i === 0 ? "#00B4D8" : i === 1 ? "#B89100" : "#0A0A0A",
                    }}
                  >
                    {detail}
                  </span>
                </div>
              </div>

              {/* Horizontal rule between steps */}
              {i < steps.length - 1 && (
                <div
                  className="w-full h-px"
                  style={{ background: "rgba(10,10,10,0.08)" }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
