import { Reveal } from "./Reveal";

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Page section with the shared numbered, left-aligned heading. */
export function Section({ id, index, label, title, intro, children, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-24 sm:py-32 ${className}`}>
      <div className={container}>
        <Reveal className="mb-14 grid gap-6 sm:mb-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              <span className="text-accent">{index}</span>
              <span className="mx-2 text-line-strong">/</span>
              {label}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-5 text-balance text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              {title}
            </h2>
          </div>
          {intro && (
            <p className="max-w-md text-pretty text-base leading-7 text-muted lg:col-span-5 lg:justify-self-end">
              {intro}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** Editorial italic accent used inside headings. */
export function Serif({ children }: { children: React.ReactNode }) {
  return <em className="font-serif font-normal italic tracking-[-0.01em]">{children}</em>;
}
