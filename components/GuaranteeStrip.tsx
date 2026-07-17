"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, RefreshCw, Clock, Lock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Satisfaction Guarantee",
    body: "Not happy with your site? We'll revise until you are — or refund you in full.",
    accent: "#00B4D8",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Revisions",
    body: "We iterate until every pixel is right. No revision caps, no nickel-and-diming.",
    accent: "#E8C547",
  },
  {
    icon: Clock,
    title: "2-Week Delivery",
    body: "We commit to a launch date upfront. If we miss it, you get a discount.",
    accent: "#00B4D8",
  },
  {
    icon: Lock,
    title: "No Lock-in Contracts",
    body: "Month-to-month care plans. Cancel any time, keep your site and all your files.",
    accent: "#E8C547",
  },
];

export default function GuaranteeStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16"
      style={{
        background: "linear-gradient(180deg, #070b14 0%, #0a0f1a 100%)",
      }}
      aria-labelledby="guarantee-heading"
    >
      <div className="w-full section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <h2
            id="guarantee-heading"
            className="font-heading font-extrabold"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", color: "#FFFFFF" }}
          >
            Zero risk. Serious results.
          </h2>
          <p className="mt-2 text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
            We back every project with commitments that put your interests first.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {pillars.map(({ icon: Icon, title, body, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.45,
                delay: i * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="flex flex-col gap-3 p-7"
              style={{
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <span
                className="inline-flex w-10 h-10 items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: `${accent}14` }}
              >
                <Icon size={18} style={{ color: accent }} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3
                className="font-semibold text-sm leading-snug"
                style={{ color: "#FFFFFF" }}
              >
                {title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
