import { useState } from "react";
import { motion } from "motion/react";
import { TechItem } from "../types";
import { Code, Server, Network } from "lucide-react";

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<"models" | "frameworks" | "infrastructure">("models");

  const techList: TechItem[] = [
    // Models
    { name: "React 19 & Next.js Core", category: "models", desc: "Super-fast React client engines optimized for flawless core-web vitals and beautiful smooth layout loops." },
    { name: "Flutter Engine (iOS/Android)", category: "models", desc: "High-performance hybrid coding to compile native APK packages and sleek App Store applications." },
    { name: "PostgreSQL & Supabase", category: "models", desc: "Reliable database schemas equipped with scale-to-zero configurations for safe data state containment." },
    { name: "Meta WhatsApp Cloud API", category: "models", desc: "Direct official WhatsApp Business API routing for zero-latency, high-volume automated communications." },
    
    // Frameworks
    { name: "Node.js & Express API Servers", category: "frameworks", desc: "Ultra-fast RESTful logical interfaces designed for smooth custom CRM/ERP integrations." },
    { name: "Tailwind CSS & Framer Motion", category: "frameworks", desc: "Futuristic styling, responsive grids, and cinematic entry & scroll animations." },
    { name: "Framer-Motion & GSAP", category: "frameworks", desc: "Subtle micro-animations, physical element bounces, and luxurious scroll timeline control." },
    { name: "Drizzle & Prisma ORM", category: "frameworks", desc: "Type-safe database interaction bridges ensuring clean SQL calls and quick response speeds." },

    // Infrastructure
    { name: "Google Cloud Platform (GCP)", category: "infrastructure", desc: "Secure Serverless Cloud Run container deployments with automatic geoverse routing." },
    { name: "Vercel & AWS Edge Cluster", category: "infrastructure", desc: "Global edge-network delivery guaranteeing sub-50ms page load speeds anywhere in India." },
    { name: "Docker & Container Registries", category: "infrastructure", desc: "Self-contained virtual software boxes ensuring reliable program startup regardless of OS." },
    { name: "SSL & Cloudflare Guard Shield", category: "infrastructure", desc: "Air-tight web application firewalling and enterprise-level DDOS defensive shields." },
  ];

  const filteredTech = techList.filter((item) => item.category === activeTab);

  // Ticker items (duplicated for seamless scroll)
  const tickerItems = [
    "React 19", "Next.js", "Flutter", "iOS App", "Android APK", "PostgreSQL", 
    "Supabase", "WhatsApp API", "Express Server", "Tailwind CSS", "Vercel", "Google Cloud"
  ];

  return (
    <section id="tech-stack" className="relative py-20 md:py-32 w-full px-4 md:px-12 z-10 grid-overlay bg-luxury-black text-left">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/10 bg-blue-500/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] font-accent tracking-[4px] text-blue-600 uppercase font-semibold">
              TECHNOLOGY_STACK
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl text-luxury-primary tracking-tight mb-6">
            Built with modern, high-speed engines.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-luxury-cream font-medium leading-relaxed max-w-xl font-sans">
            No lazy shortcuts. No visual templates. We deploy hand-coded system architectures optimized for mobile viewport rendering speeds, real-time syncs, and heavy traffic loads.
          </p>
        </div>

        {/* Endless Moving Tech Ticker */}
        <div className="w-full overflow-hidden relative border-t border-b border-slate-200/55 py-6 sm:py-8 mb-12 select-none bg-white/40 backdrop-blur-sm">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-luxury-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-luxury-black to-transparent z-10" />
          
          <div className="flex whitespace-nowrap gap-12 sm:gap-16 w-max animate-[marquee_25s_linear_infinite]">
            {/* First Set */}
            {tickerItems.map((item, index) => (
              <span
                key={`ticker-1-${index}`}
                className="font-display font-extrabold text-sm sm:text-base text-[#6B7E93] hover:text-blue-600 transition-colors tracking-widest uppercase cursor-default"
              >
                {item}
              </span>
            ))}
            {/* Second Set */}
            {tickerItems.map((item, index) => (
              <span
                key={`ticker-2-${index}`}
                className="font-display font-extrabold text-sm sm:text-base text-[#6B7E93] hover:text-blue-600 transition-colors tracking-widest uppercase cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveTab("models")}
            className={`p-6 rounded-2xl border text-left transition-all duration-300 backdrop-blur-md cursor-pointer ${
              activeTab === "models"
                ? "bg-white border-blue-500/20 shadow-[0_12px_24px_rgba(30,42,56,0.06)] font-semibold"
                : "bg-white/40 border-slate-200/55 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 border border-blue-500/25 rounded-lg text-blue-600 font-bold">
                <Network className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-accent tracking-wider text-blue-600 font-semibold">
                LAYER_01
              </span>
            </div>
            <h3 className="font-display font-extrabold text-sm text-luxury-primary mb-1">FOUNDATION_STOCKS</h3>
            <p className="text-[11px] text-luxury-cream font-medium leading-relaxed font-sans">
              Beautiful React frontends, robust Flutter app files, and lightning PostgreSQL engines.
            </p>
          </button>

          <button
            onClick={() => setActiveTab("frameworks")}
            className={`p-6 rounded-2xl border text-left transition-all duration-300 backdrop-blur-md cursor-pointer ${
              activeTab === "frameworks"
                ? "bg-white border-purple-500/20 shadow-[0_12px_24px_rgba(30,42,56,0.06)] font-semibold"
                : "bg-white/40 border-slate-200/55 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 border border-purple-500/25 rounded-lg text-purple-600 font-bold">
                <Code className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-accent tracking-wider text-purple-600 font-semibold">
                LAYER_02
              </span>
            </div>
            <h3 className="font-display font-extrabold text-sm text-luxury-primary mb-1">LOGIC_FLOWS</h3>
            <p className="text-[11px] text-luxury-cream font-medium leading-relaxed font-sans">
              Express backends, secure client managers, and responsive animated layout packages.
            </p>
          </button>

          <button
            onClick={() => setActiveTab("infrastructure")}
            className={`p-6 rounded-2xl border text-left transition-all duration-300 backdrop-blur-md cursor-pointer ${
              activeTab === "infrastructure"
                ? "bg-white border-indigo-500/20 shadow-[0_12px_24px_rgba(30,42,56,0.06)] font-semibold"
                : "bg-white/40 border-slate-200/55 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/25 rounded-lg text-indigo-600 font-bold">
                <Server className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase font-accent tracking-wider text-indigo-600 font-semibold">
                LAYER_03
              </span>
            </div>
            <h3 className="font-display font-extrabold text-sm text-luxury-primary mb-1">CLOUD_DEPLOYS</h3>
            <p className="text-[11px] text-luxury-cream font-medium leading-relaxed font-sans">
              Google Cloud containers, SSL secure gateways, Vercel hosts, and DDoS protection systems.
            </p>
          </button>
        </div>

        {/* Filtered Grid Displays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTech.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white border border-slate-200/55 flex flex-col justify-between hover:border-blue-500/20 hover:shadow-lg transition-all"
            >
              <div className="space-y-1.5">
                <h4 className="font-accent text-[11px] text-blue-600 flex items-center gap-2 font-semibold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  {item.name}
                </h4>
                <p className="text-xs text-luxury-cream leading-relaxed font-medium font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Keyframes Injection */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
