import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookMarked, Code2, Rocket, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const steps = [
  {
    num: "01",
    icon: BookMarked,
    title: "Pick Your Roadmap",
    desc: "Choose from A2Z DSA, SDE Sheet, or topic-wise learning. Every path is expertly curated and battle-tested.",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    num: "02",
    icon: Code2,
    title: "Learn & Practice",
    desc: "Watch detailed video editorials, solve problems at your own pace, and get instant AI doubt support 24/7.",
    color: "from-primary/20 to-orange-600/5",
    iconColor: "text-primary",
    border: "border-primary/20",
    glow: "rgba(249,115,22,0.4)",
    highlight: true,
  },
  {
    num: "03",
    icon: Rocket,
    title: "Crack the Interview",
    desc: "Track your progress, compete on leaderboards, and walk into interviews with unshakeable confidence.",
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
    border: "border-purple-500/20",
    glow: "rgba(168,85,247,0.3)",
  },
];

interface StepCardProps { step: typeof steps[0]; index: number; total: number; }

const StepCard = ({ step, index, total }: StepCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.65, type: "spring", stiffness: 100 }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Connector arrow between steps */}
      {index < total - 1 && (
        <div className="hidden lg:flex absolute left-full top-14 z-10 items-center -translate-x-1/2 w-full justify-center">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: index * 0.18 + 0.5, duration: 0.6 }}
            className="flex items-center gap-1"
            style={{ originX: 0 }}
          >
            <div
              className="h-px w-16 xl:w-24"
              style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.3), rgba(249,115,22,0.8))" }}
            />
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4 text-primary opacity-80" />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Step number badge */}
      <motion.div
        className="absolute -top-4 -left-2 sm:-left-4 text-5xl sm:text-6xl font-black text-border/40 select-none pointer-events-none"
        animate={inView ? { opacity: [0, 0.4, 0.2] } : { opacity: 0 }}
        transition={{ delay: index * 0.18 + 0.3, duration: 0.8 }}
      >
        {step.num}
      </motion.div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className={`relative w-full p-6 sm:p-8 rounded-2xl border ${step.border} bg-card overflow-hidden group shadow-sm`}
        style={{ boxShadow: `0 0 0 1px ${step.glow.replace("0.", "0.0")}` }}
      >
        {/* Hover gradient fill */}
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Mouse spotlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `radial-gradient(circle at 50% 30%, ${step.glow.replace(/[\d.]+\)$/, "0.12)")}, transparent 60%)` }}
        />

        {/* Animated border glow */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
          style={{ boxShadow: `0 0 25px ${step.glow}, inset 0 0 15px ${step.glow.replace(/[\d.]+\)$/, "0.05)")}` }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400 }}
          className={`relative z-20 inline-flex w-12 h-12 sm:w-14 sm:h-14 items-center justify-center rounded-xl border ${step.border} bg-background mb-4 sm:mb-5`}
          style={{ boxShadow: `0 0 20px ${step.glow.replace(/[\d.]+\)$/, "0.2)")}` }}
        >
          <step.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${step.iconColor}`} />
        </motion.div>

        <h3 className="relative z-20 text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">{step.title}</h3>
        <p className="relative z-20 text-sm sm:text-base text-muted-foreground leading-relaxed">{step.desc}</p>

        {/* Highlight ribbon */}
        {step.highlight && (
          <div className="absolute top-3 right-3 z-30 px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black tracking-wider uppercase">
            Most Popular
          </div>
        )}
      </motion.div>

      {/* Step dot beneath card */}
      <motion.div
        className={`mt-4 w-2.5 h-2.5 rounded-full ${step.highlight ? "bg-primary shadow-[0_0_12px_rgba(249,115,22,0.8)]" : "bg-border"}`}
        animate={{ scale: inView ? [1, 1.4, 1] : 1 }}
        transition={{ delay: index * 0.18 + 0.6, duration: 0.5 }}
      />
    </motion.div>
  );
};

export const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Section bg accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl" ref={ref}>
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3"
          >
            How It <span className="text-primary">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="text-muted-foreground text-sm sm:text-lg max-w-xl mx-auto"
          >
            Three steps to go from beginner to interview-ready engineer.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Background connecting line (desktop) */}
          <motion.div
            className="absolute hidden sm:block top-14 left-[16%] right-[16%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.15) 20%, rgba(249,115,22,0.15) 80%, transparent)" }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
          />

          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} total={steps.length} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12 sm:mt-14"
        >
          <Link href="/plus">
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(249,115,22,0.55)" }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 rounded-full font-bold bg-primary text-primary-foreground shadow-[0_0_25px_rgba(249,115,22,0.35)] text-sm sm:text-base"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10">Start Your Journey</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Rocket className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
