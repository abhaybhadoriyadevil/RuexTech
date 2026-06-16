import { useState } from "react";
import { motion } from "motion/react";
import { Chrome, Users, MessageSquareCode, ShieldCheck, Play } from "lucide-react";

export default function WebDevSummary() {
  const [activeConsoleTab, setActiveConsoleTab] = useState<"logs" | "control">("logs");
  const [isAgentRunning, setIsAgentRunning] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState("whatsapp");
  const [userCustomDirective, setUserCustomDirective] = useState("");
  const [testResponseLogs, setTestResponseLogs] = useState<string[]>([
    "SYS_INIT_SEQUENCE_SUCCESS",
    "ESTABLISHING SECURE DATABASE CONNECTIVITY SUITE",
    "INGESTING INVENTORY AND WHOLESALE CHANNELS",
    "WHATSAPP_BOT: Synchronized 42 active retailer orders... COMPLETED",
    "Awaiting next operational directive query..."
  ]);

  const triggerCustomDirective = () => {
    if (!userCustomDirective.trim()) return;
    
    const newLogs = [
      ...testResponseLogs,
      `USER_DIRECTIVE: "${userCustomDirective}"`,
      `SYS_PROCESSING: Spawning routing triggers for "${userCustomDirective.slice(0,25)}..."`,
      "DATABASE_NODE: Locking transactional rows securely...",
      "WHATSAPP_GATEWAY: Broadcast dispatched. Status: SUCCESS [Client ping 110ms]"
    ];
    setTestResponseLogs(newLogs);
    setUserCustomDirective("");
  };

  return (
    <section id="web-summary" className="relative py-20 md:py-32 w-full px-4 md:px-12 z-10 grid-overlay bg-luxury-black text-left">
      {/* Background decoration blur */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Typographic side with slide-in */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 xl:col-span-5 space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/10 bg-blue-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] font-accent tracking-[4px] text-blue-600 font-semibold uppercase">
                COGNITIVE_PORTALS
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-luxury-primary tracking-tight leading-tight">
              Intuitive client portals designed for full business control.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-luxury-cream font-medium leading-relaxed font-sans">
              We do not restrict your business backend to confusing terminal code. We design fully functional custom visual dashboards where administrators can manage stock status live, view instant sales charts, trigger client-alert WhatsApp campaigns, and supervise auto-billing with zero technical knowledge.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-xs text-luxury-cream font-accent font-semibold uppercase">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> HUMAN-IN-THE-LOOP SAFEGUARDS
              </li>
              <li className="flex items-center gap-3 text-xs text-luxury-cream font-accent font-semibold uppercase">
                <Users className="w-4 h-4 text-blue-600" /> INTUITIVE MULTI-USER ACCESS ROLES
              </li>
              <li className="flex items-center gap-3 text-xs text-luxury-cream font-accent font-semibold uppercase">
                <MessageSquareCode className="w-4 h-4 text-blue-600" /> LIVE EXPORTABLE SYSTEM LOGS
              </li>
            </ul>
          </motion.div>

          {/* Interactive Portal Simulator Side */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="w-full rounded-2xl glass-panel relative overflow-hidden border border-slate-200/50 shadow-lg bg-white/70 backdrop-blur-xl">
              
              {/* Simulator Header Bar */}
              <div className="bg-slate-55/50 border-b border-slate-200/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Chrome className="w-3.5 h-3.5 text-luxury-soft-blue" />
                  <span className="text-[10px] font-accent tracking-widest text-[#6B7E93] uppercase font-semibold">
                    RuexTech Command Console Simulator
                  </span>
                </div>
                {/* Active Indicator status */}
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isAgentRunning ? "bg-emerald-500 animate-pulse" : "bg-red-400"}`} />
                  <span className="text-[9px] font-accent text-[#6B7E93] uppercase font-semibold">
                    {isAgentRunning ? "ROUTING_ACTIVE" : "STANDBY"}
                  </span>
                </div>
              </div>

              {/* Mock Dashboard Layout */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Simulated Quick Analytics Tiles */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200/55 bg-white shadow-sm text-left">
                    <span className="text-[8px] font-accent text-[#6B7E93] uppercase block font-semibold tracking-wider">NODE_SPEED</span>
                    <span className="font-display font-extrabold text-base text-blue-600 block mt-0.5">1.2ms</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200/55 bg-white shadow-sm text-left">
                    <span className="text-[8px] font-accent text-[#6B7E93] uppercase block font-semibold tracking-wider">ACTIVE_NODES</span>
                    <span className="font-display font-extrabold text-base text-purple-600 block mt-0.5">3 Swarms</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200/55 bg-white shadow-sm text-left">
                    <span className="text-[8px] font-accent text-[#6B7E93] uppercase block font-semibold tracking-wider">DATABASE_SSL</span>
                    <span className="font-display font-extrabold text-base text-emerald-600 block mt-0.5">99.98%</span>
                  </div>
                </div>

                {/* Inner simulator interactive box */}
                <div className="rounded-xl border border-slate-200/55 overflow-hidden bg-slate-50 font-mono text-[10px]">
                  
                  {/* Console Tabs */}
                  <div className="flex border-b border-slate-200/55 bg-slate-100/50">
                    <button
                      onClick={() => setActiveConsoleTab("logs")}
                      className={`px-4 md:px-5 py-2.5 border-r border-slate-200/55 text-[9px] font-accent font-semibold tracking-wider uppercase cursor-pointer select-none ${
                        activeConsoleTab === "logs" ? "text-blue-600 bg-white" : "text-[#6B7E93]"
                      }`}
                    >
                      Console Logs
                    </button>
                    <button
                      onClick={() => setActiveConsoleTab("control")}
                      className={`px-4 md:px-5 py-2.5 border-r border-slate-200/55 text-[9px] font-accent font-semibold tracking-wider uppercase cursor-pointer select-none ${
                        activeConsoleTab === "control" ? "text-blue-600 bg-white" : "text-[#6B7E93]"
                      }`}
                    >
                      Control Center
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="p-4 h-48 overflow-y-auto flex flex-col justify-between hide-scrollbar gap-4 bg-slate-50 text-left">
                    {activeConsoleTab === "logs" ? (
                      <div className="space-y-1 text-slate-600 select-text leading-relaxed font-mono">
                        {testResponseLogs.map((log, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="text-blue-500/50 font-semibold">[{1000 + i}]</span>
                            <span className={log.startsWith("USER_DIRECTIVE") ? "text-blue-600 font-bold" : ""}>{log}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[#374455] font-semibold font-accent">Select Swarm template:</span>
                          <select
                            value={selectedAgent}
                            onChange={(e) => setSelectedAgent(e.target.value)}
                            className="bg-white border border-slate-200 text-[10px] text-luxury-primary py-1 px-2.5 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="whatsapp">Meridian Automated Requester</option>
                            <option value="retention">Volta Churn retention sequence</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#374455] font-semibold font-[Satoshi]">Live System Webhook Switch:</span>
                          <button
                            onClick={() => setIsAgentRunning(!isAgentRunning)}
                            className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-300 relative cursor-pointer ${
                              isAgentRunning ? "bg-emerald-500" : "bg-slate-350"
                            }`}
                          >
                            <div className={`w-4.5 h-4.5 bg-white rounded-full transition-all duration-300 ${
                              isAgentRunning ? "translate-x-4.5" : "translate-x-0"
                            }`} />
                          </button>
                        </div>

                        <p className="text-slate-400 leading-relaxed text-[8.5px] font-accent uppercase tracking-wider font-semibold">
                          *These adjustments instantly synchronize with secure cloud servers and APIs in direct installations.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Prompt directive custom interaction box */}
                <div className="flex gap-2 font-mono">
                  <input
                    type="text"
                    value={userCustomDirective}
                    onChange={(e) => setUserCustomDirective(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && triggerCustomDirective()}
                    placeholder="Try writing 'send WhatsApp stock alert' or 'test DB query'..."
                    className="flex-1 bg-white border border-slate-250/50 rounded-lg px-3.5 py-2.5 text-xs text-luxury-primary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 placeholder-slate-400"
                  />
                  <button
                    onClick={triggerCustomDirective}
                    className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-600 transition-all cursor-pointer flex items-center justify-center animate-pulse"
                  >
                    <Play className="w-3.5 h-3.5 fill-blue-500 text-blue-600" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
