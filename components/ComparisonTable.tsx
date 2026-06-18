"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const rows = [
  { label: "Typical turnaround",   diy: "You do it",    freelancer: "4–8 weeks",    agency: "3–6 months",   strive: "2 weeks" },
  { label: "Starting price",        diy: "$20–50 / mo",  freelancer: "$1,500+",      agency: "$10,000+",     strive: "From $300" },
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
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${highlight ? "bg-primary/20" : "bg-success/10"}`}>
        <Check size={15} className={highlight ? "text-primary" : "text-[hsl(var(--success))]"} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-destructive/10">
        <X size={14} className="text-destructive/70" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "maybe" || value === "varies" || value === "basic") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted">
        <Minus size={14} className="text-muted-foreground" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className={`text-sm font-medium ${highlight ? "text-primary font-semibold" : "text-muted-foreground"}`}>
      {value}
    </span>
  );
}

export default function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="max-w-5xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[hsl(var(--accent))] mb-3">
            Why Strive
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground">
            How we stack up
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Professional results at small-business prices — without the wait.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-x-auto rounded-2xl border border-border"
        >
          <table className="w-full min-w-[540px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-4 text-sm font-semibold text-muted-foreground w-[34%]" />
                {["DIY Builder", "Freelancer", "Big Agency"].map((col) => (
                  <th key={col} className="px-4 py-4 text-center text-sm font-medium text-muted-foreground">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-4 text-center bg-primary/[0.06] rounded-t-none">
                  <span className="inline-block text-sm font-bold text-primary">Strive</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.04 }}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-muted/30" : "bg-background"}`}
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">{row.label}</td>
                  <td className="px-4 py-3.5 text-center"><Cell value={row.diy} /></td>
                  <td className="px-4 py-3.5 text-center"><Cell value={row.freelancer} /></td>
                  <td className="px-4 py-3.5 text-center"><Cell value={row.agency} /></td>
                  <td className={`px-4 py-3.5 text-center bg-primary/[0.06] ${i === rows.length - 1 ? "rounded-br-2xl" : ""}`}>
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
