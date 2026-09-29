const pipeline = [
  {
    id: "01",
    name: "USER INPUT",
    description: "Receives the task or objective.",
  },
  {
    id: "02",
    name: "PERCEPTION",
    description: "Interprets the request and extracts intent.",
  },
  {
    id: "03",
    name: "TASK ROUTER",
    description: "Selects the appropriate execution path.",
  },
];

const coreSystems = [
  {
    id: "04",
    name: "REASONING / PLANNER",
    description: "Breaks objectives into executable steps.",
  },
  {
    id: "05",
    name: "MEMORY MANAGER",
    description: "Coordinates retrieval and persistent knowledge.",
  },
  {
    id: "06",
    name: "TOOL EXECUTOR",
    description: "Interacts with APIs, tools, and external systems.",
  },
  {
    id: "07",
    name: "REFLECTION LOOP",
    description: "Evaluates results and triggers another reasoning cycle when required.",
  },
];

const memorySystems = [
  "EPISODIC MEMORY",
  "SEMANTIC MEMORY",
  "PROCEDURAL MEMORY",
];

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="border-t border-slate-800/60 px-6 py-32 md:px-12 lg:px-20"
    >
      {/* Header */}
      <div className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-cyan-400">
            05 // NEURAL SCHEMA
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
            An architecture for
            <br />
            autonomous intelligence.
          </h2>
        </div>

        <div className="max-w-2xl">
          <p className="text-base leading-7 text-slate-500">
            Neural Schema is a modular architecture exploring how perception,
            reasoning, memory, tools, reflection, and evolving knowledge can
            work together inside an autonomous AI system.
          </p>
        </div>
      </div>

      {/* Input Pipeline */}
      <div className="grid gap-px border border-slate-800 bg-slate-800 md:grid-cols-3">
        {pipeline.map((node) => (
          <SystemNode key={node.id} node={node} />
        ))}
      </div>

      {/* Connector */}
      <div className="flex justify-center py-5">
        <div className="h-10 w-px bg-gradient-to-b from-cyan-400/50 to-slate-800" />
      </div>

      {/* Reasoning Core */}
      <div className="relative border border-cyan-400/20 bg-cyan-400/[0.015] p-6 md:p-8">
        <div className="absolute left-0 top-0 h-px w-24 bg-cyan-400/60" />

        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/70">
              CORE PROCESSING LAYER
            </p>

            <h3 className="mt-2 text-xl tracking-[0.12em] text-white md:text-2xl">
              REASONING ENGINE
            </h3>
          </div>

          <span className="font-mono text-xs tracking-[0.15em] text-cyan-400">
            ACTIVE
          </span>
        </div>

        <div className="grid gap-px bg-slate-800 md:grid-cols-2">
          {coreSystems.map((node) => (
            <SystemNode key={node.id} node={node} />
          ))}
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center py-5">
        <div className="h-10 w-px bg-gradient-to-b from-slate-800 to-violet-400/40" />
      </div>

      {/* Neural Schema Engine */}
      <div className="relative border border-violet-400/20 bg-violet-400/[0.015] p-7 md:p-10">
        <div className="absolute right-0 top-0 h-px w-32 bg-violet-400/50" />

        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-violet-300/70">
            KNOWLEDGE REPRESENTATION
          </p>

          <h3 className="mt-4 text-2xl font-medium tracking-[0.12em] text-white md:text-3xl">
            NEURAL SCHEMA ENGINE
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Represents evolving entities, relationships, knowledge, and system
            state as the agent interacts with its environment.
          </p>

          <div className="mt-8 grid w-full max-w-3xl gap-px border border-slate-800 bg-slate-800 md:grid-cols-3">
            {memorySystems.map((memory) => (
              <div
                key={memory}
                className="bg-[#05070a] px-5 py-5 font-mono text-xs tracking-[0.12em] text-slate-400 transition-colors duration-300 hover:text-violet-300"
              >
                {memory}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center py-5">
        <div className="h-10 w-px bg-gradient-to-b from-violet-400/40 to-cyan-400/40" />
      </div>

      {/* Response */}
      <div className="mx-auto max-w-xl border border-cyan-400/20 p-7 text-center transition-colors duration-300 hover:border-cyan-400/40">
        <p className="font-mono text-xs tracking-[0.25em] text-cyan-400/70">
          FINAL OUTPUT
        </p>

        <h3 className="mt-3 text-lg tracking-[0.15em] text-white">
          RESPONSE GENERATOR
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Transforms the final system state into a response or action.
        </p>
      </div>

      {/* System Footer */}
      <div className="mt-8 flex flex-col gap-3 border border-slate-800 p-5 font-mono text-xs tracking-[0.15em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>NEURAL SCHEMA // MODULAR ARCHITECTURE</span>

        <span className="text-cyan-400/50">
          REASONING + MEMORY + TOOLS
        </span>
      </div>
    </section>
  );
}

function SystemNode({
  node,
}: {
  node: {
    id: string;
    name: string;
    description: string;
  };
}) {
  return (
    <div className="group bg-[#05070a] p-6 transition-colors duration-300 hover:bg-slate-950">
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-slate-600">
          {node.id}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-all duration-300 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
      </div>

      <h3 className="mt-7 text-sm tracking-[0.15em] text-slate-200 transition-colors duration-300 group-hover:text-cyan-400">
        {node.name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {node.description}
      </p>

      <div className="mt-6 h-px w-0 bg-cyan-400/50 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}