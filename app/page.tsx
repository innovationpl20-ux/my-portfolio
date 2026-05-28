import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import WorksSection from "@/components/WorksSection";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <ContactSection />
    </div>
  );
}
