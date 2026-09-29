const skillGroups = [
  {
    number: "01",
    category: "CORE",
    description: "Programming and data foundations.",
    skills: ["Python", "SQL", "C++"],
  },
  {
    number: "02",
    category: "INTELLIGENCE",
    description: "Machine learning and intelligent model development.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Generative AI",
      "LLMs",
    ],
  },
  {
    number: "03",
    category: "AI SYSTEMS",
    description: "Components used to build knowledge-aware AI systems.",
    skills: ["RAG", "AI Agents", "Embeddings", "Vector Search"],
  },
  {
    number: "04",
    category: "APPLICATION",
    description: "Frameworks for turning models into applications.",
    skills: [
      "FastAPI",
      "React / Next.js",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
    ],
  },
  {
    number: "05",
    category: "DATA & INFRA",
    description: "Storage, infrastructure, containers, and development tools.",
    skills: [
      "ChromaDB",
      "FAISS",
      "MySQL",
      "MongoDB",
      "Docker",
      "Git",
    ],
  },
  {
    number: "06",
    category: "LLM TOOLING",
    description: "Libraries and APIs for building LLM applications.",
    skills: ["LangChain", "LlamaIndex", "OpenAI API", "Groq"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-slate-800/60 px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400">
            03 // SYSTEM CAPABILITIES
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            Tools for building
            <br />
            intelligent systems.
          </h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-base leading-7 text-slate-500">
            A technical stack spanning programming, machine learning,
            generative AI, backend engineering, data infrastructure, and
            intelligent system design.
          </p>
        </div>
      </div>

      {/* Capability Matrix */}
      <div className="grid gap-px border border-slate-800 bg-slate-800 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article
            key={group.number}
            className="group relative min-h-[250px] overflow-hidden bg-[#05070a] p-7 transition-colors duration-300 hover:bg-slate-950"
          >
            {/* Number */}
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
                {group.number}
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-all duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            </div>

            {/* Category */}
            <h3 className="mt-8 text-sm tracking-[0.2em] text-white transition-colors duration-300 group-hover:text-cyan-400">
              {group.category}
            </h3>

            {/* Description */}
            <p className="mt-3 text-xs leading-6 text-slate-600">
              {group.description}
            </p>

            {/* Skills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-slate-800 px-2.5 py-1.5 text-xs text-slate-400 transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-400"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom signal */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400/50 transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>

      {/* Stack Signal */}
      <div className="mt-6 flex flex-col justify-between gap-4 border border-slate-800 p-5 font-mono text-[9px] tracking-[0.2em] text-slate-600 sm:flex-row sm:items-center">
        <span>STACK // AI + ML + GENAI + BACKEND</span>

        <span className="text-cyan-400/50">
          SYSTEM CAPABILITIES LOADED
        </span>
      </div>
    </section>
  );
}