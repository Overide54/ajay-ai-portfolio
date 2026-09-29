const focusAreas = [
  {
    number: "01",
    title: "AI ENGINEERING",
    description:
      "Building practical machine learning systems and integrating models into usable applications.",
  },
  {
    number: "02",
    title: "GENERATIVE AI",
    description:
      "Exploring LLM applications, RAG pipelines, embeddings, vector search, and intelligent workflows.",
  },
  {
    number: "03",
    title: "AUTONOMOUS SYSTEMS",
    description:
      "Designing agent architectures around reasoning, memory, tools, planning, and reflection.",
  },
  {
    number: "04",
    title: "BACKEND SYSTEMS",
    description:
      "Developing APIs and supporting infrastructure with Python, FastAPI, databases, and containers.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-slate-800/60 px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Section Header */}
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400">
            01 // ABOUT
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            Building systems,
            <br />
            not just applications.
          </h2>
        </div>

        <div className="max-w-3xl">
          <p className="text-lg leading-8 text-slate-400">
            I&apos;m Ajay Wasnik, an AI and Data Science graduate focused on
            building practical AI and machine learning systems.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            My interests are centered around AI engineering, generative AI,
            retrieval-augmented generation, autonomous agents, backend systems,
            and the engineering required to turn intelligent models into
            usable applications.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            I learn by building. My projects explore areas such as LLM
            applications, RAG pipelines, computer vision, machine learning,
            APIs, vector databases, and system architecture.
          </p>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mt-20 grid gap-px border border-slate-800 bg-slate-800 md:grid-cols-2">
        {focusAreas.map((area) => (
          <div
            key={area.number}
            className="group bg-[#05070a] p-7 transition-colors duration-300 hover:bg-slate-950"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
                {area.number}
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-colors duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>

            <h3 className="mt-8 text-sm tracking-[0.18em] text-slate-200 transition-colors duration-300 group-hover:text-cyan-400">
              {area.title}
            </h3>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
              {area.description}
            </p>

            <div className="mt-7 h-px w-0 bg-cyan-400/50 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}