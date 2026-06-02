"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { fadeUp } from "../lib/motion";
import { GraduationCap, Calendar } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
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
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Education
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">Academic background and qualifications</p>
      </motion.div>

      {/* ===== Timeline ===== */}
      <div className="relative">

        {/* Vertical Line */}
        <div className="absolute bottom-0 left-3 top-0 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500 opacity-60 sm:left-4" />

        <TimelineItem
          title="Master of Computer Applications (MCA)"
          org="Tezpur University, Assam"
          duration="2022 - 2024"
          responsibilities={[
            "Specialized in Software Engineering, Data Structures, Algorithms, DBMS, Operating Systems, Data Mining, and Web Technologies",
            "Developed 'Ride-It' Cab Booking Platform as Major Project (A+ Grade)",
            "Built a Cataract Detection System as Mini Project using Machine Learning concepts",
            "Strengthened foundations in scalable software development, database design, and system architecture",
          ]}
          achievements={[
            "A+ Grade in Major Project",
            "Strong academic performance in DBMS, Operating Systems, Algorithms, and Data Mining",
          ]}
        />

        <TimelineItem
          title="Bachelor of Computer Applications (BCA)"
          org="Mahatma Gandhi Kashi Vidyapith, Varanasi"
          duration="2019 - 2022"
          responsibilities={[
            "First Division (2698/3600)",
            "Studied Programming, Data Structures, DBMS, Software Engineering, Computer Networks, Operating Systems, E-Commerce, and Web Development",
            "Developed multiple academic projects focused on software development and database applications",
            "Built strong programming foundations using C, C++, Java, and Database Systems",
          ]}
          achievements={[
            "First Division - Topper Of the college",
            "Strong foundation in computer science fundamentals",
          ]}
        />

        <TimelineItem
          title="Senior Secondary (XII)"
          org="Varanasi Public School (CBSE)"
          duration="2017 - 2019"
          responsibilities={[
            "Science Stream with Mathematics",
            "Studied Mathematics, Physics, Chemistry, and Computer Fundamentals",
            "Built analytical and problem-solving skills that led to pursuing Computer Applications",
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

          <div>
            <h3 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-semibold leading-tight text-transparent sm:text-2xl">
              {title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-400 sm:text-base">
              <GraduationCap size={16} />
              {org} {location ? `• ${location}` : null}
            </div>

            {title === "Master of Computer Applications (MCA)" && (
              <>
                <div className="mt-3 inline-flex items-center rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-sm text-green-400">
                  CGPA: 7.98 / 10
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                    Major Project: Ride-It
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                    Mini Project: Cataract Detection
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex w-fit items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm text-blue-400 sm:px-4 sm:text-base">
            <Calendar size={16} />
            {duration}
          </div>
        </div>

        {/* ===== COLLAPSED VIEW ===== */}
        <button onClick={() => setOpen(!open)} className="mt-6 min-h-11 text-left text-blue-400 transition hover:text-blue-300">
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

                <ul className="space-y-3 text-sm leading-6 text-gray-400 sm:text-base">
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
