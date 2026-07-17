"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const rows = [
  { label: "Typical turnaround",   diy: "You do it",    freelancer: "4–8 weeks",    agency: "3–6 months",   strive: "2 weeks" },
  { label: "Starting price",        diy: "$20–50/mo",    freelancer: "$1,500+",      agency: "$10,000+",     strive: "From $500" },
  { label: "Professional design",   diy: false,          freelancer: "maybe",        agency: true,           strive: true },
  { label: "Done-for-you setup",    diy: false,          freelancer: true,           agency: true,           strive: true },
  { label: "Ongoing support",       diy: false,          freelancer: false,          agency: "extra cost",   strive: true },
  { label: "Local SMB expertise",   diy: false,          freelancer: false,          agency: false,          strive: true },
  { label: "No long-term contract", diy: false,          freelancer: "varies",       agency: false,          strive: true },
  { label: "SEO + mobile ready",    diy: "basic",        freelancer: "varies",       agency: true,           strive: true },
];

type CellValue = string | boolean;

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true) {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: highlight ? "rgba(0,180,216,0.15)" : "rgba(255,255,255,0.08)" }}
      >
        <Check
          size={14}
          strokeWidth={2.5}
          style={{ color: highlight ? "#00B4D8" : "rgba(255,255,255,0.6)" }}
        />
      </span>
    );
  }
  if (value === false) {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <X size={13} strokeWidth={2} style={{ color: "rgba(255,255,255,0.2)" }} />
      </span>
    );
  }
  if (value === "maybe" || value === "varies" || value === "basic" || value === "extra cost") {
    return (
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <Minus size={13} strokeWidth={2} style={{ color: "rgba(255,255,255,0.3)" }} />
      </span>
    );
  }
  return (
    <span
      className="text-sm font-medium"
      style={{ color: highlight ? "#00B4D8" : "rgba(255,255,255,0.45)" }}
    >
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28"
      style={{ background: "#0d1117" }}
      aria-labelledby="comparison-heading"
    >
      <div className="w-full section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#00B4D8" }}
          >
            Why Strive
          </p>
          <h2
            id="comparison-heading"
            className="font-heading font-extrabold tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#FFFFFF" }}
          >
            How we stack up
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Professional results at small-business prices, without the wait.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-x-auto rounded-2xl"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <th
                  className="text-left px-5 py-4 w-[32%]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                />
                {["DIY Builder", "Freelancer", "Big Agency"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {col}
                  </th>
                ))}
                <th
                  className="px-4 py-4 text-center"
                  style={{
                    background: "rgba(0,180,216,0.06)",
                    borderLeft: "1px solid rgba(0,180,216,0.2)",
                  }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#00B4D8" }}
                  >
                    Strive
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + i * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                >
                  <td
                    className="px-5 py-4 text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {row.label}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Cell value={row.diy} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Cell value={row.freelancer} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Cell value={row.agency} />
                  </td>
                  <td
                    className="px-4 py-4 text-center"
                    style={{
                      background: "rgba(0,180,216,0.06)",
                      borderLeft: "1px solid rgba(0,180,216,0.15)",
                    }}
                  >
                    <Cell value={row.strive} highlight />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
