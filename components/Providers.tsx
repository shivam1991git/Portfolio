"use client";

import { MotionConfig } from "framer-motion";

/** Framer Motion honours the visitor's reduced-motion setting everywhere. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
