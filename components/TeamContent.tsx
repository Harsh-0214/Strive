"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Code2, Sparkles, ArrowRight, ArrowUpRight, Mail, Linkedin } from "lucide-react";
import Link from "next/link";

const founders = [
  {
    name: "Harsh Tamakuwala",
    role: "Co-Founder & Software Engineer",
    initials: "HT",
    gradient: "linear-gradient(135deg, #0070f3 0%, #00b4d8 100%)",
    bio: "Studied engineering at Ontario Tech University, then turned that background into a craft. He builds websites that are engineered to load fast, rank well, and convert, not just look nice in a mockup.",
    focus: ["Front-end architecture", "Performance", "Client strategy"],
    linkedin: null as string | null,
  },
  {
    name: "Rahul Modhera",
    role: "Co-Founder & Software Engineer",
    initials: "RM",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #00b4d8 100%)",
    bio: "Also an Ontario Tech University engineering grad, obsessed with the details most agencies skip: animation timing, responsive edge cases, and interfaces that feel as good as they look.",
    focus: ["UI/UX design", "Systems & integrations", "Quality control"],
    linkedin: "https://www.linkedin.com/in/rahulmodhera/",
  },
];

const values = [
  {
    icon: Code2,
    title: "Engineers first",
    body: "We don't drag-and-drop templates. Every site is hand-built with real code, so it's fast, flexible, and yours to scale.",
  },
  {
    icon: Sparkles,
    title: "Range over formula",
    body: "A barbershop and a boutique shouldn't look the same. We design a distinct visual language for every business we touch.",
  },
  {
    icon: GraduationCap,
    title: "Built on fundamentals",
    body: "Our engineering degrees show up in the details: clean structure, real performance budgets, sites that hold up under traffic.",
  },
];

export default function TeamContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const foundersRef = useRef<HTMLElement>(null);
  const foundersInView = useInView(foundersRef, { once: true, margin: "-80px" });
  const valuesRef = useRef<HTMLElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden"
        style={{ background: "hsl(220 70% 3%)" }}
        aria-labelledby="team-hero-heading"
      >
        <div
          className="absolute -z-10 top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "600px",
            height: "60%",
            background:
              "radial-gradient(ellipse 50% 100% at 50% 0%, hsl(210 90% 58% / 0.18) 0%, transparent 72%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto section-padding text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "#00B4D8" }}
          >
            The Team
          </motion.p>
          <motion.h1
            id="team-hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            className="font-heading font-extrabold tracking-tight text-white mb-6"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.08 }}
          >
            Two engineers who got tired of ugly business websites.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Strive was founded by Harsh Tamakuwala and Rahul Modhera, two software engineers
            and Ontario Tech University graduates who saw too many great local businesses stuck
            with slow, dated, template-built sites, and decided to fix it.
          </motion.p>
        </div>
      </section>

      {/* Founders */}
      <section
        ref={foundersRef}
        className="py-20 lg:py-28"
        style={{ background: "#0d1117" }}
        aria-labelledby="founders-heading"
      >
        <div className="w-full section-padding">
          <h2 id="founders-heading" className="sr-only">
            Meet the founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {founders.map((f, i) => (
              <motion.article
                key={f.name}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={foundersInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-2xl p-8 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {f.linkedin && (
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on LinkedIn`}
                    className="absolute top-6 right-6 w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.06] text-white/50 hover:bg-white/[0.12] hover:text-white transition-all duration-150"
                  >
                    <Linkedin size={15} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                )}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center font-heading font-black text-2xl text-white mb-6 shrink-0"
                  style={{ background: f.gradient, boxShadow: "0 8px 32px rgba(0,180,216,0.25)" }}
                  aria-hidden="true"
                >
                  {f.initials}
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-1">{f.name}</h3>
                <p className="text-sm font-semibold mb-4" style={{ color: "#00B4D8" }}>
                  {f.role}
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {f.bio}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto mb-5">
                  {f.focus.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="flex items-center gap-3 pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <GraduationCap size={16} style={{ color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
                  <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Ontario Tech University
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 lg:py-28 bg-white" aria-labelledby="values-heading">
        <div className="w-full section-padding">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#00B4D8" }}>
              How We Work
            </p>
            <h2
              id="values-heading"
              className="font-heading font-extrabold tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#0A0A0A" }}
            >
              Software engineers, design taste.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="p-7 rounded-2xl border"
                style={{ borderColor: "#E8E8E8" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "hsl(199 100% 42% / 0.1)" }}
                >
                  <Icon size={20} strokeWidth={1.75} style={{ color: "#00B4D8" }} aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: "#0A0A0A" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24" style={{ background: "hsl(220 70% 3%)" }}>
        <div className="max-w-3xl mx-auto section-padding text-center">
          <h2
            className="font-heading font-extrabold tracking-tight text-white mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Let&apos;s build something you&apos;re proud of.
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
            Tell us about your business. We&apos;ll reply within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white active:scale-95 transition-transform duration-200"
              style={{
                background: "linear-gradient(135deg, #00B4D8 0%, #0096B4 100%)",
                boxShadow: "0 8px 32px rgba(0,180,216,0.35)",
              }}
            >
              <Mail size={18} aria-hidden="true" />
              Get a Free Quote
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white/90 border border-white/20 bg-white/[0.07] hover:bg-white/[0.13] active:scale-95 transition-all duration-200"
            >
              See Our Work
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
