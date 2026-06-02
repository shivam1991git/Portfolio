"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollEnergyLine() {
  const { scrollYProgress } = useScroll();

  // Energy progress
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Dot movement
  const offsetDistance = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );
  const linePath = "M28 0 L28 1000";

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-dvh w-14 overflow-visible">

      <svg
        className="w-full h-full"
        viewBox="0 0 56 1000"
        preserveAspectRatio="none"
      >

        {/* ================= RIGHT SIDE ENERGY LINE ================= */}

        {/* Base Wire */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="rgba(59,130,246,0.18)"
          strokeWidth="2"
        />

        {/* Glow Layer */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="12"
          opacity={0.12}
          strokeLinecap="round"
          style={{ pathLength }}
        />

        {/* Animated Energy Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#energyGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ pathLength }}
        />

        {/* Moving Energy Core */}
        <motion.circle
          r="7"
          fill="#60a5fa"
          style={{
            offsetPath: `path('${linePath}')`,
            offsetDistance,
          }}
          className="drop-shadow-[0_0_12px_rgba(96,165,250,0.9)]"
        />

        {/* Outer Glow */}
        <motion.circle
          r="18"
          fill="rgba(96,165,250,0.18)"
          style={{
            offsetPath: `path('${linePath}')`,
            offsetDistance,
          }}
        />


        {/* Gradient */}
        <defs>
          <linearGradient
            id="energyGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

      </svg>
    </div>
  );
}
