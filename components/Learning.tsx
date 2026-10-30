import { Check, Cloud, Database, Network, Sparkles } from "lucide-react";
import { learning, type LearningStatus } from "../lib/content";
import { Tag } from "./ui/Icons";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { Section, Serif } from "./ui/Section";
import { SpotlightCard } from "./ui/SpotlightCard";

const icons = [Network, Database, Cloud, Sparkles];

function StatusPill({ status }: { status: LearningStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
      {status === "In progress" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />}
      {status === "Completed" && <Check size={12} className="text-accent" aria-hidden="true" />}
      {status === "Self-taught" && <span className="h-1.5 w-1.5 rounded-full bg-muted" aria-hidden="true" />}
      {status}
    </span>
  );
}

export default function Learning() {
  return (
    <Section
      id="learning"
      index="06"
      label="Learning"
      title={
        <>
          Always <Serif>learning.</Serif>
        </>
      }
      intro="What I'm studying beyond my day-to-day work — finished courses, self-taught skills and what's in progress right now."
    >
      <RevealGroup className="grid gap-4 md:grid-cols-2">
        {learning.map((item, i) => {
          const Icon = icons[i];
          return (
            <RevealItem key={item.title}>
              <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-ink-800/60 text-accent">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <StatusPill status={item.status} />
                </div>
                <h3 className="mt-8 text-2xl font-medium tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 flex-1 text-pretty text-[15px] leading-7 text-muted">{item.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${item.title} topics`}>
                  {item.topics.map((topic) => (
                    <li key={topic}>
                      <Tag>{topic}</Tag>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
