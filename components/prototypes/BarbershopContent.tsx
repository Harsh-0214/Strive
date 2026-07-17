"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Scissors, ArrowRight, Star, MapPin, Clock } from "lucide-react";
import { getPrototype } from "@/lib/prototypes";
import { PrototypeBadge, PrototypeCtaBar } from "@/components/PrototypeChrome";

const proto = getPrototype("barbershop")!;
const GOLD = proto.accent;

const services = ["Skin Fade", "Beard Sculpt", "Taper", "Hot Towel Shave", "Kids Cut", "Line Up", "Hair Design"];

const work = [
  { name: "Skin Fade", tone: "linear-gradient(160deg,#2a2a2a,#0a0a0a)" },
  { name: "Textured Crop", tone: "linear-gradient(160deg,#3a2f1f,#0a0a0a)" },
  { name: "Beard Sculpt", tone: "linear-gradient(160deg,#2f2418,#0a0a0a)" },
  { name: "Classic Taper", tone: "linear-gradient(160deg,#1f1f1f,#0a0a0a)" },
  { name: "Hard Part", tone: "linear-gradient(160deg,#332a1a,#0a0a0a)" },
  { name: "Hot Towel Shave", tone: "linear-gradient(160deg,#25201a,#0a0a0a)" },
];

const pricing = [
  { name: "Signature Fade", price: "$45" },
  { name: "Beard Sculpt & Line", price: "$30" },
  { name: "Fade + Beard Combo", price: "$65" },
  { name: "Hot Towel Straight Shave", price: "$40" },
  { name: "Kids Cut (12 & under)", price: "$25" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function BarbershopContent() {
  return (
    <div style={{ background: "#0A0A0A", color: "#F2EEE6" }} className="min-h-dvh flex flex-col">
      <PrototypeBadge proto={proto} dark />

      {/* Hero */}
      <section className="relative min-h-dvh flex flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-20 pt-24 pb-16">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,162,76,0.10) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px)",
          }}
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] mb-8"
          style={{ color: GOLD }}
        >
          <Scissors size={14} aria-hidden="true" /> Est. 2018, Downtown
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="font-heading font-black uppercase leading-[0.92] tracking-tight max-w-5xl"
          style={{ fontSize: "clamp(3rem, 11vw, 8.5rem)" }}
        >
          Fade
          <span style={{ color: GOLD }}>&amp;</span>
          <br />
          Co.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 max-w-md text-lg leading-relaxed"
          style={{ color: "rgba(242,238,230,0.6)" }}
        >
          Precision cuts. No small talk required. Walk in rough, walk out sharp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 flex items-center gap-5"
        >
          <a
            href="#book"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm uppercase tracking-widest text-black active:scale-[0.97] transition-transform duration-150"
            style={{ background: GOLD }}
          >
            Book a Cut
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href="#work" className="text-sm font-semibold uppercase tracking-widest border-b" style={{ borderColor: "rgba(242,238,230,0.3)" }}>
            View the Work
          </a>
        </motion.div>
      </section>

      {/* Services ticker */}
      <div className="border-y overflow-hidden py-4" style={{ borderColor: "rgba(242,238,230,0.1)" }}>
        <div className="flex gap-10 whitespace-nowrap animate-[marquee_28s_linear_infinite]">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="text-sm font-bold uppercase tracking-[0.3em] flex items-center gap-10" style={{ color: "rgba(242,238,230,0.35)" }}>
              {s}
              <span style={{ color: GOLD }} aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Work grid */}
      <section id="work" className="py-24 px-6 sm:px-12 lg:px-20">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.35em] mb-4" style={{ color: GOLD }}>
            The Work
          </p>
          <h2 className="font-heading font-extrabold uppercase tracking-tight mb-14" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
            Every cut, a signature.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {work.map((w, i) => (
            <Reveal key={w.name} delay={i * 0.07}>
              <div
                className="group relative aspect-[4/5] rounded-lg overflow-hidden flex items-end p-6 cursor-default transition-transform duration-300"
                style={{ background: w.tone, border: "1px solid rgba(242,238,230,0.08)" }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(0deg, rgba(212,162,76,0.18), transparent 60%)" }}
                  aria-hidden="true"
                />
                <span className="relative font-heading font-bold uppercase tracking-wide text-lg">{w.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 sm:px-12 lg:px-20" style={{ borderTop: "1px solid rgba(242,238,230,0.08)" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.35em] mb-4 text-center" style={{ color: GOLD }}>
              Pricing
            </p>
            <h2 className="font-heading font-extrabold uppercase tracking-tight mb-14 text-center" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
              No surprises. Just sharp.
            </h2>
          </Reveal>
          <div className="flex flex-col">
            {pricing.map((row, i) => (
              <Reveal key={row.name} delay={i * 0.06}>
                <div
                  className="flex items-baseline justify-between py-5"
                  style={{ borderBottom: i < pricing.length - 1 ? "1px solid rgba(242,238,230,0.1)" : "none" }}
                >
                  <span className="font-heading font-semibold text-lg">{row.name}</span>
                  <span className="flex-1 mx-4 border-b border-dotted" style={{ borderColor: "rgba(242,238,230,0.2)" }} aria-hidden="true" />
                  <span className="font-heading font-bold text-lg" style={{ color: GOLD }}>{row.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 text-center" style={{ background: "#111111" }}>
        <Reveal className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 mb-6" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill={GOLD} strokeWidth={0} />
            ))}
          </div>
          <p className="font-heading font-medium leading-snug mb-6" style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>
            &ldquo;Best fade in the city, no contest. In and out in 25 minutes, looking sharp for two weeks straight.&rdquo;
          </p>
          <p className="text-sm uppercase tracking-widest" style={{ color: "rgba(242,238,230,0.4)" }}>
            Regular Client
          </p>
        </Reveal>
      </section>

      {/* Book / Footer */}
      <section id="book" className="py-24 px-6 sm:px-12 lg:px-20 mt-auto">
        <Reveal className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <h2 className="font-heading font-black uppercase leading-none tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
              Book your <span style={{ color: GOLD }}>chair.</span>
            </h2>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm uppercase tracking-widest text-black active:scale-[0.97] transition-transform duration-150"
              style={{ background: GOLD }}
            >
              Book Online
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(242,238,230,0.5)" }}>
            <span className="flex items-center gap-2">
              <MapPin size={15} style={{ color: GOLD }} aria-hidden="true" /> 128 King St W, Toronto, ON
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} style={{ color: GOLD }} aria-hidden="true" /> Tue–Sat, 10am – 7pm
            </span>
          </div>
        </Reveal>
      </section>

      <PrototypeCtaBar proto={proto} />
    </div>
  );
}
