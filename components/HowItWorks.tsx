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
      <div className="max-w-7xl mx-auto section-padding">
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
            Getting online has{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              never been easier
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative flex flex-col gap-16 md:gap-24"
          aria-label="Steps to get started"
        >
          {/* Vertical line (desktop only) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="w-full"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--primary-dark)), hsl(var(--primary-light)))",
              }}
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {steps.map(({ number, icon: Icon, title, body }, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={number}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isLeft ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Content side */}
                <div
                  className={`flex-1 text-center ${
                    isLeft ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <p className="font-heading font-extrabold text-7xl text-foreground/[0.06] leading-none mb-2">
                    {number}
                  </p>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                    {title}
                  </h3>
                  <p
                    className={`text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0 ${
                      isLeft ? "md:ml-auto" : ""
                    }`}
                  >
                    {body}
                  </p>
                </div>

                {/* Center icon — sits on the vertical line */}
                <div className="relative shrink-0 z-10">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--primary-dark)), hsl(var(--primary-light)))",
                    }}
                  >
                    <Icon
                      size={32}
                      strokeWidth={1.5}
                      className="text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                </div>

                {/* Empty flex-1 for the other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
