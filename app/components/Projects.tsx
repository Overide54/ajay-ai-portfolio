const projects = [
  {
    id: "01",
    name: "NEURAL SCHEMA AGENT",
    type: "AUTONOMOUS AI SYSTEM",
    status: "IN DEVELOPMENT",
    description:
      "A modular autonomous AI architecture designed around perception, intent analysis, planning, memory, tool execution, reflection, and evolving knowledge representation.",
    technologies: [
      "Python",
      "FastAPI",
      "LLMs",
      "ChromaDB",
      "SQLite",
    ],
  },
  {
    id: "02",
    name: "CRYPTO TRADING AGENT",
    type: "AI / DATA SYSTEM",
    status: "EXPERIMENTAL",
    description:
      "An experimental algorithmic trading system focused on market-data collection, processing, storage, and automated decision pipelines.",
    technologies: [
      "Python",
      "PostgreSQL",
      "Docker",
      "Binance API",
    ],
  },
  {
    id: "03",
    name: "INTERVIEW READY",
    type: "RAG APPLICATION",
    status: "PROJECT",
    description:
      "A retrieval-augmented application exploring document processing, embeddings, vector search, and LLM-based question answering.",
    technologies: [
      "Python",
      "RAG",
      "Embeddings",
      "Vector Database",
      "LLMs",
    ],
  },
  {
    id: "04",
    name: "ABSTRACTIVE SUMMARIZER",
    type: "NLP / TRANSFORMERS",
    status: "PROJECT",
    description:
      "An NLP project exploring abstractive text summarization using transformer-based architectures.",
    technologies: [
      "Python",
      "NLP",
      "Transformers",
      "Deep Learning",
    ],
  },
  {
    id: "05",
    name: "FACIAL EXPRESSION RECOGNITION",
    type: "COMPUTER VISION",
    status: "PROJECT",
    description:
      "A computer vision system for recognizing facial expressions from visual input using deep learning techniques.",
    technologies: [
      "Python",
      "Computer Vision",
      "TensorFlow",
      "Deep Learning",
    ],
  },
  {
    id: "06",
    name: "GENAI FAQ CHATBOT",
    type: "GENERATIVE AI",
    status: "PROJECT",
    description:
      "A conversational application exploring LLM integration, prompt design, and knowledge-grounded question answering.",
    technologies: [
      "Python",
      "LLMs",
      "Streamlit",
      "GenAI",
    ],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-slate-800/60 px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400">
            04 // PROJECT SYSTEMS
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            Systems I&apos;ve
            <br />
            built and explored.
          </h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-base leading-7 text-slate-500">
            Projects spanning autonomous AI, generative AI, machine learning,
            computer vision, NLP, data systems, and backend engineering.
          </p>
        </div>
      </div>

      {/* Project List */}
      <div className="divide-y divide-slate-800 border-y border-slate-800">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group relative grid gap-8 py-10 transition-colors duration-300 hover:bg-slate-950 md:grid-cols-[80px_1fr_1.5fr]"
          >
            {/* Project Number */}
            <div className="font-mono text-xs tracking-[0.15em] text-slate-600">
              {project.id}
            </div>

            {/* Project Identity */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-all duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-400/70">
                  {project.type}
                </p>
              </div>

              <h3 className="mt-4 text-xl font-medium tracking-wide text-white transition-colors duration-300 group-hover:text-cyan-400 md:text-2xl">
                {project.name}
              </h3>

              <p className="mt-3 font-mono text-[8px] tracking-[0.15em] text-slate-600">
                STATUS // {project.status}
              </p>
            </div>

            {/* Project Details */}
            <div>
              <p className="max-w-2xl text-sm leading-7 text-slate-400">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="border border-slate-800 px-2.5 py-1.5 text-xs text-slate-500 transition-colors duration-300 hover:border-cyan-400/30 hover:text-cyan-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover Signal */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400/60 transition-all duration-500 group-hover:w-full" />
          </article>
        ))}
      </div>

      {/* Project System Footer */}
      <div className="mt-6 flex flex-col gap-3 border border-slate-800 p-5 font-mono text-[9px] tracking-[0.2em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>06 PROJECT SYSTEMS</span>

        <span className="text-cyan-400/50">
          AI // ML // GENAI // SYSTEMS
        </span>
      </div>
    </section>
  );
}