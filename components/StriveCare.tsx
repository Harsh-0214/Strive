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
  },
  {
    tier: "Business Care",
    price: "$99",
    period: "/mo",
    cta: "Start Business Care",
  },
  {
    tier: "Premium Care",
    price: "$199",
    period: "/mo",
    cta: "Start Premium Care",
  },
];

const inclusions = [
  {
    icon: RefreshCw,
    text: "Unlimited small content updates (48hr turnaround)",
  },
  { icon: BarChart2, text: "Monthly analytics report" },
  { icon: ShieldCheck, text: "Security & software updates" },
  { icon: Activity, text: "Uptime monitoring" },
  { icon: Phone, text: "Monthly 15-min check-in call" },
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
      <div className="max-w-6xl mx-auto section-padding">
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
            Keep your site fresh with Strive Care
          </h2>
          <p className="max-w-2xl mx-auto text-care-muted text-lg leading-relaxed">
            A monthly plan that keeps your website updated, secure, and
            performing — without the surprise invoices.
          </p>
        </motion.div>

        {/* Plan cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
        >
          {plans.map(({ tier, price, period, cta }) => (
            <motion.article
              key={tier}
              variants={cardVariants}
              className="bg-care-card border border-care-border rounded-2xl p-7 flex flex-col gap-4 hover:border-primary/50 transition-colors duration-300"
            >
              <div>
                <h3 className="font-heading font-bold text-lg text-care-foreground mb-2">
                  {tier}
                </h3>
                <div className="flex items-end gap-1">
                  <span className="font-heading font-extrabold text-4xl text-care-foreground">
                    {price}
                  </span>
                  <span className="text-care-muted text-base mb-1">{period}</span>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md shadow-primary/20 mt-auto"
              >
                {cta}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </motion.div>

        {/* Shared inclusions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
          className="bg-care-card border border-care-border rounded-2xl p-8"
        >
          <p className="font-heading font-bold text-care-foreground text-lg text-center mb-7">
            All Strive Care plans include:
          </p>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
          >
            {inclusions.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-start gap-3 text-sm text-care-muted"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <span className="leading-snug pt-1">{text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2">
            <Check
              size={16}
              strokeWidth={2.5}
              className="text-success shrink-0"
              aria-hidden="true"
            />
            <p className="text-care-muted text-sm">
              No lock-in contracts. Cancel or pause anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
