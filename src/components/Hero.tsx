import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const isMobile = () => window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mobile] = useState(() => isMobile());

  // Implement the high-end 3D canvas simulation node network exactly as requested
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = canvas.clientWidth;
    let H = canvas.height = canvas.clientHeight;
    let CX = W / 2;
    let CY = H / 2;
    let R = Math.min(W, H) * 0.27;

    let t = 0;
    const mouse = { nx: 0, ny: 0, inside: false };
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollZ = 1;
    let targetScrollZ = 1;
    let hoverI = 0;
    let targetHoverI = 0;

    const PI = Math.PI, TAU = PI * 2;
    const sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, abs = Math.abs, atan2 = Math.atan2;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    const lerp = (a: number, b: number, factor: number) => a + (b - a) * factor;
    const ease3 = (factor: number) => 1 - Math.pow(1 - factor, 3);
    const rgba = (c: number[], a: number) => `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
    const lerp3 = (a: number[], b: number[], factor: number): number[] => [
      a[0] + (b[0] - a[0]) * factor,
      a[1] + (b[1] - a[1]) * factor,
      a[2] + (b[2] - a[2]) * factor
    ];

    const PAL = {
      blue: [91, 142, 219],
      purple: [139, 107, 216],
      cyan: [75, 191, 223],
      soft: [168, 210, 255],
      lav: [200, 185, 242]
    };

    const handleResize = () => {
      W = canvas.width = canvas.clientWidth;
      H = canvas.height = canvas.clientHeight;
      CX = W / 2;
      CY = H / 2;
      R = Math.min(W, H) * 0.27;
    };
    window.addEventListener("resize", handleResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.nx = (clientX - CX) / CX;
      mouse.ny = (clientY - CY) / CY;
      tilt.tx = mouse.ny * 0.22;
      tilt.ty = -mouse.nx * 0.22;

      const d = sqrt((clientX - CX) ** 2 + (clientY - CY) ** 2);
      mouse.inside = d < R * scrollZ * 1.15;
      targetHoverI = mouse.inside ? 1 : 0;
    };
    window.addEventListener("mousemove", onMouseMove);

    function project3D(px: number, py: number, pz: number) {
      const cosX = cos(tilt.x), sinX = sin(tilt.x), cosY = cos(tilt.y), sinY = sin(tilt.y);
      const rx1 = px * cosY - pz * sinY;
      const rz1 = px * sinY + pz * cosY;
      const ry2 = py * cosX - rz1 * sinX;
      const rz2 = py * sinX + rz1 * cosX;
      return { x: CX + rx1 * scrollZ, y: CY + ry2 * scrollZ, z: rz2 };
    }

    class Node {
      ox: number;
      oy: number;
      oz: number;
      phase: number;
      speed: number;
      size: number;
      hue: number;
      conns: number[];
      sigT: number;
      sigS: number;

      constructor() {
        const depth = rand(0.1, 1), theta = rand(0, Math.PI * 2), phi = Math.acos(rand(-1, 1)), r = R * depth;
        this.ox = r * sin(phi) * cos(theta);
        this.oy = r * sin(phi) * sin(theta);
        this.oz = r * cos(phi);
        this.phase = rand(0, Math.PI * 2);
        this.speed = rand(0.003, 0.009);
        this.size = rand(0.8, 2.8) * depth;
        this.hue = Math.random();
        this.conns = [];
        this.sigT = rand(0, Math.PI * 2);
        this.sigS = rand(0.005, 0.018);
      }

      get col() {
        return this.hue < 0.4 ? PAL.blue : this.hue < 0.7 ? PAL.purple : PAL.cyan;
      }

      pulse(time: number) {
        return 0.6 + sin(time * this.speed + this.phase) * 0.4;
      }
    }

    // Build neural connection schema representation — reduced count for performance
    const N = mobile ? 0 : 60;
    const nodes = Array.from({ length: N }, () => new Node());
    nodes.forEach((n, i) => {
      nodes.forEach((m, j) => {
        if (i >= j) return;
        const d = sqrt((n.ox - m.ox) ** 2 + (n.oy - m.oy) ** 2 + (n.oz - m.oz) ** 2);
        if (d < R * 0.44 && n.conns.length < 4) n.conns.push(j);
      });
    });

    class HeroParticle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      life!: number;
      maxL!: number;
      sz!: number;
      col!: number[];
      ph!: number;

      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        const a = rand(0, Math.PI * 2), d = R * rand(0.9, 2.4);
        this.x = CX + cos(a) * d;
        this.y = CY + sin(a) * d;
        if (init) {
          this.x = CX + rand(-W * 0.5, W * 0.5);
          this.y = CY + rand(-H * 0.5, H * 0.5);
        }
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4 - 0.15;
        this.life = 0;
        this.maxL = rand(120, 280);
        this.sz = rand(0.8, 2.5);
        const c = [PAL.blue, PAL.purple, PAL.cyan, PAL.soft, PAL.lav];
        this.col = c[Math.floor(rand(0, 5))];
        this.ph = rand(0, Math.PI * 2);
      }

      update() {
        if (hoverI > 0.3) {
          const dx = CX - this.x, dy = CY - this.y, d = sqrt(dx * dx + dy * dy);
          this.vx += (dx / d) * 0.016 * hoverI;
          this.vy += (dy / d) * 0.016 * hoverI;
        }
        this.vx *= 0.985;
        this.vy *= 0.985;
        this.x += this.vx + sin(t * 0.006 + this.ph) * 0.14;
        this.y += this.vy;
        if (++this.life > this.maxL) this.reset();
      }

      draw() {
        const prog = this.life / this.maxL, a = sin(prog * Math.PI) * (0.22 + hoverI * 0.3);
        if (a < 0.01) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
        ctx.fillStyle = rgba(this.col, a);
        ctx.fill();
      }
    }

    const heroParts = Array.from({ length: mobile ? 0 : 35 }, () => new HeroParticle());

    class Burst {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxL: number;
      sz: number;
      col: number[];

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const a = rand(0, Math.PI * 2), s = rand(1.5, 4.5);
        this.vx = cos(a) * s;
        this.vy = sin(a) * s;
        this.life = 0;
        this.maxL = rand(28, 55);
        this.sz = rand(1, 3.5);
        const c = [PAL.blue, PAL.cyan, PAL.lav, PAL.purple];
        this.col = c[Math.floor(rand(0, 4))];
      }

      update() {
        this.vx *= 0.93;
        this.vy *= 0.93;
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
      }

      draw() {
        const p = this.life / this.maxL, a = (1 - ease3(p)) * 0.65;
        if (a < 0.01) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz * (1 - p * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = rgba(this.col, a);
        ctx.fill();
      }

      get dead() {
        return this.life >= this.maxL;
      }
    }

    let bursts: Burst[] = [];

    const handleCanvasClick = (e: MouseEvent) => {
      if (mouse.inside) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        for (let i = 0; i < 15; i++) {
          bursts.push(new Burst(clientX, clientY));
        }
      }
    };
    canvas.addEventListener("click", handleCanvasClick);

    function drawAtmos() {
      const sc = R * scrollZ, pb = 0.85 + sin(t * 0.008) * 0.08 + hoverI * 0.1;
      const h = ctx.createRadialGradient(CX, CY, sc * 0.7, CX, CY, sc * 1.85);
      h.addColorStop(0, `rgba(91, 142, 219, ${0.06 * pb})`);
      h.addColorStop(0.4, `rgba(139, 107, 216, ${0.04 * pb})`);
      h.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = h;
      ctx.beginPath();
      ctx.arc(CX, CY, sc * 1.85, 0, Math.PI * 2);
      ctx.fill();

      [[sc * 1.32, sc * 0.36, t * 0.004, PAL.blue, 0.09], [sc * 1.16, sc * 0.30, -t * 0.006, PAL.purple, 0.07], [sc * 1.5, sc * 0.2, t * 0.003, PAL.cyan, 0.06]].forEach(([a, b, rot, col, alpha]) => {
        ctx.save();
        ctx.translate(CX, CY);
        ctx.rotate(rot as number);
        ctx.scale(1, (b as number) / (a as number));
        ctx.beginPath();
        ctx.arc(0, 0, a as number, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(col as number[], (alpha as number) + hoverI * 0.05);
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.restore();
      });

      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(t * 0.005);
      ctx.scale(1, 0.28);
      ctx.setLineDash([3, 16]);
      ctx.beginPath();
      ctx.arc(0, 0, sc * 1.22, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(91, 142, 219, ${0.1 + hoverI * 0.07})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawHeroSphere() {
      const sc = R * scrollZ;
      const body = ctx.createRadialGradient(CX - sc * 0.24, CY - sc * 0.3, 0, CX, CY, sc);
      body.addColorStop(0, `rgba(240, 246, 255, ${0.52 + hoverI * 0.1})`);
      body.addColorStop(0.35, `rgba(220, 235, 255, ${0.38 + hoverI * 0.08})`);
      body.addColorStop(0.7, "rgba(200, 218, 255, 0.20)");
      body.addColorStop(1, "rgba(180, 200, 255, 0.07)");
      ctx.beginPath();
      ctx.arc(CX, CY, sc, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      if (hoverI > 0.01) {
        const hg = ctx.createRadialGradient(CX, CY, 0, CX, CY, sc);
        hg.addColorStop(0, `rgba(91, 142, 219, ${0.04 * hoverI})`);
        hg.addColorStop(0.5, `rgba(139, 107, 216, ${0.03 * hoverI})`);
        hg.addColorStop(1, "rgba(75, 191, 223, 0)");
        ctx.beginPath();
        ctx.arc(CX, CY, sc, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();
      }

      const rim = ctx.createRadialGradient(CX, CY, sc * 0.82, CX, CY, sc);
      rim.addColorStop(0, "rgba(255, 255, 255, 0)");
      rim.addColorStop(0.6, `rgba(220, 235, 255, ${0.16 + hoverI * 0.12})`);
      rim.addColorStop(1, `rgba(255, 255, 255, ${0.3 + hoverI * 0.15})`);
      ctx.beginPath();
      ctx.arc(CX, CY, sc, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      const s1 = ctx.createRadialGradient(CX - sc * 0.3, CY - sc * 0.36, 0, CX - sc * 0.3, CY - sc * 0.36, sc * 0.4);
      s1.addColorStop(0, `rgba(255, 255, 255, ${0.7 + hoverI * 0.1})`);
      s1.addColorStop(0.45, "rgba(255, 255, 255, 0.25)");
      s1.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(CX, CY, sc, 0, Math.PI * 2);
      ctx.fillStyle = s1;
      ctx.fill();

      const gb = ctx.createLinearGradient(CX - sc, CY - sc, CX + sc, CY + sc);
      gb.addColorStop(0, `rgba(255, 255, 255, ${0.45 + hoverI * 0.15})`);
      gb.addColorStop(0.4, `rgba(200, 220, 255, ${0.18 + hoverI * 0.12})`);
      gb.addColorStop(1, `rgba(180, 200, 240, ${0.32 + hoverI * 0.1})`);
      ctx.beginPath();
      ctx.arc(CX, CY, sc, 0, Math.PI * 2);
      ctx.strokeStyle = gb;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    type ProjectedNode = {
      x: number;
      y: number;
      z: number;
      d01: number;
      size: number;
      alpha: number;
      node: Node;
    };

    function drawHeroNet() {
      const sc = R * scrollZ;
      const ar = t * 0.004, cA = cos(ar), sA = sin(ar);

      const proj: ProjectedNode[] = nodes.map((n) => {
        const rx = n.ox * cA - n.oz * sA;
        const rz = n.ox * sA + n.oz * cA;
        const p = project3D(rx, n.oy, rz);
        const d01 = (p.z / R + 1) * 0.5;
        return {
          x: p.x,
          y: p.y,
          z: p.z,
          d01,
          size: n.size * scrollZ * (0.6 + d01 * 0.8),
          alpha: 0.15 + d01 * 0.7,
          node: n
        };
      }).sort((a, b) => a.z - b.z);

      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, sc, 0, Math.PI * 2);
      ctx.clip();

      // Connections
      proj.forEach((p) => {
        p.node.conns.forEach((j) => {
          const q = proj.find((pp) => pp.node === nodes[j]);
          if (!q) return;
          const alpha = Math.min(p.alpha, q.alpha) * 0.2 * (0.6 + hoverI * 0.5);
          if (alpha < 0.01) return;

          p.node.sigT = (p.node.sigT + p.node.sigS) % (Math.PI * 2);
          const sp = (sin(p.node.sigT) + 1) * 0.5;
          const grd = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
          const cA2 = p.node.col, cB = q.node.col;

          grd.addColorStop(0, rgba(cA2, alpha));
          grd.addColorStop(sp, rgba(lerp3(cA2, cB, sp), alpha * (2.2 + hoverI * 1.5)));
          grd.addColorStop(1, rgba(cB, alpha));

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = grd;
          ctx.lineWidth = 0.5 + hoverI * 0.3;
          ctx.stroke();
        });
      });

      // Node dots
      proj.forEach((p) => {
        if (p.alpha < 0.05) return;
        const r = Math.max(0.5, p.size * p.node.pulse(t));
        const col = p.node.col;
        const a = p.alpha * (0.5 + hoverI * 0.4);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5);
        g.addColorStop(0, rgba(col, a * 0.32));
        g.addColorStop(1, rgba(col, 0));
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(col, a * 0.85);
        ctx.fill();
      });

      ctx.restore();
    }

    function drawHeroCore() {
      const sc = R * scrollZ, cR = sc * 0.18, cp = 0.9 + sin(t * 0.022) * 0.1 + hoverI * 0.15, cr = cR * cp;
      [[2.8, 0.06, PAL.cyan], [1.9, 0.1, PAL.blue], [1.2, 0.18, PAL.purple]].forEach(([m, a, c]) => {
        const gc = ctx.createRadialGradient(CX, CY, 0, CX, CY, (cr as number) * (m as number));
        gc.addColorStop(0, rgba(c as number[], (a as number) + hoverI * 0.08));
        gc.addColorStop(1, rgba(c as number[], 0));
        ctx.beginPath();
        ctx.arc(CX, CY, (cr as number) * (m as number), 0, Math.PI * 2);
        ctx.fillStyle = gc;
        ctx.fill();
      });

      for (let ring = 0; ring < 3; ring++) {
        ctx.save();
        ctx.translate(CX, CY);
        ctx.rotate(t * (0.012 + ring * 0.006) * (ring % 2 ? -1 : 1));
        ctx.scale(1, 0.45);
        ctx.beginPath();
        ctx.arc(0, 0, cr * (0.5 + ring * 0.25), 0, Math.PI * 2);
        ctx.strokeStyle = rgba([PAL.blue, PAL.purple, PAL.cyan][ring], 0.25 + hoverI * 0.2);
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      const nc = ctx.createRadialGradient(CX, CY, 0, CX, CY, cr * 0.55);
      nc.addColorStop(0, `rgba(255, 255, 255, ${0.85 + hoverI * 0.1})`);
      nc.addColorStop(0.4, `rgba(200, 225, 255, ${0.6 + hoverI * 0.15})`);
      nc.addColorStop(1, "rgba(91, 142, 219, 0)");
      ctx.beginPath();
      ctx.arc(CX, CY, cr * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = nc;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CX, CY, cr * 0.12 * cp, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + sin(t * 0.035) * 0.3})`;
      ctx.fill();
    }

    function drawHeroArcs() {
      const sc = R * scrollZ;
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, sc, 0, Math.PI * 2);
      ctx.clip();

      for (let i = 0; i < 6; i++) {
        const phi = (i / 6) * Math.PI, yp = CY + cos(phi + t * 0.003) * sc, xw = abs(sin(phi + t * 0.003)) * sc;
        if (xw < 10) continue;
        const al = sin(phi) * (0.06 + hoverI * 0.04);
        if (al < 0.005) continue;
        ctx.save();
        ctx.translate(CX, yp);
        ctx.scale(1, (xw / sc) * 0.18);
        ctx.beginPath();
        ctx.arc(0, 0, xw, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(91, 142, 219, ${al})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }

      for (let i = 0; i < 8; i++) {
        const th = (i / 8) * Math.PI + t * 0.002, al = (0.04 + hoverI * 0.04) * (0.4 + cos(th + t * 0.004) * 0.6);
        if (al < 0.005) continue;
        ctx.save();
        ctx.translate(CX, CY);
        ctx.rotate(th);
        ctx.scale(abs(cos(th)), 1);
        ctx.beginPath();
        ctx.ellipse(0, 0, sc, sc, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 107, 216, ${al})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    }

    let animationId: number;

    const render = () => {
      t++;
      tilt.x += (tilt.tx - tilt.x) * 0.04;
      tilt.y += (tilt.ty - tilt.y) * 0.04;
      scrollZ += (targetScrollZ - scrollZ) * 0.06;
      hoverI += (targetHoverI - hoverI) * 0.04;

      ctx.clearRect(0, 0, W, H);
      drawAtmos();
      drawHeroArcs();
      drawHeroNet();
      drawHeroSphere();
      drawHeroCore();

      heroParts.forEach((p) => {
        p.update();
        p.draw();
      });

      bursts = bursts.filter((b) => !b.dead);
      bursts.forEach((b) => {
        b.update();
        b.draw();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen min-h-[680px] flex items-center justify-center overflow-hidden select-none bg-transparent"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_42%,rgba(220,235,255,0.6)_0%,rgba(234,228,255,0.3)_45%,rgba(247,249,252,0)_70%)] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#DCEBFF]/45 filter blur-[100px] pointer-events-none top-[-100px] left-[-180px] animate-pulse-slow" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#EAE4FF]/35 filter blur-[100px] pointer-events-none bottom-[-60px] right-[-100px] animate-pulse-slow delay-1000" />
      <div className="absolute w-[340px] h-[340px] rounded-full bg-[#A8E6FF]/28 filter blur-[100px] pointer-events-none bottom-[10%] left-[8%] animate-pulse-slow delay-2000" />

      {/* The high-fidelity background 3D canvas */}
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        className="absolute inset-0 w-full h-full z-[1] opacity-[0.95]"
      />

      {/* Hero center text panel */}
      <div className="relative z-10 text-center max-w-[840px] px-4 sm:px-8 flex flex-col items-center pt-20 sm:pt-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[10px] font-accent uppercase tracking-[5px] text-[#6B7E93] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#5B8EDB] to-[#8B6BD8] animate-ping" />
          AI Automation Agency · Est. 2024
        </motion.div>

        {/* Big Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-3xl sm:text-5xl md:text-7xl lg:text-[6.2rem] tracking-tight leading-[1.05] text-[#1E2A38] mb-4 sm:mb-6"
        >
          Intelligence that<br />
          <em className="not-italic bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent italic">
            scales without limits.
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-light text-sm sm:text-base md:text-lg text-[#6B7E93] max-w-[560px] leading-relaxed mb-8 sm:mb-12 px-2 sm:px-0"
        >
          We engineer AI systems that replace manual work, eliminate bottlenecks, and compound your competitive advantage — permanently.
        </motion.p>

        {/* Actions button rows */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4.5 justify-center"
        >
          <button
            onClick={() => handleScrollToSection("services")}
            className="group inline-flex items-center gap-2.5 px-9 py-4 bg-[#1E2A38] text-white border border-[#1E2A38] rounded-full text-[13px] font-accent tracking-wider font-semibold transition-all duration-300 hover:bg-transparent hover:text-[#1E2A38] hover:shadow-lg translate-y-0 hover:-translate-y-0.5 cursor-pointer"
          >
            Explore Services
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>

          <button
            onClick={() => handleScrollToSection("cases")}
            className="group inline-flex items-center gap-2.5 px-9 py-4 bg-transparent text-[#1E2A38] border border-[#dcebff]/90 rounded-full text-[13px] font-accent tracking-wider font-semibold transition-all duration-300 hover:border-[#1E2A38] translate-y-0 hover:-translate-y-0.5 cursor-pointer"
          >
            See Results
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>

      {/* Floating status parameters at hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#DCEBFF]/50 bg-[#F7F9FC]/65 backdrop-blur-[16px] pointer-events-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-7xl mx-auto">
          <div className="px-3 sm:px-6 md:px-12 py-3 sm:py-5 border-r border-b sm:border-b-0 border-[#DCEBFF]/50 text-center">
            <div className="font-display font-semibold text-xl sm:text-2xl md:text-4xl bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent leading-none mb-1">40+</div>
            <div className="text-[8px] sm:text-[10px] font-sans font-light tracking-[1px] sm:tracking-[2px] uppercase text-[#9AADBE]">AI Systems Deployed</div>
          </div>
          <div className="px-3 sm:px-6 md:px-12 py-3 sm:py-5 sm:border-r border-b sm:border-b-0 border-[#DCEBFF]/50 text-center">
            <div className="font-display font-semibold text-xl sm:text-2xl md:text-4xl bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent leading-none mb-1">6× avg</div>
            <div className="text-[8px] sm:text-[10px] font-sans font-light tracking-[1px] sm:tracking-[2px] uppercase text-[#9AADBE]">Efficiency Gain</div>
          </div>
          <div className="px-3 sm:px-6 md:px-12 py-3 sm:py-5 border-r border-[#DCEBFF]/50 text-center">
            <div className="font-display font-semibold text-xl sm:text-2xl md:text-4xl bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent leading-none mb-1">98.7%</div>
            <div className="text-[8px] sm:text-[10px] font-sans font-light tracking-[1px] sm:tracking-[2px] uppercase text-[#9AADBE]">Uptime SLA</div>
          </div>
          <div className="px-3 sm:px-6 md:px-12 py-3 sm:py-5 text-center">
            <div className="font-display font-semibold text-xl sm:text-2xl md:text-4xl bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent leading-none mb-1">12 wks</div>
            <div className="text-[8px] sm:text-[10px] font-sans font-light tracking-[1px] sm:tracking-[2px] uppercase text-[#9AADBE]">Avg Deploy Time</div>
          </div>
        </div>
      </div>

      {/* Decorative center scroll signal indicator — hidden on mobile to prevent overlap */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 text-[10px] font-sans font-light uppercase tracking-[3px] text-[#9AADBE]"
      >
        <div className="w-[1px] h-[34px] bg-gradient-to-b from-transparent to-[#9AADBE]" />
        Scroll
      </motion.div>
    </section>
  );
}
