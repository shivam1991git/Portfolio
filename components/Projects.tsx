"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { fadeUp, fadeRight } from "../lib/motion";
import { Star, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import ImageWithFallback from "./ImageWithFallback";

export default function Projects() {
  return (
    <section
      id="projects"
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
          Featured{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
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
        title="Ride-It - Cab Booking & Rental Platform"
        imageSrc="/images/cab-booking.jpg"
        imageAlt="Ride-It Platform Screenshot"
        description="Designed and developed a MERN-based cab booking platform featuring secure authentication, ride booking workflows, driver management, administrative controls, and customer feedback modules. Built with a scalable client-server architecture and RESTful APIs."
        features={[
          "Multi-role authentication (User, Driver, Admin)",
          "Cab booking and ride management",
          "Driver onboarding and management",
          "Admin control panel",
          "Customer profile management",
          "Booking history tracking",
          "Feedback & rating module",
        ]}
        tech={[
          "React.js",
          "Redux",
          "Node.js",
          "Express.js",
          "MongoDB",
          "JWT",
          "Axios",
          "Bootstrap",
          "REST API",
          "Git",
        ]}
      />
      <ProjectItem
        title="E-Commerce Platform"
        imageSrc="/images/e-commerce.jpg"
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
  const showProjectLinks = title === "E-Commerce Platform" || title === "Ride-It - Cab Booking & Rental Platform";
  const showLiveDemo = title === "Ride-It - Cab Booking & Rental Platform";
  const githubLink =
    title === "E-Commerce Platform"
      ? "https://github.com/shivam1991git/e-commerce-website.git"
      : "https://github.com/shivam1991git/RIDE-IT.git";

  const liveDemoLink =
    title === "Ride-It - Cab Booking & Rental Platform"
      ? "https://ride-it-aed-git-main-thisisshivam1991-6980s-projects.vercel.app"
      : "";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass mb-6 rounded-2xl border border-white/10 p-5 sm:mb-8 sm:p-8"
    >
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">

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

          <h3 className="mb-3 text-xl font-bold leading-tight sm:text-2xl">{title}</h3>

          <p className="mb-6 text-sm leading-6 text-gray-400 sm:text-base">{description}</p>

          {/* Toggle button */}
          <button
            onClick={() => setOpen(!open)}
            className="min-h-11 text-left text-blue-400 transition hover:text-blue-300"
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

                  <div className="grid gap-2 text-sm text-gray-400 sm:grid-cols-2">
                    {features.map((f: string, i: number) => (
                      <div key={i} className="flex gap-2 leading-6">
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
                  <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row">
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-2 transition hover:bg-white/10"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    {showLiveDemo && (
                      <a
                        href={liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 transition hover:bg-blue-700"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== RIGHT — SCREENSHOT ===== */}
        <motion.div
          variants={fadeRight}
          className="relative flex aspect-[16/10] min-h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-3 sm:h-56 sm:p-4"
        >
          <ImageWithFallback
            src={imageSrc}
            alt={imageAlt}
            fill
            loading={flagship ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4"
            priority={flagship}
            onError={(error) => {
              console.error(`Failed to load image: ${imageSrc}`, error);
            }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
}

const ProjectItem = memo(ProjectItemComponent);
