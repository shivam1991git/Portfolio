"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";
import {
  Lightbulb,
  Code2,
  Zap,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";
import { memo } from "react";

export default function WhyHireMe() {
  return (
    <section id="why" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-5">

      {/* Title */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold">
          Why{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Hire Me?
          </span>
        </h2>

        <p className="text-gray-400 mt-4">
          What sets me apart as a developer and team member
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >

        <ValueCard
          icon={<Lightbulb />}
          title="Problem-Solving Mindset"
          text="I approach challenges analytically, breaking down complex problems into manageable solutions. Every bug is an opportunity to learn and improve."
        />

        <ValueCard
          icon={<Code2 />}
          title="Clean Code Advocate"
          text="Writing maintainable, well-documented code is non-negotiable. I follow best practices and design patterns to ensure quality and scalability."
        />

        <ValueCard
          icon={<Zap />}
          title="Fast Learner"
          text="Technology evolves rapidly, and so do I. I quickly adapt to new frameworks, tools, and methodologies."
        />

        <ValueCard
          icon={<Target />}
          title="Ownership Mentality"
          text="I take full responsibility for my work, from concept to deployment, ensuring production-ready results."
        />

        <ValueCard
          icon={<Users />}
          title="Team Collaboration"
          text="I thrive in collaborative environments, communicating effectively with designers, PMs, and developers."
        />

        <ValueCard
          icon={<TrendingUp />}
          title="Results-Driven"
          text="I focus on delivering tangible results that drive business value and solve real problems."
        />

      </motion.div>
    </section>
  );
}

/* ===== Card Component ===== */

function ValueCardComponent({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass p-8 rounded-2xl border border-white/10"
    >
      <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 w-fit mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-blue-400 mb-3">
        {title}
      </h3>

      <p className="text-gray-400 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}

const ValueCard = memo(ValueCardComponent);