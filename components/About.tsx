import Image from "next/image";
import { Code2, Database, Rocket, Server } from "lucide-react";
import { about, profile } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { Section, Serif } from "./ui/Section";

const focusIcons = [Code2, Server, Database, Rocket];

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      title={
        <>
          Engineer by training, <Serif>builder</Serif> by habit.
        </>
      }
      intro={about.lead}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ===== Portrait ===== */}
        <Reveal className="lg:col-span-5">
          <figure className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-900">
              <Image
                src={profile.portrait}
                alt={`Portrait of ${profile.name}`}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 70vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/80 to-transparent" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              <span>{profile.name}</span>
              <span>{profile.role}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ===== Story ===== */}
        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            {about.paragraphs.map((text, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-pretty text-xl leading-relaxed tracking-tight text-fg sm:text-2xl"
                    : "mt-5 text-pretty text-base leading-7 text-muted"
                }
              >
                {text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid border-t border-line sm:grid-cols-2">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{fact.label}</dt>
                  <dd className="mt-2 text-[15px] text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {about.focus.map((item, i) => {
              const Icon = focusIcons[i];
              return (
                <div key={item.title} className="bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900">
                  <Icon size={20} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{item.text}</p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
