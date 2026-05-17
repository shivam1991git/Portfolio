"use client";

import { motion } from "framer-motion";
import { Briefcase, Download, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

export default function Hero() {
  const scrollNext = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0b0b0d]"
    >
      {/* ===== RIGHT GLOW BACKGROUND ===== */}
      <div className="absolute right-[-200px] top-[-150px] w-[700px] h-[700px] bg-purple-600/20 blur-[180px]" />

      {/* ===== MAIN CONTAINER ===== */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 w-full">

        {/* ================= LEFT CONTENT ================= */}
        <div className="flex flex-col justify-center z-10">

          {/* Availability */}
          <div className="mb-6">
            <span className="px-4 py-2 rounded-full border border-blue-500/30 text-blue-400 bg-blue-500/10">
              Available for opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Shivam Singh
            </span>
          </h1>

          <h2 className="text-2xl text-gray-300 mt-6">
            Full Stack Developer
          </h2>

          <p className="text-gray-400 mt-6 max-w-lg">
            I build scalable, production-ready web applications
            using the MERN stack. Transforming complex problems
            into elegant solutions with clean code and modern
            architecture.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              View Projects ↓
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Contact Me
            </a>
          </div>


          {/* Social Icons */}
         <div className="flex gap-4 mt-8">

            <IconBox link="http://github.com/shivam1991git">
              <Github size={20} />
            </IconBox>

            <IconBox link="https://www.linkedin.com/in/shivam-singh-010a61250">
              <Linkedin size={20} />
            </IconBox>

            <IconBox link="mailto:shivamsingh.s1991@gmail.com">
              <Mail size={20} />
            </IconBox>
            <IconBox link="https://www.instagram.com/onenonly_shiv?igsh=MXJpMmMwZm1vNGFpeQ%3D%3D&utm_source=qr">
              <Instagram size={20} />
            </IconBox>

          </div>
        </div>
        {/* ================= RIGHT PORTRAIT ================= */}
        <div className="flex items-center justify-center md:justify-end">

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-[320px] h-[520px]"
          >
            {/* OVAL IMAGE CONTAINER */}
            <div className="relative w-full h-full overflow-hidden rounded-[160px] bg-black">

              <Image
                src="/images/ChatGPT Image Feb 21, 2026, 12_22_55 PM.png"
                alt="Shivam Singh"
                fill
                className="object-cover"
                priority
              />

            </div>

            {/* Soft Glow Around Image */}
            <div className="absolute inset-0 rounded-[160px] shadow-[0_0_120px_rgba(59,130,246,0.25)] pointer-events-none" />
            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition font-medium"
              >
                <Briefcase size={18} />
                Hire Me
              </button>

              <a
                href="/docs/Shivam Singh.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition font-medium"
              >
                <Download size={18} />
                Resume
              </a>

            </div>
          </motion.div>

        </div>
      </div>

      {/* ================= SCROLL ARROW ================= */}
      <motion.div
        onClick={scrollNext}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-white-400 text-2xl"
      >
        ↓
      </motion.div>

      {/* ================= COLOR BLEND (IMPORTANT) ================= */}
      {/* This creates smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-slate-950 pointer-events-none" />

    </section>
  );
}

function IconBoxComponent({ children, link }: { children: React.ReactNode; link?: string }) {
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/40 transition cursor-pointer">
        {children}
      </a>
    );
  }

  return <div className="p-3 rounded-lg border border-white/10 bg-white/5">{children}</div>;
}

const IconBox = memo(IconBoxComponent);