import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, PlayCircle, Trophy, MessageSquareText, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

const WORDS = ["DSA", "System Design", "LLD", "Algorithms", "Core CS"];

export const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const tiltRaf = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const codeY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(
    () => () => {
      if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current);
    },
    [],
  );

  const applyTilt = () => {
    tiltRaf.current = 0;
    const el = tiltRef.current;
    if (!el) return;
    const { x, y } = mouseRef.current;
    el.style.transform = `perspective(1000px) translate(${x * 0.35}px, ${y * 0.35}px)`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - left) / width - 0.5) * 24,
      y: ((e.clientY - top) / height - 0.5) * 24,
    };
    if (!tiltRaf.current) {
      tiltRaf.current = requestAnimationFrame(applyTilt);
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
    if (tiltRef.current) {
      tiltRef.current.style.transform = "perspective(1000px) translate(0px, 0px)";
    }
  };

  const features = [
    { icon: CheckCircle2,      text: "Curated sheets for a better learning experience." },
    { icon: PlayCircle,        text: "Detailed video editorials for every problem."      },
    { icon: Trophy,            text: "Stay consistent with streaks and leaderboards."   },
    { icon: MessageSquareText, text: "AI-powered instant doubt support."                },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none opacity-[0.15] dark:opacity-25"
        style={{
          backgroundImage: "linear-gradient(rgba(249,115,22,0.18) 1px, transparent 1px), linear-gradient(90deg,rgba(249,115,22,0.18) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial mask to fade grid */}
      <div className="absolute inset-0 -z-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, hsl(var(--background)) 80%)" }} />

      {/* Glow orbs */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)", filter: "blur(40px)" }}
          animate={{ scale: [1.1, 0.9, 1.1], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── Left: Text ── */}
          <motion.div style={{ y: textY, opacity }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold mb-6"
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              15,36,855+ Active Learners Worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4"
            >
              ONE STOP
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-orange-600 animate-gradient bg-[length:200%_auto]">
                  Learning Platform
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--primary)), #fbbf24, hsl(var(--primary)))",
                    backgroundSize: "200% 100%",
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, delay: 0.8, ease: "easeOut" }}
                />
              </span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-foreground">
                For TECH Interviews
              </span>
              <motion.span
                className="text-primary ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              >|</motion.span>
            </motion.h1>

            {/* Cycling chip */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2 mb-4 flex-wrap"
            >
              <span className="text-muted-foreground text-sm">Master</span>
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-black text-sm"
              >
                {WORDS[wordIdx]}
              </motion.span>
              <span className="text-muted-foreground text-sm">and much more</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
            >
              Learn DSA, System Design, and Core CS with personalised roadmaps, expert videos, and AI-powered practice — built for results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 0 2px rgba(249,115,22,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full font-semibold border-2 border-border hover:border-primary/40 hover:bg-accent transition-all text-sm text-center"
              >
                Start Free
              </motion.button>
              <Link href="/plus">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 35px rgba(249,115,22,0.6)" }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden px-7 py-3.5 rounded-full font-bold bg-primary text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.4)] text-sm w-full sm:w-auto text-center"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                  <span className="relative z-10">Explore TUF+ →</span>
                </motion.button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.09 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground leading-snug">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Code card ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ y: codeY }}
            className="relative flex items-center justify-center lg:h-[580px]"
          >
            <div
              ref={tiltRef}
              className="relative flex w-full items-center justify-center lg:h-[580px]"
              style={{ transition: "transform 0.18s ease-out" }}
            >
            {/* Floating badges */}
            {[
              { text: "Dynamic Programming", color: "text-blue-400",   cls: "top-4 right-2 sm:right-0"           },
              { text: "Graphs & Trees",       color: "text-green-400",  cls: "top-32 -left-2 sm:-left-10 hidden sm:block" },
              { text: "System Design",        color: "text-purple-400", cls: "bottom-28 -left-2 sm:-left-8 hidden sm:block" },
            ].map((b, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0], rotate: [0, i % 2 === 0 ? 2 : -2, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className={`absolute ${b.cls} bg-card/90 backdrop-blur border border-border px-3 py-1.5 rounded-xl shadow-lg z-20 font-mono text-xs ${b.color}`}
              >
                {b.text}
              </motion.div>
            ))}

            {/* Code card */}
            <div className="w-full max-w-sm sm:max-w-md relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-orange-500/10 to-purple-600/20 rounded-2xl blur-2xl -z-10" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-[#111] border border-white/[0.08] rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden relative group"
              >
                {/* Titlebar */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="ml-2 text-xs text-gray-500 font-mono">twoSum.cpp</span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-[10px] text-green-400 font-mono">Running</span>
                  </div>
                </div>

                <pre className="text-[11px] sm:text-xs font-mono text-gray-300 overflow-x-auto leading-[1.7]">
                  <code>
<span className="text-pink-400">class</span> <span className="text-yellow-200">Solution</span> {"{"}
{"\n"}<span className="text-pink-400">public:</span>
{"\n  "}<span className="text-green-300">vector</span>{"<"}<span className="text-pink-400">int</span>{">"} <span className="text-blue-400">twoSum</span>(<span className="text-green-300">vector</span>{"<"}<span className="text-pink-400">int</span>{">&"} nums, <span className="text-pink-400">int</span> target) {"{"}
{"\n    "}<span className="text-green-300">unordered_map</span>{"<int,int>"} mp;
{"\n    "}<span className="text-pink-400">for</span> (<span className="text-pink-400">int</span> i = <span className="text-purple-400">0</span>; i {"<"} nums.<span className="text-blue-400">size</span>(); i++) {"{"}
{"\n      "}<span className="text-pink-400">int</span> diff = target - nums[i];
{"\n      "}<span className="text-pink-400">if</span> (mp.<span className="text-blue-400">count</span>(diff))
{"\n        "}<span className="text-pink-400">return</span> {"{"}mp[diff], i{"}"};
{"\n      "}mp[nums[i]] = i;
{"\n    "}{"}"}<span className="text-gray-600"> // O(n) time</span>
{"\n    "}<span className="text-pink-400">return</span> {"{}"};
{"\n  "}{"}"}{"\n"}{"}"};
                  </code>
                </pre>

                {/* Scanning laser */}
                <motion.div
                  className="absolute left-0 w-full h-[1.5px] pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.6) 50%, transparent)" }}
                  animate={{ top: ["8%", "90%", "8%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.05), transparent 70%)" }} />
              </motion.div>

              {/* Accepted badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 sm:-right-8 -bottom-6 sm:-bottom-10 bg-card border border-green-500/30 px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-xl flex items-center gap-2 sm:gap-3 z-30 backdrop-blur"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center text-green-500 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">Accepted</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">0 ms · Beats 100%</div>
                </div>
              </motion.div>
            </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col items-center mt-14 gap-1.5"
        >
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.25em]">Scroll to explore</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4 text-primary/60" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient { animation: gradient 4s ease infinite; }
      `}</style>
    </section>
  );
};
