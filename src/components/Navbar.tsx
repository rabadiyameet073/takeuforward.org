import { Link, useLocation } from "wouter";
import { Home as HomeIcon, LayoutGrid, Tag, Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Theme } from "@/hooks/useTheme";

interface NavbarProps { theme: Theme; toggle: () => void; }

const NavLink = ({ href, icon: Icon, label, active, testId }: {
  href: string; icon: React.ElementType; label: string; active: boolean; testId: string;
}) => (
  <Link href={href}>
    <motion.div
      data-testid={testId}
      whileHover={{ y: -1 }}
      whileTap={{ y: 1 }}
      className="relative flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer group"
      style={{ color: active ? "hsl(var(--primary))" : undefined }}
    >
      {/* Active / hover bg pill */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
      />
      <Icon className={`w-3.5 h-3.5 relative z-10 ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"}`} />
      <span className={`relative z-10 ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"}`}>{label}</span>
      {active && (
        <motion.span
          layoutId="activeNavDot"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
        />
      )}
    </motion.div>
  </Link>
);

export const Navbar = ({ theme, toggle }: NavbarProps) => {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollRaf = useRef(0);
  const lastScrolled = useRef(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      if (scrollRaf.current) return;
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = 0;
        const next = window.scrollY > 12;
        if (next !== lastScrolled.current) {
          lastScrolled.current = next;
          setScrolled(next);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    };
  }, []);

  const navLinks = [
    { href: "/", icon: HomeIcon, label: "Home", active: location === "/" },
    { href: "/plus", icon: LayoutGrid, label: "Plus", active: location === "/plus" },
    { href: "/pricing", icon: Tag, label: "Pricing", active: location === "/pricing" },
  ];

  return (
    <>
      {/* ── Scroll Progress Bar (very top) ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #f97316, #fb923c, #fbbf24, #f97316)",
          backgroundSize: "200% 100%",
          animation: "progressGradient 2s linear infinite",
          boxShadow: "0 0 12px rgba(249,115,22,0.8)",
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
            : "bg-background/40 backdrop-blur-md border-b border-transparent"
        }`}
        style={{ paddingTop: "3px" /* offset the progress bar */ }}
      >
        {/* Bottom shimmer line */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer-line 4s linear infinite",
            }}
          />
        )}

        <div
          className="container mx-auto px-4 flex items-center justify-between transition-all duration-300"
          style={{ height: scrolled ? "54px" : "64px" }}
        >
          {/* Logo */}
          <Link href="/">
            <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.04 }} data-testid="link-home">
              <motion.div
                className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15 border border-primary/25"
                whileHover={{ rotate: [0, -8, 8, 0], borderColor: "rgba(249,115,22,0.6)" }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-primary text-sm font-black font-mono">{"</>"}</span>
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/20"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="font-extrabold text-lg tracking-tight text-foreground hidden sm:block">
                take<span className="text-primary">U</span>forward
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.href} {...link} testId={`nav-${link.label.toLowerCase()}`} />
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full border border-border/50 hover:border-primary/40 text-muted-foreground hover:text-primary transition-all"
              data-testid="button-theme-toggle"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.22 }}
                  className="block"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* CTA */}
            <Link href="/pricing">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 28px rgba(249,115,22,0.55)" }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-primary text-primary-foreground px-4 sm:px-5 py-2 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(249,115,22,0.3)] hidden sm:flex items-center gap-1.5"
                data-testid="button-get-started"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </motion.button>
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden p-2 rounded-lg border border-border/50 text-foreground hover:border-primary/40 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              whileTap={{ scale: 0.9 }}
              data-testid="button-mobile-menu"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="block"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link href={link.href} onClick={() => setMobileOpen(false)}>
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${link.active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-accent hover:text-foreground"} transition-all`}>
                        <link.icon className="w-4 h-4" />
                        {link.label}
                        {link.active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                  <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                    <button className="w-full mt-2 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                      Get Started →
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <style>{`
        @keyframes shimmer-line { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes progressGradient { 0%,100% { background-position: 0% 0; } 50% { background-position: 100% 0; } }
      `}</style>
    </>
  );
};
