"use client";

import { useState } from "react";
import { skillGroups, usedIn, type Skill, type SkillGroup } from "../lib/content";
import { TechIcon } from "./ui/Icons";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Section, Serif } from "./ui/Section";
import { SpotlightCard } from "./ui/SpotlightCard";

const marqueeSkills = skillGroups.flatMap((g) => g.items).filter((s) => s.icon);
const rows = [marqueeSkills.slice(0, Math.ceil(marqueeSkills.length / 2)), marqueeSkills.slice(Math.ceil(marqueeSkills.length / 2))];

// Bento layout, in skillGroups order: wide Frontend, three small cards, two halves, full-width Tools
const spans = [
  "md:col-span-2 lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "md:col-span-2 lg:col-span-6",
];

/** Two counter-scrolling rows of technologies. Decorative — the grid below is the accessible list. */
function Marquee() {
  return (
    <div aria-hidden="true" className="mask-fade-x -mx-5 mb-16 space-y-3 overflow-hidden sm:-mx-8 sm:mb-20">
      {rows.map((row, r) => (
        <div
          key={r}
          className="flex w-max animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDirection: r === 1 ? "reverse" : "normal", ["--marquee-duration" as string]: `${50 + r * 8}s` }}
        >
          {[...row, ...row].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-4 px-6 text-4xl font-medium tracking-tight text-white/15 transition-colors duration-300 hover:text-fg sm:px-8 sm:text-6xl"
            >
              <TechIcon name={skill.icon!} className="h-[0.7em] w-[0.7em]" />
              {skill.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const [active, setActive] = useState<Skill | null>(null);
  const places = active && !active.note ? usedIn(active.name) : [];

  return (
    <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-medium tracking-tight">{group.title}</h3>
        <span className="font-mono text-[11px] text-subtle">0{index + 1}</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{group.blurb}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <li key={skill.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(skill)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(skill)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(skill)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors duration-200 ${
                active?.name === skill.name
                  ? "border-accent/60 bg-accent/10 text-fg"
                  : "border-line bg-ink-800/50 text-muted hover:text-fg"
              }`}
            >
              {skill.icon && (
                <TechIcon
                  name={skill.icon}
                  className={`h-4 w-4 transition-colors ${active?.name === skill.name ? "text-accent" : "text-subtle"}`}
                />
              )}
              {skill.name}
            </button>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="mt-auto min-h-6 pt-6 font-mono text-[11px] leading-5 text-subtle">
        {active ? (
          active.note ? (
            <>
              <span className="text-accent">{active.name}</span> → {active.note}
            </>
          ) : places.length ? (
            <>
              <span className="text-accent">{active.name}</span> → used in {places.join(" · ")}
            </>
          ) : (
            <>
              <span className="text-accent">{active.name}</span> → part of my everyday toolkit
            </>
          )
        ) : (
          "Hover or tap a skill to see where I've used it"
        )}
      </p>
    </SpotlightCard>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      label="Skills"
      title={
        <>
          A toolkit for the <Serif>entire</Serif> stack.
        </>
      }
      intro="Technologies I use to build modern, scalable applications — each one tied to real work, not a percentage bar."
    >
      <Marquee />

      <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, i) => (
          <RevealItem key={group.title} className={spans[i]}>
            <SkillCard group={group} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
