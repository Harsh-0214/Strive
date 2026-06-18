"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  RefreshCw,
  BarChart2,
  ShieldCheck,
  Activity,
  Phone,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    tier: "Starter Care",
    price: "$49",
    period: "/mo",
    cta: "Get Started",
    accent: "#E8C547",
    features: [
      { icon: RefreshCw, text: "Content updates (48hr turnaround)" },
      { icon: Activity, text: "Uptime monitoring" },
      { icon: BarChart2, text: "Monthly analytics summary" },
    ],
  },
  {
    tier: "Business Care",
    price: "$99",
    period: "/mo",
    cta: "Get Started",
    popular: true,
    accent: "#00B4D8",
    features: [
      { icon: RefreshCw, text: "Content updates (24hr turnaround)" },
      { icon: Activity, text: "Uptime monitoring" },
      { icon: BarChart2, text: "Monthly analytics report" },
      { icon: ShieldCheck, text: "Security & software updates" },
      { icon: Phone, text: "Monthly 15-min check-in call" },
    ],
  },
  {
    tier: "Premium Care",
    price: "$199",
    period: "/mo",
    cta: "Get Started",
    accent: "#E8C547",
    features: [
      { icon: RefreshCw, text: "Content updates (same-day priority)" },
      { icon: Activity, text: "Uptime monitoring" },
      { icon: BarChart2, text: "Monthly analytics + SEO report" },
      { icon: ShieldCheck, text: "Security & software updates" },
      { icon: Phone, text: "Bi-weekly strategy calls" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function StriveCare() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="strive-care"
      ref={ref}
      className="py-20 lg:py-28"
      style={{ background: "#F5F0E8" }}
      aria-labelledby="care-heading"
    >
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#6B6B6B" }}
          >
            Monthly Plans
          </p>
          <h2
            id="care-heading"
            className="font-heading font-extrabold tracking-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#0A0A0A",
            }}
          >
            Keep your site fresh with{" "}
            <span style={{ color: "#00B4D8" }}>Strive Care</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "#6B6B6B" }}
          >
            A monthly plan that keeps your website updated, secure, and
            performing — without the surprise invoices.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {plans.map(({ tier, price, period, cta, popular, accent, features }) => (
            <motion.article
              key={tier}
              variants={cardVariants}
              className="relative flex flex-col rounded-2xl p-7 overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: popular
                  ? `1px solid ${accent}`
                  : "1px solid rgba(10,10,10,0.10)",
                boxShadow: popular
                  ? "0 12px 40px rgba(0,180,216,0.12)"
                  : "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              {/* Colored accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: accent }}
                aria-hidden="true"
              />

              <div className="mt-2">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="font-heading font-bold text-lg"
                    style={{ color: "#0A0A0A" }}
                  >
                    {tier}
                  </h3>
                  {popular && (
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(0,180,216,0.1)", color: "#00B4D8" }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-1 mb-6">
                  <span
                    className="font-heading font-extrabold"
                    style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#0A0A0A", lineHeight: 1 }}
                  >
                    {price}
                  </span>
                  <span className="text-base mb-0.5" style={{ color: "#6B6B6B" }}>
                    {period}
                  </span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1 mb-6" role="list">
                {features.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm" style={{ color: "#0A0A0A" }}>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${accent}18` }}
                    >
                      <Icon size={13} strokeWidth={1.75} style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <span className="leading-snug pt-1">{text}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold text-sm"
                style={{
                  background: popular ? "#00B4D8" : "#0A0A0A",
                  color: "#FFFFFF",
                  transition: "transform 160ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                {cta}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </motion.div>

        {/* No lock-in note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          <Check size={15} strokeWidth={2.5} style={{ color: "#00B4D8" }} aria-hidden="true" />
          <p className="text-sm" style={{ color: "#6B6B6B" }}>
            No lock-in contracts. Cancel or pause anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
