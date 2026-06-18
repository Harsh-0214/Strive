"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";

export default function HopeBridge() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-44 overflow-hidden"
      aria-labelledby="hope-heading"
      style={{ background: "hsl(var(--hope-bg))" }}
    >
      {/* Warm texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 80% 50%, hsl(199 100% 58% / 0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 20% 80%, hsl(var(--primary) / 0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto section-padding text-center relative">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
          aria-hidden="true"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)))",
              boxShadow: "0 8px 32px hsl(var(--primary) / 0.25)",
            }}
          >
            <TrendingUp size={28} strokeWidth={2} className="text-white" />
          </div>
        </motion.div>

        {/* Main statement */}
        <motion.h2
          id="hope-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold tracking-tight mb-6"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            color: "hsl(var(--hope-text))",
          }}
        >
          You spent years building{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-light)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            something real.
          </span>
          <br />
          Your website should show it.
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "hsl(var(--hope-subtext))" }}
        >
          Most small business owners we talk to have poured everything into their
          craft. They just need someone to build the window for the world to see
          in. That&apos;s exactly what Strive does.
        </motion.p>

        {/* Trust signals row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 mb-10"
          aria-label="Key commitments"
        >
          {[
            "No tech knowledge needed",
            "Results in 2 weeks",
            "Flat-rate pricing — no surprises",
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
              style={{
                borderColor: "hsl(var(--primary) / 0.25)",
                background: "hsl(var(--primary) / 0.06)",
                color: "hsl(var(--primary))",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
                aria-hidden="true"
              />
              {item}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="#packages"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white active:scale-95 transition-transform duration-200 shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-light)))",
              boxShadow: "0 8px 28px hsl(var(--primary) / 0.3)",
            }}
          >
            See What We Can Do For You
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
