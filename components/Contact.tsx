"use client";

import { ArrowUpRight, Check, Copy, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, socials } from "../lib/content";
import { SocialIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { container, Serif } from "./ui/Section";

const rows = [
  ...socials.map((s) => ({
    key: s.key,
    label: s.label,
    value: s.handle,
    href: s.href,
    icon: <SocialIcon name={s.key} size={18} />,
    external: true,
  })),
  {
    key: "phone",
    label: "Phone",
    value: profile.phone.display,
    href: profile.phone.href,
    icon: <Phone size={18} aria-hidden="true" />,
    external: false,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]"
      />

      <div className={container}>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
            <span className="text-accent">08</span>
            <span className="mx-2 text-line-strong">/</span>
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-6 max-w-4xl text-balance text-[clamp(2.75rem,8vw,6.25rem)] font-medium leading-[0.98] tracking-[-0.045em]"
          >
            Let&apos;s build something <Serif>worth shipping.</Serif>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted">
            Have a project in mind or want to discuss opportunities? I&apos;m always open to new projects, creative
            ideas, or being part of your team&apos;s vision — I&apos;d love to hear from you.
          </p>
        </Reveal>

        {/* ===== Email ===== */}
        <Reveal delay={0.1} className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex min-w-0 items-center gap-3 text-[clamp(1.25rem,4vw,2.25rem)] font-medium tracking-tight"
          >
            <span className="truncate border-b border-line-strong pb-1 transition-colors duration-300 group-hover:border-accent">
              {profile.email}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-[0.8em] w-[0.8em] shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-muted transition-colors hover:text-fg"
          >
            {copied ? <Check size={15} className="text-accent" aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
            <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
          </button>
        </Reveal>

        {/* ===== Channels ===== */}
        <Reveal delay={0.15} className="mt-16">
          <ul className="border-t border-line">
            {rows.map((row) => (
              <li key={row.key} className="border-b border-line">
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 py-5 transition-[padding] duration-300 sm:gap-6 sm:hover:pl-3"
                >
                  <span className="text-subtle transition-colors group-hover:text-accent">{row.icon}</span>
                  <span className="w-24 text-base font-medium sm:w-40 sm:text-lg">{row.label}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted sm:text-sm">{row.value}</span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
