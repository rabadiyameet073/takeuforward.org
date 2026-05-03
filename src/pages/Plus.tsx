import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Code2, Server, GraduationCap, ChevronRight, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

const features = [
  { title: "A2Z DSA Course", desc: "Full DSA roadmap with 450+ problems", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "SDE Sheet", desc: "191 curated interview problems", icon: Code2, color: "text-primary", bg: "bg-primary/10" },
  { title: "System Design", desc: "HLD + LLD courses", icon: Server, color: "text-purple-500", bg: "bg-purple-500/10" },
  { title: "Core CS Subjects", desc: "OS, DBMS, CN coverage", icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" }
];

const curriculum = [
  { step: "Step 1", title: "Learn the Basics", count: 28 },
  { step: "Step 2", title: "Learn Important Sorting", count: 7 },
  { step: "Step 3", title: "Solve Problems on Arrays", count: 40 },
  { step: "Step 4", title: "Binary Search", count: 32 },
  { step: "Step 5", title: "Strings", count: 76 },
  { step: "Step 6", title: "Linked List", count: 31 },
  { step: "Step 7", title: "Recursion", count: 25 },
  { step: "Step 8", title: "Bit Manipulation", count: 18 },
];

export default function Plus() {
  return (
    <PageLayout>
      <div className="py-20 px-4 max-w-7xl mx-auto relative perspective-[1000px]">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Your Entire Interview Prep Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Simplified in ONE STOP</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Trusted by 1M+ learners, TUF+ simplifies your interview preparation by bringing everything high-quality under one umbrella. It saves you the time and confusion that many candidates waste while hopping between multiple resources - and regret later...
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-bold border-2 border-border text-foreground hover:bg-accent transition-colors w-full sm:w-auto"
              >
                Try Free Preview
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(249,115,22,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Upgrade Now <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 max-w-4xl mx-auto relative z-20"
        >
          {[
            { label: "Learners", value: "1M+" },
            { label: "Hours Content", value: "500+" },
            { label: "Problems", value: "450+" },
            { label: "Rating", value: "4.9★" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* What's inside */}
        <div className="mb-24 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's inside <span className="text-primary">TUF+</span></h2>
            <p className="text-muted-foreground">Everything you need to crack top product-based companies.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, rotateX: 5, rotateY: -5 }}
                className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group cursor-pointer relative"
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2 relative z-20">{f.title}</h3>
                <p className="text-sm text-muted-foreground relative z-20">{f.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity z-10 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Curriculum */}
        <div className="max-w-4xl mx-auto mb-24 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">A2Z DSA <span className="text-primary">Roadmap</span></h2>
            <p className="text-muted-foreground">A step-by-step curriculum to take you from zero to hero.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            {curriculum.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={i}
                className="flex items-center justify-between p-5 border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-primary mb-0.5">{item.step}</div>
                    <div className="font-medium">{item.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{item.count} problems</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary/10 via-background to-orange-500/10 border border-border p-12 rounded-3xl relative overflow-hidden z-20"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to crack your dream company?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Join 1M+ learners who have transformed their careers with TUF+.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(249,115,22,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full font-bold bg-primary text-primary-foreground text-lg relative z-10"
          >
            Start Plus →
          </motion.button>
        </motion.div>
      </div>
    </PageLayout>
  );
}