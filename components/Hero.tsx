"use client";

import { motion } from "framer-motion";
import { Briefcase, Download, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { memo } from "react";
import ImageWithFallback from "./ImageWithFallback";

export default function Hero() {
  const scrollNext = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0b0b0d] pb-20 pt-24 sm:pb-24 lg:pt-20"
    >
      {/* ===== RIGHT GLOW BACKGROUND ===== */}
      <div className="absolute right-[-260px] top-[-180px] h-[480px] w-[480px] bg-purple-600/20 blur-[140px] sm:right-[-200px] sm:h-[700px] sm:w-[700px] sm:blur-[180px]" />

      {/* ===== MAIN CONTAINER ===== */}
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 pr-14 sm:px-6 sm:pr-16 md:grid-cols-2 md:pr-20 lg:pr-6">

        {/* ================= LEFT CONTENT ================= */}
        <div className="z-10 flex flex-col justify-center text-center md:text-left">

          {/* Availability */}
          <div className="mb-6">
            <span className="inline-flex max-w-full rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 sm:text-base">
              Available for opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[clamp(2.55rem,14vw,4.5rem)] font-bold leading-[1.05] text-white md:text-[clamp(3.75rem,6vw,4.5rem)]">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Shivam Singh
            </span>
          </h1>

          <h2 className="mt-5 text-xl text-gray-300 sm:text-2xl">
            Full Stack Developer
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base md:mx-0">
            I build scalable, production-ready web applications
            using the MERN stack. Transforming complex problems
            into elegant solutions with clean code and modern
            architecture.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:justify-center md:justify-start">
            <a
              href="#projects"
              className="rounded-lg bg-blue-600 px-5 py-3 text-center transition hover:bg-blue-700 sm:px-6"
            >
              View Projects ↓
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-white/20 px-5 py-3 text-center transition hover:bg-white/10 sm:px-6"
            >
              Contact Me
            </a>
          </div>


          {/* Social Icons */}
         <div className="mt-8 flex justify-center gap-3 md:justify-start">

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
            className="relative h-[min(112vw,460px)] w-[min(70vw,300px)] sm:h-[520px] sm:w-[320px]"
          >
            {/* OVAL IMAGE CONTAINER */}
            <div className="relative h-full w-full overflow-hidden rounded-[999px] bg-black">

              <ImageWithFallback
                src="/images/Shivaay.JPG"
                alt="Shivam Singh"
                fill
                className="object-cover"
                priority
                onError={(error) => {
                  console.error("Failed to load hero image:", error);
                }}
              />

            </div>

            {/* Soft Glow Around Image */}
            <div className="pointer-events-none absolute inset-0 rounded-[999px] shadow-[0_0_120px_rgba(59,130,246,0.25)]" />
            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 md:justify-start">

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex min-h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 font-medium transition hover:opacity-90 sm:px-6"
              >
                <Briefcase size={18} />
                Hire Me
              </button>

              <a
                href="/docs/Shivam Singh.pdf"
                download
                className="flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-medium transition hover:bg-white/10 sm:px-6"
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
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer text-2xl text-white sm:block"
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
      <a href={link} target="_blank" rel="noopener noreferrer" className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 transition hover:border-blue-500/40 hover:bg-white/10">
        {children}
      </a>
    );
  }

  return <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5">{children}</div>;
}

const IconBox = memo(IconBoxComponent);
