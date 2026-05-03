import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Intro3DProps {
  onComplete: () => void;
}

export const Intro3D: React.FC<Intro3DProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const letters = "takeUforward".split("");
  const subTagline = "ONE STOP Learning Platform".split("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / w - 0.5) * 2,
        y: (e.clientY / h - 0.5) * 2
      };
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Particle system with trails
    class Particle {
      x: number; y: number; vx: number; vy: number; radius: number; alpha: number; color: string; history: {x: number, y: number}[];
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.7 + 0.1;
        this.color = Math.random() > 0.7 ? '#f97316' : '#ffffff';
        this.history = [];
      }
      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 5) this.history.shift();
        
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }
      draw(ctx: CanvasRenderingContext2D) {
        if (this.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.history[0].x, this.history[0].y);
          for (let i = 1; i < this.history.length; i++) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
          }
          ctx.lineTo(this.x, this.y);
          ctx.strokeStyle = this.color === '#f97316' 
            ? `rgba(249, 115, 22, ${this.alpha * 0.5})` 
            : `rgba(255, 255, 255, ${this.alpha * 0.2})`;
          ctx.lineWidth = this.radius;
          ctx.stroke();
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color === '#f97316'
          ? `rgba(249, 115, 22, ${this.alpha})`
          : `rgba(255, 255, 255, ${this.alpha * 0.5})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 300 }, () => new Particle());

    // 3D Math
    const rotate3D = (point: number[], angleX: number, angleY: number, angleZ: number) => {
      let [x, y, z] = point;
      
      // Rotate X
      let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      let y1 = y * cosX - z * sinX;
      let z1 = y * sinX + z * cosX;
      y = y1; z = z1;
      
      // Rotate Y
      let cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      let x1 = x * cosY + z * sinY;
      let z2 = -x * sinY + z * cosY;
      x = x1; z = z2;
      
      // Rotate Z
      let cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);
      let x2 = x * cosZ - y * sinZ;
      let y2 = x * sinZ + y * cosZ;
      x = x2; y = y2;
      
      return [x, y, z];
    };

    const project3D = (point: number[], cx: number, cy: number, fov: number) => {
      const [x, y, z] = point;
      const scale = fov / (fov + z);
      return [cx + x * scale, cy + y * scale, scale];
    };

    // Cube vertices
    const size = 100;
    const cubeVertices = [
      [-size, -size, -size], [size, -size, -size], [size, size, -size], [-size, size, -size],
      [-size, -size, size], [size, -size, size], [size, size, size], [-size, size, size]
    ];
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
    ];

    let time = 0;
    let bgPulse = 0;
    let tabVisible = document.visibilityState === "visible";
    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      if (!tabVisible) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      time += 0.01;
      bgPulse += 0.02;
      
      // Dynamic gradient background
      const bgOpacity = Math.abs(Math.sin(bgPulse * 0.5));
      
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);
      
      const bgGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w,h));
      bgGrad.addColorStop(0, `rgba(10, 5, 5, ${0.8 + 0.2*bgOpacity})`);
      bgGrad.addColorStop(1, '#050505');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Mouse parallax
      const parallaxX = mouseRef.current.x * 50;
      const parallaxY = mouseRef.current.y * 50;
      const cx = w / 2 + parallaxX;
      const cy = h / 2 + parallaxY;

      // Hexagons
      const sides = 6;
      for (let ring = 0; ring < 5; ring++) {
        const r = 150 + ring * 60;
        const rot = time * (ring % 2 === 0 ? 0.5 : -0.5) + ring;
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
          const angle = (i / sides) * Math.PI * 2 + rot;
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.4 - ring * 0.08})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // DNA Helix
      ctx.lineWidth = 3;
      for(let i = 0; i < 40; i++) {
        const yOffset = (i - 20) * 15;
        const t = time * 2 + i * 0.2;
        const x1 = Math.sin(t) * 120;
        const z1 = Math.cos(t) * 120;
        const x2 = Math.sin(t + Math.PI) * 120;
        const z2 = Math.cos(t + Math.PI) * 120;
        
        const pt1 = rotate3D([x1, yOffset, z1], time*0.5, time*0.3, 0);
        const pt2 = rotate3D([x2, yOffset, z2], time*0.5, time*0.3, 0);
        
        const proj1 = project3D(pt1, cx, cy, 400);
        const proj2 = project3D(pt2, cx, cy, 400);
        
        ctx.fillStyle = `rgba(249, 115, 22, ${proj1[2]*0.8})`;
        ctx.beginPath(); ctx.arc(proj1[0], proj1[1], 3 * proj1[2], 0, Math.PI*2); ctx.fill();
        
        ctx.fillStyle = `rgba(249, 115, 22, ${proj2[2]*0.8})`;
        ctx.beginPath(); ctx.arc(proj2[0], proj2[1], 3 * proj2[2], 0, Math.PI*2); ctx.fill();
        
        ctx.strokeStyle = `rgba(249, 115, 22, ${Math.min(proj1[2], proj2[2])*0.2})`;
        ctx.beginPath(); ctx.moveTo(proj1[0], proj1[1]); ctx.lineTo(proj2[0], proj2[1]); ctx.stroke();
      }

      // Particles
      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }

      // Spinning Cube
      const fov = 500;
      const rx = time * 0.8 + mouseRef.current.y * Math.PI;
      const ry = time * 1.2 + mouseRef.current.x * Math.PI;
      const rz = time * 0.5;
      
      const projectedVertices = cubeVertices.map(v => {
        const rotated = rotate3D(v, rx, ry, rz);
        return project3D(rotated, cx, cy, fov);
      });

      // Draw cube edges
      ctx.lineWidth = 2;
      for (const [a, b] of cubeEdges) {
        const p1 = projectedVertices[a];
        const p2 = projectedVertices[b];
        
        const grad = ctx.createLinearGradient(p1[0], p1[1], p2[0], p2[1]);
        grad.addColorStop(0, `rgba(249, 115, 22, ${p1[2]})`);
        grad.addColorStop(1, `rgba(249, 115, 22, ${p2[2]})`);
        
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.strokeStyle = grad;
        ctx.stroke();
      }
      
      // Draw cube vertices
      for(const p of projectedVertices) {
        ctx.beginPath();
        ctx.arc(p[0], p[1], 4 * p[2], 0, Math.PI*2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p[2]})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center gap-6 select-none">
        <div className="text-6xl md:text-8xl font-bold flex tracking-tighter perspective-[1000px]">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, z: 200, rotateX: -90, filter: 'blur(20px)' }}
              animate={{ opacity: 1, z: 0, rotateX: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1,
                delay: 0.2 + i * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className={letter === 'U' ? 'text-primary' : 'text-white'}
              style={{ textShadow: '0 0 40px rgba(249,115,22,0.8)' }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <div className="text-muted-foreground text-sm md:text-base tracking-[0.25em] uppercase font-mono min-h-[24px]">
          {subTagline.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Loading bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 2, ease: 'easeInOut' }}
          className="w-48 h-0.5 bg-primary origin-left rounded-full mt-4"
          style={{ boxShadow: '0 0 15px 3px rgba(249,115,22,0.8)' }}
        />
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={onComplete}
        className="absolute bottom-10 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs z-10 border border-white/10 px-6 py-3 rounded-full hover:border-primary/50 hover:bg-primary/10 backdrop-blur-sm"
        data-testid="button-skip-intro"
      >
        Skip Intro
      </motion.button>
    </motion.div>
  );
};
