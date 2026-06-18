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
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
    borderAccent: "border-l-4 border-l-violet-500",
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
      className="py-20 lg:py-28 overflow-hidden"
      style={{ background: 'hsl(220 24% 9%)' }}
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
            className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            Sound familiar?
          </h2>
          <p className="mt-4 text-white/55 text-lg max-w-xl mx-auto">
            Most small businesses fall into one of these traps. All three are fixable.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-6"
          role="list"
        >
          {/* First card: larger (flex-[2] = ~2/3 width) */}
          {(() => {
            const { num, Icon, title, body, iconColor, iconBg, borderAccent } = cards[0];
            return (
              <motion.article
                key={title}
                variants={cardVariants}
                role="listitem"
                className={`group relative rounded-2xl flex flex-col overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex-1 md:flex-[2] ${borderAccent}`}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Oversized decorative number */}
                <span
                  className="absolute bottom-3 right-4 font-heading font-extrabold text-8xl leading-none text-white/[0.06] select-none pointer-events-none"
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
                  <h3 className="font-heading font-bold text-xl text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-[0.9375rem]">
                    {body}
                  </p>
                </div>
              </motion.article>
            );
          })()}

          {/* Cards 2 and 3: stacked in a column (flex-1 = ~1/3 width) */}
          <div className="flex flex-col gap-6 flex-1">
            {cards.slice(1).map(({ num, Icon, title, body, iconColor, iconBg, borderAccent }) => (
              <motion.article
                key={title}
                variants={cardVariants}
                role="listitem"
                className={`group relative rounded-2xl flex flex-col overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex-1 ${borderAccent}`}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Oversized decorative number */}
                <span
                  className="absolute bottom-3 right-4 font-heading font-extrabold text-8xl leading-none text-white/[0.06] select-none pointer-events-none"
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
                  <h3 className="font-heading font-bold text-xl text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-[0.9375rem]">
                    {body}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
