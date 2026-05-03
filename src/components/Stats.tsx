import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, PlaySquare, Code, Star, TrendingUp } from "lucide-react";

const AnimatedNumber = ({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setVal(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
};

const stats = [
  { target: 15, suffix: "L+", label: "Active Learners", icon: Users, color: "text-blue-400", bg: "from-blue-500/20 to-blue-600/5" },
  { target: 500, suffix: "+", label: "Video Editorials", icon: PlaySquare, color: "text-primary", bg: "from-primary/20 to-orange-600/5" },
  { target: 450, suffix: "+", label: "DSA Problems", icon: Code, color: "text-purple-400", bg: "from-purple-500/20 to-purple-600/5" },
  { target: 98, suffix: "%", label: "Satisfaction Rate", icon: TrendingUp, color: "text-green-400", bg: "from-green-500/20 to-green-600/5" },
];

export const Stats = () => {
  return (
    <>
      <section className="py-16 sm:py-24 relative overflow-hidden">
        {/* Section label */}
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4">
              <Star className="w-3.5 h-3.5" /> Trusted Globally
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              Numbers that speak <span className="text-primary">for themselves</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, type: "spring", stiffness: 120 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative text-center p-5 sm:p-8 rounded-2xl bg-card border border-border shadow-md group overflow-hidden`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Gradient bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/30 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all duration-400" />

                <div className="relative z-20">
                  <motion.div
                    className={`flex justify-center mb-3 sm:mb-4 ${stat.color}`}
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card border border-border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </motion.div>

                  <div className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 sm:mb-2 ${stat.color}`}>
                    <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </div>

                {/* Corner sparkle */}
                <motion.div
                  className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${stat.color.replace("text-", "bg-")} opacity-0 group-hover:opacity-100`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(249,115,22,0.7), transparent)",
          boxShadow: "0 0 12px rgba(249,115,22,0.5)",
        }}
      />
    </>
  );
};
