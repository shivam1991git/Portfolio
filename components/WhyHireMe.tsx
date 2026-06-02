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
    <section id="why" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8 pr-14 sm:px-6 sm:pr-16 md:pr-20 lg:pr-6">

      {/* Title */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-center sm:mb-16"
      >
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Why{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Hire Me?
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          What sets me apart as a developer and team member
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3"
      >

        <ValueCard
          icon={<Lightbulb />}
          title="Problem Solver"
          text="I enjoy solving real-world challenges by analyzing requirements, identifying root causes, and building practical, scalable solutions."
        />

        <ValueCard
          icon={<Code2 />}
          title="Quality-Focused Development"
          text="I write clean, maintainable, and reusable code while following industry best practices, ensuring long-term scalability and reliability."
        />

        <ValueCard
          icon={<Zap />}
          title="Continuous Learner"
          text="I actively explore new technologies and quickly adapt to modern tools, frameworks, and development practices to stay current."
        />

        <ValueCard
          icon={<Target />}
          title="Ownership & Accountability"
          text="From planning and development to deployment and maintenance, I take responsibility for delivering reliable and production-ready solutions."
        />

        <ValueCard
          icon={<Users />}
          title="Collaborative Team Player"
          text="I work effectively with developers, QA engineers, designers, and stakeholders to deliver high-quality products and meet business goals."
        />

        <ValueCard
          icon={<TrendingUp />}
          title="Business-Oriented Mindset"
          text="I focus on building solutions that improve user experience, optimize workflows, and create measurable business value."
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
      className="glass rounded-2xl border border-white/10 p-5 sm:p-8"
    >
      <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 w-fit mb-4">
        {icon}
      </div>

      <h3 className="mb-3 text-lg font-semibold text-blue-400 sm:text-xl">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
        {text}
      </p>
    </motion.div>
  );
}

const ValueCard = memo(ValueCardComponent);
