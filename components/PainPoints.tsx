"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const problems = [
  {
    number: "01",
    title: "No website at all.",
    body: "You don't exist to anyone searching online. If they can't find you, they find your competitors — every single time.",
  },
  {
    number: "02",
    title: "Outdated, broken site.",
    body: "Worse than having none. It destroys trust instantly. Visitors leave in seconds and never come back.",
  },
  {
    number: "03",
    title: "Losing customers every day.",
    body: "Every day without a professional site costs real money. Your competitors aren't waiting — and neither are your customers.",
  },
];

const rowVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

export default function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: "#F5F0E8" }}
      aria-labelledby="pain-heading"
    >
      <div className="max-w-6xl mx-auto section-padding">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ color: "#6B6B6B" }}
        >
          The Problem
        </motion.p>

        {/* Big headline */}
        <motion.h2
          id="pain-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.23, 1, 0.32, 1] }}
          className="font-heading font-extrabold leading-none tracking-tight mb-16 lg:mb-20"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            color: "#0A0A0A",
            fontWeight: 800,
          }}
        >
          You&rsquo;re invisible.
          <br />
          <span style={{ color: "#6B6B6B" }}>Your competitors aren&rsquo;t.</span>
        </motion.h2>

        {/* Problem rows */}
        <div className="flex flex-col" role="list">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.number}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              role="listitem"
              className="group"
            >
              <div className="flex items-start gap-6 lg:gap-12 py-8 lg:py-10">
                {/* Number */}
                <span
                  className="font-heading font-black leading-none flex-shrink-0 select-none"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    color: "rgba(10,10,10,0.10)",
                  }}
                  aria-hidden="true"
                >
                  {problem.number}
                </span>

                {/* Em dash + content */}
                <div className="flex-1 pt-1 lg:pt-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className="hidden lg:block w-12 h-px flex-shrink-0"
                      style={{ background: "rgba(10,10,10,0.2)" }}
                      aria-hidden="true"
                    />
                    <h3
                      className="font-heading font-bold"
                      style={{
                        fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                        color: "#0A0A0A",
                      }}
                    >
                      {problem.title}
                    </h3>
                  </div>
                  <p
                    className="leading-relaxed max-w-xl"
                    style={{
                      fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                      color: "#6B6B6B",
                    }}
                  >
                    {problem.body}
                  </p>
                </div>
              </div>
              {i < problems.length - 1 && (
                <div
                  className="w-full h-px"
                  style={{ background: "rgba(10,10,10,0.10)" }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center font-heading font-bold italic mt-16"
          style={{
            fontSize: "clamp(1.25rem, 3vw, 2rem)",
            color: "#0A0A0A",
          }}
        >
          That&rsquo;s where Strive comes in.
        </motion.p>
      </div>
    </section>
  );
}
