import { HeroSection } from "@/components/hero-section"
import { PainPoints } from "@/components/pain-points"
import { ClassesSection } from "@/components/classes-section"
import TestimonialsTitle from "@/components/testimonials-title"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutMartin } from "@/components/about-martin"
import { Statistics } from "@/components/statistics"
import { CTASection } from "@/components/cta-section"
import { FloatingCTA } from "@/components/floating-cta"

export function LandingPage({ safeMode, classTwoImage, countryLanding = false }: { safeMode: boolean; classTwoImage?: string; countryLanding?: boolean }) {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection safeMode={safeMode} countryLanding={countryLanding} />
      {!safeMode && countryLanding && <PainPoints safeMode={safeMode} countryLanding={true} />}
      {!safeMode && <TestimonialsTitle />}
      {!safeMode && <TestimonialsSection geo={!safeMode} countryLanding={countryLanding} />}
      {(!safeMode && !countryLanding) || safeMode ? <PainPoints safeMode={safeMode} countryLanding={false} /> : null}
      {!safeMode && <ClassesSection classTwoImage={classTwoImage} countryLanding={countryLanding} />}
      <AboutMartin safeMode={safeMode} countryLanding={countryLanding} />
      <Statistics countryLanding={countryLanding} />
      <CTASection countryLanding={countryLanding} />
      <FloatingCTA countryLanding={countryLanding} />
    </main>
  )
}
