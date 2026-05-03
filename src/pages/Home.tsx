import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Intro3D } from "@/components/Intro3D";
import { Hero } from "@/components/Hero";
import { CompanyLogos } from "@/components/CompanyLogos";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { PageLayout } from "@/components/PageLayout";

const CodePlayground = lazy(() =>
  import("@/components/CodePlayground").then((m) => ({ default: m.CodePlayground })),
);
const HowItWorks = lazy(() =>
  import("@/components/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);
const CourseTopics = lazy(() =>
  import("@/components/CourseTopics").then((m) => ({ default: m.CourseTopics })),
);
const Testimonials = lazy(() =>
  import("@/components/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const Pricing = lazy(() =>
  import("@/components/Pricing").then((m) => ({ default: m.Pricing })),
);

/** Reserves space so layout does not jump when lazy chunks load */
const sectionHold = (minH: string) => (
  <div
    className={`w-full ${minH} rounded-xl bg-muted/[0.04] border border-border/10`}
    aria-hidden
  />
);

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && <Intro3D onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <PageLayout>
            <Hero />
            <CompanyLogos />
            <Stats />
            <Features />
            <Suspense fallback={sectionHold("min-h-[480px]")}>
              <CodePlayground />
            </Suspense>
            <Suspense fallback={sectionHold("min-h-[420px]")}>
              <HowItWorks />
            </Suspense>
            <Suspense fallback={sectionHold("min-h-[360px]")}>
              <CourseTopics />
            </Suspense>
            <Suspense fallback={sectionHold("min-h-[320px]")}>
              <Testimonials />
            </Suspense>
            <Suspense fallback={sectionHold("min-h-[520px]")}>
              <Pricing />
            </Suspense>
          </PageLayout>
        </motion.div>
      )}
    </>
  );
}
