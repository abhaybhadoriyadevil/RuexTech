import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

const isMobile = () => window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function ThreeBg() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // SCENE & SYSTEM
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf7f9fc, 0.001);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 250;

    // RENDERER
    const mobile = isMobile();
    const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // LIGHTING (Crucial for bubble reflections and glossy glints)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight1.position.set(150, 200, 150);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8B6BD8, 0.6); // Purple highlight shine
    dirLight2.position.set(-150, -100, -50);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x4BBFDF, 0.6); // Cyan/blue highlight shine
    dirLight3.position.set(-50, 150, 100);
    scene.add(dirLight3);

    // BUBBLES COLLECTION
    const bubbleCount = mobile ? 10 : 20;
    const bubblesGroup = new THREE.Group();
    scene.add(bubblesGroup);

    // Shared sphere geometry for efficiency
    const bubbleGeometry = new THREE.SphereGeometry(1, mobile ? 10 : 16, mobile ? 10 : 16);

    // Vibrant highlight colors for soap bubble iridescence
    const bubbleColors = [
      0x4BBFDF, // Cyan
      0x8B6BD8, // Violet
      0x5B8EDB, // Soft blue
      0x8D6BD8, // Deep purple
      0x5C8EDB, // Bright blue
      0xEAE4FF, // Lavender sparkle
    ];

    const bubbleList: Array<{
      mesh: THREE.Mesh;
      speedY: number;
      speedX: number;
      speedZ: number;
      wobbleSpeed: number;
      wobbleOffset: number;
      wobbleAmount: number;
      originalScale: number;
      baseX: number;
      baseZ: number;
    }> = [];

    for (let i = 0; i < bubbleCount; i++) {
      const chosenColor = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

      // Premium glossy soap bubble material
      const bubbleMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: chosenColor,
        emissiveIntensity: 0.18,
        specular: 0xffffff,
        shininess: 120,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);

      // Random scale/size (from small 4px up to generous 20px)
      const scale = 4.5 + Math.random() * 14.5;
      mesh.scale.set(scale, scale, scale);

      // Generate random spread in 3D coordinates
      const x = (Math.random() - 0.5) * 360;
      const y = (Math.random() - 0.5) * 360;
      const z = (Math.random() - 0.5) * 160;

      mesh.position.set(x, y, z);
      bubblesGroup.add(mesh);

      bubbleList.push({
        mesh,
        speedY: 0.22 + Math.random() * 0.45,       // Rising speed
        speedX: (Math.random() - 0.5) * 0.12,     // Natural horizontal drift
        speedZ: (Math.random() - 0.5) * 0.12,     // Depth drift
        wobbleSpeed: 1.2 + Math.random() * 2.5,   // Shape warp frequency
        wobbleOffset: Math.random() * Math.PI * 2,
        wobbleAmount: 0.035 + Math.random() * 0.045, // Wobble stretch scale
        originalScale: scale,
        baseX: x,
        baseZ: z,
      });
    }

    // MULTI-LAYERED SPARKLE PARTICLES (Tiny bubble specks)
    const sparkleCount = mobile ? 25 : 50;
    const sparkleGeometry = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleColors = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      // Random coordinates inside container volume
      sparklePositions[i * 3] = (Math.random() - 0.5) * 350;
      sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 350;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 150;

      // Color spectrum choices
      const randColorChoice = Math.random();
      const rgbColor = new THREE.Color(
        randColorChoice < 0.4 ? 0x06B6D4 : randColorChoice < 0.8 ? 0x4F9CF9 : 0x7C3AED
      );
      sparkleColors[i * 3] = rgbColor.r;
      sparkleColors[i * 3 + 1] = rgbColor.g;
      sparkleColors[i * 3 + 2] = rgbColor.b;
    }

    sparkleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(sparklePositions, 3)
    );
    sparkleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(sparkleColors, 3)
    );

    // Dynamically draw rounded particle texture
    const sparkleCanvas = document.createElement("canvas");
    sparkleCanvas.width = 16;
    sparkleCanvas.height = 16;
    const sCtx = sparkleCanvas.getContext("2d");
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      gradient.addColorStop(0.3, "rgba(200, 230, 255, 0.65)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 16, 16);
    }
    const sparkleTexture = new THREE.CanvasTexture(sparkleCanvas);

    const sparkleMaterial = new THREE.PointsMaterial({
      size: 2.5,
      map: sparkleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const sparklesMesh = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(sparklesMesh);

    // MOUSE REACTION HOOKS
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();

    // MAIN ANIMATION TICKER
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow orbital rotate layout
      bubblesGroup.rotation.y = elapsedTime * 0.012;
      sparklesMesh.rotation.y = elapsedTime * 0.008;

      // Parallax hover easing
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Map interactive coordinates to mouse push triggers
      const mouse3DX = targetX * 3.5;
      const mouse3DY = -targetY * 3.5;

      // UPDATE BUBBLES PHYSICS
      bubbleList.forEach((b) => {
        // Ascend continuously
        b.mesh.position.y += b.speedY;

        // Fluid drifting movement via sine wave trigonometry representation
        const timeFactor = elapsedTime * b.wobbleSpeed + b.wobbleOffset;
        b.mesh.position.x += b.speedX + Math.sin(timeFactor) * 0.09;
        b.mesh.position.z += b.speedZ + Math.cos(timeFactor) * 0.09;

        // Apply dynamic bubble bounce shaping (stretch/shrink warp)
        const warpX = 1 + Math.sin(timeFactor) * b.wobbleAmount;
        const warpY = 1 + Math.cos(timeFactor + Math.PI / 2) * b.wobbleAmount;
        const warpZ = 1 + Math.sin(timeFactor + Math.PI) * b.wobbleAmount;

        b.mesh.scale.set(
          b.originalScale * warpX,
          b.originalScale * warpY,
          b.originalScale * warpZ
        );

        // CURSOR REPULSION / HOVER DRIFT
        const dx = b.mesh.position.x - mouse3DX;
        const dy = b.mesh.position.y - mouse3DY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Push away bubbles that get within reach of the mouse pointer coordinates
        if (dist < 85) {
          const pushForce = (85 - dist) / 85; // Stronger push when closer
          b.mesh.position.x += (dx / dist) * pushForce * 1.8;
          b.mesh.position.y += (dy / dist) * pushForce * 1.8;
        }

        // BOUNDS RESET (When bubble exits out of top border viewport)
        if (b.mesh.position.y > 185) {
          b.mesh.position.y = -185;
          b.mesh.position.x = (Math.random() - 0.5) * 360;
          b.mesh.position.z = (Math.random() - 0.5) * 160;
          b.speedY = 0.22 + Math.random() * 0.45;
        }
      });

      // UPDATE TINY PARALLEL SPARKLE PARTICLES DRIFTING
      const activeSparkles = sparkleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < sparkleCount; i++) {
        // Let tiny particles rise slightly as well
        activeSparkles[i * 3 + 1] += 0.15; // Speed offset
        
        // Slight organic sine wave horizontal drift
        activeSparkles[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.035;

        // If sparkle goes out of bounds, send it back to the bottom
        if (activeSparkles[i * 3 + 1] > 185) {
          activeSparkles[i * 3 + 1] = -185;
          activeSparkles[i * 3] = (Math.random() - 0.5) * 350;
        }
      }
      sparkleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // DYNAMIC RETINA LAYOUT ADAPTERS
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // CLEANUP PROCESS
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      bubbleGeometry.dispose();
      sparkleGeometry.dispose();
      sparkleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Layer 1: Luxury light ambient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F9FC] via-[#E9EEF5] to-[#F7F9FC] w-full h-full" />

      {/* Layer 2: Soft glowing atmospheric highlights */}
      <div className="absolute top-[10%] right-[5%] w-[450px] h-[450px] bg-[#5B8EDB]/8 rounded-full blur-[140px] animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[40%] left-[-5%] w-[550px] h-[550px] bg-[#8B6BD8]/6 rounded-full blur-[170px] animate-pulse-slow delay-3000 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#5B8EDB]/6 rounded-full blur-[150px] animate-pulse-slow delay-1000 pointer-events-none" />
      <div className="absolute bottom-[2%] left-[15%] w-[400px] h-[400px] bg-[#8B6BD8]/5 rounded-full blur-[130px] animate-pulse-slow delay-5000 pointer-events-none" />

      {/* Layer 3: Dynamic 3D interactive bubble rendering node viewport */}
      <div
        ref={containerRef}
        id="bubble-background-canvas"
        className="absolute inset-0 w-full h-full opacity-[0.78] pointer-events-none"
      />

      {/* Subtle modern technological grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.25] pointer-events-none" />
    </div>
  );
}
