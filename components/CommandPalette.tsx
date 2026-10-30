"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, CornerDownLeft, Download, Hash, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile, sections, socials } from "../lib/content";
import { ease } from "../lib/motion";
import { SocialIcon } from "./ui/Icons";

type Item = {
  id: string;
  group: "Navigate" | "Actions" | "Elsewhere";
  label: string;
  icon: React.ReactNode;
  run: () => void | "keep-open";
};

type CommandPaletteProps = { open: boolean; onClose: () => void };

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  return <AnimatePresence>{open && <PaletteDialog onClose={onClose} />}</AnimatePresence>;
}

/** Mounted only while open, so every opening starts from a clean state. */
function PaletteDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        group: "Navigate" as const,
        label: s.label,
        icon: <Hash size={15} aria-hidden="true" />,
        run: () => {
          document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", `#${s.id}`);
        },
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        icon: <Copy size={15} aria-hidden="true" />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => {});
          setCopied(true);
          setTimeout(onClose, 900);
          return "keep-open";
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        icon: <Download size={15} aria-hidden="true" />,
        run: () => {
          const link = document.createElement("a");
          link.href = profile.resume;
          link.download = "";
          link.click();
        },
      },
      ...socials.map((s) => ({
        id: `social-${s.key}`,
        group: "Elsewhere" as const,
        label: `Open ${s.label}`,
        icon: <SocialIcon name={s.key} size={15} />,
        run: () => {
          window.open(s.href, "_blank", "noopener,noreferrer");
        },
      })),
    ],
    [onClose]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  // Lock page scroll and return focus to wherever it was when the palette closes
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  const runItem = (item: Item | undefined) => {
    if (!item) return;
    if (item.run() !== "keep-open") onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (filtered.length ? (c + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => (filtered.length ? (c - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      runItem(filtered[cursor]);
    } else if (event.key === "Tab") {
      // The input is the only tab stop; keep focus inside the dialog
      event.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.25, ease }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-2xl shadow-black/60"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={16} className="shrink-0 text-subtle" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            placeholder="Jump to a section or run an action…"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={filtered[cursor] ? `cmd-${filtered[cursor].id}` : undefined}
            aria-label="Search commands"
            className="h-14 w-full bg-transparent text-[15px] text-fg placeholder:text-subtle focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">ESC</kbd>
        </div>

        <ul id="command-list" role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-subtle">No results for “{query}”</li>
          )}
          {filtered.map((item, index) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            const selected = index === cursor;

            return (
              <li key={item.id} role="presentation">
                {showGroup && (
                  <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                    {item.group}
                  </p>
                )}
                <div
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setCursor(index)}
                  onClick={() => runItem(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    selected ? "bg-white/[0.06] text-fg" : "text-muted"
                  }`}
                >
                  <span className={selected ? "text-accent" : "text-subtle"}>{item.icon}</span>
                  <span className="flex-1">
                    {item.id === "copy-email" && copied ? "Copied to clipboard ✓" : item.label}
                  </span>
                  {selected &&
                    (item.group === "Navigate" ? (
                      <ArrowRight size={14} aria-hidden="true" />
                    ) : (
                      <CornerDownLeft size={14} aria-hidden="true" />
                    ))}
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
