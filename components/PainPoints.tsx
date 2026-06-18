"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, AlertTriangle, TrendingDown } from "lucide-react";

const cards = [
  {
    num: "01",
    Icon: Globe,
    title: "No website yet",
    body: "You're invisible to customers searching online. If they can't find you, they'll find someone else — every single time.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-500/10",
    borderAccent: "border-l-4 border-l-blue-600",
  },
  {
    num: "02",
    Icon: AlertTriangle,
    title: "Outdated site",
    body: "First impressions matter. A bad one costs you. An old or broken website signals that your business isn't serious.",
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
    borderAccent: "border-l-4 border-l-amber-500",
  },
  {
    num: "03",
    Icon: TrendingDown,
    title: "Losing customers",
    body: "Every day without a great site is money left behind. Your competitors aren't waiting — and neither are your potential customers.",
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10",
    borderAccent: "border-l-4 border-l-red-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PainPoints() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-background overflow-hidden"
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
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Most small businesses fall into one of these traps. All three are fixable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
        >
          {cards.map(({ num, Icon, title, body, iconColor, iconBg, borderAccent }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              role="listitem"
              className={`group relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-default ${borderAccent}`}
            >
              {/* Oversized decorative number */}
              <span
                className="absolute bottom-3 right-4 font-heading font-extrabold text-8xl leading-none text-foreground/[0.07] select-none pointer-events-none"
                aria-hidden="true"
              >
                {num}
              </span>

              <div className="relative p-8 pt-7">
                <div
                  className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-5`}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className={iconColor}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[0.9375rem]">
                  {body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
