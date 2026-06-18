"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";

function Counter({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
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
      {count}
      {suffix}
    </>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{ background: "#070b14" }}
      aria-label="Key statistics"
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.025,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {/* Large hero stat — 50+ businesses, spans 5 cols, 2 rows */}
          <motion.div
            variants={cellVariants}
            className="md:col-span-5 md:row-span-2 flex flex-col justify-center p-8 lg:p-10 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: "260px",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Total Businesses Launched
            </p>
            <div
              className="font-heading font-black leading-none mb-4 tabular-nums"
              style={{
                fontSize: "clamp(5rem, 10vw, 9rem)",
                color: "#FFFFFF",
              }}
              aria-label="50+ businesses launched"
            >
              <Counter target={50} suffix="+" active={inView} />
            </div>
            <p className="text-base font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
              small businesses across Canada
            </p>
          </motion.div>

          {/* 2 weeks avg launch — 4 cols */}
          <motion.div
            variants={cellVariants}
            className="md:col-span-4 flex flex-col justify-center p-7 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: "2px solid #00B4D8",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Avg. Launch Time
            </p>
            <div
              className="font-heading font-black leading-none tabular-nums"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", color: "#00B4D8" }}
              aria-label="2 weeks average launch"
            >
              <Counter target={2} suffix=" wks" active={inView} />
            </div>
          </motion.div>

          {/* 100% satisfaction — 3 cols */}
          <motion.div
            variants={cellVariants}
            className="md:col-span-3 flex flex-col justify-center p-7 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: "2px solid #E8C547",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Satisfaction Rate
            </p>
            <div
              className="font-heading font-black leading-none tabular-nums"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", color: "#E8C547" }}
              aria-label="100% satisfaction rate"
            >
              <Counter target={100} suffix="%" active={inView} />
            </div>
          </motion.div>

          {/* Trusted by — 3 cols */}
          <motion.div
            variants={cellVariants}
            className="md:col-span-3 flex flex-col justify-between p-7 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Trusted by
            </p>
            <div className="flex flex-col gap-2.5">
              {["Beauty", "Contractors", "Restaurants", "Retail", "Fitness", "Law"].map(
                (industry, i) => (
                  <div key={industry} className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: i % 2 === 0 ? "#00B4D8" : "#E8C547" }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {industry}
                    </span>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Editorial quote — 4 cols */}
          <motion.div
            variants={cellVariants}
            className="md:col-span-4 flex flex-col justify-center p-7 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <blockquote>
              <p
                className="font-heading font-bold italic leading-snug"
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                &ldquo;We make businesses that look like they mean it.&rdquo;
              </p>
              <footer
                className="mt-4 text-xs font-medium uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                — Strive Design Agency
              </footer>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
