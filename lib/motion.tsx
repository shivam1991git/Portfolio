import type { Variants } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/** Shared viewport settings so every reveal triggers at the same point. */
export const inView = { once: true, margin: "0px 0px -12% 0px" } as const;
