"use client";

import { useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Zap, Star, ShoppingBag, ArrowRight } from "lucide-react";

const packages = [
  {
    icon: Zap,
    name: "Launch",
    range: "$500",
    rangeSuffix: "",
    period: "one-time",
    description: "A sharp one-pager that shows off your work and gets you found.",
    popular: false,
    features: [
      "Single-page portfolio or landing site",
      "Custom design — no templates",
      "Contact form",
      "Mobile responsive",
      "Fast load speed + SSL",
    ],
    cta: "Get Started",
    ctaHref: "/contact",
  },
  {
    icon: Star,
    name: "Growth",
    range: "$1,500",
    rangeSuffix: "",
    period: "one-time",
    description: "For restaurants, salons & booking-driven businesses that live on repeat traffic.",
    popular: true,
    features: [
      "Everything in Launch",
      "Up to 8 pages",
      "Online booking / reservations",
      "Menu, service or gallery pages",
      "Local SEO setup",
      "Google Analytics + Maps",
    ],
    cta: "Get Started",
    ctaHref: "/contact",
  },
  {
    icon: ShoppingBag,
    name: "Commerce",
    range: "$2,000",
    rangeSuffix: "+",
    period: "one-time",
    description: "A full storefront built to sell — clothing, retail & product-based brands.",
    popular: false,
    features: [
      "Everything in Growth",
      "Full e-commerce store",
      "Product catalog & variants",
      "Secure checkout & payments",
      "Inventory management",
      "Custom integrations",
    ],
    cta: "Get Started",
    ctaHref: "/contact",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] },
  }),
};

function TiltCard({
  children,
  popular,
  index,
  inView,
}: {
  children: React.ReactNode;
  popular: boolean;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const shadowSpring = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      rotateX.set(-dy * 8);
      rotateY.set(dx * 8);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const cardVariant = {
    hidden: { opacity: 0, y: 36, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          boxShadow: popular
            ? "0 32px 64px rgba(0,180,216,0.25), 0 8px 32px rgba(0,0,0,0.15)"
            : "0 24px 48px rgba(0,0,0,0.12)",
        }}
        transition={{ duration: 0.2 }}
        className={`relative rounded-2xl flex flex-col overflow-hidden cursor-default h-full ${
          popular ? "" : "border border-[#E8E8E8] bg-white shadow-sm"
        }`}
      >
        {popular ? (
          /* Gradient border wrapper */
          <div
            className="absolute inset-0 rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, #00B4D8, #0077B6, #00B4D8)",
              zIndex: 0,
            }}
            aria-hidden="true"
          >
            <div className="absolute inset-px rounded-2xl bg-white" />
          </div>
        ) : null}
        <div className="relative z-10 p-7 flex flex-col flex-1">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Packages() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="packages"
      ref={ref}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="packages-heading"
    >
      <div className="w-full section-padding">
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
            Pricing
          </p>
          <h2
            id="packages-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#0A0A0A",
            }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#6B6B6B" }}>
            Flat-rate packages. No hourly billing. No surprise invoices. Ever.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {packages.map(
            (
              { icon: Icon, name, range, rangeSuffix, period, description, popular, features, cta, ctaHref },
              index
            ) => (
              <TiltCard key={name} popular={popular} index={index} inView={inView}>
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: popular ? "hsl(199 100% 42% / 0.1)" : "#F5F5F5" }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      style={{ color: popular ? "#00B4D8" : "#6B6B6B" }}
                      aria-hidden="true"
                    />
                  </div>
                  {popular && (
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: "hsl(199 100% 42% / 0.1)", color: "#00B4D8" }}
                    >
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3
                  className="font-heading font-bold text-xl mb-1"
                  style={{ color: "#0A0A0A" }}
                >
                  {name}
                </h3>

                {/* Description */}
                <p className="text-sm mb-6" style={{ color: "#6B6B6B" }}>
                  {description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span
                      className="font-heading font-black"
                      style={{
                        fontSize: "clamp(2.5rem, 4vw, 3rem)",
                        color: "#0A0A0A",
                        lineHeight: 1,
                      }}
                    >
                      {range}
                    </span>
                    <span
                      className="font-heading font-bold text-xl mb-1"
                      style={{ color: "#6B6B6B" }}
                    >
                      {rangeSuffix}
                    </span>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
                    {period}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1" role="list">
                  {features.map((f, fi) => (
                    <motion.li
                      key={f}
                      custom={fi}
                      variants={featureVariants}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "#0A0A0A" }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: popular ? "#00B4D8" : "#E8C547",
                        }}
                        aria-hidden="true"
                      >
                        <Check size={11} strokeWidth={3} color="#fff" />
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-200"
                  style={{
                    background: popular ? "#00B4D8" : "#0A0A0A",
                    color: "#FFFFFF",
                    transform: "scale(1)",
                    transition: "transform 160ms cubic-bezier(0.23,1,0.32,1), background 160ms ease",
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  {cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </TiltCard>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
