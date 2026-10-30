"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { TimelineEntry } from "../../lib/content";
import { ease } from "../../lib/motion";
import { Tag } from "./Icons";
import { Reveal } from "./Reveal";

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();

  return (
    <li className="relative pb-16 pl-10 last:pb-0 sm:pl-14">
      {/* Node on the line */}
      <span aria-hidden="true" className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center">
        {entry.current ? (
          <span className="h-[11px] w-[11px] animate-pulse-dot rounded-full bg-accent" />
        ) : (
          <span className="h-[11px] w-[11px] rounded-full border-2 border-line-strong bg-ink-950" />
        )}
      </span>

      <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        {/* ===== Meta ===== */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-[13px] text-fg">{entry.duration}</p>
            <p className="mt-1.5 text-sm text-muted">
              {entry.org}
              {entry.location && <span className="text-subtle"> · {entry.location}</span>}
            </p>
            {entry.current && (
              <span className="mt-3 inline-flex rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Current
              </span>
            )}
          </div>
        </div>

        {/* ===== Body ===== */}
        <div className="lg:col-span-8">
          <h3 className="text-balance text-2xl font-medium tracking-[-0.025em] sm:text-3xl">{entry.title}</h3>

          {(entry.badges || entry.stack) && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.badges?.map((b) => (
                <li
                  key={b}
                  className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-fg"
                >
                  {b}
                </li>
              ))}
              {entry.stack?.map((s) => (
                <li key={s}>
                  <Tag>{s}</Tag>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{entry.highlightsLabel}</p>
          <ul className="mt-3 space-y-2.5">
            {entry.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[15px] leading-7 text-fg/90">
                <ArrowRight size={15} className="mt-[6px] shrink-0 text-accent" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={detailsId}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <Plus
              size={15}
              aria-hidden="true"
              className={`transition-transform duration-300 ${open ? "rotate-45 text-accent" : ""}`}
            />
            {open ? `Hide ${entry.detailsLabel.toLowerCase()}` : `${entry.detailsLabel} (${entry.details.length})`}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={detailsId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="overflow-hidden"
              >
                <ul className="mt-2 space-y-2.5 border-l border-line pl-5">
                  {entry.details.map((d) => (
                    <li key={d} className="text-sm leading-6 text-muted">
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </li>
  );
}

/** Vertical timeline whose accent line draws itself as you scroll through it. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
        style={{ scaleY }}
      />
      {entries.map((entry) => (
        <TimelineItem key={entry.title} entry={entry} />
      ))}
    </ol>
  );
}
