"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        background: "hsl(var(--primary))",
      }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[60]"
      aria-hidden="true"
    />
  );
}
