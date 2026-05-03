import { motion } from "framer-motion";
import { BookOpen, Code2, Server, ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "wouter";

interface CardData {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
  iconBg: string;
  href: string;
  highlight?: boolean;
  badge?: string;
}

const cards: CardData[] = [
  {
    title: "A2Z DSA Course",
    description: "Comprehensive DSA roadmap from basics to advanced topics. 450+ problems with detailed video editorials — the only resource you need.",
    icon: BookOpen,
    color: "from-blue-500/15 to-cyan-500/10",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    href: "/plus",
    badge: "450+ Problems",
  },
  {
    title: "SDE Sheet",
    description: "191 hand-picked interview problems by Striver. Covers every topic asked at top tech companies — Google, Meta, Amazon, and more.",
    icon: Code2,
    color: "from-primary/15 to-orange-500/10",
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border-primary/20",
    href: "/plus",
    highlight: true,
    badge: "Most Popular",
  },
  {
    title: "System Design",
    description: "Master Low Level Design (LLD) and High Level Design (HLD) to excel in senior engineering interviews at any top company.",
    icon: Server,
    color: "from-purple-500/15 to-pink-500/10",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    href: "/plus",
    badge: "HLD + LLD",
  },
];

interface FeatureCardProps {
  card: CardData;
  index: number;
}

const FeatureCard = ({ card, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * 16, y: (x - 0.5) * -16, gx: x * 100, gy: y * 100 });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0, gx: 50, gy: 50 });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      className={`relative group rounded-2xl border ${
        card.highlight ? "border-primary/40 shadow-[0_0_30px_rgba(249,115,22,0.12)]" : "border-border"
      } bg-card p-5 sm:p-7 shadow-lg hover:shadow-[0_0_50px_rgba(249,115,22,0.18)] transition-shadow duration-300 cursor-pointer flex flex-col`}
      data-testid={`card-feature-${index}`}
    >
      {/* Badge */}
      {card.badge && (
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold ${
          card.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary border border-primary/20"
        }`}>
          {card.badge}
        </div>
      )}

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(249,115,22,0.1) 0%, transparent 55%)` }}
      />

      {/* Hover gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-0`} />

      {/* Icon */}
      <div
        className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl ${card.iconBg} border flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-20`}
        style={{ transform: "translateZ(25px)" }}
      >
        <card.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${card.iconColor}`} />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1" style={{ transform: "translateZ(15px)" }}>
        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">{card.title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 leading-relaxed flex-1">{card.description}</p>
        <Link href={card.href}>
          <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            <Sparkles className="w-4 h-4 mr-1.5 text-primary" />
            Explore Curriculum
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  return (
    <section className="py-16 sm:py-24 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          >
            Structured <span className="text-primary">Learning Paths</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-lg"
          >
            Follow carefully curated roadmaps to master the exact skills top tech companies test.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {cards.map((card, i) => (
            <FeatureCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
