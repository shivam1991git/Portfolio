"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp, fadeRight } from "../lib/motion";
import { Star, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

export default function Projects() {
  return (
    <section
      id="projects"
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
          Featured{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <p className="text-gray-400 mt-4">
          Real-world applications showcasing my technical expertise
        </p>
      </motion.div>

      {/* ===== PROJECTS ===== */}

      <ProjectItem
        flagship
        title="Learning Management System (LMS)"
        imageSrc="/images/LMS.png"
        imageAlt="Learning Management System project screenshot"
        description="Enterprise LMS enabling course management, authentication, bulk uploads, and analytics."
        features={[
          "User authentication & authorization",
          "Learning Objective management",
          "Excel upload processing",
          "REST API integration",
          "Admin dashboard",
          "Real-time sync",
        ]}
        tech={[
          "React",
          "Next.js",
          "Node.js",
          "NestJS",
          "MongoDB",
          "TypeScript",
        ]}
      />

      <ProjectItem
        title="E-Commerce Platform"
        imageSrc="/images/ChatGPT Image Feb 21, 2026, 12_22_55 PM.png"
        imageAlt="E-Commerce Platform project screenshot"
        description="Full-featured e-commerce system with cart, payments, and admin panel."
        features={[
          "Product catalog",
          "Cart & checkout",
          "Payment integration",
          "Admin dashboard",
        ]}
        tech={["React", "Node.js", "MongoDB", "Stripe"]}
      />

      <ProjectItem
        title="Cab Booking"
        imageSrc="/images/Cab Booking.jpg"
        imageAlt="Cab Booking project screenshot"
        description="Full-featured e-commerce system with cart, payments, and admin panel."
        features={[
          "Product catalog",
          "Cart & checkout",
          "Payment integration",
          "Admin dashboard",
        ]}
        tech={["React", "Node.js", "MongoDB", "Stripe"]}
      />
    </section>
  );
}

//////////////////////////////////////////////////////////////
// PROJECT ITEM COMPONENT
//////////////////////////////////////////////////////////////

interface ProjectItemProps {
  flagship?: boolean;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  features: string[];
  tech: string[];
}

function ProjectItemComponent({ flagship, title, imageSrc, imageAlt, description, features, tech }: ProjectItemProps) {
  const [open, setOpen] = useState(flagship || false);
  const showProjectLinks =
    title === "E-Commerce Platform" || title === "Cab Booking";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass p-8 rounded-2xl border border-white/10 mb-8"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">

        {/* ===== LEFT CONTENT ===== */}
        <div>
          {flagship && (
            <div className="flex items-center gap-2 text-yellow-400 mb-3">
              <Star size={18} />
              <span className="text-sm font-medium">
                Flagship Project
              </span>
            </div>
          )}

          <h3 className="text-2xl font-bold mb-3">{title}</h3>

          <p className="text-gray-400 mb-6">{description}</p>

          {/* Toggle button */}
          <button
            onClick={() => setOpen(!open)}
            className="text-blue-400 hover:text-blue-300 transition"
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
                {/* Features */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-200 mb-3">
                    Key Features:
                  </h4>

                  <div className="grid grid-cols-2 gap-y-2 text-gray-400 text-sm">
                    {features.map((f: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-blue-400">▸</span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {tech.map((t: string) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {showProjectLinks && (
                  <div className="flex gap-4 mt-6">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
                    >
                      <Github size={16} />
                      Code
                    </a>

                    <a
                      href="#"
                      className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== RIGHT — SCREENSHOT ===== */}
        <motion.div
          variants={fadeRight}
          className="relative flex h-56 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-4"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            loading={flagship ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4"
            priority={flagship}
          />
        </motion.div>

      </div>
    </motion.div>
  );
}

const ProjectItem = memo(ProjectItemComponent);
