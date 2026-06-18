"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Palette, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell us about your business",
    body: "Fill out a quick form or hop on a call. We learn about your goals, your customers, and what makes you great.",
  },
  {
    number: "02",
    icon: Palette,
    title: "We design and build your site",
    body: "Our team handles everything — design, development, copy, and testing. You review and we refine until it's perfect.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "You launch and start growing",
    body: "We push your site live, walk you through everything, and hand you the keys. Then the growth starts.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-20 lg:py-28 bg-muted"
      aria-labelledby="how-heading"
    >
      <div className="max-w-6xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2
            id="how-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight"
          >
            Getting online has never been easier
          </h2>
        </motion.div>

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6"
        >
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-border"
            style={{ left: "calc(16.67% + 20px)", right: "calc(16.67% + 20px)" }}
            aria-hidden="true"
          />

          {steps.map(({ number, icon: Icon, title, body }, i) => (
            <motion.li
              key={number}
              variants={itemVariants}
              className="flex flex-col items-center text-center relative"
            >
              {/* Step circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-background border-2 border-border flex items-center justify-center shadow-sm z-10 relative">
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                {/* Step number badge */}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                  {i + 1}
                </span>
              </div>

              <p className="font-heading font-extrabold text-5xl text-muted-foreground/20 mb-2 leading-none">
                {number}
              </p>

              <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">
                {body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
