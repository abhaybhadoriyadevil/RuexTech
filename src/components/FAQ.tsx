import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaqItem } from "../types";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Can my business get a custom web application online in 7 days?",
      answer: "Yes, absolutely! Our agile development framework allows us to deliver high-performance, responsive landing pages, business landing portals, or standard booking modules in exactly 7 days. For heavily customized enterprise-grade ERP sheets, CRM utilities, or native mobile apps, we generally deliver robust builds in 3 to 4 weeks.",
      category: "SPEEDY_DELIVERY",
    },
    {
      question: "What is the cost structure, and what is your support guarantee?",
      answer: "We offer starting affordable friendly pricing designed for Indian corporate budgets, MSMEs, and high-growth startups. To inspire full confidence, all our projects include a strict 1 Month of Free 24/7 Priority Support, Free Official WhatsApp Integration setups, and zero hidden recurring licensing fees.",
      category: "PRICING_&_SUPPORT",
    },
    {
      question: "Do we own 100% of the custom software source code files?",
      answer: "Yes. Unlike rigid SaaS builders that lock you into monthly subscription models per user, we operate with maximum transparency. Upon final program deployment and launch, we hand over 100% intellectual property (IP) rights and pristine Git source code. The system belongs entirely to your business.",
      category: "CODE_OWNERSHIP",
    },
    {
      question: "Is the WhatsApp automation official and safe from number blocks?",
      answer: "Absolutely. We are certified developers who hook systems directly to Meta's Official WhatsApp Cloud API. We do not use unsafe, third-party browser simulators that trigger account blocks. Your clients receive order invoices, payment confirmations, and alerts smoothly with 100% official compliance.",
      category: "WHATSAPP_SECURITY",
    },
    {
      question: "Are your portals and software heavily optimized for mobile cellular speeds?",
      answer: "Yes, this is our core philosophy. 98% of users interact through mobile phones. We deploy lightweight React packages, optimized Tailwind grids, and serve files from localized cloud edge registries. Our systems load under 1.5 seconds even on standard 4G and weak mobile network signals in remote regions.",
      category: "MOBILE_OPTIMIZATION",
    },
  ];

  return (
    <section id="faq-section" className="relative py-20 md:py-32 w-full px-4 md:px-12 z-10 grid-overlay bg-luxury-black text-left">
      {/* Background neon lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/10 bg-blue-500/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] font-mono tracking-[4px] text-blue-600 uppercase font-bold">
              QUESTION_RESOLUTIONS
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-luxury-primary tracking-tight mb-6">
            Everything you need to know. Clear and transparent.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-luxury-cream font-medium leading-relaxed font-sans">
            We don't hide details behind complex legal clauses. Here are honest answers regarding source codes, Meta API configurations, and deployment schedules.
          </p>
        </div>

        {/* FAQs Cluster */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-350 overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-500/20 shadow-[0_12px_32px_rgba(30,42,56,0.06)]"
                    : "bg-white/90 border-slate-200/55 hover:border-slate-350"
                }`}
              >
                {/* Question Click Area */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-start justify-between gap-6 cursor-pointer"
                >
                  <div className="space-y-2 min-w-0">
                    <span className="text-[9px] font-mono tracking-[3px] text-blue-600 uppercase font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-display font-extrabold text-sm md:text-base text-luxury-primary transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 border-blue-500/20 bg-blue-500/5 text-blue-600"
                      : "border-slate-200 bg-slate-50 text-[#6B7E93]"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Answer Segment */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 border-t border-slate-200/55 pt-4">
                        <p className="text-xs sm:text-sm text-luxury-cream font-medium leading-relaxed font-sans">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
