"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 50, suffix: "+", label: "Businesses launched" },
  { value: 2, suffix: " weeks", label: "Average delivery time" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

function Counter({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative py-14 overflow-hidden"
      aria-label="Key statistics"
    >
      {/* Gradient band */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, hsl(220 85% 35%) 0%, hsl(215 90% 45%) 50%, hsl(220 85% 35%) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Subtle diagonal line texture */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, hsl(0 0% 100%) 0, hsl(0 0% 100%) 1px, transparent 0, transparent 50%)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto section-padding">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center">
          {stats.map(({ value, suffix, label }, i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <dt className="text-white/60 text-sm font-medium uppercase tracking-wider order-2">
                {label}
              </dt>
              <dd
                className="font-heading font-extrabold text-5xl sm:text-6xl text-white order-1"
                aria-label={`${value}${suffix} ${label}`}
              >
                <Counter
                  target={value}
                  suffix={suffix}
                  active={inView}
                />
              </dd>
              {i < stats.length - 1 && (
                <div
                  className="hidden sm:block absolute"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
