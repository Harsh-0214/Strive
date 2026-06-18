"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, RefreshCw, Clock, Lock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Satisfaction Guarantee",
    body: "Not happy with your site? We'll revise until you are — or refund you in full.",
  },
  {
    icon: RefreshCw,
    title: "Unlimited Revisions",
    body: "We iterate until every pixel is right. No revision caps, no nickel-and-diming.",
  },
  {
    icon: Clock,
    title: "2-Week Delivery",
    body: "We commit to a launch date upfront. If we miss it, you get a discount.",
  },
  {
    icon: Lock,
    title: "No Lock-in Contracts",
    body: "Month-to-month care plans. Cancel any time, keep your site and all your files.",
  },
];

export default function GuaranteeStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 bg-[hsl(var(--care-bg))]">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Zero risk. Serious results.
          </h2>
          <p className="mt-2 text-[hsl(var(--care-muted))] text-sm max-w-md mx-auto">
            We back every project with commitments that put your interests first.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="flex gap-4 rounded-xl border border-[hsl(var(--care-border))] bg-[hsl(var(--care-card))] p-5"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-primary/20">
                    <Icon size={18} className="text-[hsl(var(--accent))]" strokeWidth={1.75} />
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white mb-1">{p.title}</h3>
                  <p className="text-xs text-[hsl(var(--care-muted))] leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
