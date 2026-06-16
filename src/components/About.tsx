import { motion } from "motion/react";

export default function About() {
  const roadmapItems = [
    {
      year: "2024",
      title: "Core Platform Launch",
      status: "Live",
      statusClass: "bg-[rgba(75,191,223,0.12)] text-[#4BBFDF] border-[#4BBFDF]/25",
      desc: "AI workflow automation and LLM integration for early adopters."
    },
    {
      year: "2025",
      title: "RuexOS Agent Framework",
      status: "Building",
      statusClass: "bg-[rgba(91,142,219,0.10)] text-[#5B8EDB] border-[#5B8EDB]/22",
      desc: "Multi-agent orchestration — deploy autonomous AI teams, not just tools."
    },
    {
      year: "2026",
      title: "Self-Evolving Infrastructure",
      status: "Next",
      statusClass: "bg-[rgba(139,107,216,0.10)] text-[#8B6BD8] border-[#8B6BD8]/22",
      desc: "AI systems that audit, retrain, and redeploy themselves on performance signals."
    },
    {
      year: "2027",
      title: "Enterprise Intelligence Mesh",
      status: "Vision",
      statusClass: "bg-[rgba(139,107,216,0.10)] text-[#8B6BD8] border-[#8B6BD8]/22",
      desc: "Organization-wide AI OS with cross-system reasoning and persistent memory."
    }
  ];

  return (
    <section id="about" className="section bg-[#F7F9FC] relative py-24 px-4 md:px-12 overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-[#5B8EDB]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1160px] mx-auto">
        {/* Origin Statement Badge */}
        <div className="stag flex items-center gap-2.5 text-[10px] font-accent font-semibold uppercase tracking-[4px] text-[#9AADBE] mb-5 h-8">
          <span className="w-[30px] h-[1px] bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF]" />
          Origin
        </div>

        {/* Section Heading */}
        <h2 className="font-display font-light text-5xl sm:text-6xl text-[#1E2A38] tracking-tight leading-[1.05] mb-12">
          Built by builders.<br />
          Obsessed with <em className="italic bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent">what's next.</em>
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Column: Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 text-left"
          >
            <p className="font-display font-light text-2xl sm:text-[30px] leading-[1.55] text-[#1E2A38]">
              RuexTech was founded on one conviction: <em className="italic bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent">most businesses operate at 30% of their potential</em> — not because of talent, but because intelligence isn't deployed where it matters.
            </p>

            {/* Mission Panel */}
            <div className="about-mission p-7 pl-8 border border-[#DCEBFF]/75 bg-[#F7F9FC]/60 relative overflow-hidden rounded-md shadow-sm">
              {/* Left Gradient Edge Accent */}
              <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF]" />
              
              <div className="text-[10px] font-sans font-light tracking-[4px] uppercase text-[#9AADBE] mb-3">
                Mission Statement
              </div>
              <p className="text-[13px] font-sans font-light text-[#6B7E93] leading-[1.9]">
                To make frontier AI accessible, deployable, and profitable for the next generation of digital businesses — transforming operations that once required armies of people into autonomous, self-optimizing systems.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Platform Future Roadmap */}
          <motion.div
            initial={{ opacity: 0, x: 26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 text-left"
          >
            <p className="text-sm font-sans font-light text-[#6B7E93] leading-[1.95]">
              We don't build demos. We build infrastructure. Every system we ship is production-grade, monitored in real time, and designed to improve over time without manual intervention.
              <br /><br />
              Our team spans AI research, systems architecture, and product design. We've shipped automation stacks that now run mission-critical workflows for startups scaling from seed to Series B and beyond.
            </p>

            {/* Future Roadmap */}
            <div>
              <h3 className="font-display font-normal text-xl sm:text-[22px] text-[#1E2A38] mb-6">
                Future Roadmap
              </h3>
              
              <div className="divide-y divide-[#DCEBFF]/50 border-t border-b border-[#DCEBFF]/50">
                {roadmapItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-5 py-4.5 hover:translate-x-1.5 transition-transform duration-300"
                  >
                    <div className="font-mono text-[11px] font-light text-[#9AADBE] tracking-[1px] pt-0.5 w-12 shrink-0">
                      {item.year}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[13px] font-sans font-semibold text-[#1E2A38]">
                          {item.title}
                        </span>
                        <span className={`inline-flex items-center text-[9px] font-sans font-normal uppercase tracking-[2px] px-2 py-0.5 rounded-full border ${item.statusClass}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[12px] font-sans font-light text-[#6B7E93] leading-[1.7]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
