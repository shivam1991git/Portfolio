"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { profile, sections } from "../lib/content";
import { ease } from "../lib/motion";
import CommandPalette from "./CommandPalette";

const SECTION_IDS = sections.map((s) => s.id);
const NAV_LINKS = sections.filter((s) => s.id !== "home");
const noopSubscribe = () => () => {};

/** Tracks which section occupies most of the viewport below the nav. */
function useActiveSection() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
          (el): el is HTMLElement => Boolean(el)
        );
        if (!els.length) return;

        const scroller = document.scrollingElement ?? document.documentElement;
        const viewportTop = 88;
        const viewportBottom = window.innerHeight;

        if (scroller.scrollTop <= 8) return setActive("home");
        if (scroller.scrollTop + window.innerHeight >= scroller.scrollHeight - 8) {
          return setActive(SECTION_IDS[SECTION_IDS.length - 1]);
        }

        let next = els[0].id;
        let largest = 0;

        els.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const visible = Math.max(0, Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, viewportTop));
          if (visible > largest) {
            largest = visible;
            next = el.id;
          }
        });

        setActive((current) => (current === next ? current : next));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return [active, setActive] as const;
}

export default function Navbar() {
  const [active, setActive] = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isMac = useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => true
  );
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setPaletteOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mobile menu: lock page scroll, close on Escape, manage focus
  useEffect(() => {
    if (!menuOpen) return;

    const toggle = toggleRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [menuOpen]);

  const closeMenu = (id?: string) => {
    if (id) setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60]">
        {/* ===== Mobile menu overlay ===== */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 flex flex-col bg-ink-950/95 px-5 pb-8 pt-28 backdrop-blur-xl sm:px-8 xl:hidden"
            >
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-line border-y border-line">
                  {NAV_LINKS.map(({ id, label }, index) => (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.04 * index }}
                    >
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={`#${id}`}
                        onClick={() => closeMenu(id)}
                        aria-current={active === id ? "true" : undefined}
                        className="flex items-baseline gap-4 py-4 text-3xl font-medium tracking-tight"
                      >
                        <span className="font-mono text-xs text-subtle">0{index + 1}</span>
                        <span className={active === id ? "text-accent" : "text-fg"}>{label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
                <a
                  href={profile.resume}
                  download
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent text-sm font-medium text-ink-950 min-[400px]:flex-1"
                >
                  Download résumé
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong text-sm font-medium min-[400px]:flex-1"
                >
                  Email me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Bar ===== */}
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4 sm:px-8">
          <a
            href="#home"
            onClick={() => closeMenu("home")}
            className="flex h-11 items-center gap-3 rounded-full border border-line bg-ink-900/70 pl-1.5 pr-4 backdrop-blur-xl"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fg text-[13px] font-bold tracking-tighter text-ink-950">
              <span>
                S<span className="text-accent">S</span>
              </span>
            </span>
            <span className="whitespace-nowrap text-sm font-medium tracking-tight">{profile.name}</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center rounded-full border border-line bg-ink-900/70 p-1 backdrop-blur-xl xl:flex"
          >
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setActive(id)}
                aria-current={active === id ? "true" : undefined}
                className={`relative whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition-colors ${
                  active === id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command menu"
              className="hidden h-11 items-center gap-2 rounded-full border border-line bg-ink-900/70 px-4 text-[13px] text-muted backdrop-blur-xl transition-colors hover:text-fg md:inline-flex"
            >
              <Command size={14} aria-hidden="true" />
              <kbd className="whitespace-nowrap font-mono text-[11px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>

            <a
              href={profile.resume}
              download
              className="hidden h-11 items-center gap-1.5 rounded-full bg-fg px-4 text-[13px] font-medium text-ink-950 transition-colors hover:bg-accent sm:inline-flex"
            >
              Résumé
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>

            <button
              ref={toggleRef}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-ink-900/70 backdrop-blur-xl xl:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
