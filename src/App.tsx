import { useState } from "react";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ThreeBg from "./components/ThreeBg";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import BentoGrid from "./components/BentoGrid";
import AutonomousRobot from "./components/AutonomousRobot";
import ProcessTimeline from "./components/ProcessTimeline";
import CaseStudies from "./components/CaseStudies";
import TechStack from "./components/TechStack";
import WebDevSummary from "./components/WebDevSummary";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-luxury-black text-luxury-cream overflow-hidden">
          {/* Custom Ambient Backgrounds & Particles */}
          <ThreeBg />
          
          {/* Premium Custom Mouse Interaction Cursor */}
          <CustomCursor />

          {/* Floating WhatsApp Action Trigger */}
          <WhatsAppButton />

          {/* Core Fixed Transparent Interactive Navbar */}
          <Navbar />

          {/* Structured Modules & Sections cluster */}
          <main className="relative z-10 space-y-0.5">
            {/* 1. Hero Module */}
            <Hero />

            {/* 2. Agency Statement & stats Module */}
            <About />

            {/* 3. Bento Grid of Services */}
            <BentoGrid />

            {/* 3.5. Autonomous waypoint sphere & Robot vector blueprint */}
            <AutonomousRobot />

            {/* 4. Methodology Roadmap Steps */}
            <ProcessTimeline />

            {/* 5. Client Case Studies metrics showcase */}
            <CaseStudies />

            {/* 6. Technology stack selection tickers */}
            <TechStack />

            {/* 7. Client portal command dashboard simulator */}
            <WebDevSummary />

            {/* 8. Luxury quote editorial slider */}
            <Testimonials />

            {/* 9. Secure audit FAQs */}
            <FAQ />

            {/* 10. Immersive Call To action Form */}
            <FinalCTA />
          </main>

          {/* 11. Custom Compliance sub-footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
