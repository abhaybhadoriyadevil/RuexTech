import { useState, useEffect } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import RuexLogo from "./RuexLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { name: "Services", target: "services" },
    { name: "Framework", target: "process" },
    { name: "Case Studies", target: "cases" },
    { name: "Stack", target: "tech-stack" },
    { name: "Web & Portals", target: "web-summary" },
    { name: "FAQ", target: "faq-section" },
  ];

  return (
    <>
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 origin-left z-50 pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? "py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-md"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center">
          {/* RuexTech Brand Logo */}
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center cursor-pointer select-none group"
          >
            <RuexLogo layout="horizontal" size={32} className="transition-transform duration-300 group-hover:scale-[1.015]" />
          </div>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/60 border border-slate-200 rounded-full backdrop-blur-xl">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.target)}
                className="px-4.5 py-1.5 rounded-full text-xs font-sans text-luxury-cream hover:text-blue-600 hover:bg-slate-50 transition-all duration-300 tracking-wide cursor-pointer font-semibold"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Elegant Floating Glowing CTA Button */}
          <button
            onClick={() => {
              const el = document.getElementById("cta");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="group relative flex items-center gap-1 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-[9px] sm:text-[10px] text-blue-600 hover:text-white font-display tracking-wider hover:border-blue-500/50 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm font-bold"
          >
            {/* Hover sliding bg layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="relative z-10 flex items-center gap-1 font-bold">
              FREE STRATEGY CALL <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
