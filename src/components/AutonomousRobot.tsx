import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function AutonomousRobot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const robotCanvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll interactive "Journey Sphere" simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = canvas.clientWidth;
    let H = canvas.height = canvas.clientHeight;
    let CX = W / 2;
    let CY = H / 2;
    let R = Math.min(W, H) * 0.28;

    let t = 0;
    const mouse = { x: CX, y: CY, tx: CX, ty: CY };

    const handleResize = () => {
      W = canvas.width = canvas.clientWidth;
      H = canvas.height = canvas.clientHeight;
      CX = W / 2;
      CY = H / 2;
      R = Math.min(W, H) * 0.28;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationId) render();
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) { animationId = 0; return; }
      t++;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      ctx.clearRect(0, 0, W, H);

      // Sphere base glass look
      const g = ctx.createRadialGradient(CX - R * 0.2, CY - R * 0.2, 0, CX, CY, R);
      g.addColorStop(0, "rgba(235, 245, 255, 0.45)");
      g.addColorStop(0.4, "rgba(215, 230, 255, 0.28)");
      g.addColorStop(0.85, "rgba(180, 205, 255, 0.12)");
      g.addColorStop(1, "rgba(139, 107, 216, 0.05)");

      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Rim sheen
      const rim = ctx.createRadialGradient(CX, CY, R * 0.82, CX, CY, R);
      rim.addColorStop(0, "rgba(255, 255, 255, 0)");
      rim.addColorStop(0.7, "rgba(220, 235, 255, 0.12)");
      rim.addColorStop(1, "rgba(255, 255, 255, 0.22)");

      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      // Micro interactive particle orbits inside the scrolling sphere
      for (let i = 0; i < 4; i++) {
        const phi = (i / 4) * Math.PI + t * 0.003;
        const xSpan = Math.sin(phi) * R;
        const yPos = CY + Math.cos(phi) * R * 0.35;

        ctx.beginPath();
        ctx.ellipse(CX, yPos, Math.abs(xSpan), R * 0.08, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(91, 142, 219, ${0.12 + Math.sin(phi) * 0.05})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Dot track
        const dotA = t * 0.015 + i;
        const dotX = CX + Math.sin(dotA) * xSpan;
        const dotY = yPos + Math.cos(dotA) * R * 0.08;

        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 ? "#5B8EDB" : "#8B6BD8";
        ctx.shadowColor = "#5B8EDB";
        ctx.shadowBlur = i % 2 ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Autonomous Vector Robot blueprint design simulation
  useEffect(() => {
    const canvas = robotCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = canvas.clientWidth;
    let H = canvas.height = canvas.clientHeight;
    let CX = W / 2;
    let CY = H / 2;

    let t = 0;

    const handleResize = () => {
      W = canvas.width = canvas.clientWidth;
      H = canvas.height = canvas.clientHeight;
      CX = W / 2;
      CY = H / 2;
    };
    window.addEventListener("resize", handleResize);

    let animationId2: number;
    let isVisible2 = true;

    const observer2 = new IntersectionObserver(([entry]) => {
      isVisible2 = entry.isIntersecting;
      if (isVisible2 && !animationId2) render();
    }, { threshold: 0.1 });
    observer2.observe(canvas);

    const render = () => {
      if (!isVisible2) { animationId2 = 0; return; }
      t++;
      ctx.clearRect(0, 0, W, H);

      // Outer radar blueprint grid lines
      ctx.strokeStyle = "rgba(75, 191, 223, 0.08)";
      ctx.lineWidth = 0.55;
      for (let r = 40; r < 240; r += 40) {
        ctx.beginPath();
        ctx.arc(CX, CY, r + Math.sin(t * 0.005) * 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(CX, CY);

      // Rotating sensor arcs
      ctx.rotate(t * 0.006);
      ctx.beginPath();
      ctx.arc(0, 0, 160, 0, Math.PI * 0.45);
      ctx.strokeStyle = "rgba(91, 142, 219, 0.28)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 172, Math.PI, Math.PI * 1.35);
      ctx.strokeStyle = "rgba(139, 107, 216, 0.25)";
      ctx.lineWidth = 0.75;
      ctx.stroke();
      ctx.restore();

      // Robot Body rendering: Neck, Chest Blueprint Plate
      ctx.strokeStyle = "rgba(91, 142, 219, 0.2)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      // Collar Bone Plate
      ctx.moveTo(CX - 84, CY + 75);
      ctx.lineTo(CX + 84, CY + 75);
      ctx.lineTo(CX + 54, CY + 105);
      ctx.lineTo(CX - 54, CY + 105);
      ctx.closePath();
      ctx.stroke();

      // Mechanical core reactor pulse
      const pl = 0.8 + Math.sin(t * 0.06) * 0.15;
      ctx.beginPath();
      ctx.arc(CX, CY + 90, 8 * pl, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(75, 191, 223, 0.4)";
      ctx.fill();

      // Head schematic: Ears & digital receiver nodes
      ctx.strokeStyle = "rgba(139, 107, 216, 0.25)";
      ctx.beginPath();
      ctx.arc(CX - 62, CY - 10, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(CX + 62, CY - 10, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Main Digital Lens Frame
      ctx.strokeStyle = "rgba(91, 142, 219, 0.35)";
      ctx.beginPath();
      ctx.arc(CX, CY - 10, 52, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Lens glow indicator
      ctx.beginPath();
      ctx.arc(CX, CY - 10, 44, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30, 42, 56, 0.65)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CX, CY - 10, 40, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(75, 191, 223, 0.32)";
      ctx.stroke();

      // Glowing lens camera core (follows smooth breathing)
      const ly = CY - 10 + Math.sin(t * 0.03) * 2;
      ctx.beginPath();
      ctx.arc(CX, ly, 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(75, 191, 223, 0.5)";
      ctx.shadowColor = "#4BBFDF";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(CX, ly, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      // Brain Nodes connecting paths at top of head
      const bLeftX = CX - 30, bLeftY = CY - 64;
      const bRightX = CX + 30, bRightY = CY - 64;
      const bCenX = CX, bCenY = CY - 84;

      ctx.beginPath();
      ctx.moveTo(bLeftX, bLeftY);
      ctx.lineTo(bCenX, bCenY);
      ctx.lineTo(bRightX, bRightY);
      ctx.strokeStyle = "rgba(139, 107, 216, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      [
        [bLeftX, bLeftY, "#5B8EDB"],
        [bRightX, bRightY, "#8B6BD8"],
        [bCenX, bCenY, "#4BBFDF"]
      ].forEach(([x, y, col]) => {
        ctx.beginPath();
        ctx.arc(x as number, y as number, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = col as string;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x as number, y as number, 8, 0, Math.PI * 2);
        ctx.strokeStyle = col as string;
        ctx.stroke();
      });

      animationId2 = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer2.disconnect();
      cancelAnimationFrame(animationId2);
    };
  }, []);

  return (
    <>
      {/* 1. Journey Waypoint Sphere Section Wrapper */}
      <section className="section py-16 bg-[#F7F9FC] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#5B8EDB]/5 via-[#8B6BD8]/5 to-transparent pointer-events-none" />

        <div className="max-w-[1160px] mx-auto w-full px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Waypoint Text Detail left */}
          <div className="text-left max-w-[480px]">
            <span className="stag flex items-center gap-2.5 text-[10px] font-accent font-semibold uppercase tracking-[4px] text-[#9AADBE] mb-5 h-8">
              <span className="w-[30px] h-[1px] bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF]" />
              Architectures
            </span>
            <h3 className="font-display font-light text-4xl sm:text-5xl text-[#1E2A38] tracking-tight leading-[1.1] mb-6">
              Connected.<br />
              Customized.<br />
              <em className="italic bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent">Compounded.</em>
            </h3>
            <p className="font-sans font-style-normal font-light text-[13.5px] text-[#6B7E93] leading-[1.85]">
              Every pipeline we build is continuous and integrated. The journey sphere acts as an autonomous global coordinator — consolidating web analytics, CRM logs, and automation processes into a singular self-healing highway.
            </p>
          </div>

          {/* Journey Canvas Wrapper Box right */}
          <div className="flex justify-center relative py-6">
            <div className="w-[420px] aspect-square relative max-w-full flex items-center justify-center">
              {/* Outer floating dashed tracking circles */}
              <div className="absolute inset-4 rounded-full border border-dashed border-[#DCEBFF]/75 animate-[spin_100s_linear_infinite]" />
              <div className="absolute inset-10 rounded-full border border-[#DCEBFF]/55" />
              
              <canvas
                ref={canvasRef}
                className="w-[340px] h-[340px] relative z-10 select-none pointer-events-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Autonomous Systems Robot Section Wrapper */}
      <section id="robot" className="section py-24 px-4 md:px-12 bg-[#1E2A38] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#5B8EDB]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1160px] mx-auto relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            
            {/* Robot Text parameters column left */}
            <div className="lg:col-span-6 space-y-8">
              <span className="stag flex items-center gap-2.5 text-[10px] font-accent font-semibold uppercase tracking-[4px] text-[#9AADBE]/50 h-8">
                <span className="w-[30px] h-[1px] bg-gradient-to-r from-[#5B8EDB]/40 via-[#8B6BD8]/40 to-[#4BBFDF]/40" />
                Intelligence
              </span>

              <h2 className="font-display font-light text-5xl sm:text-6xl text-white tracking-tight leading-[1.05]">
                Autonomous<br />
                <em className="italic bg-gradient-to-r from-[#5B8EDB] via-[#8B6BD8] to-[#4BBFDF] bg-clip-text text-transparent">systems.</em>
              </h2>

              <p className="font-sans font-light text-[15px] text-[#9AADBE]/80 leading-[1.85] max-w-[500px]">
                Our agent architectures don't wait for your inputs. They monitor logs, make decisions, connect tools, and achieve outcomes — continuously.
              </p>

              {/* Grid lists of attributes */}
              <div className="space-y-6 pt-2">
                <div className="flex gap-4.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#5B8EDB] to-[#8B6BD8] shrink-0 mt-[10px]" />
                  <div>
                    <h5 className="font-sans font-medium text-[15px] text-white">Goal-Directed Reasoning</h5>
                    <p className="text-[12px] font-sans font-light text-[#9AADBE]/70 leading-[1.7] mt-1">
                      Models equipped with multi-step search paths that break down complex targets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#8B6BD8] to-[#4BBFDF] shrink-0 mt-[10px]" />
                  <div>
                    <h5 className="font-sans font-medium text-[15px] text-white">Self-Correcting Execution</h5>
                    <p className="text-[12px] font-sans font-light text-[#9AADBE]/70 leading-[1.7] mt-1">
                      If an API fails or formats vary, agents retry and realign themselves without crashing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#4BBFDF] to-[#5B8EDB] shrink-0 mt-[10px]" />
                  <div>
                    <h5 className="font-sans font-medium text-[15px] text-white">Tool-Aware Actions</h5>
                    <p className="text-[12px] font-sans font-light text-[#9AADBE]/70 leading-[1.7] mt-1">
                      Direct integration with standard Slack, Notion, Stripe, and Zapier routing layers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Robot Model Canvas Vector Stage right */}
            <div className="lg:col-span-6 flex justify-center">
              <div id="robot-stage" className="w-[440px] aspect-square relative max-w-full bg-[#1E2A38]/30 border border-white/5 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                <canvas
                  ref={robotCanvasRef}
                  id="rcv"
                  className="w-full h-full relative z-10 select-none"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
