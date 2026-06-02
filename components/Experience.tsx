"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { fadeUp } from "../lib/motion";
import { Calendar, Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 pr-14 sm:px-6 sm:py-16 sm:pr-16 md:py-20 md:pr-20 lg:pr-6"
    >
      {/* ===== Title ===== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-center sm:mb-16"
      >
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Work{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
          Professional journey building real-world applications
        </p>
      </motion.div>

      {/* ===== Timeline ===== */}
      <div className="relative">

        {/* Vertical Line */}
        <div className="absolute bottom-0 left-3 top-0 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500 opacity-60 sm:left-4" />

        {/* CURRENT ROLE */}
        <TimelineItem
          title="Full Stack Developer"
          org="Hubblehox"
          location="On-site"
          duration="Jan 2025 - Present"
          responsibilities={[
            "Developing and maintaining enterprise Learning Management System (LMS) using React, Next.js, TypeScript, NestJS, and MongoDB",
            "Building scalable RESTful APIs and optimized database queries",
            "Implementing bulk data upload workflows with Excel parsing, validation, transformation, and database integration",
            "Developing document-processing pipelines including DOCX reading, ZIP extraction and JSON parsing",
            "Creating reusable and modular UI components to improve maintainability and development speed",
            "Implementing pagination, filtering, sorting, and search functionalities for large datasets",
            "Designing MongoDB aggregation pipelines and optimizing queries for improved performance",
            "Collaborating with product, QA, and development teams to deliver new features and enhancements",
            "Debugging production issues, improving application reliability, and optimizing frontend and backend performance",
          ]}
          achievements={[
            "Delivered LMS features supporting large-scale content and user management workflows",
            "Built automated bulk-upload systems reducing manual data entry efforts significantly",
            "Improved API and database performance through query optimization, indexing, and aggregation strategies",
            "Developed reusable component architecture that accelerated feature development across modules",
            "Successfully integrated document processing workflows for Excel, DOCX, JSON, and ZIP-based content ingestion",
          ]}
        />


        {/* BVG ROLE */}
        <TimelineItem
          title="Associate Web Developer"
          org="BVG India"
          location="On-site"
          duration="Sep 2024 - Jan 2025"
          responsibilities={[
            "Developed responsive web applications",
            "Built reusable React components",
            "Integrated backend APIs",
            "Optimized performance",
          ]}
          achievements={[
            "Delivered production-ready modules",
            "Improved website UX significantly",
          ]}
        />

      </div>
    </section>
  );
}

//////////////////////////////////////////////////////////////
// TIMELINE ITEM (DOT PERFECTLY ALIGNED)
//////////////////////////////////////////////////////////////

interface TimelineItemProps {
  title: string;
  org: string;
  location?: string;
  duration: string;
  responsibilities?: string[];
  achievements?: string[];
}

function TimelineItemComponent({ title, org, location, duration, responsibilities = [], achievements = [] }: TimelineItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mb-12">

      {/* DOT — always aligned */}
      <div className="absolute left-1 top-8 h-4 w-4 rounded-full bg-blue-500 shadow-lg sm:left-2" />

      {/* CARD */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass ml-9 rounded-2xl border border-white/10 p-5 sm:ml-16 sm:p-8"
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">

          <div>
            <h3 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-semibold leading-tight text-transparent sm:text-2xl">
              {title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-400 sm:text-base">
              <Briefcase size={16} />
              {org} • {location}
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm text-blue-400 sm:px-4 sm:text-base">
            <Calendar size={16} />
            {duration}
          </div>
        </div>

        {/* ===== COLLAPSED VIEW ===== */}
        <button
          onClick={() => setOpen(!open)}
          className="mt-6 min-h-11 text-left text-blue-400 transition hover:text-blue-300"
        >
          {open ? "Hide details ↑" : "Click for more details ↓"}
        </button>

        {/* ===== EXPANDABLE DETAILS ===== */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {/* Responsibilities */}
              <div className="mt-8">
                <h4 className="text-gray-300 font-semibold mb-4">
                  Responsibilities:
                </h4>

                <ul className="space-y-3 text-sm leading-6 text-gray-400 sm:text-base">
                  {responsibilities.map((r: string, i: number) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-blue-400">▸</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              {achievements?.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-gray-300 font-semibold mb-4">
                    Key Achievements:
                  </h4>

                  <ul className="space-y-3 text-sm leading-6 text-gray-400 sm:text-base">
                    {achievements.map((a: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-green-400">✔</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

const TimelineItem = memo(TimelineItemComponent);
