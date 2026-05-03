import { Link } from "wouter";
import { motion } from "framer-motion";
import { Youtube, Linkedin, Twitter, Instagram, Github, Heart, ExternalLink } from "lucide-react";

const socials = [
  { icon: Youtube, href: "https://youtube.com/@takeUforward", label: "YouTube", color: "hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5" },
  { icon: Linkedin, href: "https://linkedin.com/company/takeuforward", label: "LinkedIn", color: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/5" },
  { icon: Twitter, href: "https://twitter.com/striver_79", label: "Twitter / X", color: "hover:text-sky-400 hover:border-sky-400/30 hover:bg-sky-400/5" },
  { icon: Instagram, href: "https://instagram.com/striver_79", label: "Instagram", color: "hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/5" },
  { icon: Github, href: "https://github.com/striver79", label: "GitHub", color: "hover:text-foreground hover:border-border hover:bg-accent" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "TUF+ Dashboard", href: "/plus" },
  { label: "Pricing", href: "/pricing" },
  { label: "A2Z DSA Course", href: "/plus" },
  { label: "SDE Sheet", href: "/plus" },
];

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Contact Us", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-card pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 relative mt-1 border-t border-border">
      {/* Animated orange shimmer line at top */}
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(249,115,22,1), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer-line 3s linear infinite",
        }}
      />

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="font-bold text-xl sm:text-2xl flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-primary text-2xl sm:text-3xl font-mono tracking-tighter">{"<"}F{"/>"}</span>
              <span className="tracking-tight text-foreground">take<span className="text-primary">U</span>forward</span>
            </div>
            <p className="text-muted-foreground mb-5 sm:mb-6 max-w-sm text-sm sm:text-base leading-relaxed">
              The ultimate platform to master Data Structures, Algorithms, and System Design. Prepare for your next technical interview with confidence.
            </p>

            {/* Follow us label */}
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Follow Us</p>

            {/* Social icon buttons */}
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 sm:p-2.5 rounded-xl border border-border/50 text-muted-foreground ${s.color} transition-all duration-200`}
                  aria-label={s.label}
                  data-testid={`social-${s.label.toLowerCase().split(" ")[0]}`}
                >
                  <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-foreground text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
                      {l.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-foreground text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <motion.a
                    href={l.href}
                    whileHover={{ x: 4 }}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            © {new Date().getFullYear()} takeUforward. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" /> by{" "}
            <a
              href="https://twitter.com/striver_79"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors inline-flex items-center gap-1 font-medium"
            >
              Striver <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-line {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </footer>
  );
};
