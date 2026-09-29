const experience = [
  {
    number: "01",
    title: "AI / ML DEVELOPMENT",
    type: "PRACTICAL EXPERIENCE",
    description:
      "Building and experimenting with practical AI and software systems across machine learning, generative AI, computer vision, and backend engineering.",
    areas: [
      "Machine Learning",
      "Generative AI",
      "RAG",
      "Computer Vision",
      "Python",
      "FastAPI",
    ],
  },
  {
    number: "02",
    title: "AI SYSTEM ENGINEERING",
    type: "CURRENT FOCUS",
    description:
      "Moving beyond individual models toward complete intelligent systems involving reasoning, memory, tools, APIs, data, and system architecture.",
    areas: [
      "AI Agents",
      "LLM Systems",
      "Memory",
      "Tool Execution",
      "System Design",
      "APIs",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-slate-800/60 px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400">
            02 // EXPERIENCE
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            From models
            <br />
            to systems.
          </h2>
        </div>

        <div className="max-w-3xl">
          <p className="text-lg leading-8 text-slate-400">
            My focus is on understanding how AI components become complete
            systems—from models and data pipelines to APIs, memory, tools, and
            intelligent workflows.
          </p>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="relative mt-20">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-[11px] top-0 hidden w-px bg-slate-800 md:block" />

        <div className="space-y-16">
          {experience.map((item) => (
            <article
              key={item.number}
              className="relative grid gap-8 md:grid-cols-[80px_1fr]"
            >
              {/* Timeline marker */}
              <div className="relative hidden md:block">
                <div className="absolute left-[6px] top-2 h-3 w-3 rounded-full border border-cyan-400/40 bg-[#05070a] transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]" />
              </div>

              {/* Experience content */}
              <div className="border border-slate-800 p-7 transition-colors duration-300 hover:border-slate-700">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
                      {item.number}
                    </span>

                    <h3 className="text-sm tracking-[0.18em] text-white">
                      {item.title}
                    </h3>
                  </div>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-400/60">
                    {item.type}
                  </span>
                </div>

                <p className="mt-7 max-w-3xl text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {item.areas.map((area) => (
                    <span
                      key={area}
                      className="border border-slate-800 px-3 py-2 font-mono text-[9px] tracking-[0.12em] text-slate-500 transition-colors duration-300 hover:border-cyan-400/30 hover:text-cyan-400"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}