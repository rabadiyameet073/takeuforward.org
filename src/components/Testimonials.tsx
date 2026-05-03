import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  companyColor: string;
  content: string;
  avatar: string;
  avatarBg: string;
}

const testimonials: Testimonial[] = [
  { name: "Rahul Sharma", role: "SDE-1", company: "Google", companyColor: "text-blue-400", content: "The A2Z DSA sheet was a game changer. Striver's video editorials are unmatched in clarity. I cracked Google only because of TUF.", avatar: "R", avatarBg: "from-blue-500 to-blue-700" },
  { name: "Priya Patel", role: "SDE-2", company: "Amazon", companyColor: "text-orange-400", content: "I struggled with DP and Graphs for months. Striver's approach broke them down so intuitively. The SDE sheet is all you need.", avatar: "P", avatarBg: "from-orange-500 to-orange-700" },
  { name: "Amit Kumar", role: "Software Engineer", company: "Microsoft", companyColor: "text-blue-300", content: "From a tier-3 college to Microsoft — TUF structured it perfectly. The roadmap kept me consistent every single day.", avatar: "A", avatarBg: "from-sky-500 to-sky-700" },
  { name: "Neha Gupta", role: "Frontend Engineer", company: "Meta", companyColor: "text-indigo-400", content: "Not just DSA — the LLD content is gold. It helped me clear the machine coding round at Meta. Highly recommend TUF+.", avatar: "N", avatarBg: "from-indigo-500 to-indigo-700" },
  { name: "Vikram Singh", role: "SDE-1", company: "Flipkart", companyColor: "text-yellow-400", content: "After grinding TUF for 3 months, the Flipkart interview felt easy. Striver's DP approach is genuinely genius.", avatar: "V", avatarBg: "from-yellow-500 to-yellow-700" },
  { name: "Shreya Nair", role: "Backend Engineer", company: "Atlassian", companyColor: "text-cyan-400", content: "The system design content on TUF+ is incredible. HLD + LLD taught together with real examples — exactly what interviews test.", avatar: "S", avatarBg: "from-cyan-500 to-cyan-700" },
];

interface CardProps { t: Testimonial; index: number; }

const TestimonialCard = ({ t, index }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 12, y: ((e.clientX - r.left) / r.width - 0.5) * -12 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease-out" }}
      className="w-[280px] sm:w-[340px] md:w-[380px] p-5 sm:p-7 rounded-2xl bg-card border border-border flex flex-col gap-4 flex-shrink-0 relative group shadow-sm hover:shadow-[0_0_35px_rgba(249,115,22,0.12)] hover:border-primary/25 transition-all duration-300"
      data-testid={`card-testimonial-${index}`}
    >
      {/* Quote mark */}
      <div className="absolute top-3 right-4 text-6xl sm:text-7xl font-serif leading-none opacity-[0.06] text-primary group-hover:opacity-[0.12] transition-opacity select-none" aria-hidden>
        "
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${t.avatarBg} text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
            {t.avatar}
          </div>
          <div>
            <div className="font-bold text-foreground text-sm sm:text-base leading-tight">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-card border border-border ${t.companyColor} flex-shrink-0 ml-2`}>
          {t.company}
        </span>
      </div>

      {/* Quote */}
      <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed flex-grow">
        "{t.content}"
      </p>

      {/* Stars */}
      <div className="flex gap-1">
        {[1,2,3,4,5].map((s) => (
          <motion.span key={s} whileHover={{ scale: 1.4, rotate: 15 }} className="text-yellow-400 text-sm sm:text-base">★</motion.span>
        ))}
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-16 sm:py-24 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 mb-10 sm:mb-16 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
        >
          Success Stories
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3"
        >
          Wall of <span className="text-primary">Love</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto"
        >
          Join thousands of learners who cracked their dream jobs using takeUforward.
        </motion.p>
      </div>

      {/* Scroll row */}
      <div className="flex gap-4 sm:gap-6 w-max animate-[scroll_50s_linear_infinite] hover:[animation-play-state:paused] py-4 px-4">
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} index={i} />
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
      `}</style>
    </section>
  );
};
