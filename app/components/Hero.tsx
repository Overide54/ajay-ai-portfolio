import NeuralScene from "./NeuralScene";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-32 md:px-12 md:pt-36 lg:px-20"
    >
      <div className="grid w-full items-center gap-16 xl:grid-cols-[1fr_0.9fr] xl:gap-8">
        <div className="relative z-10 max-w-4xl">
          <p className="mb-6 font-mono text-xs tracking-[0.3em] text-cyan-400 md:text-sm">
            AI SYSTEM // INITIALIZING
          </p>

          <h1 className="text-6xl font-bold leading-[0.9] tracking-[-0.055em] text-white transition-colors duration-500 hover:text-slate-100 sm:text-7xl md:text-8xl lg:text-[7rem]">
            AJAY WASNIK
          </h1>

          <h2 className="mt-6 text-lg tracking-[0.2em] text-slate-400 sm:text-xl md:text-2xl">
            AI / ML ENGINEER
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-7 text-slate-400 md:text-lg md:leading-8">
            Building intelligent and autonomous systems with machine learning,
            generative AI, and modern backend technologies.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="border border-cyan-400 px-6 py-3 text-sm tracking-widest text-cyan-400 transition hover:bg-cyan-400 hover:text-black"
            >
              VIEW PROJECTS
            </a>

            <a
              href="https://github.com/Overide54"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-700 px-6 py-3 text-sm tracking-widest text-slate-300 transition hover:border-slate-400 hover:text-white"
            >
              GITHUB
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-700 px-6 py-3 text-sm tracking-widest text-slate-300 transition hover:border-slate-400 hover:text-white"
            >
              RESUME
            </a>
          </div>
        </div>

        <div className="relative hidden h-[480px] items-center justify-center xl:flex">
          <NeuralScene />
        </div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-slate-600 transition-colors hover:text-cyan-400"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">
          EXPLORE
        </span>

        <span className="relative h-10 w-px overflow-hidden bg-slate-800">
          <span className="absolute left-0 top-0 h-1/2 w-full animate-pulse bg-cyan-400" />
        </span>

        <span className="font-mono text-[10px] tracking-[0.2em]">
          SCROLL TO CONTINUE
        </span>
      </a>
    </section>
  );
}