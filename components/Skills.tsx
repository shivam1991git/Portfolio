"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import { memo } from "react";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-5">

      {/* ===== Title ===== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold">
          Tech{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Stack
          </span>
        </h2>

        <p className="text-gray-400 mt-4">
          Technologies I work with to build modern, scalable applications
        </p>
      </motion.div>

      {/* ===== Cards Grid ===== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-4 gap-8"
      >

        {/* Frontend */}
        <SkillCard
          title="Frontend"
          color="blue"
          items={[
            "React",
            "Next.js",
            "TypeScript",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "MUI"
          ]}
        />

        {/* Backend */}
        <SkillCard
          title="Backend"
          color="green"
          items={[
            "Node.js",
            "Express",
            "NestJS",
            "REST APIs",
          ]}
        />

        {/* Database */}
        <SkillCard
          title="Database"
          color="purple"
          items={[
            "MongoDB",
            "MySQL",
          ]}
        />

        {/* Tools */}
        <SkillCard
          title="Tools & Others"
          color="orange"
          items={[
            "Git",
            "GitHub",
            "Postman",
            "VS Code",
          ]}
        />

      </motion.div>
    </section>
  );
}

/* ===== Skill Card Component ===== */

type SkillColor = "blue" | "green" | "purple" | "orange";

const SkillCard = memo(function SkillCardComponent({ title, items, color }: { title: string; items: string[]; color: SkillColor }) {
  const colors: Record<SkillColor, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    green: "bg-green-500/10 text-green-400 border-green-500/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  };
  const highlightedSkills = ["Next.js", "NestJS", "MUI",];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 200 }}
      className="glass p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300"
    >
      {/* Card Title */}
      <h3 className="text-xl font-semibold text-blue-400 mb-4">
        {title}
      </h3>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-2">
        {items.map((item: string) => {
          const isHighlighted = highlightedSkills.includes(item);

          return (
            <span
              key={item}
              className={`px-3 py-1 rounded-full text-sm border transition-all duration-300 cursor-default
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