import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltips in cycles to catch the user's eye organically
    const interval = setInterval(() => {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }, 15000);

    // Initial delay trigger
    const initialTimer = setTimeout(() => setShowTooltip(true), 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  const triggerWhatsAppRedirect = () => {
    // Redirect to the user's customized WhatsApp business account
    const businessPhone = "918431558856";
    const baseMessage = encodeURIComponent(
      "Hello RuexTech, I visited your website and would like to inquire about your custom web/app development and AI automation solutions."
    );
    window.open(`https://wa.me/${businessPhone}?text=${baseMessage}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Dynamic Animated Conversation Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="hidden sm:flex items-center gap-1.5 px-4.5 py-2.5 rounded-2xl bg-slate-900/90 border border-white/10 text-[11px] text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] backdrop-blur-md cursor-pointer select-none group font-medium"
            onClick={triggerWhatsAppRedirect}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Chat with our developers live</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glowing Pulse Button */}
      <motion.button
        onClick={triggerWhatsAppRedirect}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-12.5 h-12.5 rounded-full flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] cursor-pointer transition-shadow duration-300"
        aria-label="Contact official WhatsApp channel"
      >
        {/* Radar Ring Pulses */}
        <span className="absolute inset-x-0 inset-y-0 rounded-full border-2 border-emerald-500/50 scale-100 group-hover:scale-130 group-hover:opacity-0 transition-all duration-700 animate-ping pointer-events-none" />
        
        {/* Sleek SVG WhatsApp Logo */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.812.48 3.564 1.392 5.1L2 22l5.076-1.332a9.99 9.99 0 0 0 4.936 1.344c5.532 0 10.012-4.48 10.012-10.012C22.024 6.48 17.544 2 12.012 2zm5.796 13.92c-.252.708-1.464 1.296-2.028 1.38-.504.072-1.152.096-1.848-.132-.42-.144-1.02-.384-1.74-.696-3.048-1.32-5.016-4.416-5.172-4.62-.144-.204-1.224-1.632-1.224-3.12 0-1.488.78-2.22 1.056-2.52.228-.24.588-.36.948-.36.12 0 .228.006.324.012.288.012.432.03.624.48.24.576.816 2 .888 2.148.072.144.12.312.024.504-.096.192-.204.312-.348.48-.144.168-.3.348-.432.468-.144.144-.3.3-.132.588.168.288.756 1.248 1.62 2.016.9 1.152 1.668 1.488 1.956 1.62.288.132.456.108.624-.084.168-.192.732-.852.924-1.14.192-.288.384-.24.648-.144.264.096 1.68.792 1.968.936.288.144.48.216.552.336.072.12.072.708-.18 1.416z"/>
        </svg>
      </motion.button>
    </div>
  );
}
