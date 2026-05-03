import { motion } from "framer-motion";

const companies = [
  "Google", "Amazon", "Microsoft", "Meta", "Apple",
  "Flipkart", "Adobe", "Goldman Sachs", "Uber", "Atlassian",
  "Salesforce", "Netflix", "LinkedIn", "Swiggy", "Zomato",
];

export const CompanyLogos = () => (
  <section className="py-10 sm:py-14 border-y border-border/30 overflow-hidden bg-accent/5 relative">
    <div className="container mx-auto px-4 max-w-5xl text-center mb-6 sm:mb-8">
      <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
        Our learners work at
      </p>
    </div>

    {/* Gradient edge masks */}
    <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
      style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }} />
    <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
      style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }} />

    <div className="flex w-max animate-[logoScroll_28s_linear_infinite] hover:[animation-play-state:paused]">
      {[...companies, ...companies].map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.12, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="mx-4 sm:mx-6 flex-shrink-0 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm text-muted-foreground font-bold text-sm sm:text-base hover:border-primary/40 hover:text-primary hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-200 whitespace-nowrap"
        >
          {c}
        </motion.div>
      ))}
    </div>

    <style>{`
      @keyframes logoScroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </section>
);
