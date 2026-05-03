import { ReactNode } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BrainCursor } from "@/components/BrainCursor";
import { useThemeContext } from "@/context/ThemeContext";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { theme, toggle } = useThemeContext();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative selection:bg-primary/30 selection:text-primary-foreground">
      <AnimatedBackground theme={theme} />
      <BrainCursor />
      <Navbar theme={theme} toggle={toggle} />
      <main className="flex-1 pt-16 z-10 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};