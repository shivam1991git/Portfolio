"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { fadeUp } from "../lib/motion";
import { GraduationCap, Calendar } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16 md:py-20"
    >
      {/* ===== Title ===== */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Education
          </span>
        </h2>

        <p className="text-gray-400 mt-4">Academic background and qualifications</p>
      </motion.div>

      {/* ===== Timeline ===== */}
      <div className="relative">

        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500 opacity-60" />

        <TimelineItem
          title="Master of Computer Applications (MCA)"
          org="Tezpur University"
          location=""
          duration="2022 - 2024"
          responsibilities={[
            "Comprehensive study of computer science fundamentals, software development, database management, and advanced programming concepts.",
            "Specialized in Full Stack Web Development",
            "Completed major project of Cab Booking System on web application development",
            "Strong foundation in data structures, algorithms, and system design",
          ]}
        />

        <TimelineItem
          title="Bachelor of Computer Applications (BCA)"
          org="Mahatma Gandhi Kashi Vidyapeeth"
          location=""
          duration="2019 - 2022"
          responsibilities={[
            "Comprehensive study of computer science fundamentals, software development, database management, and advanced programming concepts.",
            "Specialized in Full Stack Web Development",
            "Completed major project on web application development",
            "Strong foundation in data structures, algorithms, and system design",
          ]}
        />

        <TimelineItem
          title="XII"
          org="Varanasi Public School"
          location=""
          duration="2017 - 2019"
          responsibilities={[
            "Comprehensive study of computer science fundamentals, software development, database management, and advanced programming concepts.",
            "Specialized in Full Stack Web Development",
            "Completed major project on web application development",
            "Strong foundation in data structures, algorithms, and system design",
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
      <div className="absolute left-2 top-8 w-4 h-4 rounded-full bg-blue-500 shadow-lg" />

      {/* CARD */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="ml-16 glass p-8 rounded-2xl border border-white/10"
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">

          <div>
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {title}
            </h3>

            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <GraduationCap size={16} />
              {org} {location ? `• ${location}` : null}
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Calendar size={16} />
            {duration}
          </div>
        </div>

        {/* ===== COLLAPSED VIEW ===== */}
        <button onClick={() => setOpen(!open)} className="mt-6 text-blue-400 hover:text-blue-300 transition">
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
                <h4 className="text-gray-300 font-semibold mb-4">Details:</h4>

                <ul className="space-y-3 text-gray-400">
                  {responsibilities?.map((r: string, i: number) => (
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
                  <h4 className="text-gray-300 font-semibold mb-4">Key Achievements:</h4>

                  <ul className="space-y-3 text-gray-400">
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