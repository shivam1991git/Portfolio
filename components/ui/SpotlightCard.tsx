"use client";

import { useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

/** Hairline card with a soft accent light that follows the cursor. */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group/spot relative overflow-hidden rounded-2xl border border-line bg-ink-900/70 transition-colors duration-500 hover:border-line-strong ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgb(255 107 61 / 0.09), transparent 45%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
