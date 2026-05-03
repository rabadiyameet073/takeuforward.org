import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Check, X, HelpCircle, Zap, ChevronDown, Sparkles, Star, Shield, Clock, RefreshCw } from "lucide-react";
import { useState, useRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Link } from "wouter";

const faqs = [
  { q: "Is TUF+ a one-time payment?", a: "No, TUF+ is an annual subscription giving you full access to all content, updates, and new features for 12 months. Auto-renewal keeps your progress uninterrupted.", icon: RefreshCw },
  { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, UPI (for Indian users), and Net Banking. All transactions are secured with bank-grade encryption.", icon: Shield },
  { q: "Can I get a refund?", a: "Absolutely. We have a 7-day no-questions-asked refund policy. If you're not satisfied, just reach out to our support team and we'll process it immediately.", icon: Clock },
  { q: "Is there a free trial?", a: "We offer a free preview of selected modules so you can experience the quality and teaching style before making any purchase decision.", icon: Star },
  { q: "Will I get lifetime access?", a: "TUF+ is an annual plan. As long as your subscription is active, you get unlimited access to all content including future additions.", icon: Zap },
];

const compareRows = [
  { feature: "A2Z DSA Course", free: "Limited", pro: "Full — 450+ Problems" },
  { feature: "SDE Sheet", free: "Partial", pro: "All 191 Problems" },
  { feature: "System Design (HLD+LLD)", free: null, pro: "Full Access" },
  { feature: "AI Doubt Support", free: null, pro: "Unlimited" },
  { feature: "Ad-free Experience", free: null, pro: "100% Ad-free" },
  { feature: "Progress Tracking", free: "Basic", pro: "Advanced Analytics" },
  { feature: "Video Editorials", free: "YouTube (ads)", pro: "In-platform HD" },
  { feature: "Core CS Subjects", free: null, pro: "OS, DBMS, CN" },
];

const plusFeatures = [
  "Full A2Z DSA course — 450+ problems",
  "Complete SDE sheet with video solutions",
  "System Design — HLD + LLD",
  "Core CS subjects (OS, DBMS, CN)",
  "AI-Powered Doubt Support 24/7",
  "100% Ad-free experience",
  "Advanced progress analytics",
];

const freeFeatures = [
  { t: "Basic DSA roadmap", ok: true },
  { t: "Selected SDE sheet problems", ok: true },
  { t: "Community support", ok: true },
  { t: "Basic progress tracking", ok: true },
  { t: "Ad-free experience", ok: false },
  { t: "AI Doubt Support", ok: false },
  { t: "System Design content", ok: false },
];

/* ── FAQ accordion item ── */
const FaqItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${open ? "border-primary/50 shadow-[0_0_25px_rgba(249,115,22,0.12)]" : "border-border hover:border-primary/30"} bg-card`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
        data-testid={`faq-${index}`}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${open ? "bg-primary/20 text-primary" : "bg-accent text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
            <faq.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-semibold text-sm sm:text-base text-foreground">{faq.q}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? "text-primary" : "text-muted-foreground"}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 ml-12 sm:ml-14 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── 3-D tilt card wrapper ── */
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        setTilt({ x: (y - 0.5) * 14, y: (x - 0.5) * -14, gx: x * 100, gy: y * 100 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0, gx: 50, gy: 50 })}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}
      className={className}
    >
      {/* spotlight */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(249,115,22,0.1) 0%, transparent 55%)` }}
      />
      {children}
    </div>
  );
};

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <PageLayout>
      <div className="relative overflow-hidden">

        {/* ── Animated grid background ── */}
        <div
          className="fixed inset-0 -z-20 pointer-events-none opacity-[0.15] dark:opacity-25"
          style={{
            backgroundImage: "linear-gradient(rgba(249,115,22,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* ── Glow orbs ── */}
        <motion.div
          className="fixed top-1/4 -left-32 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-primary/15 rounded-full blur-[120px] -z-10 pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-orange-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ══════════════════════════════
            HERO
        ══════════════════════════════ */}
        <div ref={heroRef} className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 relative">
          <motion.div style={{ y: heroY }} className="max-w-4xl mx-auto text-center">
            {/* Label chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-medium mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
              Transparent Pricing · No Hidden Fees
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.05]"
            >
              Simple,{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-amber-400 animate-gradient bg-[length:200%_auto]">
                  Transparent
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-amber-400 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
                  style={{ width: "100%" }}
                />
              </span>{" "}
              Pricing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Invest in your career with the most comprehensive interview prep platform. Pick the plan that fits you.
            </motion.p>

            {/* ── Billing toggle ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="inline-flex items-center gap-3 sm:gap-4 bg-card border border-border rounded-full px-4 sm:px-5 py-2.5 shadow-md"
            >
              <span className={`text-sm font-semibold transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center px-1"
                style={{ background: isAnnual ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                data-testid="toggle-billing"
              >
                <motion.div
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ x: isAnnual ? 28 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-semibold transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
                Annual
              </span>
              <AnimatePresence>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.7, x: -8 }}
                    className="px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-500 text-xs font-bold border border-green-500/25"
                  >
                    Save 40%
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════
            PRICING CARDS
        ══════════════════════════════ */}
        <div className="px-4 pb-16 sm:pb-24">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5 sm:gap-8">

            {/* FREE */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: 8 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              whileHover={{ y: -6 }}
            >
              <TiltCard className="relative group h-full rounded-3xl border border-border bg-card p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300">
                <div className="relative z-20 flex flex-col flex-1">
                  <div className="mb-6 sm:mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent text-muted-foreground text-xs font-semibold mb-3">Free Forever</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-1">Free</h3>
                    <p className="text-muted-foreground text-sm">Perfect for getting started with DSA.</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black">₹0</span>
                      <span className="text-muted-foreground">/forever</span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8 flex-1">
                    {freeFeatures.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.06 }}
                        className="flex items-center gap-3"
                      >
                        {f.ok
                          ? <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-green-500" /></div>
                          : <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0"><X className="w-3 h-3 text-muted-foreground/40" /></div>
                        }
                        <span className={`text-sm ${f.ok ? "text-foreground" : "text-muted-foreground/50"}`}>{f.t}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-full border-2 border-border font-semibold text-sm hover:bg-accent hover:border-primary/30 transition-all"
                    data-testid="btn-free"
                  >
                    Start Free
                  </motion.button>
                </div>
              </TiltCard>
            </motion.div>

            {/* PLUS PREMIUM */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -8 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              whileHover={{ y: -10 }}
            >
              <TiltCard className="relative group h-full rounded-3xl border-2 border-primary bg-card p-6 sm:p-8 flex flex-col shadow-[0_0_50px_rgba(249,115,22,0.15)] hover:shadow-[0_0_80px_rgba(249,115,22,0.3)] transition-shadow duration-500 overflow-hidden">
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 pointer-events-none"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-primary/30 pointer-events-none"
                  animate={{ scale: [1, 1.025, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Glow orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/8 rounded-full blur-[80px] pointer-events-none -z-10" />

                {/* "Most Popular" badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(249,115,22,0.5)] z-30">
                  <Zap className="w-3.5 h-3.5" /> Most Popular
                </div>

                <div className="relative z-20 flex flex-col flex-1 pt-3">
                  <div className="mb-6 sm:mb-8">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-semibold mb-3">
                      <Sparkles className="w-3 h-3" /> Premium
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-1 text-primary">TUF+ Premium</h3>
                    <p className="text-muted-foreground text-sm">For serious engineers targeting top tech companies.</p>
                    <div className="mt-5 h-12 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isAnnual ? "a" : "m"}
                          initial={{ y: 24, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -24, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="flex items-baseline gap-2"
                        >
                          <span className="text-4xl sm:text-5xl font-black">₹{isAnnual ? "4,999" : "599"}</span>
                          <span className="text-muted-foreground">/{isAnnual ? "year" : "month"}</span>
                          {isAnnual && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 text-xs font-bold border border-green-500/20"
                            >
                              Save ₹2,999
                            </motion.span>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8 flex-1">
                    {plusFeatures.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.55 + i * 0.07 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{f}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(249,115,22,0.55)" }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden w-full py-3.5 rounded-full font-bold bg-primary text-primary-foreground shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all"
                    data-testid="btn-upgrade"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <span className="relative z-10">Upgrade to Plus →</span>
                  </motion.button>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          {/* ── Trust badges ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 text-xs sm:text-sm text-muted-foreground"
          >
            {[
              { icon: Shield, label: "7-day money-back guarantee" },
              { icon: Clock, label: "Cancel anytime" },
              { icon: Star, label: "Trusted by 1M+ learners" },
              { icon: Zap, label: "Instant access after payment" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <b.icon className="w-4 h-4 text-primary" />
                <span>{b.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════
            COMPARE PLANS TABLE
        ══════════════════════════════ */}
        <div className="px-4 pb-16 sm:pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
              >
                Side by Side
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-4xl font-bold mb-3"
              >
                Compare <span className="text-primary">Plans</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-sm sm:text-base"
              >
                See exactly what each plan includes — no surprises.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
            >
              {/* Table header */}
              <div className="grid grid-cols-3 bg-accent/40 border-b border-border">
                <div className="p-4 sm:p-5 text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">Feature</div>
                <div className="p-4 sm:p-5 text-center text-sm sm:text-base font-bold border-x border-border">Free</div>
                <div className="p-4 sm:p-5 text-center text-sm sm:text-base font-bold text-primary flex items-center justify-center gap-1.5">
                  <Zap className="w-4 h-4" /> TUF+
                </div>
              </div>

              {compareRows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="grid grid-cols-3 border-b border-border/50 last:border-0 hover:bg-primary/[0.03] transition-colors group"
                >
                  <div className="p-3.5 sm:p-5 text-xs sm:text-sm font-medium text-foreground flex items-center">{row.feature}</div>
                  <div className="p-3.5 sm:p-5 text-center border-x border-border/50 flex items-center justify-center">
                    {row.free
                      ? <span className="text-xs sm:text-sm text-muted-foreground">{row.free}</span>
                      : <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center"><X className="w-3 h-3 text-muted-foreground/40" /></div>
                    }
                  </div>
                  <div className="p-3.5 sm:p-5 flex items-center justify-center">
                    <motion.div
                      className="flex items-center gap-1.5"
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-primary hidden sm:block">{row.pro}</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════
            FAQ
        ══════════════════════════════ */}
        <div className="px-4 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
              >
                Got Questions?
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-4xl font-bold mb-3"
              >
                Frequently Asked <span className="text-primary">Questions</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-sm sm:text-base"
              >
                Everything you need to know before joining TUF+.
              </motion.p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            FINAL CTA
        ══════════════════════════════ */}
        <div className="px-4 pb-20 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden border border-primary/30 p-10 sm:p-16 text-center shadow-[0_0_80px_rgba(249,115,22,0.15)]"
          >
            {/* Gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-orange-500/10 pointer-events-none" />

            {/* Animated glow orbs inside CTA */}
            <motion.div
              className="absolute top-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/15 rounded-full blur-[80px] pointer-events-none"
              animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Shimmer line at top */}
            <div
              className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.9), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer-line 3s linear infinite",
              }}
            />

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
                    className="text-yellow-400 text-xl sm:text-2xl"
                  >★</motion.span>
                ))}
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-5"
              >
                Ready to crack your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400">
                  dream company?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-muted-foreground text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto"
              >
                Join 1M+ learners who have transformed their careers with TUF+. Start today — your dream job is one decision away.
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/plus">
                  <motion.button
                    whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(249,115,22,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold bg-primary text-primary-foreground text-sm sm:text-lg shadow-[0_0_25px_rgba(249,115,22,0.4)] w-full sm:w-auto"
                    data-testid="btn-cta-upgrade"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> Start Plus Today →
                    </span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold border-2 border-border hover:border-primary/40 hover:bg-accent transition-all text-sm sm:text-lg w-full sm:w-auto"
                  data-testid="btn-cta-free"
                >
                  Try Free First
                </motion.button>
              </div>

              <p className="text-xs text-muted-foreground mt-5">
                No credit card required for free tier · 7-day refund on Plus
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient { animation: gradient 4s ease infinite; }
        @keyframes shimmer-line {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </PageLayout>
  );
}
