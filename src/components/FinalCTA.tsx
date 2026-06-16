import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Command, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const [contactInfo, setContactInfo] = useState("");
  const [requirement, setRequirement] = useState("web-app");
  const [query, setQuery] = useState("");
  const [formDataState, setFormDataState] = useState<"idle" | "sending" | "success">("idle");
  const [bookingHash, setBookingHash] = useState("");
  const [waUrl, setWaUrl] = useState("");

  const triggerFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactInfo.trim()) return;

    setFormDataState("sending");

    setTimeout(() => {
      const generatedHash = "RUEX_CALL_" + Math.random().toString(36).substring(2, 10).toUpperCase();
      setBookingHash(generatedHash);

      const requirementLabels: Record<string, string> = {
        "web-app": "Premium Custom Web App / Portal",
        "mobile-app": "Responsive Native Mobile App (Android/iOS APK)",
        "erp-crm": "Enterprise ERP System & CRM Database",
        "whatsapp-bot": "Official Meta WhatsApp API Bot & Alerts",
        "other": "Bespoke Custom Software Consultation"
      };

      const selectedRequirement = requirementLabels[requirement] || requirement;

      // Construct highly professional request brief message for the business WhatsApp account
      const messageText = `Hello RuexTech! I would like to request a Free Estimation Call / Booking.\n\n` +
        `🎟️ Booking Code: ${generatedHash}\n` +
        `📞 Contact/Email: ${contactInfo}\n` +
        `⚙️ Requested System: ${selectedRequirement}\n` +
        (query.trim() ? `💬 Detailed Query/Notes:\n"${query}"\n` : "") +
        `Please connect with us to discuss further action. Thanks!`;

      const businessPhone = "918431558856";
      const directWhatsAppUrl = `https://wa.me/${businessPhone}?text=${encodeURIComponent(messageText)}`;
      setWaUrl(directWhatsAppUrl);
      setFormDataState("success");

      // Attempt to automatically open WhatsApp in a new tab
      window.open(directWhatsAppUrl, "_blank");
    }, 1200);
  };

  return (
    <section id="cta" className="relative py-20 md:py-32 w-full px-4 md:px-12 z-10 grid-overlay overflow-hidden bg-luxury-black text-left">
      {/* Background large neon gradient rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto rounded-3xl glass-panel relative p-6 md:p-14 lg:p-20 overflow-hidden border border-slate-200/55 shadow-lg bg-white/70 backdrop-blur-xl">
        
        {/* Floating gradient decorative orbs */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-55/15 rounded-full blur-[68px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          
          {/* Header Typography Column */}
          <div className="lg:col-span-12 xl:col-span-6 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/10 bg-blue-500/5">
              <Command className="w-4 h-4 text-blue-600" />
              <span className="text-[9px] font-accent tracking-[4px] text-blue-600 uppercase font-semibold">
                KICKSTART_YOUR_GROWTH
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-luxury-primary tracking-tight leading-tight">
              Get Your Business Online & Automated Today.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-luxury-cream font-medium leading-relaxed max-w-lg font-sans">
              We design premium, highly trustworthy mobile apps, custom ERP panels, websites, and official WhatsApp systems built specifically for Indian market conversion. Reach out now for start-up ideas or legacy automation quotes with 1 Month Free 24/7 AMC support.
            </p>

            <div className="text-xs font-semibold text-[#1E2A38]/90 font-sans">
              Or email us directly: <a href="mailto:Ruextech@gmail.com" className="text-[#5B8EDB] hover:underline transition-colors font-bold">Ruextech@gmail.com</a>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-accent text-[#6B7E93] uppercase tracking-wide font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> 100% SECURE NDA & CODE OWNERSHIP ASSURED
            </div>
          </div>

          {/* Secure Interactive Email Frame Column */}
          <div className="lg:col-span-12 xl:col-span-6">
            <div className="rounded-2xl border border-slate-200/50 p-6 lg:p-8 bg-white/95 shadow-sm relative">
              <AnimatePresence mode="wait">
                {formDataState !== "success" ? (
                  <motion.form
                    key="booking-form"
                    onSubmit={triggerFormSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Header */}
                    <div className="border-b border-slate-200/50 pb-4 mb-3">
                      <span className="text-[9px] font-accent uppercase tracking-[2px] text-blue-600 block mb-1 font-semibold">
                        INCOMING_DISCOVERY_AUDIT
                      </span>
                      <h3 className="font-display font-extrabold text-sm text-luxury-primary">
                        Submit Software Preference Brief
                      </h3>
                    </div>

                    {/* Email / Contact Input */}
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-accent uppercase text-[#6B7E93] tracking-wider font-semibold">
                        Business Email Address / Contact Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          placeholder="rajesh@singhaniadistributors.com or +91 9876543210"
                          className="w-full bg-white border border-slate-250/60 rounded-xl px-4 py-3 text-xs text-luxury-primary focus:outline-none focus:border-blue-500/50 placeholder-slate-400 font-sans font-medium"
                        />
                      </div>
                    </div>

                    {/* Requirement selector Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-accent uppercase text-[#6B7E93] tracking-wider font-semibold">
                        Primary System Requirement
                      </label>
                      <select
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        className="w-full bg-white border border-slate-250/60 rounded-xl px-4 py-3 text-xs text-luxury-primary focus:outline-none focus:border-blue-500/50 cursor-pointer font-sans font-medium"
                      >
                        <option value="web-app">Premium Custom Web App / Portal</option>
                        <option value="mobile-app">Responsive Native Mobile App (Android/iOS APK)</option>
                        <option value="erp-crm">Enterprise ERP System & CRM Database</option>
                        <option value="whatsapp-bot">Official Meta WhatsApp API Bot & Alerts</option>
                        <option value="other">Bespoke Custom Software Consultation</option>
                      </select>
                    </div>

                    {/* Optional Query/Booking Details */}
                    <div className="space-y-1.5">
                      <label className="text-[9.5px] font-accent uppercase text-[#6B7E93] tracking-wider font-semibold">
                        Detailed Query / Booking Guidelines (Optional)
                      </label>
                      <div className="relative">
                        <textarea
                          rows={3}
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Briefly state your feature ideas, startup specifications, or custom questions..."
                          className="w-full bg-white border border-slate-250/60 rounded-xl px-4 py-3 text-xs text-luxury-primary focus:outline-none focus:border-blue-500/50 placeholder-slate-400 font-sans font-medium resize-none"
                        />
                      </div>
                    </div>

                    {/* CTA Action button */}
                    <button
                      type="submit"
                      disabled={formDataState === "sending"}
                      className="w-full group relative flex items-center justify-center gap-1.5 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-semibold hover:text-white font-accent text-white tracking-wider transition-all duration-300 cursor-pointer overflow-hidden mt-3 shadow-[0_12px_24px_rgba(30,42,56,0.1)] flex items-center"
                    >
                      <span className="relative z-10 flex items-center gap-1 text-white group-hover:scale-[1.01] transition-transform font-bold">
                        {formDataState === "sending" ? "TRANSMITTING TELEMETRY..." : "REQUEST FREE ESTIMATION CALL"}
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white/90" />
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-prompt"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                      <ShieldCheck className="w-6 h-6 animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-accent tracking-widest text-[#5B8EDB] font-semibold block">
                        {bookingHash}
                      </span>
                      <h3 className="font-display font-extrabold text-2xl text-luxury-primary">
                        Contact Compiled.
                      </h3>
                      <p className="text-xs text-luxury-cream font-medium leading-relaxed max-w-sm mx-auto font-sans">
                        Your software preference brief has been compiled. We have opened a WhatsApp conversation to transmit your booking details from source contact <span className="text-[#5B8EDB] font-semibold">{contactInfo}</span> to our team.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 py-4 px-4 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 font-semibold text-white tracking-wide text-xs transition-all duration-300 shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
                      >
                        Launch WhatsApp Chat Manually
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </a>
                      
                      <p className="text-[10px] text-[#9AADBE] font-sans">
                        If WhatsApp did not trigger automatically, click the button above to manually prompt the secure chat interface.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl font-mono text-[9px] text-[#6B7E93] font-semibold">
                      AUDIT PROTOCOL DEPLOYED AT WA_GATEWAY
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
