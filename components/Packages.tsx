"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Zap, Star, ShoppingBag, ArrowRight } from "lucide-react";

const packages = [
  {
    icon: Zap,
    name: "Starter",
    range: "$300–800",
    description: "Everything you need to get found online.",
    popular: false,
    features: [
      "Landing page",
      "Contact form",
      "Mobile responsive",
      "Fast load speed",
      "SSL included",
    ],
    cta: "Get the Starter",
    ctaHref: "#contact",
  },
  {
    icon: Star,
    name: "Business",
    range: "$1,500–3,500",
    description: "A full online presence built to grow with you.",
    popular: true,
    features: [
      "Everything in Starter",
      "Up to 8 pages",
      "Booking & scheduling",
      "Blog",
      "Basic SEO setup",
      "Google Analytics",
    ],
    cta: "Get the Business",
    ctaHref: "#contact",
  },
  {
    icon: ShoppingBag,
    name: "Premium",
    range: "$4,000–10,000+",
    description: "A complete e-commerce solution built to sell.",
    popular: false,
    features: [
      "Everything in Business",
      "Full e-commerce store",
      "Product management",
      "Payment processing",
      "Inventory management",
      "Custom integrations",
    ],
    cta: "Get the Premium",
    ctaHref: "#contact",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Packages() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="packages"
      ref={ref}
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="packages-heading"
    >
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2
            id="packages-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight"
          >
            Pick the package that{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              fits where you&apos;re at
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {packages.map(
            ({ icon: Icon, name, range, description, popular, features, cta, ctaHref }) => (
              <motion.article
                key={name}
                variants={cardVariants}
                className={`relative rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  popular
                    ? "border-transparent shadow-2xl"
                    : "bg-card border border-border shadow-sm hover:shadow-md"
                }`}
                style={
                  popular
                    ? {
                        background:
                          "linear-gradient(145deg, hsl(var(--primary-dark)), hsl(var(--primary-light)))",
                      }
                    : undefined
                }
              >
                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + Name + Most Popular badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        popular ? "bg-white/15" : "bg-muted"
                      }`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.75}
                        className={popular ? "text-white" : "text-muted-foreground"}
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className={`font-heading font-bold text-xl ${
                        popular ? "text-white" : "text-foreground"
                      }`}
                    >
                      {name}
                    </h3>
                    {popular && (
                      <span className="ml-auto text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white/90">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span
                      className={`font-heading font-extrabold text-3xl ${
                        popular ? "text-white" : "text-foreground"
                      }`}
                    >
                      {range}
                    </span>
                  </div>

                  <p
                    className={`text-sm mb-6 leading-relaxed ${
                      popular ? "text-white/75" : "text-muted-foreground"
                    }`}
                  >
                    {description}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1" role="list">
                    {features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2.5 text-sm ${
                          popular ? "text-white/90" : "text-foreground"
                        }`}
                      >
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className={popular ? "text-white/80 mt-0.5 shrink-0" : "text-primary mt-0.5 shrink-0"}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={ctaHref}
                    className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                      popular
                        ? "bg-white text-primary hover:bg-white/90 shadow-md"
                        : "bg-muted text-foreground hover:bg-muted/70 border border-border"
                    }`}
                  >
                    {cta}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            )
          )}
        </motion.div>

        {/* Flat-rate reassurance */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          className="text-center text-muted-foreground text-sm mt-10"
        >
          Every package is{" "}
          <span className="font-semibold text-foreground">flat-rate</span>.
          No hourly billing. No surprise invoices. No hidden fees. Ever.
        </motion.p>
      </div>
    </section>
  );
}
