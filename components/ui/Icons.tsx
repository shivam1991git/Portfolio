import { Github, Instagram, Linkedin } from "lucide-react";
import type { SocialKey } from "../../lib/content";
import { techIcons, type TechIconKey } from "../../lib/tech-icons";

export function TechIcon({ name, className = "h-5 w-5" }: { name: TechIconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={techIcons[name].path} />
    </svg>
  );
}

const socialIcons = { github: Github, linkedin: Linkedin, instagram: Instagram };

export function SocialIcon({ name, size = 18 }: { name: SocialKey; size?: number }) {
  const Icon = socialIcons[name];
  return <Icon size={size} aria-hidden="true" />;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wide text-muted">
      {children}
    </span>
  );
}
