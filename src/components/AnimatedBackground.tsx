import { useRef, useEffect } from "react";
import { Theme } from "@/hooks/useTheme";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
  connections: number[];
}

export const AnimatedBackground = ({ theme }: { theme: Theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf: number;
    let resizeQueued = false;
    let time = 0;
    let mouseX = w / 2;
    let mouseY = h / 2;
    let tabVisible = document.visibilityState === "visible";

    const onResize = () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      });
    };
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    // Neural network nodes
    const NODE_COUNT = 38;
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1.5 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      connections: [],
    }));

    const isDark = theme === "dark";
    const PRIMARY = isDark ? [249, 115, 22] : [234, 88, 12];
    const PURPLE = isDark ? [168, 85, 247] : [139, 92, 246];

    const draw = () => {
      if (!tabVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Floating gradient orbs
      const orbs = [
        { ox: w * 0.15 + Math.sin(time * 0.3) * 80, oy: h * 0.25 + Math.cos(time * 0.2) * 60, r: w * 0.38, color: `rgba(${PRIMARY[0]},${PRIMARY[1]},${PRIMARY[2]},${isDark ? 0.055 : 0.03})` },
        { ox: w * 0.82 + Math.cos(time * 0.25) * 100, oy: h * 0.65 + Math.sin(time * 0.18) * 80, r: w * 0.45, color: `rgba(${PURPLE[0]},${PURPLE[1]},${PURPLE[2]},${isDark ? 0.035 : 0.02})` },
        { ox: w * 0.5 + Math.sin(time * 0.15) * 120, oy: h * 0.45 + Math.cos(time * 0.12) * 90, r: w * 0.55, color: `rgba(59,130,246,${isDark ? 0.025 : 0.012})` },
      ];
      for (const o of orbs) {
        const g = ctx.createRadialGradient(o.ox, o.oy, 0, o.ox, o.oy, o.r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(o.ox, o.oy, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Mouse reactive glow
      const mg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
      mg.addColorStop(0, `rgba(${PRIMARY[0]},${PRIMARY[1]},${PRIMARY[2]},${isDark ? 0.06 : 0.03})`);
      mg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
      ctx.fillStyle = mg;
      ctx.fill();

      // Update & draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Mouse attract
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          n.vx += (dx / dist) * 0.008;
          n.vy += (dy / dist) * 0.008;
        }
        // Damping
        n.vx *= 0.998;
        n.vy *= 0.998;
      }

      // Draw connections (close pairs)
      const MAX_DIST = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * (isDark ? 0.22 : 0.10);
            const pulse = (Math.sin(nodes[i].pulse + nodes[j].pulse) + 1) / 2;
            const a = alpha * (0.5 + pulse * 0.5);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${PRIMARY[0]},${PRIMARY[1]},${PRIMARY[2]},${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // Data packet traveling along the edge
            if (pulse > 0.85) {
              const t2 = (Math.sin(time * 2 + i + j) + 1) / 2;
              const px = nodes[i].x + dx * t2;
              const py = nodes[i].y + dy * t2;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${PRIMARY[0]},${PRIMARY[1]},${PRIMARY[2]},${a * 3})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw node dots
      for (const n of nodes) {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const r = n.r + glow * 1.5;
        const a = (0.3 + glow * 0.5) * (isDark ? 1 : 0.6);

        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3);
        g.addColorStop(0, `rgba(${PRIMARY[0]},${PRIMARY[1]},${PRIMARY[2]},${a})`);
        g.addColorStop(0.4, `rgba(${PRIMARY[0]},${PRIMARY[1]},${PRIMARY[2]},${a * 0.3})`);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PRIMARY[0]},${PRIMARY[1]},${PRIMARY[2]},${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
    />
  );
};
