import { HeroSection } from "@/components/jubilados/hero-section"
import { PainPoints } from "@/components/jubilados/pain-points"
import { ClassesSection } from "@/components/jubilados/classes-section"
import TestimonialsTitle from "@/components/jubilados/testimonials-title"
import { TestimonialsSection } from "@/components/jubilados/testimonials-section"
import { AboutMartin } from "@/components/jubilados/about-martin"
import { Statistics } from "@/components/jubilados/statistics"
import { CTASection } from "@/components/jubilados/cta-section"
import { FloatingCTA } from "@/components/jubilados/floating-cta"
import { RetirementCalculator } from "@/components/jubilados/retirement-calculator"
import { MetaPixel } from "@/components/jubilados/meta-pixel"

/**
 * Contenido de la landing principal. Recibe `safeMode` como PROP en vez de
 * calcularlo con headers()/cookies() — así app/page.tsx y app/intl/page.tsx
 * pueden ser 100% estáticas (prerenderizadas y cacheadas), y el middleware
 * en la raíz del proyecto decide, según el país, cuál de las dos rutas servir.
 *
 * safeMode = false -> versión completa (Argentina y Uruguay)
 * safeMode = true  -> versión "limpia" (resto de países / revisores)
 */
export function Landing({ safeMode, pressBanner = false, pruebaJubilados = false, pruebaDosJubilados = false, prueba1Copy = false, prueba2Promise = false, prueba3Copy = false, prueba4Copy = false, jubilacionPromise = false, jubiladosBullets = false, testimoniosJubilados = false, enableGeolocation = false, prueba3Layout = false, prueba1Layout = false }: { safeMode: boolean; pressBanner?: boolean; pruebaJubilados?: boolean; pruebaDosJubilados?: boolean; prueba1Copy?: boolean; prueba2Promise?: boolean; prueba3Copy?: boolean; prueba4Copy?: boolean; jubilacionPromise?: boolean; jubiladosBullets?: boolean; testimoniosJubilados?: boolean; enableGeolocation?: boolean; prueba3Layout?: boolean; prueba1Layout?: boolean }) {
  const isLatam = !safeMode

  return (
    <>
      <MetaPixel />
      <main className="min-h-screen bg-black">
      <HeroSection safe={safeMode} pressBanner={pressBanner} pruebaJubilados={pruebaJubilados} prueba1Copy={prueba1Copy} prueba2Promise={prueba2Promise} prueba3Copy={prueba3Copy} jubilacionPromise={jubilacionPromise} enableGeolocation={enableGeolocation} />
      {pressBanner && !prueba3Layout && !prueba1Layout && <>
        <TestimonialsTitle pruebaJubilados />
        <TestimonialsSection pruebaJubilados />
      </>}
      {!pruebaDosJubilados && prueba1Layout && <PainPoints safe={safeMode} pruebaJubilados={pruebaJubilados} prueba1Copy={prueba1Copy} prueba3Copy={prueba3Copy} jubiladosBullets={jubiladosBullets} />}
      {!pruebaDosJubilados && !prueba1Layout && <PainPoints safe={safeMode} pruebaJubilados={pruebaJubilados} prueba1Copy={prueba1Copy} prueba3Copy={prueba3Copy} jubiladosBullets={jubiladosBullets} />}
      {pressBanner && (prueba3Layout || prueba1Layout) && <>
        <TestimonialsTitle pruebaJubilados />
        <TestimonialsSection pruebaJubilados />
      </>}
      {pruebaDosJubilados ? (
        <>
          <RetirementCalculator prueba4Copy={prueba4Copy} />
          <ClassesSection pruebaJubilados prueba3Copy={prueba3Copy} />
          <AboutMartin safe={safeMode} prueba1Copy={prueba1Copy} />
          <Statistics safe={safeMode} />
          <CTASection />
        </>
      ) : (
        isLatam && (
          <>
            <ClassesSection pruebaJubilados={pruebaJubilados} />
          </>
        )
      )}
      {!pruebaDosJubilados && <><AboutMartin safe={safeMode} prueba1Copy={prueba1Copy} /><Statistics safe={safeMode} /><CTASection /></>}
      <FloatingCTA />
      </main>
    </>
  )
}
