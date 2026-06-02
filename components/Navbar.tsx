"use client";

import { useEffect, useState, useMemo } from "react";
import { Menu, Sun, X } from "lucide-react";

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
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        {
          threshold: 0.6, // section visible %
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
    <nav className="fixed top-0 z-[60] w-full border-b border-white/5 bg-slate-950/55 backdrop-blur-xl">

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
        className={`lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-200`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:mx-6">
          <div className="grid gap-1">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
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
