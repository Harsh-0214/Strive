"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

const metrics = [
  { value: 185, suffix: "%", prefix: "+", label: "Website traffic", accent: "#00B4D8" },
  { value: 120, suffix: "%", prefix: "+", label: "Customer inquiries", accent: "#E8C547" },
  { value: 240, suffix: "%", prefix: "+", label: "Online bookings", accent: "#00B4D8" },
  { value: 65, suffix: "%", prefix: "+", label: "Monthly revenue", accent: "#E8C547" },
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
    const duration = 1400;
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
      className="py-14 lg:py-16"
      style={{ background: "#0d1117" }}
      aria-labelledby="results-heading"
    >
      <div className="w-full section-padding">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Heading — left column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="lg:max-w-xs lg:shrink-0"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#00B4D8" }}>
              Average Results
            </p>
            <h2
              id="results-heading"
              className="font-heading font-extrabold tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#FFFFFF" }}
            >
              What happens when you stop hiding.
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              First 90 days, averaged across clients.
            </p>
          </motion.div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            {metrics.map(({ value, suffix, prefix, label, accent }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="font-heading font-black leading-none mb-2 tabular-nums"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: accent }}
                  aria-label={`${prefix}${value}${suffix} ${label}`}
                >
                  <AnimatedNumber target={value} prefix={prefix} suffix={suffix} active={inView} />
                </div>
                <p className="text-xs font-medium leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
