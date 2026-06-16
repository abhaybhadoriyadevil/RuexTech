import { motion } from "motion/react";

export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "Diagnostic Intelligence",
      desc: "We audit your entire operational surface — workflows, tools, data flows, and decision loops — to locate every lever automation can pull."
    },
    {
      num: "02",
      title: "Architecture Design",
      desc: "We design a custom AI architecture around your stack, your team, and your goals — not a template. No two systems we build are identical."
    },
    {
      num: "03",
      title: "Rapid Prototyping",
      desc: "Working systems in weeks, not months. We build fast, validate against real data, and iterate until the system outperforms your baseline."
    },
    {
      num: "04",
      title: "Production Deployment",
      desc: "We go live with enterprise-grade infrastructure — monitored, load-tested, and backed by a 98.7% uptime SLA. Your operations never stop."
    },
    {
      num: "05",
      title: "Continuous Evolution",
      desc: "AI degrades without care. We monitor performance signals, retrain models on new data, and push improvements continuously."
    }
  ];

  return (
    <section id="process" className="section py-24 px-4 md:px-12 bg-[#1E2A38] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#5B8EDB]/5 via-[#8B6BD8]/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1160px] mx-auto text-left relative z-10">
        
        {/* Section Header */}
        <span className="stag flex items-center gap-2.5 text-[10px] font-accent font-semibold uppercase tracking-[4px] text-[#9AADBE]/50 mb-5 h-8">
          <span className="w-[30px] h-[1px] bg-gradient-to-r from-[#5B8EDB]/40 via-[#8B6BD8]/40 to-[#4BBFDF]/40" />
          Methodology
        </span>
        
        <h2 className="font-display font-light text-5xl sm:text-6xl text-white tracking-tight leading-[1.05] mb-6">
          The transformation<br />
          <em className="italic bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent">framework.</em>
        </h2>

        <p className="font-sans font-light text-[15px] text-[#9AADBE]/85 leading-[1.85] max-w-[540px] mb-16">
          Five stages. Zero ambiguity. Every client engagement follows a battle-tested process designed to eliminate risk and accelerate results.
        </p>

        {/* 5-Column Grid Timeline layout */}
        <div className="proc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-white/5 border border-white/5 rounded-xl overflow-hidden">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="proc-step p-8 sm:p-10 md:p-11 bg-[#1E2A38]/85 hover:bg-[#5B8EDB]/7 transition-colors duration-400"
            >
              {/* Digit indicators */}
              <div className="proc-n font-display font-light text-5xl bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent mb-5 leading-none">
                {item.num}
              </div>

              {/* Title */}
              <h3 className="proc-name font-display font-normal text-[19px] text-white mb-2.5">
                {item.title}
              </h3>

              {/* Details text */}
              <p className="proc-desc text-[12px] font-sans font-light text-[#9AADBE]/70 leading-[1.8]">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
