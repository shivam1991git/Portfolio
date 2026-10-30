"use client";

import { motion } from "framer-motion";
import { ease, fadeUp, inView, stagger } from "../../lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Fades and lifts its content once it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={{
        hidden: fadeUp.hidden,
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers the reveal of its direct `RevealItem` children. */
export function RevealGroup({ children, className }: Omit<RevealProps, "delay">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: Omit<RevealProps, "delay">) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
