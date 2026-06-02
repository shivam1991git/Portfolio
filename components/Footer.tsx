"use client";

import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { memo } from "react";

export default function Footer() {
  return (
    <footer id="site-footer" className="mt-20 border-t border-white/10 bg-[#0b1220] sm:mt-32">

      <div className="mx-auto max-w-7xl px-4 py-10 pr-14 sm:px-6 sm:py-16 sm:pr-16 md:pr-20 lg:pr-6">

        {/* TOP GRID */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">

          {/* ===== LEFT — BRAND ===== */}
          <div>
            <div className="text-xl font-bold">
              <span className="text-white">TECH</span>
              <span className="text-sky-400 font-extrabold">TALK</span>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-7 text-gray-400 sm:text-base">
              Full Stack Developer passionate about building scalable
              web applications and solving complex problems with
              elegant code.
            </p>
          </div>

          {/* ===== CENTER — LINKS ===== */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>

            <ul className="space-y-3 text-sm text-gray-400 sm:text-base">
              <FooterLink href="#home">Home</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#skills">Skills</FooterLink>
              <FooterLink href="#projects">Projects</FooterLink>
              <FooterLink href="#experience">Experience</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* ===== RIGHT — CONNECT ===== */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>

            <div className="mb-4 flex gap-3">

              <IconButton href="http://github.com/shivam1991git" label="GitHub profile">
                <Github size={20} />
              </IconButton>

              <IconButton href="https://www.linkedin.com/in/shivam-singh-010a61250" label="LinkedIn profile">
                <Linkedin size={20} />
              </IconButton>

              <IconButton href="mailto:shivamsingh.s1991@gmail.com" label="Email Shivam Singh">
                <Mail size={20} />
              </IconButton>
                <IconButton href="https://www.instagram.com/onenonly_shiv?igsh=MXJpMmMwZm1vNGFpeQ%3D%3D&utm_source=qr" label="Instagram profile">
                <Instagram size={20} />
              </IconButton>
                <IconButton 
                href="https://www.instagram.com/onenonly_shiv?igsh=MXJpMmMwZm1vNGFpeQ%3D%3D&utm_source=qr" 
                label="Yotube channel">
                <Youtube size={20} />
              </IconButton>

            </div>

            <p className="text-sm leading-6 text-gray-400 sm:text-base">
              Open to full-time opportunities and freelance projects
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-sm text-gray-400 md:mt-12 md:flex-row">

          <p>
            © 2026 Shivam Singh. All rights reserved.
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
      <a href={href} className="inline-flex min-h-8 items-center transition hover:text-white">
        {children}
      </a>
    </li>
  );
});

/* ===== Icon Button ===== */

const IconButton = memo(function IconButtonComponent({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 transition hover:bg-white/10"
    >
      {children}
    </a>
  );
});
