"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, AlertTriangle, TrendingDown } from "lucide-react";

const cards = [
  {
    Icon: Globe,
    title: "No website yet",
    body: "You're invisible to customers searching online. If they can't find you, they'll find someone else — every single time.",
  },
  {
    Icon: AlertTriangle,
    title: "Outdated site",
    body: "First impressions matter. A bad one costs you. An old or broken website signals that your business isn't serious.",
  },
  {
    Icon: TrendingDown,
    title: "Losing customers",
    body: "Every day without a great site is money left behind. Your competitors aren't waiting — and neither are your potential customers.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-muted"
      aria-labelledby="pain-heading"
    >
      <div className="max-w-6xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2
            id="pain-heading"
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight"
          >
            Sound familiar?
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
        >
          {cards.map(({ Icon, title, body }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              role="listitem"
              className="group bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-200">
                <Icon
                  size={24}
                  strokeWidth={1.75}
                  className="text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
