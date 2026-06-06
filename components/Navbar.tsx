"use client";

import { useEffect, useState, useMemo } from "react";
import { Menu, X } from "lucide-react";

const SECTIONS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "why",
  "contact",
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const sections = SECTIONS.map((id) => document.getElementById(id)).filter(
          (section): section is HTMLElement => Boolean(section)
        );

        if (!sections.length) return;

        const navHeight =
          document.querySelector("nav")?.getBoundingClientRect().height ?? 0;
        const viewportTop = navHeight;
        const viewportBottom = window.innerHeight;
        const scrollElement = document.scrollingElement ?? document.documentElement;

        if (scrollElement.scrollTop <= 8) {
          setActive("home");
          return;
        }

        if (
          scrollElement.scrollTop + window.innerHeight >=
          scrollElement.scrollHeight - 8
        ) {
          setActive(SECTIONS[SECTIONS.length - 1]);
          return;
        }

        let nextActive = sections[0].id;
        let largestVisibleArea = 0;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const visibleTop = Math.max(rect.top, viewportTop);
          const visibleBottom = Math.min(rect.bottom, viewportBottom);
          const visibleArea = Math.max(0, visibleBottom - visibleTop);

          if (visibleArea > largestVisibleArea) {
            largestVisibleArea = visibleArea;
            nextActive = section.id;
          } else if (visibleArea === largestVisibleArea && visibleArea > 0) {
            const currentTopDistance = Math.abs(rect.top - viewportTop);
            const activeSection = document.getElementById(nextActive);
            const activeTopDistance = activeSection
              ? Math.abs(activeSection.getBoundingClientRect().top - viewportTop)
              : Number.POSITIVE_INFINITY;

            if (currentTopDistance < activeTopDistance) {
              nextActive = section.id;
            }
          }
        });

        if (!largestVisibleArea) {
          sections.forEach((section) => {
            const distance = Math.abs(
              section.getBoundingClientRect().top - viewportTop
            );
            const activeSection = document.getElementById(nextActive);
            const activeDistance = activeSection
              ? Math.abs(activeSection.getBoundingClientRect().top - viewportTop)
              : Number.POSITIVE_INFINITY;

            if (distance < activeDistance) {
              nextActive = section.id;
            }
          });
        }

        setActive((current) => (current === nextActive ? current : nextActive));
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("load", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);
    document.addEventListener("scroll", updateActiveSection, {
      capture: true,
      passive: true,
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("load", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
      document.removeEventListener("scroll", updateActiveSection, {
        capture: true,
      });
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const navItems = useMemo(
    () =>
      SECTIONS.map((id) => {
        let label = id.charAt(0).toUpperCase() + id.slice(1);
        if (id === "home") label = "Home";
        if (id === "why") label = "Why Hire Me";
        return { id, label };
      }),
    []
  );

  return (
    <nav className="fixed inset-x-0 top-0 z-[60] border-b border-white/5 bg-slate-950/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">

        {/* Logo */}
        <a href="#home" className="text-lg font-bold sm:text-xl" onClick={() => setOpen(false)}>
          <span className="text-white">TECH</span>
          <span className="text-sky-400 font-extrabold">TALK</span>
        </a>

        {/* Links */}
        <div className="hidden items-center gap-2 lg:flex">

          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setActive(id)}
              className={`rounded-lg px-3 py-2 text-sm transition capitalize xl:px-4 ${active === id
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-gray-300 hover:text-blue-400"
                }`}
            >
              {label}
            </a>
          ))}

          {/* <button
            type="button"
            aria-label="Theme preference"
            className="grid h-10 w-10 place-items-center rounded-lg text-gray-300 transition hover:bg-white/5 hover:text-blue-400"
          >
            <Sun size={18} />
          </button> */}
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`absolute right-0 top-full lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}
      >
        <div className="mr-4 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl sm:mr-6">
          <div className="grid gap-1">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => {
                  setActive(id);
                  setOpen(false);
                }}
                className={`rounded-lg px-4 py-3 text-sm transition capitalize ${active === id
                    ? "bg-blue-600/20 text-blue-300"
                    : "text-gray-300 hover:bg-white/5 hover:text-blue-300"
                  }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
