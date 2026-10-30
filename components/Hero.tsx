"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { profile, socials } from "../lib/content";
import { ease } from "../lib/motion";
import HeroVisual from "./HeroVisual";
import { Button } from "./ui/Button";
import { SocialIcon } from "./ui/Icons";
import { container, Serif } from "./ui/Section";

/** Each letter rises out of a mask — the h1 keeps the plain-text name for screen readers. */
function SplitWord({ word, delay, className = "" }: { word: string; delay: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`block overflow-hidden pb-[0.06em] ${className}`}>
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease, delay: delay + i * 0.04 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      {/* Blueprint grid and a single light source behind the stack */}
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-accent/[0.08] blur-[110px] lg:right-0 lg:h-[560px] lg:w-[560px]"
      />

      <div className={`${container} grid flex-1 items-center gap-14 pb-14 lg:grid-cols-12 lg:gap-6`}>
        {/* ===== Copy ===== */}
        <div className="min-w-0 lg:col-span-7">
          <motion.p
            {...fadeIn(0)}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-ink-900/70 py-1.5 pl-2.5 pr-4 text-[13px] text-muted backdrop-blur"
          >
            <span className="h-2 w-2 shrink-0 animate-pulse-dot rounded-full bg-green-400" />
            <span className="truncate">
              <span className="hidden sm:inline">Currently at </span>
              <span className="sm:hidden">At </span>
              <span className="text-fg">{profile.current.company}</span> — {profile.current.focus}
            </span>
          </motion.p>

          <h1
            id="home-title"
            aria-label={profile.name}
            className="mt-8 text-[clamp(3.6rem,15vw,8.75rem)] font-semibold leading-[0.9] tracking-[-0.055em]"
          >
            <SplitWord word={profile.firstName} delay={0.15} />
            <SplitWord word={`${profile.lastName}.`} delay={0.3} />
          </h1>

          <motion.p {...fadeIn(0.7)} className="mt-6 text-2xl tracking-tight text-muted sm:text-3xl">
            <Serif>
              <span className="text-fg">Full stack developer</span>
            </Serif>{" "}
            — from interface to index.
          </motion.p>

          <motion.p {...fadeIn(0.8)} className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...fadeIn(0.9)} className="mt-9 flex flex-col gap-3 min-[460px]:flex-row min-[460px]:items-center">
            <Button href="#projects" magnetic>
              View selected work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
            <Button href={profile.resume} variant="secondary" download magnetic>
              <Download size={16} aria-hidden="true" />
              Download résumé
            </Button>
          </motion.div>

          <motion.div {...fadeIn(1)} className="mt-9 flex items-center gap-5">
            <a
              href="#contact"
              className="text-sm text-muted underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-fg hover:decoration-accent"
            >
              Get in touch
            </a>
            <span className="h-4 w-px bg-line-strong" aria-hidden="true" />
            <ul className="flex items-center gap-1">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} profile`}
                    className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
                  >
                    <SocialIcon name={s.key} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ===== The Stack ===== */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.4 }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* ===== Bottom rail ===== */}
      <div className="border-t border-line">
        <div className={`${container} flex items-center justify-between gap-4 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle`}>
          <a href="#about" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            <ArrowDown size={13} aria-hidden="true" className="animate-bounce" />
            Scroll to explore
          </a>
          <span className="hidden md:inline">React · Next.js · NestJS · MongoDB</span>
          <span className="hidden sm:inline">Open to opportunities</span>
        </div>
      </div>
    </section>
  );
}
