import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import About from "@/components/sections/About";
import AISystem from "@/components/sections/AISystem";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Languages from "@/components/sections/Languages";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <AISystem />
      <Skills />
      <Projects />
      <Experience />
      <Languages />
      <Contact />
    </>
  );
}
