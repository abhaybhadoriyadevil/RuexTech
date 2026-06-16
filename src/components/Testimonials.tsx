import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ReviewItem } from "../types";
import { ShieldCheck, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews: ReviewItem[] = [
    {
      id: "rev-1",
      author: "Rajesh Singhania",
      role: "Founder & Chairman",
      company: "Singhania Distributors",
      text: "RuexTech did not just build a standard database; they completely automated our wholesale ordering flow using WhatsApp. Our dispatch cycle dropped from days to minutes across Rajasthan & Gujarat, with perfect stock accuracy.",
      verified: true,
    },
    {
      id: "rev-2",
      author: "Ananya Rao",
      role: "Founder & CEO",
      company: "HealSage Health, Mumbai",
      text: "We wanted a world-class healthcare scheduling app that would load in less than 2 seconds on mobile viewports. RuexTech was our savior. The mobile experience is incredibly fast, and clients absolutely love the smooth interactive animations.",
      verified: true,
    },
    {
      id: "rev-3",
      author: "Amit Mehra",
      role: "VP of Logistics Systems",
      company: "Rajputana Metal Solutions",
      text: "The custom stock-control ERP portal Ruex solved all our tracking bottlenecks. It is fully responsive, hand-coded, and synchronizes real-time weights on direct server-side pipelines.",
      verified: true,
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[activeIndex];

  return (
    <section className="relative py-20 md:py-32 w-full px-4 md:px-12 z-10 grid-overlay bg-luxury-black text-center">
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 w-[380px] h-[380px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto border-t border-slate-200/55 pt-20">
        
        {/* Quote Visual Ornament */}
        <div className="flex justify-center mb-8 text-purple-400/40">
          <Quote className="w-12 h-12 stroke-[1.5px]" />
        </div>

        {/* Carousel Transition Area */}
        <div className="text-center space-y-10 min-h-[240px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              {/* Review Quote Text */}
              <p className="font-sans italic font-medium text-xl sm:text-2xl md:text-3xl text-luxury-primary leading-relaxed max-w-4xl mx-auto px-4">
                "{currentReview.text}"
              </p>

              {/* Author info */}
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-display font-extrabold text-sm sm:text-base text-luxury-primary">
                  {currentReview.author}
                </span>
                
                <div className="flex items-center gap-2 text-[10px] font-accent text-[#6B7E93] font-semibold uppercase tracking-[2px]">
                  <span>{currentReview.role}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{currentReview.company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls Layout */}
        <div className="flex items-center justify-between mt-12 max-w-xs mx-auto border-t border-slate-200/55 pt-6">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#6B7E93] hover:text-blue-600 transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-blue-600 w-4.5" : "bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#6B7E93] hover:text-blue-600 transition-all cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Compliance verified message badge */}
        <div className="flex items-center justify-center gap-1.5 text-[9px] font-accent text-blue-600 uppercase mt-12 tracking-widest bg-blue-500/5 border border-blue-500/10 rounded-full py-1.5 px-4.5 w-max mx-auto font-semibold shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" /> SECURE VERIFIED CLIENT TESTIMONIAL
        </div>

      </div>
    </section>
  );
}
