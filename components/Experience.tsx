import { experience } from "../lib/content";
import { Section, Serif } from "./ui/Section";
import { Timeline } from "./ui/Timeline";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      label="Experience"
      title={
        <>
          Where I&apos;ve <Serif>shipped.</Serif>
        </>
      }
      intro="A professional journey building real-world applications — from reusable React components to enterprise data pipelines."
    >
      <Timeline entries={experience} />
    </Section>
  );
}
