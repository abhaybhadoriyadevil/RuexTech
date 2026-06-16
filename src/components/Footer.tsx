import { ArrowUp } from "lucide-react";
import RuexLogo from "./RuexLogo";

export default function Footer() {
  const scrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    Solutions: [
      { name: "Website Development", href: "#services" },
      { name: "Mobile App Development", href: "#services" },
      { name: "Custom ERP Systems", href: "#services" },
      { name: "WhatsApp Automation", href: "#services" },
    ],
    Framework: [
      { name: "Process Methodology", href: "#process" },
      { name: "Modern Technology Stack", href: "#tech-stack" },
      { name: "Interactive Command Console", href: "#web-summary" },
    ],
    Resources: [
      { name: "Client Case Studies", href: "#case-studies" },
      { name: "Interactive FAQ Help", href: "#faq-section" },
    ]
  };

  return (
    <footer className="relative border-t border-slate-200/55 bg-white/40 pt-16 pb-12 w-full px-4 md:px-12 z-10 font-sans select-none text-left">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16">
          
          {/* Logo Segment */}
          <div className="lg:col-span-4 space-y-4">
            <RuexLogo layout="horizontal" size={32} />

            <p className="text-xs text-luxury-cream max-w-sm leading-relaxed font-medium">
              Bespoke high-performance web applications, native Android/iOS mobile apps, custom stock ERP software, and secure WhatsApp Business API automations hand-crafted to grow Indian businesses.
            </p>

            <div className="pt-3 space-y-2 border-t border-slate-200/40 max-w-xs">
              <div className="text-[10px] font-mono tracking-wider text-[#6B7E93] uppercase font-bold">
                Direct Inquiry
              </div>
              <div className="text-xs font-semibold text-luxury-cream font-sans space-y-1">
                <div>
                  Email: <a href="mailto:Ruextech@gmail.com" className="text-[#5B8EDB] hover:underline transition-colors">Ruextech@gmail.com</a>
                </div>
                <div>
                  WhatsApp: <a href="https://wa.me/918431558856" target="_blank" rel="noreferrer" className="text-[#5B8EDB] hover:underline transition-colors">+91 84315 58856</a>
                </div>
              </div>
            </div>
          </div>

          {/* Links clusters */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h4 className="font-display font-medium text-[10px] tracking-[2px] text-[#6B7E93] uppercase font-bold">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                         href={link.href}
                         className="text-xs text-luxury-cream hover:text-blue-600 transition-colors font-semibold"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Up arrow toggle */}
          <div className="lg:col-span-2 flex justify-start lg:justify-end">
            <button
              onClick={scrollBackToTop}
              className="group flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#6B7E93] hover:text-blue-600 transition-all uppercase px-4 py-2 bg-white border border-slate-200 rounded-full cursor-pointer hover:border-slate-300 shadow-sm"
            >
              TOP <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Subfooter */}
        <div className="border-t border-slate-200/55 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-[#6B7E93] tracking-wider font-semibold">
          <span>&copy; {new Date().getFullYear()} RUEX TECH SOLUTIONS. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6 font-semibold">
            <span>OFFICIAL META API INTEGRATIONS</span>
            <span>PROUDLY CODES FOR INDIA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
