import { motion } from "framer-motion";

const topicsRow1 = [
  { name: "Arrays", icon: "🔢" }, { name: "Linked Lists", icon: "🔗" },
  { name: "Trees", icon: "🌲" }, { name: "Graphs", icon: "🕸" },
  { name: "Dynamic Programming", icon: "⚡" }, { name: "Binary Search", icon: "🎯" },
  { name: "Sorting", icon: "🔀" }, { name: "Recursion", icon: "🔄" },
  { name: "Stack & Queue", icon: "📚" }, { name: "Tries", icon: "🗺" },
  { name: "Segment Trees", icon: "📊" }, { name: "Hash Maps", icon: "🗝" },
];

const topicsRow2 = [
  { name: "Greedy", icon: "💰" }, { name: "Backtracking", icon: "↩" },
  { name: "Bit Manipulation", icon: "🔧" }, { name: "Strings", icon: "📝" },
  { name: "Heaps", icon: "⛰" }, { name: "Two Pointers", icon: "👆" },
  { name: "Sliding Window", icon: "🪟" }, { name: "System Design", icon: "🏗" },
  { name: "LLD", icon: "🔩" }, { name: "DBMS", icon: "🗄" },
  { name: "OS Concepts", icon: "💻" }, { name: "Computer Networks", icon: "🌐" },
];

export const CourseTopics = () => {
  return (
    <section className="py-16 sm:py-24 bg-accent/5 border-y border-border/40 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl mb-10 sm:mb-14">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
          >
            Full Coverage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3"
          >
            Master Every <span className="text-primary">Topic</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto"
          >
            Comprehensive coverage of every concept asked in top tech interviews.
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Row 1 — Left */}
        <div className="flex w-max animate-[marqueeLeft_28s_linear_infinite] hover:[animation-play-state:paused]">
          {[...topicsRow1, ...topicsRow1].map((topic, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="mx-2 sm:mx-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-border bg-card text-foreground text-sm sm:text-base font-medium flex items-center gap-2 cursor-pointer hover:border-primary hover:bg-primary/8 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all whitespace-nowrap flex-shrink-0"
            >
              <span className="text-base sm:text-lg">{topic.icon}</span>
              {topic.name}
            </motion.div>
          ))}
        </div>

        {/* Row 2 — Right */}
        <div className="flex w-max animate-[marqueeRight_34s_linear_infinite] hover:[animation-play-state:paused] self-end">
          {[...topicsRow2, ...topicsRow2].map((topic, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="mx-2 sm:mx-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-border bg-card text-foreground text-sm sm:text-base font-medium flex items-center gap-2 cursor-pointer hover:border-primary hover:bg-primary/8 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all whitespace-nowrap flex-shrink-0"
            >
              <span className="text-base sm:text-lg">{topic.icon}</span>
              {topic.name}
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
