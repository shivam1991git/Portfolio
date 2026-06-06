"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import { memo } from "react";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 pr-14 sm:px-6 sm:pr-16 md:pr-20 lg:pr-6">

      {/* ===== Title ===== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-center sm:mb-16"
      >
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Tech{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Stack
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Technologies I work with to build modern, scalable applications
        </p>
      </motion.div>

      {/* ===== Cards Grid ===== */}
      {/* ===== Cards Grid ===== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3"
      >

        {/* Frontend */}
        <SkillCard
          title="Frontend"
          color="blue"
          items={[
            "JavaScript",
            "React",
            "Next.js",
            "TypeScript",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "MUI",
            "Redux",

          ]}
        />

        {/* Backend */}
        <SkillCard
          title="Backend"
          color="green"
          items={[
            "Node.js",
            "Express.js",
            "NestJS",
            "REST APIs",
            "Redis",
          ]}
        />

        {/* Database */}
        <SkillCard
          title="Databases & Optimization"
          color="purple"
          items={[
            "MongoDB",
            "MySQL",
            "Indexing & Query Optimization",
            "Aggregation Pipelines",
          ]}
        />
        <SkillCard
          title="Languages"
          color="yellow"
          items={[
            "JavaScript",
            "Typescript",
            "Java",
          ]}
        />
        <SkillCard
          title="Auth & Security"
          color="red"
          items={[
            "JWT",
            "Bcrypt",
            "RBAC"
          ]}
        />

        {/* Tools */}
        <SkillCard
          title="Tools & Collaboration"
          color="orange"
          items={[
            "Git",
            "GitHub",
            "Bitbucket",
            "Postman",
            "VS Code",
            "Jira",
            "Agile / Scrum",
            "Excel / Word Integration",
            "JSON / CSV Parsing"
          ]}
        />

      </motion.div>
    </section>
  );
}

/* ===== Skill Card Component ===== */

type SkillColor = "blue" | "green" | "purple" | "orange" | "red" | "yellow";

const SkillCard = memo(function SkillCardComponent({ title, items, color }: { title: string; items: string[]; color: SkillColor }) {
  const colors: Record<SkillColor, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    green: "bg-green-500/10 text-green-400 border-green-500/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    red: "bg-red-500/10 text-red-400 border-red-500/30",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  };
  const highlightedSkills = ["Next.js", "NestJS", "MUI", "Redis"];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 200 }}
      className="glass rounded-2xl border border-white/10 p-5 transition-all hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] sm:p-6"
    >
      {/* Card Title */}
      <h3 className="mb-4 text-lg font-semibold text-blue-400 sm:text-xl">
        {title}
      </h3>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-2">
        {items.map((item: string) => {
          const isHighlighted = highlightedSkills.includes(item);

          return (
            <span
              key={item}
              className={`rounded-full border px-3 py-1 text-xs transition-all duration-300 sm:text-sm
              ${colors[color]}
              hover:scale-110 hover:shadow-md
              ${isHighlighted
                  ? "bg-blue-500/20 text-blue-300 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]"
                  : ""
                }
              `}
            >
              {item}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
});
