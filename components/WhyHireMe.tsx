import { Code2, Lightbulb, Target, TrendingUp, Users, Zap } from "lucide-react";
import { principles } from "../lib/content";
import { Reveal } from "./ui/Reveal";
import { Section, Serif } from "./ui/Section";

const icons = [Lightbulb, Code2, Zap, Target, Users, TrendingUp];

export default function WhyHireMe() {
  return (
    <Section
      id="why"
      index="07"
      label="Why hire me"
      title={
        <>
          What I bring <Serif>to the team.</Serif>
        </>
      }
      intro="The principles that guide how I work as a developer and as a team member."
    >
      <Reveal className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p, i) => {
          const Icon = icons[i];
          return (
            <div
              key={p.title}
              className="group bg-ink-950 p-7 transition-colors duration-300 hover:bg-ink-900 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-subtle transition-colors duration-300 group-hover:text-accent">
                  0{i + 1}
                </span>
                <Icon size={18} className="text-subtle transition-colors duration-300 group-hover:text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-xl font-medium tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{p.text}</p>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
