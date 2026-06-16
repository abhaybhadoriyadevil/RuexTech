import { motion } from "motion/react";

export default function BentoGrid() {
  const serviceCards = [
    {
      num: "01 — AI Automation",
      title: "AI Process Automation",
      desc: "Replace entire operational workflows with self-running AI pipelines — no headcount required.",
      points: [
        "End-to-end workflow mapping and intelligent bottleneck elimination",
        "Custom LLM agents that handle decisions, communications, and reporting autonomously",
        "Seamless integration with your existing tools: Notion, Slack, CRMs, ERPs, and APIs"
      ],
      iconGrad: "g1",
      iconGradStops: (
        <linearGradient id="g1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B8EDB" />
          <stop offset="1" stopColor="#8B6BD8" />
        </linearGradient>
      ),
      iconMarkup: (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <circle cx="24" cy="24" r="10" stroke="url(#g1)" strokeWidth="1.2" />
          <circle cx="24" cy="24" r="18" stroke="url(#g1)" strokeWidth="0.6" strokeDasharray="4 6" />
          <circle cx="24" cy="6" r="3" fill="url(#g1)" />
          <circle cx="42" cy="30" r="3" fill="url(#g1)" />
          <circle cx="6" cy="30" r="3" fill="url(#g1)" />
          <line x1="24" y1="9" x2="24" y2="14" stroke="url(#g1)" strokeWidth="1" />
          <line x1="39" y1="29" x2="34" y2="27" stroke="url(#g1)" strokeWidth="1" />
          <line x1="9" y1="29" x2="14" y2="27" stroke="url(#g1)" strokeWidth="1" />
        </svg>
      )
    },
    {
      num: "02 — Data Intelligence",
      title: "Data Intelligence Systems",
      desc: "Transform raw data into a living intelligence layer that predicts, prescribes, and acts.",
      points: [
        "Real-time analytics pipelines with AI-powered anomaly detection and forecasting",
        "Custom dashboards that surface what matters — before you think to ask",
        "Predictive models trained on your proprietary data, not generic benchmarks"
      ],
      iconGrad: "g2",
      iconGradStops: (
        <linearGradient id="g2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4BBFDF" />
          <stop offset="1" stopColor="#5B8EDB" />
        </linearGradient>
      ),
      iconMarkup: (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <rect x="6" y="6" width="36" height="36" rx="3" stroke="url(#g2)" strokeWidth="1" />
          <line x1="6" y1="18" x2="42" y2="18" stroke="url(#g2)" strokeWidth="0.6" />
          <line x1="6" y1="30" x2="42" y2="30" stroke="url(#g2)" strokeWidth="0.6" />
          <line x1="18" y1="6" x2="18" y2="42" stroke="url(#g2)" strokeWidth="0.6" />
          <line x1="30" y1="6" x2="30" y2="42" stroke="url(#g2)" strokeWidth="0.6" />
          <circle cx="18" cy="18" r="3" fill="url(#g2)" />
          <circle cx="30" cy="30" r="3" fill="url(#g2)" />
        </svg>
      )
    },
    {
      num: "03 — Custom AI Products",
      title: "Custom AI Products",
      desc: "Ship proprietary AI products — from internal tools to customer-facing platforms — built to scale and monetize.",
      points: [
        "Fine-tuned LLMs on your domain data for unmatched specificity and performance",
        "AI-native SaaS products with embedded intelligence, not bolted-on features",
        "Full lifecycle ownership: architecture, development, deployment, and iteration"
      ],
      iconGrad: "g3",
      iconGradStops: (
        <linearGradient id="g3" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B6BD8" />
          <stop offset="1" stopColor="#5B8EDB" />
        </linearGradient>
      ),
      iconMarkup: (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path d="M24 4L44 16L44 32L24 44L4 32L4 16Z" stroke="url(#g3)" strokeWidth="1" fill="none" />
          <path d="M24 12L36 19L36 29L24 36L12 29L12 19Z" stroke="url(#g3)" strokeWidth="0.6" fill="rgba(91,142,219,0.05)" />
          <circle cx="24" cy="24" r="4" fill="url(#g3)" />
        </svg>
      )
    },
    {
      num: "04 — Growth Engineering",
      title: "AI Growth Engineering",
      desc: "Deploy AI across acquisition, conversion, and retention — turning your funnel into a self-optimizing growth engine.",
      points: [
        "AI-powered content and outreach at scale — personalized, on-brand, and automated",
        "Conversion agents that continuously A/B test and iterate without human input",
        "Predictive churn models and autonomous retention workflows that protect your ARR"
      ],
      iconGrad: "g4",
      iconGradStops: (
        <linearGradient id="g4" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4BBFDF" />
          <stop offset="1" stopColor="#8B6BD8" />
        </linearGradient>
      ),
      iconMarkup: (
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path d="M6 36L18 22L26 28L38 12L42 16" stroke="url(#g4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M6 36L18 22L26 28L38 12L42 16L42 36Z" fill="url(#g4)" opacity="0.08" />
          <circle cx="38" cy="12" r="3" fill="url(#g4)" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="section py-24 px-4 md:px-12 bg-gradient-to-b from-[#F7F9FC] to-[rgba(220,235,255,0.12)]">
      <div className="max-w-[1160px] mx-auto">
        
        {/* Services Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div className="text-left">
            <span className="stag flex items-center gap-2.5 text-[10px] font-accent font-semibold uppercase tracking-[4px] text-[#9AADBE] mb-5 h-8">
              <span className="w-[30px] h-[1px] bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF]" />
              Services
            </span>
            <h2 className="font-display font-light text-5xl sm:text-6xl text-[#1E2A38] tracking-tight leading-[1.05]">
              What we<br />deploy for you.
            </h2>
          </div>
          <div className="text-left">
            <p className="font-sans font-light text-[15px] text-[#6B7E93] leading-[1.9] max-w-[540px]">
              Every engagement is custom-engineered. We don't offer off-the-shelf packages — we architect systems that fit your workflows, integrate with your stack, and outperform your expectations.
            </p>
          </div>
        </div>

        {/* 2x2 Services Grid exactly configured from static HTML */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-[#DCEBFF]/50 border border-[#DCEBFF]/50 rounded-xl overflow-hidden shadow-sm">
          {serviceCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="svc-card group p-10 md:p-12 bg-[#F7F9FC]/80 backdrop-blur-md relative overflow-hidden transition-all duration-500 text-left border border-[#DCEBFF]/20"
            >
              {/* Subtle top-left iridescent sheen trigger */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#DCEBFF]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Meta Indicator */}
              <div className="font-mono text-[10px] font-light tracking-[2px] text-[#9AADBE] mb-6">
                {card.num}
              </div>

              {/* Geometric wireframe vector icon */}
              <div className="w-[46px] h-[46px] mb-5 relative z-10">
                {card.iconMarkup}
                <svg className="hidden">
                  <defs>{card.iconGradStops}</defs>
                </svg>
              </div>

              {/* Title */}
              <h3 className="font-display font-normal text-[24px] text-[#1E2A38] tracking-[-0.3px] mb-3 relative z-10 leading-[1.2]">
                {card.title}
              </h3>

              {/* Summary */}
              <p className="text-[13px] font-sans font-style-normal font-light text-[#6B7E93] leading-[1.7] mb-6 pb-6 border-b border-[#DCEBFF]/60 relative z-10">
                {card.desc}
              </p>

              {/* Interactive Bullet Points lists */}
              <ul className="space-y-2 relative z-10">
                {card.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-[12px] font-sans font-light text-[#6B7E93] leading-[1.6]">
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] shrink-0 mt-[7px]" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
