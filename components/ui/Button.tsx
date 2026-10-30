"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  magnetic?: boolean;
  download?: boolean;
  external?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-accent text-ink-950 hover:bg-accent-strong",
  secondary: "border border-line-strong text-fg hover:border-white/30 hover:bg-white/[0.04]",
};

/** Pill link-button. `magnetic` makes it lean toward a nearby mouse cursor. */
export function Button({
  href,
  children,
  variant = "primary",
  magnetic = false,
  download,
  external,
  className = "",
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onPointerMove = (event: React.PointerEvent) => {
    if (!magnetic || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
