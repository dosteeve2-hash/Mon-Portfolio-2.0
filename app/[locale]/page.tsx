import HeroSection from "@/components/sections/HeroSection";
import Ticker from "@/components/sections/Ticker";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
