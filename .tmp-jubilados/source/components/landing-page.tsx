import { HeroSection } from "@/components/hero-section"
import { PainPoints } from "@/components/pain-points"
import { ClassesSection } from "@/components/classes-section"
import TestimonialsTitle from "@/components/testimonials-title"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AboutMartin } from "@/components/about-martin"
import { Statistics } from "@/components/statistics"
import { CTASection } from "@/components/cta-section"
import { FloatingCTA } from "@/components/floating-cta"
import { RetirementCalculator } from "@/components/retirement-calculator"
import { MetaPixel } from "@/components/meta-pixel"

/**
 * Contenido de la landing principal. Recibe `safeMode` como PROP en vez de
 * calcularlo con headers()/cookies() — así app/page.tsx y app/intl/page.tsx
 * pueden ser 100% estáticas (prerenderizadas y cacheadas), y el middleware
 * en la raíz del proyecto decide, según el país, cuál de las dos rutas servir.
 *
 * safeMode = false -> versión completa (Argentina y Uruguay)
 * safeMode = true  -> versión "limpia" (resto de países / revisores)
 */
export function Landing({ safeMode, pressBanner = false, pruebaJubilados = false, pruebaDosJubilados = false, jubilacionPromise = false, jubiladosBullets = false, testimoniosJubilados = false, enableGeolocation = false }: { safeMode: boolean; pressBanner?: boolean; pruebaJubilados?: boolean; pruebaDosJubilados?: boolean; jubilacionPromise?: boolean; jubiladosBullets?: boolean; testimoniosJubilados?: boolean; enableGeolocation?: boolean }) {
  const isLatam = !safeMode

  return (
    <>
      <MetaPixel />
      <main className="min-h-screen bg-black">
      <HeroSection safe={safeMode} pressBanner={pressBanner} pruebaJubilados={pruebaJubilados} jubilacionPromise={jubilacionPromise} enableGeolocation={enableGeolocation} />
      {!pruebaDosJubilados && <PainPoints safe={safeMode} pruebaJubilados={pruebaJubilados} jubiladosBullets={jubiladosBullets} />}
      {pruebaDosJubilados ? (
        <>
          <RetirementCalculator />
          <TestimonialsTitle pruebaJubilados />
          <TestimonialsSection pruebaJubilados />
          <ClassesSection pruebaJubilados />
          <AboutMartin safe={safeMode} />
          <Statistics safe={safeMode} />
          <CTASection />
        </>
      ) : (
        isLatam && (
          <>
            <ClassesSection pruebaJubilados={pruebaJubilados} />
            <TestimonialsTitle pruebaJubilados={pruebaJubilados || testimoniosJubilados} />
            <TestimonialsSection pruebaJubilados={pruebaJubilados || testimoniosJubilados} />
          </>
        )
      )}
      {!pruebaDosJubilados && <><AboutMartin safe={safeMode} /><Statistics safe={safeMode} /><CTASection /></>}
      <FloatingCTA />
      </main>
    </>
  )
}
