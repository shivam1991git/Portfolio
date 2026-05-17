"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { memo } from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] border-t border-white/10 mt-32">

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* ===== LEFT — BRAND ===== */}
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              {"<SS />"}
            </div>

            <p className="text-gray-400 leading-relaxed max-w-sm">
              Full Stack Developer passionate about building scalable
              web applications and solving complex problems with
              elegant code.
            </p>
          </div>

          {/* ===== CENTER — LINKS ===== */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>

            <ul className="space-y-3 text-gray-400">
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#skills">Skills</FooterLink>
              <FooterLink href="#projects">Projects</FooterLink>
              <FooterLink href="#experience">Experience</FooterLink>
              <FooterLink href="#education">Education</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* ===== RIGHT — CONNECT ===== */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>

            <div className="flex gap-4 mb-4">

              <IconButton>
                <Github size={20} />
              </IconButton>

              <IconButton>
                <Linkedin size={20} />
              </IconButton>

              <IconButton>
                <Mail size={20} />
              </IconButton>

            </div>

            <p className="text-gray-400">
              Open to full-time opportunities and freelance projects
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">

          <p>
            © 2026 Shivam Singh. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Built with <span className="text-red-500">❤</span> using
            Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ===== Link Component ===== */

const FooterLink = memo(function FooterLinkComponent({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="hover:text-white transition">
        {children}
      </a>
    </li>
  );
});

/* ===== Icon Button ===== */

const IconButton = memo(function IconButtonComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer">
      {children}
    </div>
  );
});