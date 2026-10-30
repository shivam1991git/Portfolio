"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar across the top of the viewport showing reading progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
