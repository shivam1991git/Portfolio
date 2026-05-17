"use client";

import { useEffect, useState, useMemo } from "react";
import { Sun } from "lucide-react";

const SECTIONS = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
];

export default function Navbar() {
  const [active, setActive] = useState("home");

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
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {"<Shivaay/>"}
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-4">

          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`px-4 py-2 rounded-lg transition capitalize ${
                active === id
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-gray-300 hover:text-blue-400"
              }`}
            >
              {label}
            </a>
          ))}

          <Sun size={18} className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}