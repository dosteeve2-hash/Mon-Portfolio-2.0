import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import Ticker from "@/components/sections/Ticker";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <Ticker />
      <AboutSection />
      <StatsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
