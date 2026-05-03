import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const freeFeatures = [
    { text: "Access to SDE Sheet & Roadmaps", ok: true },
    { text: "Video Editorials (YouTube)", ok: true },
    { text: "Basic Progress Tracking", ok: true },
    { text: "Ad-free Experience", ok: false },
    { text: "AI Doubt Resolution", ok: false },
    { text: "Exclusive Premium Content", ok: false },
  ];

  const plusFeatures = [
    { text: "Full A2Z DSA Course (450+ problems)" },
    { text: "In-platform Video Editorials" },
    { text: "Advanced Progress Tracking" },
    { text: "100% Ad-free Experience" },
    { text: "AI-Powered Instant Doubt Resolution" },
    { text: "System Design — HLD + LLD" },
  ];

  return (
    <section className="py-16 sm:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          >
            Invest in your <span className="text-primary">Career</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8"
          >
            Choose the plan that fits your learning journey.
          </motion.p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 sm:w-16 h-7 sm:h-8 rounded-full bg-border relative flex items-center p-1 transition-colors"
              style={{ background: isAnnual ? "hsl(var(--primary))" : undefined }}
              data-testid="toggle-billing"
            >
              <motion.div
                className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md"
                animate={{ x: isAnnual ? (window.innerWidth < 640 ? 28 : 32) : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual
              <AnimatePresence>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, x: -4 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="ml-2 inline-block px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 text-xs font-bold border border-green-500/20"
                  >
                    Save 40%
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 flex flex-col transition-shadow hover:shadow-lg"
          >
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-1">Free</h3>
              <p className="text-muted-foreground text-sm">Perfect to get started with DSA.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold">₹0</span>
                <span className="text-muted-foreground text-sm">/forever</span>
              </div>
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  {f.ok
                    ? <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-green-500" /></div>
                    : <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><X className="w-3 h-3 text-muted-foreground/50" /></div>
                  }
                  <span className={`text-sm ${f.ok ? "text-foreground" : "text-muted-foreground/60"}`}>{f.text}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-full border-2 border-border font-semibold text-sm hover:bg-accent hover:border-primary/30 transition-all" data-testid="btn-pricing-free">
              Start Free
            </button>
          </motion.div>

          {/* Plus */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -8 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -8 }}
            className="rounded-2xl sm:rounded-3xl border-2 border-primary bg-card p-6 sm:p-8 flex flex-col relative overflow-hidden group shadow-[0_0_40px_rgba(249,115,22,0.1)] hover:shadow-[0_0_60px_rgba(249,115,22,0.25)] transition-shadow"
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 pointer-events-none"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            />

            {/* Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              <Zap className="w-3 h-3" /> Most Popular
            </div>

            {/* BG orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-primary/8 rounded-full blur-[80px] pointer-events-none -z-10" />

            <div className="mb-6 sm:mb-8 relative z-20">
              <h3 className="text-xl sm:text-2xl font-bold mb-1 text-primary">TUF+ Premium</h3>
              <p className="text-muted-foreground text-sm">For serious engineers targeting top tech.</p>
              <div className="mt-4 h-10 sm:h-12 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isAnnual ? "annual" : "monthly"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-3xl sm:text-4xl font-bold">₹{isAnnual ? "4,999" : "666"}</span>
                    <span className="text-muted-foreground text-sm">/{isAnnual ? "year" : "month"}</span>
                    {isAnnual && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 text-xs font-bold">Save ₹2,999</span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1 relative z-20">
              {plusFeatures.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-primary" /></div>
                  <span className="text-sm text-foreground">{f.text}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/pricing">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(249,115,22,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all relative z-20"
                data-testid="btn-pricing-plus"
              >
                Upgrade to Plus →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
