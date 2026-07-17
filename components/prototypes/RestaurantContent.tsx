"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, ArrowRight, MapPin, Clock, Phone, Star } from "lucide-react";
import { getPrototype } from "@/lib/prototypes";
import { PrototypeBadge, PrototypeCtaBar } from "@/components/PrototypeChrome";

const proto = getPrototype("restaurant")!;
const AMBER = proto.accent;

const menuTabs = ["Starters", "Mains", "Dessert"];
const menu: Record<string, { name: string; desc: string; price: string }[]> = {
  Starters: [
    { name: "Charred Octopus", desc: "smoked paprika, lemon oil, fingerling potato", price: "$19" },
    { name: "Burrata & Fig", desc: "aged balsamic, toasted hazelnut, sourdough", price: "$17" },
  ],
  Mains: [
    { name: "Ember Ribeye", desc: "12oz, bone marrow butter, roasted garlic", price: "$48" },
    { name: "Wood-Fired Branzino", desc: "citrus, fennel, charred greens", price: "$36" },
    { name: "Oak Mushroom Risotto", desc: "wild mushroom, truffle, parmesan", price: "$28" },
  ],
  Dessert: [
    { name: "Basque Cheesecake", desc: "burnt honey, sea salt", price: "$13" },
    { name: "Dark Chocolate Torte", desc: "espresso cream, candied orange", price: "$14" },
  ],
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function RestaurantContent() {
  const [tab, setTab] = useState("Mains");

  return (
    <div style={{ background: proto.bg, color: "#F2E8DE" }} className="min-h-dvh flex flex-col">
      <PrototypeBadge proto={proto} dark />

      {/* Hero */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-24 pb-16">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(232,133,58,0.18), transparent 65%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{ background: "linear-gradient(180deg, rgba(28,19,16,0) 0%, #1C1310 100%)" }}
          aria-hidden="true"
        />

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{ background: proto.accentSoft, color: AMBER }}
        >
          <Flame size={13} aria-hidden="true" /> Wood-Fired Kitchen
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="font-heading font-extrabold tracking-tight max-w-3xl"
          style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)", lineHeight: 1.03, color: "#FBF3EA" }}
        >
          Ember <span style={{ color: AMBER }}>&amp;</span> Oak
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 max-w-lg text-lg leading-relaxed"
          style={{ color: "rgba(242,232,222,0.65)" }}
        >
          Live-fire cooking, seasonal ingredients, and a dining room that feels like coming home hungry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36, ease: [0.23, 1, 0.32, 1] }}
          className="mt-9 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#reserve"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest active:scale-[0.97] transition-transform duration-150"
            style={{ background: AMBER, color: "#1C1310" }}
          >
            Reserve a Table
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest border active:scale-[0.97] transition-transform duration-150"
            style={{ borderColor: "rgba(242,232,222,0.25)", color: "#F2E8DE" }}
          >
            View Menu
          </a>
        </motion.div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: AMBER }}>
              Seasonal Menu
            </p>
            <h2 className="font-heading font-extrabold" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#FBF3EA" }}>
              Cooked over open fire.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center gap-2 mb-10">
            {menuTabs.map((t) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 active:scale-95"
                  style={{
                    background: active ? AMBER : "rgba(242,232,222,0.06)",
                    color: active ? "#1C1310" : "rgba(242,232,222,0.6)",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </Reveal>

          <div className="flex flex-col gap-1">
            {menu[tab].map((item, i) => (
              <Reveal key={item.name} delay={i * 0.07}>
                <div className="flex items-start justify-between gap-6 py-5" style={{ borderBottom: "1px solid rgba(242,232,222,0.08)" }}>
                  <div>
                    <p className="font-heading font-bold text-lg" style={{ color: "#FBF3EA" }}>{item.name}</p>
                    <p className="text-sm mt-1" style={{ color: "rgba(242,232,222,0.5)" }}>{item.desc}</p>
                  </div>
                  <span className="font-heading font-bold text-lg shrink-0" style={{ color: AMBER }}>{item.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-2">
          {[
            "linear-gradient(160deg,#7a3b1e,#2a1a10)",
            "linear-gradient(160deg,#c65d2e,#3a2010)",
            "linear-gradient(160deg,#4a2c18,#1c1310)",
            "linear-gradient(160deg,#8a4a24,#2a1a10)",
          ].map((g, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="aspect-[4/5] rounded-lg" style={{ background: g }} aria-hidden="true" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 sm:px-12 lg:px-20 text-center">
        <Reveal className="max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 mb-6" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill={AMBER} strokeWidth={0} />
            ))}
          </div>
          <p className="font-heading font-medium leading-snug mb-6" style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)", color: "#FBF3EA" }}>
            &ldquo;The ribeye alone is worth the drive. Booked online in seconds, table was ready when we walked in.&rdquo;
          </p>
          <p className="text-sm uppercase tracking-widest" style={{ color: "rgba(242,232,222,0.4)" }}>
            — Frequent Diner
          </p>
        </Reveal>
      </section>

      {/* Reserve / footer */}
      <section id="reserve" className="py-24 px-6 sm:px-12 lg:px-20 mt-auto" style={{ background: "#251811" }}>
        <Reveal className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 max-w-5xl mx-auto">
          <div>
            <h2 className="font-heading font-extrabold leading-tight tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#FBF3EA" }}>
              Reserve your <span style={{ color: AMBER }}>table.</span>
            </h2>
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest active:scale-[0.97] transition-transform duration-150"
              style={{ background: AMBER, color: "#1C1310" }}
            >
              Reserve Online
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(242,232,222,0.55)" }}>
            <span className="flex items-center gap-2">
              <MapPin size={15} style={{ color: AMBER }} aria-hidden="true" /> 210 Front St, Hamilton, ON
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} style={{ color: AMBER }} aria-hidden="true" /> Tue–Sun, 5pm – 11pm
            </span>
            <span className="flex items-center gap-2">
              <Phone size={15} style={{ color: AMBER }} aria-hidden="true" /> (905) 555-0148
            </span>
          </div>
        </Reveal>
      </section>

      <PrototypeCtaBar proto={proto} />
    </div>
  );
}
