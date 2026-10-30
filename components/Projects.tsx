"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Github, Lock } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { projects, type Project } from "../lib/content";
import { Tag } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { Section, Serif } from "./ui/Section";

/** Browser-window frame that tilts toward the cursor, with a parallax screenshot inside. */
function ProjectFrame({ project, priority }: { project: Project; priority: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const onPointerMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ry.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
    rx.set(-((event.clientY - rect.top) / rect.height - 0.5) * 6);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="[perspective:1400px]">
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className="group overflow-hidden rounded-2xl border border-line bg-ink-900 shadow-2xl shadow-black/40 transition-[border-color] duration-500 hover:border-line-strong"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="mx-auto truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-subtle">
            {project.frameLabel}
          </span>
          <span className="w-[42px]" aria-hidden="true" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
          <motion.div className="absolute inset-x-0 -inset-y-[6%]" style={{ y: imageY }}>
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              placeholder="blur"
              priority={priority}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const titleId = `project-${project.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="grid items-center gap-10 border-t border-line py-16 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-14 lg:py-24"
    >
      <Reveal className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <ProjectFrame project={project} priority={index === 0} />
      </Reveal>

      <Reveal delay={0.1} className="lg:col-span-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
          <span className="text-accent">0{index + 1}</span>
          <span className="mx-2 text-line-strong">/</span>
          {project.context}
        </p>
        <h3 id={titleId} className="mt-4 text-balance text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 text-pretty text-base leading-7 text-muted">{project.description}</p>

        <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-sm leading-6 text-fg/85">
              <Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-ink-950 transition-colors hover:bg-accent"
            >
              Live demo
              <ArrowUpRight size={15} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:bg-white/[0.04]"
            >
              <Github size={15} aria-hidden="true" />
              Source code
            </a>
          )}
          {project.note && (
            <p className="inline-flex items-center gap-2 text-sm text-subtle">
              <Lock size={14} aria-hidden="true" />
              {project.note}
            </p>
          )}
        </div>
      </Reveal>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      label="Selected work"
      title={
        <>
          Products, <Serif>built to ship.</Serif>
        </>
      }
      intro="Real-world applications — from the enterprise LMS I build at work to full-stack platforms designed and delivered end to end."
    >
      <div>
        {projects.map((project, i) => (
          <ProjectCase key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
