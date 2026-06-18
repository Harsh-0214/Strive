"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  {
    label: "Website traffic",
    percent: "+185%",
    barWidth: "85%",
    delay: 0,
  },
  {
    label: "Customer inquiries",
    percent: "+120%",
    barWidth: "60%",
    delay: 0.12,
  },
  {
    label: "Online bookings",
    percent: "+240%",
    barWidth: "100%",
    delay: 0.24,
  },
  {
    label: "Monthly revenue",
    percent: "+65%",
    barWidth: "40%",
    delay: 0.36,
  },
];

export default function Results() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-background"
      aria-labelledby="results-heading"
    >
      <div className="max-w-4xl mx-auto section-padding">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2
            id="results-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight"
          >
            The{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              numbers
            </span>{" "}
            speak for themselves.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Average results our clients see after launching with Strive.
          </p>
        </motion.div>

        {/* Chart rows */}
        <div className="flex flex-col gap-8">
          {metrics.map(({ label, percent, barWidth, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2"
            >
              {/* Label row */}
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground text-sm sm:text-base">
                  {label}
                </span>
                <span className="font-bold text-primary text-sm sm:text-base tabular-nums">
                  {percent}
                </span>
              </div>

              {/* Bar track */}
              <div
                className="w-full h-3 rounded-full overflow-hidden"
                style={{ background: "hsl(var(--muted))" }}
                role="img"
                aria-label={`${label}: ${percent}`}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
                  }}
                  initial={{ width: "0%" }}
                  animate={inView ? { width: barWidth } : { width: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: delay + 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.7, ease: "easeOut" }}
          className="mt-10 text-center text-xs text-muted-foreground"
        >
          * Based on average client data across all packages
        </motion.p>
      </div>
    </section>
  );
}
