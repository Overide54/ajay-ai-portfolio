"use client";

import { useState } from "react";

const links = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "NEURAL SCHEMA", href: "#architecture" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-800/40 bg-[#05070a]/65 px-6 py-5 backdrop-blur-md md:px-12 lg:px-20">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="text-lg font-semibold tracking-[0.25em] text-white"
        >
          AW
        </a>

        {/* Desktop Navigation */}
        <div className="hidden gap-8 text-xs tracking-[0.2em] text-slate-400 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Status */}
        <div className="hidden items-center gap-2 text-xs tracking-[0.15em] text-cyan-400 lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          SYSTEM ONLINE
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-slate-800 bg-[#05070a]/60 lg:hidden"
          aria-label="Toggle navigation"
        >
          <span
            className={`h-px w-5 bg-cyan-400 transition-transform ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />

          <span
            className={`h-px w-5 bg-cyan-400 transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`h-px w-5 bg-cyan-400 transition-transform ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`absolute left-0 top-full -z-10 h-[calc(100vh-73px)] w-full bg-[#05070a]/95 backdrop-blur-md transition-all duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <p className="mb-8 font-mono text-xs tracking-[0.3em] text-cyan-400">
            NEURAL SYSTEM // NAVIGATION
          </p>

          <div className="flex flex-col">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-slate-800 py-5 text-xl tracking-[0.15em] text-slate-300 transition-colors hover:text-cyan-400"
              >
                <span className="mr-5 font-mono text-xs text-slate-600">
                  0{index + 1}
                </span>

                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            SYSTEM ONLINE
          </div>
        </div>
      </div>
    </nav>
  );
}