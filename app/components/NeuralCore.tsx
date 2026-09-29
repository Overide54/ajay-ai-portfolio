"use client";

const nodes = [
  {
    id: "01",
    name: "PERCEPTION",
    position: "left-[18%] top-[35%]",
    delay: "0s",
  },
  {
    id: "02",
    name: "ROUTER",
    position: "left-[42%] top-[22%]",
    delay: "0.8s",
  },
  {
    id: "03",
    name: "MEMORY",
    position: "left-[68%] top-[34%]",
    delay: "1.4s",
  },
  {
    id: "04",
    name: "REASONING",
    position: "left-[30%] top-[62%]",
    delay: "0.4s",
  },
  {
    id: "05",
    name: "TOOLS",
    position: "left-[56%] top-[55%]",
    delay: "1.1s",
  },
  {
    id: "06",
    name: "REFLECTION",
    position: "left-[78%] top-[68%]",
    delay: "1.8s",
  },
  {
    id: "07",
    name: "SCHEMA",
    position: "left-[48%] top-[78%]",
    delay: "0.6s",
  },
];

const connections = [
  "left-[22%] top-[37%] w-[23%] rotate-[-12deg]",
  "left-[45%] top-[28%] w-[25%] rotate-[10deg]",
  "left-[27%] top-[42%] w-[24%] rotate-[55deg]",
  "left-[43%] top-[38%] w-[20%] rotate-[40deg]",
  "left-[57%] top-[47%] w-[23%] rotate-[20deg]",
  "left-[49%] top-[61%] w-[25%] rotate-[18deg]",
];

export default function NeuralCore() {
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[520px]">
      <style jsx>{`
        @keyframes dataPulse {
          0% {
            left: 0%;
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          70% {
            opacity: 1;
          }

          100% {
            left: 100%;
            opacity: 0;
          }
        }

        @keyframes coreBreath {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.45;
          }

          50% {
            transform: scale(1.18);
            opacity: 0.8;
          }
        }

        @keyframes hudBlink {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 1;
          }
        }
      `}</style>

      {/* HUD — top left */}

      <div className="absolute left-[2%] top-[12%] z-40 hidden font-mono text-[7px] tracking-[0.2em] text-slate-600 sm:block">
        <div className="mb-2 text-cyan-400/60">SYSTEM STATUS</div>

        <div className="space-y-1.5">
          <div className="flex gap-4">
            <span>CORE</span>
            <span className="text-cyan-400/70">ONLINE</span>
          </div>

          <div className="flex gap-4">
            <span>MEMORY</span>
            <span className="text-cyan-400/70">ACTIVE</span>
          </div>

          <div className="flex gap-4">
            <span>REASONING</span>
            <span className="text-cyan-400/70">ACTIVE</span>
          </div>

          <div className="flex gap-4">
            <span>MODE</span>
            <span className="text-cyan-400/70">AUTONOMOUS</span>
          </div>
        </div>
      </div>

      {/* HUD — top right */}

      <div className="absolute right-[3%] top-[14%] z-40 hidden text-right font-mono text-[7px] tracking-[0.2em] text-slate-600 sm:block">
        <div className="mb-2 text-cyan-400/60">NEURAL NETWORK</div>

        <div className="space-y-1.5">
          <div>7 NODES</div>
          <div>6 LINKS</div>
          <div>3 MEMORY LAYERS</div>
          <div className="text-cyan-400/70">RUNNING</div>
        </div>
      </div>

      {/* Outer system rings */}

      <div className="absolute inset-[12%] rounded-full border border-cyan-400/10 animate-[spin_30s_linear_infinite]" />

      <div className="absolute inset-[22%] rounded-full border border-violet-400/10 animate-[spin_22s_linear_infinite_reverse]" />

      <div className="absolute inset-[32%] rounded-full border border-cyan-400/10 animate-[spin_16s_linear_infinite]" />

      {/* Neural connections */}

      {connections.map((connection, index) => (
        <span
          key={index}
          className={`absolute h-px origin-left bg-cyan-400/15 transition-all duration-700 group-hover:bg-cyan-300/40 ${connection}`}
        >
          <span
            className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            style={{
              animation: "dataPulse 2.8s linear infinite",
              animationDelay: `${index * 0.65}s`,
            }}
          />
        </span>
      ))}

      {/* Semantic nodes */}

      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute ${node.position} z-20`}
          style={{
            animation: "neuralFloat 4s ease-in-out infinite",
            animationDelay: node.delay,
          }}
        >
          <div className="group/node relative flex -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center">
            <span
              className="absolute h-10 w-10 rounded-full bg-cyan-400/5 blur-md transition-all duration-500 group-hover/node:bg-cyan-400/15"
              style={{
                animation: "coreBreath 2.5s ease-in-out infinite",
                animationDelay: node.delay,
              }}
            />

            <span className="relative h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)] transition-transform duration-300 group-hover/node:scale-150" />

            <span className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] tracking-[0.2em] text-slate-600 opacity-0 transition-all duration-300 group-hover/node:text-cyan-300 group-hover/node:opacity-100">
              {node.name}
            </span>
          </div>
        </div>
      ))}

      {/* Central processing core */}

      <div className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div
          className="absolute h-28 w-28 rounded-full bg-cyan-400/5 blur-2xl"
          style={{
            animation: "coreBreath 3s ease-in-out infinite",
          }}
        />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-[#05070a]/90 shadow-[0_0_30px_rgba(34,211,238,0.08)] transition-all duration-500 group-hover:border-cyan-300/40 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
          <div className="absolute inset-3 rounded-full border border-cyan-400/10 animate-[spin_8s_linear_infinite]" />

          <div className="absolute inset-5 rounded-full border border-cyan-400/5" />

          <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,1)] animate-pulse" />
        </div>

        <p className="mt-4 font-mono text-[9px] tracking-[0.3em] text-cyan-400">
          NEURAL CORE
        </p>

        <p className="mt-2 font-mono text-[8px] tracking-[0.2em] text-slate-600">
          REASONING ACTIVE
        </p>
      </div>

      {/* HUD — bottom left */}

      <div className="absolute bottom-[13%] left-[5%] z-40 hidden font-mono text-[7px] tracking-[0.2em] text-slate-700 sm:block">
        <div className="mb-2 text-cyan-400/50">PROCESSING</div>

        <div className="flex items-center gap-2">
          <span
            className="h-1 w-1 rounded-full bg-cyan-400"
            style={{
              animation: "hudBlink 1.2s ease-in-out infinite",
            }}
          />

          <span>REAL-TIME</span>
        </div>
      </div>

      {/* HUD — bottom right */}

      <div className="absolute bottom-[13%] right-[5%] z-40 hidden text-right font-mono text-[7px] tracking-[0.2em] text-slate-700 sm:block">
        <div className="mb-2 text-cyan-400/50">SYSTEM LOAD</div>

        <div className="flex items-center gap-2">
          <span>STABLE</span>

          <span className="h-1 w-1 rounded-full bg-cyan-400" />
        </div>
      </div>

      {/* System metadata */}

      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-mono text-[8px] tracking-[0.25em] text-slate-700">
        <span>7 NODES</span>

        <span className="mx-2 text-cyan-400/30">/</span>

        <span>6 LINKS</span>

        <span className="mx-2 text-cyan-400/30">/</span>

        <span className="text-cyan-400/50">ACTIVE</span>
      </div>
    </div>
  );
}