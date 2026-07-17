"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Prototype } from "@/lib/prototypes";

export function PrototypeBadge({ proto, dark = true }: { proto: Prototype; dark?: boolean }) {
  return (
    <div className="fixed top-4 left-4 z-[60]">
      <Link
        href="/work"
        className="group inline-flex items-center gap-2 pl-2.5 pr-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95"
        style={{
          background: dark ? "rgba(10,10,10,0.7)" : "rgba(255,255,255,0.85)",
          color: dark ? "#fff" : "#0A0A0A",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(10,10,10,0.10)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: proto.accent }}
          aria-hidden="true"
        />
        Strive Prototype
      </Link>
    </div>
  );
}

export function PrototypeCtaBar({ proto }: { proto: Prototype }) {
  return (
    <div
      className="sticky bottom-0 z-[60] w-full"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="w-full section-padding py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-center sm:text-left" style={{ color: "rgba(255,255,255,0.65)" }}>
          <span className="font-semibold text-white">{proto.name}</span> is a Strive prototype — not a real
          business. Want something like this for yours?
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="hidden sm:inline-flex text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: `${proto.accent}22`, color: proto.accent }}
          >
            {proto.priceTier} · {proto.price}
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white active:scale-95 transition-transform duration-200"
            style={{ background: proto.accent }}
          >
            Get This Vibe
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
