import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Architecture from "./components/Architecture";
import Contact from "./components/Contact";
import BootSequence from "./components/BootSequence";

export default function Home() {
  return (
    <main
  id="top"
  className="min-h-screen bg-[#05070a] text-[#e6edf7]"
>
      <BootSequence />

      <Navigation />

      <Hero />

      <About />

      <Experience />

      <Skills />

      <Projects />

      <Architecture />

      <Contact />
    </main>
  );
}