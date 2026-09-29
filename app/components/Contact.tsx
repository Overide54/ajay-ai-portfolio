export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-slate-800/60 px-6 py-32 md:px-12 lg:px-20"
    >
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400">
            06 // CONTACT
          </p>

          <h2 className="mt-4 text-4xl font-medium tracking-tight text-white md:text-6xl">
            Let&apos;s build
            <br />
            intelligent systems.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            I&apos;m interested in AI engineering, machine learning,
            generative AI, autonomous systems, and research-driven projects.
          </p>

          <p className="mt-6 font-mono text-xs tracking-[0.15em] text-slate-600">
            OPEN TO: AI / ML • GENAI • RESEARCH • SOFTWARE ENGINEERING
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ContactCard
            label="GITHUB"
            value="Overide54"
            href="https://github.com/Overide54"
            external
          />

          <ContactCard
            label="LINKEDIN"
            value="Ajay Wasnik"
            href="https://linkedin.com/in/ajay-wasnik-0a1069205"
            external
          />

          <ContactCard
            label="EMAIL"
            value="ajaywasnik54@gmail.com"
            href="mailto:ajaywasnik54@gmail.com"
          />

          <ContactCard
            label="RESUME"
            value="View / Download CV"
            href="/resume.pdf"
            external
          />
        </div>
      </div>

      <div className="mt-24 flex flex-col gap-4 border-t border-slate-800/60 pt-8 font-mono text-xs tracking-[0.15em] text-slate-600 md:flex-row md:items-center md:justify-between">
        <span>AJAY WASNIK // AI / ML ENGINEER</span>

        <span className="flex items-center gap-2 text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          SYSTEM ONLINE
        </span>
      </div>
    </section>
  );
}

function ContactCard({
  label,
  value,
  href,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group border border-slate-800 bg-[#070a0e]/50 p-6 transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#0a0f14]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">
          {label}
        </span>

        <span className="text-slate-700 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-400">
          ↗
        </span>
      </div>

      <p className="mt-8 break-all text-sm text-slate-400 transition-colors group-hover:text-white">
        {value}
      </p>
    </a>
  );
}