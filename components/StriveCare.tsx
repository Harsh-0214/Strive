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
    cta: "Start Starter Care",
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
    cta: "Start Business Care",
    popular: true,
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
    cta: "Start Premium Care",
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
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function StriveCare() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="strive-care"
      ref={ref}
      className="py-20 lg:py-28 bg-care-bg"
      aria-labelledby="care-heading"
    >
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold border border-accent/30 mb-5">
            <span
              className="w-2 h-2 rounded-full bg-accent animate-pulse-glow inline-block"
              aria-hidden="true"
            />
            Monthly plans
          </span>
          <h2
            id="care-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-care-foreground tracking-tight mb-4"
          >
            Keep your site fresh with{" "}
            <span
              style={{
                background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary-light)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Strive Care
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-care-muted text-lg leading-relaxed">
            A monthly plan that keeps your website updated, secure, and
            performing — without the surprise invoices. Think of it as having
            a web developer on your team, without the salary.
          </p>
        </motion.div>

        {/* Plan cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {plans.map(({ tier, price, period, cta, popular, features }) => (
            <motion.article
              key={tier}
              variants={cardVariants}
              className={`relative bg-care-card border rounded-2xl p-7 flex flex-col gap-5 transition-colors duration-300 overflow-hidden ${
                popular
                  ? "border-primary/50 shadow-lg shadow-primary/10"
                  : "border-care-border hover:border-primary/40"
              }`}
              style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
            >
              {popular && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                  }}
                  aria-hidden="true"
                />
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-lg text-care-foreground">
                    {tier}
                  </h3>
                  {popular && (
                    <span className="text-xs font-bold text-primary bg-primary/15 px-2.5 py-1 rounded-full border border-primary/25">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span className="font-heading font-extrabold text-4xl text-care-foreground">
                    {price}
                  </span>
                  <span className="text-care-muted text-base mb-1">{period}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3 flex-1" role="list">
                {features.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-care-muted">
                    <div className="w-7 h-7 rounded-lg bg-primary/12 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} strokeWidth={1.75} className="text-primary" aria-hidden="true" />
                    </div>
                    <span className="leading-snug pt-1">{text}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold text-sm active:scale-95 transition-all duration-200 ${
                  popular
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20"
                    : "bg-white/10 text-care-foreground border border-white/15 hover:bg-white/15 transition-colors"
                }`}
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
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          <Check size={15} strokeWidth={2.5} className="text-success shrink-0" aria-hidden="true" />
          <p className="text-care-muted text-sm">
            No lock-in contracts. Cancel or pause anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
