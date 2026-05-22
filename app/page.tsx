import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import SectionIndicator from "@/components/SectionIndicator";
import WorksSection from "@/components/WorksSection";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <SectionIndicator />
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <ContactSection />
    </div>
  );
}
