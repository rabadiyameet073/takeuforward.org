import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple { id: number; x: number; y: number; }

/* ─── Direct-DOM cursor — zero lag, zero transform conflict ─── */
export const BrainCursor = () => {
  const [mounted, setMounted]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [ripples, setRipples]   = useState<Ripple[]>([]);

  // DOM refs for cursor layers (no React re-renders for position)
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const auraRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  // Smooth follow state (lerped in RAF)
  const mouse   = useRef({ x: -300, y: -300 });
  const ring    = useRef({ x: -300, y: -300 });
  const ring2   = useRef({ x: -300, y: -300 });
  const aura    = useRef({ x: -300, y: -300 });
  const rippleId = useRef(0);
  const rafId    = useRef<number>();
  const hovRef   = useRef(false);
  const trailPos = useRef<{ x: number; y: number }[]>(
    Array.from({ length: 12 }, () => ({ x: -300, y: -300 }))
  );

  useEffect(() => {
    if (window.innerWidth < 768) return;
    setMounted(true);

    const TRAIL_LEN = 12;

    const animate = () => {
      if (document.hidden) {
        rafId.current = requestAnimationFrame(animate);
        return;
      }
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const isHov = hovRef.current;

      // Dot — snap instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }

      // Ring — 0.14s lerp (≈ 14%)
      ring.current.x += (mx - ring.current.x) * 0.14;
      ring.current.y += (my - ring.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }

      // Ring2 — 0.09s lerp
      ring2.current.x += (mx - ring2.current.x) * 0.09;
      ring2.current.y += (my - ring2.current.y) * 0.09;
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `translate(${ring2.current.x}px, ${ring2.current.y}px) translate(-50%, -50%)`;
      }

      // Aura — 0.055 lerp (very slow)
      aura.current.x += (mx - aura.current.x) * 0.055;
      aura.current.y += (my - aura.current.y) * 0.055;
      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${aura.current.x}px, ${aura.current.y}px) translate(-50%, -50%)`;
      }

      // Trail — each follows the previous
      trailPos.current[0].x += (mx - trailPos.current[0].x) * 0.55;
      trailPos.current[0].y += (my - trailPos.current[0].y) * 0.55;
      for (let i = 1; i < TRAIL_LEN; i++) {
        trailPos.current[i].x += (trailPos.current[i - 1].x - trailPos.current[i].x) * 0.45;
        trailPos.current[i].y += (trailPos.current[i - 1].y - trailPos.current[i].y) * 0.45;
        const el = trailRef.current[i];
        if (el) {
          el.style.transform = `translate(${trailPos.current[i].x}px, ${trailPos.current[i].y}px) translate(-50%, -50%)`;
          const scale = 1 - i / TRAIL_LEN;
          const opacity = (1 - i / TRAIL_LEN) * (isHov ? 0.7 : 0.45);
          el.style.width = `${scale * 9 + 1}px`;
          el.style.height = `${scale * 9 + 1}px`;
          el.style.opacity = String(opacity);
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest("button, a, [role='button'], input, select, textarea, label");
      hovRef.current = isInteractive;
      setHovering(isInteractive);
    };

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      const id = rippleId.current++;
      const x  = e.clientX;
      const y  = e.clientY;
      setRipples(p => [...p, { id, x, y }]);
      setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 900);
    };
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  if (!mounted) return null;

  const ringSize    = hovering ? 56 : clicking ? 18 : 44;
  const ring2Size   = hovering ? 80 : clicking ? 28 : 62;
  const dotSize     = hovering ? 10 : clicking ? 5  : 7;
  const auraSize    = hovering ? 180 : 110;
  const ringRadius  = hovering ? "14px" : "50%";
  const ring2Radius = hovering ? "20px" : "50%";

  return (
    <>
      {/* ── Aura glow ── */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[9970]"
        style={{
          width:  auraSize,
          height: auraSize,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.06) 50%, transparent 70%)",
          filter: "blur(16px)",
          opacity: hovering ? 0.9 : 0.55,
          transition: "width 0.35s ease, height 0.35s ease, opacity 0.3s ease",
        }}
      />

      {/* ── Outer orbit ring (slowest) ── */}
      <div
        ref={ring2Ref}
        className="fixed top-0 left-0 pointer-events-none z-[9975]"
        style={{
          width:        ring2Size,
          height:       ring2Size,
          borderRadius: ring2Radius,
          border:       `1px solid rgba(249,115,22,${hovering ? 0.35 : 0.2})`,
          boxShadow:    hovering ? "0 0 20px rgba(249,115,22,0.15)" : "none",
          transition:   "width 0.4s cubic-bezier(0.34,1.56,0.64,1), height 0.4s cubic-bezier(0.34,1.56,0.64,1), border-radius 0.4s ease, border-color 0.3s ease",
          animation:    "spin-slow 12s linear infinite",
          backgroundImage: "repeating-conic-gradient(rgba(249,115,22,0.15) 0deg 10deg, transparent 10deg 36deg)",
        }}
      />

      {/* ── Main ring (medium lag) ── */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9978]"
        style={{
          width:        ringSize,
          height:       ringSize,
          borderRadius: ringRadius,
          border:       `${hovering ? 2 : 1.5}px ${hovering ? "solid" : "dashed"} rgba(249,115,22,${hovering ? 0.9 : 0.55})`,
          boxShadow:    hovering
            ? "0 0 25px rgba(249,115,22,0.5), inset 0 0 20px rgba(249,115,22,0.08)"
            : "0 0 8px rgba(249,115,22,0.4)",
          transition:   "width 0.35s cubic-bezier(0.34,1.56,0.64,1), height 0.35s cubic-bezier(0.34,1.56,0.64,1), border-radius 0.35s ease, border-color 0.2s ease, box-shadow 0.25s ease",
          animation:    "spin-ring 6s linear infinite",
        }}
      />

      {/* ── Trail dots ── */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailRef.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none rounded-full"
          style={{
            zIndex: 9973,
            width: 9,
            height: 9,
            background: `rgba(249,115,22,${1 - i * 0.07})`,
            boxShadow: i < 3 ? `0 0 ${8 - i * 2}px rgba(249,115,22,0.8)` : "none",
          }}
        />
      ))}

      {/* ── Center dot (instant snap) ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
        style={{
          width:      dotSize,
          height:     dotSize,
          background: hovering
            ? "rgba(255,255,255,1)"
            : "rgba(249,115,22,1)",
          boxShadow: hovering
            ? "0 0 12px rgba(255,255,255,0.9), 0 0 25px rgba(249,115,22,0.6)"
            : "0 0 10px rgba(249,115,22,1), 0 0 24px rgba(249,115,22,0.5)",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      {/* ── Ripple bursts on click ── */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="fixed pointer-events-none z-[9990]"
          style={{ left: r.x, top: r.y }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ border: "1.5px solid rgba(249,115,22,0.8)" }}
              initial={{ width: 6, height: 6, x: -3, y: -3, opacity: 1 }}
              animate={{ width: 90 + i * 40, height: 90 + i * 40, x: -(45 + i * 20), y: -(45 + i * 20), opacity: 0 }}
              transition={{ duration: 0.65 + i * 0.12, ease: [0.15, 0.5, 0.25, 1], delay: i * 0.08 }}
            />
          ))}
          {Array.from({ length: 10 }, (_, k) => {
            const a = (k / 10) * Math.PI * 2;
            return (
              <motion.div
                key={`s${k}`}
                className="absolute w-2 h-2 rounded-full"
                style={{ background: "rgba(249,115,22,1)", x: -4, y: -4 }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(a) * 52 - 4, y: Math.sin(a) * 52 - 4, opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9], delay: k * 0.012 }}
              />
            );
          })}
        </div>
      ))}

      {/* ── Hover label ── */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: ring.current.x,
              top:  ring.current.y,
            }}
            initial={{ opacity: 0, y: -8, x: "-50%" }}
            animate={{ opacity: 1, y: 30, x: "-50%" }}
            exit={{ opacity: 0, y: -8, x: "-50%" }}
            transition={{ duration: 0.18 }}
          >
            <span
              className="text-[9px] font-black tracking-[0.2em] text-primary uppercase whitespace-nowrap"
              style={{
                padding: "3px 8px",
                borderRadius: "99px",
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(249,115,22,0.5)",
                boxShadow: "0 0 12px rgba(249,115,22,0.3)",
              }}
            >
              ✦ CLICK
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-ring {
          from { rotate: 0deg; }
          to   { rotate: 360deg; }
        }
        @keyframes spin-slow {
          from { rotate: 0deg; }
          to   { rotate: -360deg; }
        }
      `}</style>
    </>
  );
};
