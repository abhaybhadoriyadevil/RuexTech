import { motion } from "motion/react";

interface RuexLogoProps {
  layout?: "horizontal" | "vertical" | "iconOnly";
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function RuexLogo({
  layout = "horizontal",
  size = 44,
  animate = true,
  className = "",
}: RuexLogoProps) {
  // Define positions for nodes inside the 100x100 logo container (bound to a circle centered at 50,50 with radius ~32)
  const nodes = [
    { id: "A", x: 42, y: 34, delay: 0.1, duration: 1.8 },
    { id: "B", x: 58, y: 31, delay: 0.3, duration: 2.1 },
    { id: "C", x: 31, y: 46, delay: 0.5, duration: 2.3 },
    { id: "D", x: 49, y: 51, delay: 0.2, duration: 1.9 },
    { id: "E", x: 69, y: 44, delay: 0.4, duration: 2.2 },
    { id: "F", x: 37, y: 64, delay: 0.6, duration: 2.0 },
    { id: "G", x: 57, y: 66, delay: 0.3, duration: 2.4 },
    { id: "H", x: 49, y: 75, delay: 0.7, duration: 1.7 },
  ];

  // Connection links between nodes
  const links = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "A", to: "D" },
    { from: "B", to: "D" },
    { from: "B", to: "E" },
    { from: "C", to: "D" },
    { from: "C", to: "F" },
    { from: "D", to: "E" },
    { from: "D", to: "F" },
    { from: "D", to: "G" },
    { from: "E", to: "G" },
    { from: "F", to: "G" },
    { from: "F", to: "H" },
    { from: "G", to: "H" },
  ];

  // Helper to find node coordinates
  const findNode = (id: string) => nodes.find((n) => n.id === id) || { x: 50, y: 50 };

  // Define 8 radial drift particles for continuous outer flare spreading without touch
  const driftParticles = [
    { id: 1, angle: 0, rStart: 38, rEnd: 55, delay: 0.0, dur: 3.5 },
    { id: 2, angle: 45, rStart: 38, rEnd: 58, delay: 0.8, dur: 4.0 },
    { id: 3, angle: 110, rStart: 38, rEnd: 56, delay: 0.3, dur: 3.2 },
    { id: 4, angle: 170, rStart: 38, rEnd: 57, delay: 1.5, dur: 3.8 },
    { id: 5, angle: 220, rStart: 38, rEnd: 59, delay: 0.5, dur: 3.4 },
    { id: 6, angle: 275, rStart: 38, rEnd: 55, delay: 2.1, dur: 4.2 },
    { id: 7, angle: 315, rStart: 38, rEnd: 57, delay: 1.0, dur: 3.6 },
    { id: 8, angle: 90, rStart: 38, rEnd: 58, delay: 1.8, dur: 3.0 },
  ];

  const getParticleDrift = (p: { angle: number; rStart: number; rEnd: number }) => {
    const rad = (p.angle * Math.PI) / 180;
    const x1 = 50 + Math.cos(rad) * p.rStart;
    const y1 = 50 + Math.sin(rad) * p.rStart;
    const x2 = 50 + Math.cos(rad) * p.rEnd;
    const y2 = 50 + Math.sin(rad) * p.rEnd;
    return { x1, y1, x2, y2 };
  };

  const iconMarkup = (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Basal soft shadow for 3D realism */}
      <motion.div
        className="absolute bottom-[-5%] left-[10%] right-[10%] h-[12%] rounded-full bg-blue-500/15 filter blur-xs pointer-events-none"
        animate={
          animate
            ? {
                scale: [1, 1.08, 1],
                opacity: [0.6, 0.9, 0.6],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main sphere volume color gradient */}
          <radialGradient id="ruex-globe-bg" cx="50%" cy="50%" r="50%" fx="35%" fy="35%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#A8E6FF" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#5B8EDB" stopOpacity="0.65" />
            <stop offset="85%" stopColor="#8B6BD8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1E2A38" stopOpacity="0.8" />
          </radialGradient>

          {/* Holographic glowing center */}
          <radialGradient id="ruex-core-glow" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#4BBFDF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#5B8EDB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B6BD8" stopOpacity="0" />
          </radialGradient>

          {/* 3D Glass specular reflections */}
          <linearGradient id="ruex-glass-shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#5B8EDB" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="text-gradient-ruex" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8ec5f5" />
            <stop offset="50%" stopColor="#5b8edb" />
            <stop offset="100%" stopColor="#7b9de8" />
          </linearGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="50%" cy="50%" r="48%" fill="url(#ruex-core-glow)" className="opacity-70 filter blur-xs" />

        {/* Outer subtle halo ring */}
        <circle cx="50%" cy="50%" r="43%" stroke="#93C5FD" strokeOpacity="0.2" strokeWidth="0.75" />

        {/* Outer subtle halo spinning dashboard ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#93C5FD"
          strokeOpacity="0.4"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          style={{ transformOrigin: "50px 50px" }}
          animate={animate ? { rotate: -360 } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* The main crystal body */}
        <circle cx="50%" cy="50%" r="42%" fill="url(#ruex-globe-bg)" />

        {/* REVOLVING INNER NETWORK DEEP SPHERE ENGINE */}
        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          animate={
            animate
              ? {
                  rotate: [0, 360],
                }
              : {}
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* INNER NETWORK - LINES */}
          <g>
            {links.map((link, idx) => {
              const nodeFrom = findNode(link.from);
              const nodeTo = findNode(link.to);
              return (
                <motion.line
                  key={`link-${idx}`}
                  x1={nodeFrom.x}
                  y1={nodeFrom.y}
                  x2={nodeTo.x}
                  y2={nodeTo.y}
                  stroke="#FFFFFF"
                  strokeOpacity={0.4}
                  strokeWidth={0.8}
                  initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.4 }}
                  animate={
                    animate
                      ? {
                          pathLength: [0, 1, 1, 0],
                          opacity: [0.1, 0.45, 0.45, 0.1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: idx * 0.15,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </g>

          {/* INNER NETWORK - NODES (PULSATING GLOWS) */}
          <g>
            {nodes.map((node) => (
              <g key={`node-group-${node.id}`}>
                {/* Halos */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="3.5"
                  fill="#FFFFFF"
                  className="opacity-20"
                  animate={
                    animate
                      ? {
                          scale: [1, 1.8, 1],
                          opacity: [0.1, 0.4, 0.1],
                        }
                      : {}
                  }
                  transition={{
                    duration: node.duration,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut",
                  }}
                />
                {/* Core solid bullet */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="1.25"
                  fill="#FFFFFF"
                  animate={
                    animate
                      ? {
                          scale: [0.9, 1.25, 0.9],
                          opacity: [0.75, 1, 0.75],
                        }
                      : {}
                  }
                  transition={{
                    duration: node.duration,
                    repeat: Infinity,
                    delay: node.delay,
                    ease: "easeInOut",
                  }}
                />
              </g>
            ))}
          </g>
        </motion.g>

        {/* Specular highlighting to create 3D glassware depth */}
        <circle cx="50%" cy="50%" r="42%" fill="url(#ruex-glass-shine)" />

        {/* Upper Left Curved Specular Reflection Crest */}
        <path
          d="M 22 34 A 32 32 0 0 1 78 34 A 32 23 0 0 0 22 34 Z"
          fill="#FFFFFF"
          fillOpacity={0.3}
        />

        {/* SPRAY OF SUBTLE AMBIENT DRIFT PARTICLES */}
        <g>
          {driftParticles.map((p) => {
            const { x1, y1, x2, y2 } = getParticleDrift(p);
            return (
              <motion.circle
                key={`drift-particle-${p.id}`}
                cx={x1}
                cy={y1}
                r="0.8"
                fill="#93C5FD"
                animate={
                  animate
                    ? {
                        cx: [x1, x2],
                        cy: [y1, y2],
                        opacity: [0, 0.75, 0],
                        scale: [0.4, 1.2, 0.3],
                      }
                    : {}
                }
                transition={{
                  duration: p.dur,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </g>

        {/* Sparkles & Twinkling Flares floating outside */}
        <g>
          {/* Sparkle 1 */}
          <motion.path
            d="M 12 40 L 14 42 L 12 44 L 10 42 Z"
            fill="#E0F2FE"
            animate={animate ? { opacity: [0.1, 0.9, 0.1] } : { opacity: 0.5 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          {/* Sparkle 2 */}
          <motion.path
            d="M 88 48 L 90 50 L 88 52 L 86 50 Z"
            fill="#E0F2FE"
            animate={animate ? { opacity: [0.1, 0.8, 0.1] } : { opacity: 0.4 }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
          />
          {/* Sparkle 3 */}
          <motion.path
            d="M 32 18 L 33.5 19.5 L 32 21 L 30.5 19.5 Z"
            fill="#FFFFFF"
            animate={animate ? { opacity: [0.2, 0.95, 0.2], scale: [0.8, 1.2, 0.8] } : { opacity: 0.6 }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
          />
          {/* Sparkle 4 */}
          <motion.path
            d="M 72 75 L 73.5 76.5 L 72 78 L 70.5 76.5 Z"
            fill="#E0F2FE"
            animate={animate ? { opacity: [0.15, 0.75, 0.15], scale: [0.9, 1.1, 0.9] } : { opacity: 0.5 }}
            transition={{ duration: 2.0, repeat: Infinity, delay: 1.1 }}
          />
        </g>
      </svg>
    </div>
  );

  if (layout === "iconOnly") {
    return iconMarkup;
  }

  return (
    <div className={`flex items-center gap-3 ${layout === "vertical" ? "flex-col text-center" : "flex-row"} ${className}`}>
      {iconMarkup}
      <div className={`flex flex-col select-none leading-none`}>
        <div className="flex items-baseline">
          {/* "Ruex" in beautiful gradient matching the static page */}
          <span className="font-accent font-light text-[23.5px] bg-gradient-to-r from-[#8ec5f5] via-[#5b8edb] to-[#7b9de8] bg-clip-text text-transparent tracking-tight">
            Ruex
          </span>
          {/* "Tech" in dark navy */}
          <span className="font-accent font-semibold text-[23.5px] text-[#1e2a38] tracking-tight ml-[1px]">
            Tech
          </span>
        </div>
        <span className="text-[7.5px] font-accent font-light tracking-[3.8px] text-[#9AADBE] uppercase mt-[4px]">
          AI Automation
        </span>
      </div>
    </div>
  );
}
