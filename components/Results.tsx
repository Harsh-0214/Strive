"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

const metrics = [
  {
    value: 185,
    suffix: "%",
    prefix: "+",
    label: "Website traffic",
    barWidth: "85%",
    accent: "#00B4D8",
  },
  {
    value: 120,
    suffix: "%",
    prefix: "+",
    label: "Customer inquiries",
    barWidth: "60%",
    accent: "#E8C547",
  },
  {
    value: 240,
    suffix: "%",
    prefix: "+",
    label: "Online bookings",
    barWidth: "100%",
    accent: "#00B4D8",
  },
  {
    value: 65,
    suffix: "%",
    prefix: "+",
    label: "Monthly revenue",
    barWidth: "40%",
    accent: "#E8C547",
  },
];

function AnimatedNumber({
  target,
  prefix,
  suffix,
  active,
}: {
  target: number;
  prefix: string;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}

export default function Results() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28"
      style={{ background: "#0d1117" }}
      aria-labelledby="results-heading"
    >
      <div className="max-w-6xl mx-auto section-padding">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#00B4D8" }}
          >
            Average Results
          </p>
          <h2
            id="results-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FFFFFF" }}
          >
            Here&rsquo;s what happens when you stop hiding.
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Average client results in the first 90 days after launching with Strive.
          </p>
        </motion.div>

        {/* 2x2 metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {metrics.map(({ value, suffix, prefix, label, barWidth, accent }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Large metric */}
              <div
                className="font-heading font-black leading-none mb-2 tabular-nums"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                  color: accent,
                }}
                aria-label={`${prefix}${value}${suffix} ${label}`}
              >
                <AnimatedNumber
                  target={value}
                  prefix={prefix}
                  suffix={suffix}
                  active={inView}
                />
              </div>

              {/* Label */}
              <p
                className="text-sm font-medium mb-5"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {label}
              </p>

              {/* Progress bar */}
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.07)" }}
                role="img"
                aria-label={`${label} progress: ${barWidth}`}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accent }}
                  initial={{ width: "0%" }}
                  animate={inView ? { width: barWidth } : { width: "0%" }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.1 + 0.3,
                    ease: [0.23, 1, 0.32, 1],
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
          transition={{ duration: 0.55, delay: 0.7 }}
          className="mt-10 text-center text-xs"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          * Based on average client data across all packages
        </motion.p>
      </div>
    </section>
  );
}
