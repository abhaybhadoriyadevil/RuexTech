import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const statuses = [
    "INITIALIZING_QUANTUM_SYNAPSE_GRID",
    "STABILIZING_NEURAL_WEIGHTS",
    "ESTABLISHING_HYPERPLANE_CONNECTIONS",
    "LOADING_SYSTEM_INTELLIGENCE_PORTAL",
    "DEPLOYMENT_READY",
  ];

  useEffect(() => {
    const start = Date.now();
    const duration = 2400; // 2.4 seconds loading for beautiful rendering

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const calculated = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(calculated));

      const statusIdx = Math.min(
        Math.floor((calculated / 100) * statuses.length),
        statuses.length - 1
      );
      setStatus(statuses[statusIdx]);

      if (calculated < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  // Canvas render loop for high-fidelity glass crystallizing sphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 560, H = 560, CX = W / 2, CY = H / 2;
    canvas.width = W;
    canvas.height = H;

    const PAL = {
      blue: [91, 142, 219],
      purple: [139, 107, 216],
      cyan: [75, 191, 223],
      soft: [168, 210, 255],
      lav: [200, 185, 242],
    };

    const rgba = (c: number[], a: number) => `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    let gT = 0;

    class P {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      angle!: number;
      orbitSpd!: number;
      life!: number;
      maxL!: number;
      sz!: number;
      col!: number[];
      trail!: {x: number; y: number}[];
      trailMax!: number;
      alpha!: number;

      constructor() {
        this.reset(true);
      }

      reset(burst = false) {
        const a = rand(0, Math.PI * 2), spd = burst ? rand(3.5, 9.5) : rand(1, 4);
        this.x = CX + rand(-16, 16);
        this.y = CY + rand(-16, 16);
        this.vx = Math.cos(a) * spd;
        this.vy = Math.sin(a) * spd;
        this.angle = a;
        this.orbitSpd = rand(0.006, 0.022) * (Math.random() > 0.5 ? 1 : -1);
        this.life = burst ? Math.floor(rand(0, 70)) : 0;
        this.maxL = rand(200, 380);
        this.sz = rand(1.4, 4.5);
        const cols = [PAL.blue, PAL.purple, PAL.cyan, PAL.soft, PAL.lav];
        this.col = cols[Math.floor(rand(0, cols.length))];
        this.trail = [];
        this.trailMax = Math.floor(rand(8, 22));
      }

      update(progVal: number) {
        this.life++;
        const lt = this.life / this.maxL;
        this.alpha = Math.pow(clamp(Math.sin(lt * Math.PI), 0, 1), 0.6) * 0.85;

        // Progress based convergence
        if (progVal < 0.6) {
          const dx = CX - this.x, dy = CY - this.y, d = Math.sqrt(dx * dx + dy * dy) + 0.1;
          const pull = 0.0005 + (progVal * 0.005);
          this.vx += (dx / d) * pull + Math.sin(this.angle) * 0.022;
          this.vy += (dy / d) * pull + Math.cos(this.angle) * 0.022;
          this.angle += this.orbitSpd;
          this.vx *= 0.977;
          this.vy *= 0.977;
        } else {
          const dx = CX - this.x, dy = CY - this.y, d = Math.sqrt(dx * dx + dy * dy) + 0.1;
          const pull = 0.04 + (progVal - 0.6) * 0.10;
          this.vx += (dx / d) * pull + (-dy / d) * 0.016 * progVal;
          this.vy += (dy / d) * pull + (dx / d) * 0.016 * progVal;
          this.angle += this.orbitSpd * (1 + progVal * 4);
          this.vx *= 0.87;
          this.vy *= 0.87;
          this.sz = this.sz * 0.93 + 0.1 * 0.07;
          this.alpha *= (1 - (progVal - 0.6) * 1.5);
        }

        this.x += this.vx;
        this.y += this.vy;
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.trailMax) this.trail.shift();
        if (this.life > this.maxL) this.reset(false);
      }

      draw() {
        if (this.alpha < 0.01 || this.sz < 0.1) return;
        const [r, g, b] = this.col;
        for (let i = 1; i < this.trail.length; i++) {
          const ta = (i / this.trail.length) * this.alpha * 0.32;
          ctx.beginPath();
          ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
          ctx.strokeStyle = `rgba(${r|0},${g|0},${b|0},${ta})`;
          ctx.lineWidth = this.sz * 0.42;
          ctx.stroke();
        }
        const gg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz * 5);
        gg.addColorStop(0, `rgba(${r|0},${g|0},${b|0},${this.alpha * 0.38})`);
        gg.addColorStop(1, `rgba(${r|0},${g|0},${b|0},0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz * 5, 0, Math.PI * 2);
        ctx.fillStyle = gg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${this.alpha * 0.95})`;
        ctx.fill();
      }
    }

    class NL {
      a1!: number;
      a2!: number;
      r1!: number;
      r2!: number;
      life!: number;
      maxL!: number;
      tA!: number;
      s1!: number;
      s2!: number;
      col!: number[];
      alpha!: number;

      constructor() {
        this.r();
      }

      r() {
        this.a1 = rand(0, Math.PI * 2);
        this.a2 = rand(0, Math.PI * 2);
        this.r1 = rand(18, 72);
        this.r2 = rand(18, 72);
        this.life = 0;
        this.maxL = rand(80, 200);
        this.tA = rand(0.12, 0.55);
        this.s1 = rand(0.004, 0.011) * (Math.random() > 0.5 ? 1 : -1);
        this.s2 = rand(0.003, 0.009) * (Math.random() > 0.5 ? 1 : -1);
        const c = [PAL.blue, PAL.purple, PAL.cyan];
        this.col = c[Math.floor(rand(0, 3))];
      }

      update() {
        this.life++;
        this.a1 += this.s1;
        this.a2 += this.s2;
        const t = this.life / this.maxL;
        this.alpha = Math.sin(t * Math.PI) * this.tA;
        if (this.life >= this.maxL) this.r();
      }

      draw(sc: number) {
        if (this.alpha < 0.01) return;
        const x1 = CX + Math.cos(this.a1) * this.r1 * sc;
        const y1 = CY + Math.sin(this.a1) * this.r1 * sc;
        const x2 = CX + Math.cos(this.a2) * this.r2 * sc;
        const y2 = CY + Math.sin(this.a2) * this.r2 * sc;
        const [r, g, b] = this.col;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${r|0},${g|0},${b|0},${this.alpha})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        [[x1, y1], [x2, y2]].forEach(([px, py]) => {
          const ng = ctx.createRadialGradient(px, py, 0, px, py, 3.5);
          ng.addColorStop(0, `rgba(${r|0},${g|0},${b|0},${this.alpha * 1.25})`);
          ng.addColorStop(1, `rgba(${r|0},${g|0},${b|0},0)`);
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = ng;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${this.alpha * 0.85})`;
          ctx.fill();
        });
      }
    }

    const parts = Array.from({ length: 95 }, () => new P());
    const nlines = Array.from({ length: 30 }, () => new NL());

    let animationId: number;

    const render = () => {
      gT++;
      // Determine prog factor from current progress logic
      const progVal = progress / 100;

      // Scaling factors representation mapping
      let sScale = 1.0;
      let sCrystal = 1.0;
      let sPulse = 0.0;

      if (progVal < 0.2) {
        sScale = progVal / 0.2;
        sCrystal = 0;
      } else if (progVal < 0.7) {
        sScale = 1.0;
        sCrystal = (progVal - 0.2) / 0.5 * 0.72;
        sPulse = (progVal - 0.2) / 0.5;
      } else {
        sScale = 1.0;
        sCrystal = 0.72 + ((progVal - 0.7) / 0.3) * 0.28;
        sPulse = 0;
      }

      ctx.clearRect(0, 0, W, H);

      // Render flowing background particles
      parts.forEach((p) => {
        p.update(progVal);
        p.draw();
      });

      // Render glass crystallizing sphere
      if (sScale > 0.01) {
        const R = 100 * sScale;

        // Halo
        const halo = ctx.createRadialGradient(CX, CY, R * 0.55, CX, CY, R * 1.9);
        halo.addColorStop(0, `rgba(91, 142, 219, ${0.10 * sCrystal})`);
        halo.addColorStop(0.4, `rgba(139, 107, 216, ${0.06 * sCrystal})`);
        halo.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(CX, CY, R * 1.9, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Orbital rings
        if (sCrystal > 0.3) {
          const rA = (sCrystal - 0.3) / 0.7;
          [[R * 1.30, R * 0.32, gT * 0.003, PAL.blue, 0.11], [R * 1.13, R * 0.25, -gT * 0.006, PAL.purple, 0.08], [R * 1.48, R * 0.18, gT * 0.002, PAL.cyan, 0.07]].forEach(([a, b, rot, col, al]) => {
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(rot as number);
            ctx.scale(1, (b as number) / (a as number));
            ctx.beginPath();
            ctx.arc(0, 0, a as number, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(col as number[], (al as number) * rA);
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          });
        }

        // Inner neural lines
        if (sCrystal > 0.2) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(CX, CY, R, 0, Math.PI * 2);
          ctx.clip();
          nlines.forEach((n) => {
            n.update();
            n.draw(sScale);
          });
          ctx.restore();
        }

        // Caustic sphere glass body
        const body = ctx.createRadialGradient(CX - R * 0.22, CY - R * 0.26, 0, CX, CY, R);
        body.addColorStop(0, `rgba(238, 245, 255, ${0.58 * sCrystal})`);
        body.addColorStop(0.38, `rgba(218, 234, 255, ${0.40 * sCrystal})`);
        body.addColorStop(0.72, `rgba(198, 218, 255, ${0.22 * sCrystal})`);
        body.addColorStop(1, `rgba(178, 200, 255, ${0.07 * sCrystal})`);
        ctx.beginPath();
        ctx.arc(CX, CY, R, 0, Math.PI * 2);
        ctx.fillStyle = body;
        ctx.fill();

        // Specular flare highlights
        const sp1 = ctx.createRadialGradient(CX - R * 0.28, CY - R * 0.34, 0, CX - R * 0.28, CY - R * 0.34, R * 0.42);
        sp1.addColorStop(0, `rgba(255, 255, 255, ${0.88 * sCrystal})`);
        sp1.addColorStop(0.4, `rgba(255, 255, 255, ${0.32 * sCrystal})`);
        sp1.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(CX, CY, R, 0, Math.PI * 2);
        ctx.fillStyle = sp1;
        ctx.fill();

        // Pulsing core
        const cR = R * 0.18 * (0.9 + Math.sin(gT * 0.04) * 0.1);
        [[2.5, 0.07, PAL.cyan], [1.75, 0.13, PAL.blue], [1.1, 0.23, PAL.purple]].forEach(([m, a, c]) => {
          const gc = ctx.createRadialGradient(CX, CY, 0, CX, CY, (cR as number) * (m as number));
          gc.addColorStop(0, rgba(c as number[], (a as number) * sCrystal));
          gc.addColorStop(1, rgba(c as number[], 0));
          ctx.beginPath();
          ctx.arc(CX, CY, (cR as number) * (m as number), 0, Math.PI * 2);
          ctx.fillStyle = gc;
          ctx.fill();
        });

        // External pulse ring
        if (sPulse > 0.08) {
          for (let i = 0; i < 4; i++) {
            const prFactor = (gT * 0.09 + i * 0.75) % (Math.PI * 2);
            const progRing = Math.sin(prFactor) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(CX, CY, R * (0.5 + progRing * 0.75), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(91, 142, 219, ${(1 - progRing) * 0.28 * sPulse})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        // Rim border
        const border = ctx.createLinearGradient(CX - R, CY - R, CX + R, CY + R);
        border.addColorStop(0, `rgba(255, 255, 255, ${0.58 * sCrystal})`);
        border.addColorStop(0.45, `rgba(180, 210, 255, ${0.28 * sCrystal})`);
        border.addColorStop(1, `rgba(130, 170, 230, ${0.42 * sCrystal})`);
        ctx.beginPath();
        ctx.arc(CX, CY, R, 0, Math.PI * 2);
        ctx.strokeStyle = border;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader-container"
        id="applet-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 md:p-12 select-none"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 42%, #dce8f8 0%, #e8eef8 35%, #eef2f9 65%, #f0f4fa 100%)"
        }}
      >
        {/* Background neon elements */}
        <div className="absolute w-[520px] h-[520px] rounded-full bg-blue-500/10 filter blur-[90px] pointer-events-none top-[-130px] left-[-160px] animate-pulse-slow" />
        <div className="absolute w-[420px] h-[420px] rounded-full bg-purple-500/10 filter blur-[90px] pointer-events-none bottom-[-90px] right-[-110px] animate-pulse-slow" />

        {/* Empty balancing spacer */}
        <div />

        {/* Center Progress with Canvas & Title */}
        <div className="flex flex-col items-center select-none text-center relative z-10">
          <div className="relative flex items-center justify-center -mb-8">
            <canvas ref={canvasRef} className="block w-[280px] h-[280px]" />
          </div>

          {/* RuexTech Brand Header */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-6 flex flex-col items-center"
          >
            <div className="flex items-baseline">
              <span className="font-accent font-light text-5xl tracking-tight bg-gradient-to-r from-[#8ec5f5] via-[#5b8edb] to-[#7b9de8] bg-clip-text text-transparent">
                Ruex
              </span>
              <span className="font-accent font-semibold text-5xl text-[#1e2a38] tracking-tight ml-[1px]">
                Tech
              </span>
            </div>
            <p className="text-[10px] font-accent font-light tracking-[5px] text-[#9AADBE] uppercase mt-2 select-none">
              AI Automation Agency
            </p>
          </motion.div>
        </div>

        {/* Bottom Progress Label & Track */}
        <div className="w-full max-w-sm flex flex-col justify-center items-center gap-3 relative z-10">
          <div className="w-[160px] h-[1px] bg-[#9AADBE]/18 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF]"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
          <div className="w-full text-center text-[10px] font-accent font-light tracking-[3px] text-[#9AADBE]/50 uppercase mt-1">
            {status} ({progress}%)
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
