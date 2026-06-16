import { motion } from "motion/react";

export default function CaseStudies() {
  const studies = [
    {
      tag: "SaaS — Series A — Operations",
      company: "Meridian Labs",
      type: "AI Workflow Automation · Data Intelligence",
      metrics: [
        { val: "78%", label: "Ops Cost Reduction" },
        { val: "11×", label: "Processing Speed" },
        { val: "6 wks", label: "Time to Deploy" }
      ],
      story: "Meridian was manually processing 4,000+ customer data requests monthly — each requiring 3–5 team members and 48–72 hours. We replaced the entire pipeline with a custom AI orchestration layer. Headcount on this workflow went from 8 to 1 oversight role.",
      quote: '"We went from fighting our data to being led by it. RuexTech didn\'t just automate our process — they made us genuinely smarter as a company."',
      author: "— CEO, Meridian Labs"
    },
    {
      tag: "eCommerce — Growth Stage — Revenue",
      company: "Volta Commerce",
      type: "AI Growth Engineering · Custom AI Product",
      metrics: [
        { val: "214%", label: "Revenue Lift" },
        { val: "3.4×", label: "Conversion Rate" },
        { val: "$2.1M", label: "ARR Recovered" }
      ],
      story: "Volta had a churn problem: 22% of subscribers lapsed monthly with zero intervention. We built a predictive churn model connected to an autonomous retention workflow — personalized outreach, dynamic discounting, and re-engagement sequences — all managed by AI.",
      quote: '"The system identified customers about to churn before our team even knew they were unhappy. We\'ve recovered $2.1M in ARR that would have simply walked out the door."',
      author: "— Head of Growth, Volta Commerce"
    }
  ];

  return (
    <section id="cases" className="section py-24 px-4 md:px-12 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-[#5B8EDB]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1160px] mx-auto text-left relative z-10">
        
        {/* Origin Statement Badge */}
        <span className="stag flex items-center gap-2.5 text-[10px] font-accent font-semibold uppercase tracking-[4px] text-[#9AADBE] mb-5 h-8">
          <span className="w-[30px] h-[1px] bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF]" />
          Results
        </span>

        {/* Section Heading */}
        <h2 className="font-display font-light text-5xl sm:text-6xl text-[#1E2A38] tracking-tight leading-[1.05] mb-6">
          Built it. Shipped it.<br />
          <em className="italic bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent">Proved it.</em>
        </h2>

        {/* Section Subtitle */}
        <p className="font-sans font-light text-[15px] text-[#6B7E93] leading-[1.9] max-w-[540px] mb-16">
          Numbers don't lie. These are real outcomes from real systems — not projections.
        </p>

        {/* Diagonal 2-Card Metric Showcase Grid */}
        <div className="cases-grid grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-[#DCEBFF]/50 border border-[#DCEBFF]/50 rounded-xl overflow-hidden shadow-sm">
          {studies.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="case-card p-10 md:p-12 border border-[#DCEBFF]/20 bg-[#F7F9FC]/80 backdrop-blur-md relative overflow-hidden transition-all duration-500 shadow-sm"
            >
              {/* Subtle top-light gradient line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 pointer-events-none" />

              {/* Tag metadata */}
              <div className="case-tag text-[10px] font-sans font-light uppercase tracking-[4px] text-[#9AADBE] mb-7">
                {item.tag}
              </div>

              {/* Company Title */}
              <h3 className="case-co font-display font-normal text-[30px] text-[#1E2A38] mb-1.5 leading-none">
                {item.company}
              </h3>

              {/* Framework Type */}
              <div className="case-type text-[12px] font-sans font-light text-[#6B7E93] mb-8 leading-none">
                {item.type}
              </div>

              {/* Inner Metrics Matrix Row */}
              <div className="case-metrics flex gap-7.5 mb-8 pb-8 border-b border-[#DCEBFF]/60 justify-between sm:justify-start">
                {item.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="space-y-1">
                    <div className="cm-val font-display font-light text-[40px] leading-none bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent">
                      {metric.val}
                    </div>
                    <div className="cm-lbl text-[10px] font-sans font-light uppercase tracking-[2px] text-[#9AADBE]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prose narrative */}
              <p className="case-story text-[13px] font-sans font-style-normal font-light text-[#6B7E93] leading-[1.85] mb-8">
                {item.story}
              </p>

              {/* Quote citation box */}
              <div className="case-quote p-5 pl-6 bg-[#DCEBFF]/20 border-l-2 border-l-[#5B8EDB]/30 font-display font-light italic text-[16px] text-[#374455] leading-[1.6]">
                {item.quote}
                <br /><br />
                <strong className="not-italic text-[12px] text-[#6B7E93] font-sans font-light tracking-wide block mt-1">
                  {item.author}
                </strong>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
