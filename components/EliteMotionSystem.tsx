"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export default function EliteMotionSystem() {
  // ===============================
  // HOOKS — MUST BE TOP LEVEL
  // ===============================

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  // ⭐ IMPORTANT — create transforms HERE
  const parallaxY = useTransform(progress, [0, 1], [0, -200]);

  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    // Throttle mouse tracking to 60fps (16ms)
    let lastTime = 0;
    const move = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime >= 16) {
        setMouse({ x: e.clientX, y: e.clientY });
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Prevent SSR mismatch
  if (!mounted) return null;

  // ===============================
  // RENDER
  // ===============================

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* PARALLAX BACKGROUND */}
      <motion.div
        style={{ y: parallaxY }}
        // className="absolute w-full h-full bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent"
      />

      {/* MOUSE GLOW */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] bg-blue-500/20"
        style={{
          transform: `translate(${mouse.x - 200}px, ${mouse.y - 200}px)`,
        }}
      />

      {/* PARTICLES */}
      {mounted && <ParticleField />}

      {/* ENERGY WIRES removed to avoid duplicate scroll line — use ScrollEnergyLine component instead */}
    </div>
  );
}

//////////////////////////////////////////////////////////////
// ENERGY WIRE COMPONENT
//////////////////////////////////////////////////////////////

const EnergyWire = motion(function EnergyWireComponent({ d, pathLength, color }: { d: string; pathLength: MotionValue<number>; color: string; }) {
  const offsetDistance = useTransform(pathLength as MotionValue<number>, [0, 1], ["0%", "100%"]);

  return (
    <>
      <path d={d} fill="none" stroke={`${color}33`} strokeWidth="2" />

      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="4"
        style={{ pathLength }}
      />

      <motion.circle
        r="8"
        fill={color}
        style={{
          offsetPath: `path('${d}')`,
          offsetDistance,
        }}
      />
    </>
  );
});

//////////////////////////////////////////////////////////////
// PARTICLES — CLIENT SAFE
//////////////////////////////////////////////////////////////

const ParticleField = motion(function ParticleFieldComponent() {
  const [particles, setParticles] = useState<
    { left: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const data = Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 5,
    }));

    setParticles(data);
  }, []);

  return (
    <div className="absolute inset-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -200], opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
          }}
        />
      ))}
    </div>
  );
});