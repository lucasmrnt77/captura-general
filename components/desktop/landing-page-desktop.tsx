import { HeroSectionDesktop } from "@/components/desktop/hero-section-desktop"
import { PainPoints } from "@/components/pain-points"
import { ClassesSection } from "@/components/classes-section"
import TestimonialsTitle from "@/components/testimonials-title"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutMartin } from "@/components/about-martin"
import { Statistics } from "@/components/statistics"
import { CTASection } from "@/components/cta-section"
import { FloatingCTA } from "@/components/floating-cta"
import { Visita } from "@/components/lancamento/visita"

/**
 * Cópia da components/landing-page.tsx (página principal da General, versão AR/UY/CL) para o desktop (12/11/2026).
 * Muda o topo (HeroSectionDesktop: imagem e texto lado a lado) e, pela classe "pagina-desktop" (app/globals.css),
 * centraliza os botões das seções. As demais seções são as mesmas da página principal.
 */
export function LandingPageDesktop({ landingVisita }: { landingVisita: string }) {
  return (
    <main className="pagina-desktop min-h-screen bg-black">
      <Visita landing={landingVisita} />
      <HeroSectionDesktop safeMode={false} countryLanding />
      <PainPoints safeMode={false} countryLanding={true} />
      <TestimonialsTitle />
      <TestimonialsSection geo countryLanding />
      <ClassesSection countryLanding />
      <AboutMartin safeMode={false} countryLanding />
      <Statistics />
      <CTASection />
      <FloatingCTA />
    </main>
  )
}
