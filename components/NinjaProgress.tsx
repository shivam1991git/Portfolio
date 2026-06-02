"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { memo, useEffect, useState } from "react";

type Checkpoint = {
  id: string;
  label: string;
  progress: number;
};

const checkpointMeta = [
  { id: "home", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "why", label: "Why" },
  { id: "contact", label: "Contact" },
];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function useCheckpoints() {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(() =>
    checkpointMeta.map((item) => ({ ...item, progress: 0 }))
  );

  useEffect(() => {
    let frame = 0;

    const updateCheckpoints = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight || 1;

        setCheckpoints(
          checkpointMeta.map((item, index) => {
            const section = document.getElementById(item.id);

            if (!section) {
              // fallback to even spacing if section not found
              return { ...item, progress: clamp(index / (checkpointMeta.length - 1)) };
            }

            const top = section.offsetTop ?? 0;
            const height = section.offsetHeight ?? 0;

            // Use section center to better align the checkpoint with the visible area
            const center = top + height / 2;

            return { ...item, progress: clamp(center / maxScroll) };
          })
        );
      });
    };

    updateCheckpoints();
    window.addEventListener("resize", updateCheckpoints);
    window.addEventListener("load", updateCheckpoints);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateCheckpoints);
      window.removeEventListener("load", updateCheckpoints);
    };
  }, []);

  return checkpoints;
}

function useFooterSafeHeight() {
  const [footerOverlap, setFooterOverlap] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateFooterOverlap = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const footer = document.getElementById("site-footer");

        if (!footer) {
          setFooterOverlap(0);
          return;
        }

        const footerTop = footer.getBoundingClientRect().top;
        const overlap = clamp(window.innerHeight - footerTop, 0, window.innerHeight);

        setFooterOverlap((current) =>
          Math.abs(current - overlap) < 1 ? current : overlap
        );
      });
    };

    updateFooterOverlap();
    window.addEventListener("scroll", updateFooterOverlap, { passive: true });
    window.addEventListener("resize", updateFooterOverlap);
    window.addEventListener("load", updateFooterOverlap);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFooterOverlap);
      window.removeEventListener("resize", updateFooterOverlap);
      window.removeEventListener("load", updateFooterOverlap);
    };
  }, []);

  return footerOverlap;
}

function NinjaProgress() {
  const checkpoints = useCheckpoints();
  const footerOverlap = useFooterSafeHeight();
  const { scrollYProgress } = useScroll();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.35,
  });
  const velocity = useVelocity(scrollYProgress);
  const y = useTransform(springProgress, [0, 1], ["5%", "86%"]);
  const pathLength = useTransform(springProgress, [0, 1], [0, 1]);
  const speedGlow = useTransform(velocity, [-2, 0, 2], [0.45, 0.16, 0.45]);
  const [isMoving, setIsMoving] = useState(false);
  const [finished, setFinished] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(springProgress, "change", (latest) => {
    let nextActiveIndex = 0;

    checkpoints.forEach((checkpoint, checkpointIndex) => {
      if (latest >= checkpoint.progress - 0.018) nextActiveIndex = checkpointIndex;
    });

    setActiveIndex((current) =>
      current === nextActiveIndex ? current : nextActiveIndex
    );
    setFinished((current) => {
      const nextFinished = latest > 0.985;
      return current === nextFinished ? current : nextFinished;
    });
  });

  useMotionValueEvent(velocity, "change", (latest) => {
    const moving = Math.abs(latest) > 0.035;
    setIsMoving((current) => (current === moving ? current : moving));
  });

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-dvh w-14 overflow-visible sm:w-16 md:w-20"
    >
      <div className="relative h-full w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 80 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ninjaTrackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="45%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="trackGlow" x="-80%" y="-10%" width="260%" height="120%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M40 46 L40 922"
            fill="none"
            stroke="rgba(148,163,184,0.18)"
            strokeDasharray="12 14"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M40 46 L40 922"
            fill="none"
            stroke="rgba(15,23,42,0.9)"
            strokeLinecap="round"
            strokeWidth="14"
          />
          <motion.path
            d="M40 46 L40 922"
            fill="none"
            filter="url(#trackGlow)"
            stroke="url(#ninjaTrackGradient)"
            strokeLinecap="round"
            strokeWidth="4"
            style={{ pathLength }}
          />
        </svg>

        <div className="absolute inset-y-[5%] left-1/2 w-8 -translate-x-1/2">
          {checkpoints.map((checkpoint, index) => {
            const completed = index <= activeIndex;
            const active = activeIndex === index;

            return (
              <motion.div
                key={checkpoint.id}
                className="absolute left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center"
                style={{ top: `${5 + checkpoint.progress * 81}%` }}
                animate={{
                  scale: active ? 1.18 : 1,
                  opacity: completed ? 1 : 0.58,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
              >
                <span
                  className={[
                    "h-1.5 w-1.5 rotate-45 border",
                    completed
                      ? "border-cyan-200 bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]"
                      : "border-slate-400/50 bg-slate-800",
                  ].join(" ")}
                />
                <AnimatePresence>
                  {active && (
                    <motion.span
                      className="absolute h-6 w-6 rounded-full border border-cyan-300/40"
                      initial={{ scale: 0.2, opacity: 0.8 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="absolute left-1.5 h-12 w-12 sm:left-2 md:left-4"
          style={{
            top: y,
            filter: "drop-shadow(0 0 14px rgba(34,211,238,0.7))",
          }}
          animate={{
            x: isMoving ? [0, -1.5, 0] : 0,
            scale: isMoving ? 1 : [1, 1.035, 1],
          }}
          transition={{
            duration: isMoving ? 0.22 : 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <NinjaSvg moving={isMoving} />
          <motion.span
            className="absolute left-1 top-8 h-1.5 w-8 rounded-full bg-cyan-300/40 blur-sm"
            style={{ opacity: speedGlow }}
          />
          <Dust moving={isMoving} />
        </motion.div>

        <motion.div
          className="absolute bottom-[3.5%] left-3 h-9 w-10 sm:left-4 md:left-6"
          animate={{
            filter: finished
              ? "drop-shadow(0 0 18px rgba(168,85,247,0.95))"
              : "drop-shadow(0 0 8px rgba(96,165,250,0.45))",
          }}
        >
          <FinishLine active={finished} />
        </motion.div>

        <AnimatePresence>
          {finished && <Celebration />}
        </AnimatePresence>
      </div>
    </aside>
  );
}

function NinjaSvg({ moving }: { moving: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <motion.g
        animate={{ y: moving ? [0, -1.4, 0] : [0, -0.7, 0] }}
        transition={{ duration: moving ? 0.32 : 1.8, repeat: Infinity }}
      >
        <path
          d="M31 9c9 0 16 7 16 16v4c0 8-6 14-14 14h-3c-8 0-14-6-14-14v-4c0-9 6-16 15-16Z"
          fill="#111827"
          stroke="#38bdf8"
          strokeWidth="1.4"
        />
        <path d="M17 25h30v8H17z" fill="#020617" />
        <path d="M24 27h16c-2 4-5 6-8 6s-6-2-8-6Z" fill="#e0f2fe" />
        <circle cx="28" cy="29" r="1.4" fill="#0f172a" />
        <circle cx="36" cy="29" r="1.4" fill="#0f172a" />
        <path
          d="M43 18l9-7-2 13"
          fill="#111827"
          stroke="#a855f7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <motion.path
          d="M25 42 15 52"
          stroke="#38bdf8"
          strokeLinecap="round"
          strokeWidth="4"
          animate={{ d: moving ? ["M25 42 15 52", "M25 42 20 56", "M25 42 15 52"] : "M25 42 17 51" }}
          transition={{ duration: 0.34, repeat: Infinity }}
        />
        <motion.path
          d="M38 42 48 53"
          stroke="#a855f7"
          strokeLinecap="round"
          strokeWidth="4"
          animate={{ d: moving ? ["M38 42 48 53", "M38 42 43 57", "M38 42 48 53"] : "M38 42 46 51" }}
          transition={{ duration: 0.34, repeat: Infinity, delay: 0.17 }}
        />
        <motion.path
          d="M20 37 10 35"
          stroke="#94a3b8"
          strokeLinecap="round"
          strokeWidth="3.5"
          animate={{ rotate: moving ? [12, -18, 12] : [0, 4, 0] }}
          style={{ originX: "32px", originY: "38px" }}
          transition={{ duration: moving ? 0.34 : 1.8, repeat: Infinity }}
        />
        <motion.path
          d="M43 37 54 33"
          stroke="#94a3b8"
          strokeLinecap="round"
          strokeWidth="3.5"
          animate={{ rotate: moving ? [-12, 18, -12] : [0, -4, 0] }}
          style={{ originX: "32px", originY: "38px" }}
          transition={{ duration: moving ? 0.34 : 1.8, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  );
}

function Dust({ moving }: { moving: boolean }) {
  return (
    <div className="absolute left-1/2 top-10 h-6 w-6 -translate-x-1/2">
      {[0, 1, 2].map((item) => (
        <motion.span
          key={item}
          className="absolute h-1 w-1 rounded-full bg-cyan-200/70"
          initial={false}
          animate={
            moving
              ? {
                  x: [0, -10 - item * 3],
                  y: [0, 7 + item * 2],
                  opacity: [0, 0.75, 0],
                  scale: [0.5, 1, 0.2],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.58,
            repeat: Infinity,
            delay: item * 0.11,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function FinishLine({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path d="M14 10v45" stroke="#cbd5e1" strokeLinecap="round" strokeWidth="3" />
      <motion.path
        d="M16 11c10-5 18 7 30 2v25c-12 5-20-7-30-2Z"
        fill="rgba(15,23,42,0.92)"
        stroke={active ? "#f0abfc" : "#60a5fa"}
        strokeLinejoin="round"
        strokeWidth="2"
        animate={{ skewY: active ? [0, -5, 5, 0] : [0, -2, 2, 0] }}
        transition={{ duration: active ? 0.55 : 1.6, repeat: Infinity }}
      />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={18 + col * 8}
            y={15 + row * 5}
            width="8"
            height="5"
            fill={(row + col) % 2 === 0 ? "#e2e8f0" : "#111827"}
            opacity="0.9"
          />
        ))
      )}
    </svg>
  );
}

function Celebration() {
  return (
    <motion.div
      className="absolute bottom-[7%] left-2 h-20 w-20 sm:left-3 md:left-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.85, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
    >
      {[...Array(12)].map((_, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-[2px]"
          style={{
            backgroundColor: index % 3 === 0 ? "#22d3ee" : index % 3 === 1 ? "#a855f7" : "#f8fafc",
          }}
          animate={{
            x: Math.cos(index) * (24 + (index % 4) * 7),
            y: Math.sin(index) * (24 + (index % 5) * 6),
            rotate: 180 + index * 18,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
}

export default memo(NinjaProgress);
