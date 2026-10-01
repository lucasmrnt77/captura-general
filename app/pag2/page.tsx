import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}
import { PainPoints } from "@/components/pain-points"
import { ClassesSection } from "@/components/classes-section"
import TestimonialsTitle from "@/components/testimonials-title"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutMartin } from "@/components/about-martin"
import { Statistics } from "@/components/statistics"
import { CTASection } from "@/components/cta-section"
import { FloatingCTA } from "@/components/floating-cta"
import { resolveSafeMode } from "@/lib/geo"

export default async function Pag2({
  searchParams,
}: {
  searchParams: Promise<{ pais?: string | string[] }>
}) {
  const sp = await searchParams
  const { safeMode } = await resolveSafeMode(sp)

  return (
    <main className="min-h-screen bg-black">
      <HeroSection safeMode={safeMode} />
      <PainPoints safeMode={safeMode} />
      {!safeMode && <ClassesSection />}
      {!safeMode && <TestimonialsTitle />}
      {!safeMode && <TestimonialsSection />}
      <AboutMartin safeMode={safeMode} />
      <Statistics />
      <CTASection />
      <FloatingCTA />
    </main>
  )
}
