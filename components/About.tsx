"use client";

import { motion } from "framer-motion";
import { fadeLeft, fadeRight, fadeUp, stagger } from "../lib/motion";
import { Code2, Server, Database, Rocket } from "lucide-react";
import { memo } from "react";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-5">

      {/* Title */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold">
          About{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        <p className="text-gray-400 mt-4">
          Passionate about building impactful solutions that solve real-world problems
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT BIG CARD */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">
            My Journey
          </h3>

          <p className="text-gray-300 leading-relaxed">
            My journey into software development began with curiosity and
            evolved into a passion for creating solutions that make a difference.
            As an <span className="text-blue-400 font-medium">MCA graduate</span> with over a year
            of professional experience, I've transformed from an eager learner
            into a confident full stack developer.
          </p>

          <p className="text-gray-300 mt-4 leading-relaxed">
            Currently, I'm working on a comprehensive{" "}
            <span className="text-blue-400 font-medium">
              Learning Management System (LMS)
            </span>,
            where I handle both frontend and backend development.
          </p>

          <p className="text-gray-300 mt-4 leading-relaxed">
            I believe in writing clean, maintainable code that delivers value
            to users and stakeholders.
          </p>
        </motion.div>

        {/* RIGHT STACKED CARDS */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <InfoCard
            icon={<Code2 />}
            title="Frontend Excellence"
            text="Crafting responsive UIs with React, Next.js, and TypeScript"
          />

          <InfoCard
            icon={<Server />}
            title="Backend Mastery"
            text="Building scalable APIs with Node.js, Express, and NestJS"
          />

          <InfoCard
            icon={<Database />}
            title="Data Architecture"
            text="Designing efficient schemas with MongoDB and MySQL"
          />

          <InfoCard
            icon={<Rocket />}
            title="Full Stack Solutions"
            text="End-to-end development from concept to deployment"
          />
        </motion.div>
      </div>
    </section>
  );
}

function InfoCardComponent({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div
      variants={fadeRight}
      className="glass p-6 rounded-xl flex gap-4 items-start"
    >
      <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-gray-400 text-sm mt-1">{text}</p>
      </div>
    </motion.div>
  );
}

const InfoCard = memo(InfoCardComponent);