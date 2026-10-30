import { ArrowUp } from "lucide-react";
import { profile, sections, socials } from "../lib/content";
import { SocialIcon } from "./ui/Icons";
import { container } from "./ui/Section";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={`${container} py-14 sm:py-16`}>
        <div className="grid gap-12 md:grid-cols-12">
          {/* ===== Brand ===== */}
          <div className="md:col-span-5">
            <p className="text-2xl font-medium tracking-tight">{profile.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              Full stack developer building scalable web applications and solving complex problems
              with clean, considered code. Open to full-time opportunities and freelance projects.
            </p>
          </div>

          {/* ===== Links ===== */}
          <nav aria-label="Footer" className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Index</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-flex min-h-8 items-center text-muted transition-colors hover:text-fg">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ===== Connect ===== */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Connect</p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} profile`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <SocialIcon name={s.key} />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-block break-all text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Three.js & Framer Motion.
          </p>
          <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
