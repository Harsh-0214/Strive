"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, MapPin, Clock, Star } from "lucide-react";
import { getPrototype } from "@/lib/prototypes";
import { PrototypeBadge, PrototypeCtaBar } from "@/components/PrototypeChrome";
import { Flower, Sprig, FloatingPetal } from "@/components/prototypes/nail-studio/Florals";

const proto = getPrototype("nail-studio")!;
const ROSE = proto.accent;

const services = [
  { name: "Classic Manicure", time: "30 min", price: "$35" },
  { name: "Gel Manicure", time: "45 min", price: "$50" },
  { name: "Signature Pedicure", time: "50 min", price: "$60" },
  { name: "Custom Nail Art", time: "60 min", price: "from $75" },
  { name: "Dip Powder", time: "50 min", price: "$55" },
  { name: "Add-On: Design Accent", time: "10 min", price: "$8" },
];

const shades = ["#E8B4BC", "#F2D3D9", "#C97B84", "#F7E7DD", "#E3C4A8", "#D9A5AE", "#F0DCC8", "#B98A93"];

const timeSlots = ["9:00", "10:30", "11:00", "1:00", "2:30", "3:00", "4:30"];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function NailStudioContent() {
  const [selectedSlot, setSelectedSlot] = useState("11:00");

  return (
    <div style={{ background: proto.bg, color: "#4A3B38" }} className="min-h-dvh flex flex-col font-body">
      <PrototypeBadge proto={proto} dark={false} />

      {/* Hero */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-24 pb-16">
        <div
          className="absolute rounded-full"
          style={{
            width: 520,
            height: 520,
            top: "-8%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(232,180,188,0.5), transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 460,
            height: 460,
            bottom: "-10%",
            right: "-8%",
            background: "radial-gradient(circle, rgba(201,123,132,0.35), transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        {/* Falling petals */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <FloatingPetal key={i} index={i} />
          ))}
        </div>

        {/* Corner sprigs */}
        <Sprig
          size={130}
          color="#C97B84"
          leaf="#E8B4BC"
          className="absolute hidden sm:block"
          style={{ top: "-6%", left: "2%", transform: "rotate(200deg)" }}
        />
        <Sprig
          size={130}
          color="#C97B84"
          leaf="#E8B4BC"
          flip
          className="absolute hidden sm:block"
          style={{ bottom: "-6%", right: "2%", transform: "rotate(-20deg) scaleX(-1)" }}
        />
        <Flower
          size={38}
          color="#D9A5AE"
          center="#FDF6F3"
          className="absolute hidden md:block"
          style={{ top: "18%", right: "10%", opacity: 0.7 }}
        />
        <Flower
          size={26}
          color="#E8B4BC"
          center="#FDF6F3"
          className="absolute hidden md:block"
          style={{ bottom: "22%", left: "8%", opacity: 0.6 }}
        />

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ background: proto.accentSoft, color: ROSE }}
        >
          <Flower size={15} color={ROSE} center="#FDF6F3" /> Nail Studio &amp; Spa
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="font-heading italic font-bold tracking-tight max-w-3xl"
          style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)", lineHeight: 1.05, color: "#3A2C2A" }}
        >
          Blush &amp; Bone
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 max-w-md text-lg leading-relaxed"
          style={{ color: "#8A7370" }}
        >
          A quiet studio for beautiful hands. Book in under a minute, relax the rest of the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.23, 1, 0.32, 1] }}
          className="mt-9"
        >
          <a
            href="#book"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base text-white active:scale-[0.97] transition-transform duration-150"
            style={{ background: ROSE, boxShadow: `0 12px 32px ${proto.accentSoft}` }}
          >
            Book Your Appointment
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </motion.div>
      </section>

      {/* Services */}
      <section className="relative py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <Flower
          size={64}
          color="#F0DCC8"
          center="#FDF6F3"
          className="absolute hidden lg:block"
          style={{ top: "6%", left: "4%", opacity: 0.5 }}
        />
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ROSE }}>
              <Flower size={16} color={ROSE} center="#FDF6F3" /> Menu
            </p>
            <h2 className="font-heading italic font-bold" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3A2C2A" }}>
              Services, done gently.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <div
                  className="relative flex items-center justify-between p-6 rounded-2xl overflow-hidden group"
                  style={{ background: "#FFFFFF", border: "1px solid rgba(74,59,56,0.08)" }}
                >
                  <Flower
                    size={70}
                    color={ROSE}
                    center={ROSE}
                    className="absolute transition-transform duration-300 group-hover:scale-110"
                    style={{ top: "-18px", right: "-18px", opacity: 0.07 }}
                  />
                  <div className="relative">
                    <p className="font-heading font-semibold text-lg" style={{ color: "#3A2C2A" }}>{s.name}</p>
                    <p className="text-sm mt-1" style={{ color: "#A6928E" }}>{s.time}</p>
                  </div>
                  <span className="relative font-heading font-bold text-lg" style={{ color: ROSE }}>{s.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking widget mock */}
      <section id="book" className="relative py-24 px-6 sm:px-12 lg:px-20 overflow-hidden" style={{ background: "#F7ECE8" }}>
        <Sprig
          size={100}
          color="#C97B84"
          leaf="#D9A5AE"
          className="absolute hidden lg:block"
          style={{ top: "-4%", right: "6%", transform: "rotate(15deg)" }}
        />
        <div className="max-w-2xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ROSE }}>
              <Flower size={16} color={ROSE} center="#FDF6F3" /> Book Online
            </p>
            <h2 className="font-heading italic font-bold" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3A2C2A" }}>
              Pick a time that suits you.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl p-8" style={{ background: "#FFFFFF", boxShadow: "0 20px 60px rgba(74,59,56,0.08)" }}>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#A6928E" }}>
                Tuesday, July 21
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {timeSlots.map((slot) => {
                  const active = slot === selectedSlot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className="py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95"
                      style={{
                        background: active ? ROSE : "#F7ECE8",
                        color: active ? "#fff" : "#4A3B38",
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <a
                href="/contact"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white active:scale-[0.97] transition-transform duration-150"
                style={{ background: "#3A2C2A" }}
              >
                Confirm {selectedSlot} Appointment
                <Check size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shades gallery */}
      <section className="relative py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <Flower
          size={54}
          color="#E3C4A8"
          center="#FDF6F3"
          className="absolute hidden lg:block"
          style={{ bottom: "8%", right: "5%", opacity: 0.55 }}
        />
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: ROSE }}>
              <Flower size={16} color={ROSE} center="#FDF6F3" /> Palette
            </p>
            <h2 className="font-heading italic font-bold" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#3A2C2A" }}>
              Every shade, in-house.
            </h2>
          </Reveal>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {shades.map((c, i) => (
              <Reveal key={c} delay={i * 0.04}>
                <div
                  className="group relative aspect-square rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-105"
                  style={{ background: c, boxShadow: "0 6px 18px rgba(74,59,56,0.10)" }}
                  aria-hidden="true"
                >
                  <Flower
                    size={40}
                    color="rgba(255,255,255,0.9)"
                    center="rgba(255,255,255,0.9)"
                    className="absolute inset-0 m-auto opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative py-24 px-6 sm:px-12 lg:px-20 text-center overflow-hidden" style={{ background: "#F7ECE8" }}>
        <Reveal className="max-w-2xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-6" aria-hidden="true">
            <Flower size={22} color="#D9A5AE" center="#FDF6F3" style={{ opacity: 0.8 }} />
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill={ROSE} strokeWidth={0} />
              ))}
            </div>
            <Flower size={22} color="#D9A5AE" center="#FDF6F3" style={{ opacity: 0.8, transform: "scaleX(-1)" }} />
          </div>
          <p className="font-heading italic font-medium leading-snug mb-6" style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", color: "#3A2C2A" }}>
            &ldquo;The calmest, prettiest studio I&apos;ve been to. Booking online took ten seconds and my gel set lasted three weeks.&rdquo;
          </p>
          <p className="text-sm uppercase tracking-widest" style={{ color: "#A6928E" }}>
            — Studio Regular
          </p>
        </Reveal>
      </section>

      {/* Footer info */}
      <section className="relative py-16 px-6 sm:px-12 lg:px-20 mt-auto overflow-hidden">
        <Sprig
          size={80}
          color="#D9A5AE"
          leaf="#F0DCC8"
          className="absolute hidden md:block left-1/2 -translate-x-1/2"
          style={{ top: "-14%", opacity: 0.6, transform: "translateX(-50%) rotate(180deg)" }}
        />
        <Reveal className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
          <span className="flex items-center gap-2" style={{ color: "#8A7370" }}>
            <MapPin size={15} style={{ color: ROSE }} aria-hidden="true" /> 42 Rosewood Ave, Oakville, ON
          </span>
          <span className="flex items-center gap-2" style={{ color: "#8A7370" }}>
            <Clock size={15} style={{ color: ROSE }} aria-hidden="true" /> Mon–Sat, 9am – 6pm
          </span>
        </Reveal>
      </section>

      <PrototypeCtaBar proto={proto} />
    </div>
  );
}
