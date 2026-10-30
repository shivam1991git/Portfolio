import { education } from "../lib/content";
import { Section, Serif } from "./ui/Section";
import { Timeline } from "./ui/Timeline";

export default function Education() {
  return (
    <Section
      id="education"
      index="05"
      label="Education"
      title={
        <>
          Foundations in <Serif>computer science.</Serif>
        </>
      }
      intro="Academic background and qualifications that shaped how I think about software, data and systems."
    >
      <Timeline entries={education} />
    </Section>
  );
}
