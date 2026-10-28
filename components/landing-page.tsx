import { HeroSection } from "@/components/hero-section"
import { PainPoints } from "@/components/pain-points"
import { ClassesSection } from "@/components/classes-section"
import TestimonialsTitle from "@/components/testimonials-title"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutMartin } from "@/components/about-martin"
import { Statistics } from "@/components/statistics"
import { CTASection } from "@/components/cta-section"
import { FloatingCTA } from "@/components/floating-cta"
import { Visita } from "@/components/lancamento/visita"
import type { VarianteCaptura } from "@/lib/variantes"
import { Sorteio } from "@/components/lancamento/sorteio"

/**
 * variantes (link único "/" e "/intl"): a página traz o texto de todas as variações e o script do sorteio
 * escolhe uma no navegador (lib/sorteio.ts). Sem servidor no caminho: a página fica em cache como a /v1.
 */
export function LandingPage({ safeMode, classTwoImage, countryLanding = false, variante, variantes, landingVisita, pais = null }: { safeMode: boolean; classTwoImage?: string; countryLanding?: boolean; variante?: VarianteCaptura; variantes?: Record<string, VarianteCaptura>; landingVisita?: string; pais?: string | null }) {
  return (
    <main className="min-h-screen bg-black">
      {variantes && <Sorteio pais={pais} />}
      {landingVisita && <Visita landing={variantes ? "auto" : landingVisita} />}
      <HeroSection safeMode={safeMode} countryLanding={countryLanding} variante={variante} variantes={variantes} />
      {!safeMode && countryLanding && <PainPoints safeMode={safeMode} countryLanding={true} />}
      {!safeMode && <TestimonialsTitle />}
      {!safeMode && <TestimonialsSection geo={!safeMode} countryLanding={countryLanding} />}
      {(!safeMode && !countryLanding) || safeMode ? <PainPoints safeMode={safeMode} countryLanding={false} /> : null}
      <ClassesSection classTwoImage={classTwoImage} countryLanding={countryLanding} />
      <AboutMartin safeMode={safeMode} countryLanding={countryLanding} />
      <Statistics countryLanding={countryLanding} />
      <CTASection countryLanding={countryLanding} />
      <FloatingCTA countryLanding={countryLanding} />
    </main>
  )
}
