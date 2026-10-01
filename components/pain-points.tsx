"use client"

import { Button } from "@/components/ui/button"

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function PainPoints({ safeMode = false, countryLanding = false }: { safeMode?: boolean; countryLanding?: boolean }) {
  const handleRegistrationClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const points = countryLanding
    ? [
        <>
          Buscás una <span className="font-bold">segunda fuente de ingresos</span> que complemente tu sueldo o tu jubilación
        </>,
        <>
          Querés alcanzar <span className="font-bold">metas grandes</span>, como comprar tu casa, un auto o el día de mañana jubilarte tranquilo
        </>,
        <>
          Tenés <span className="font-bold">1 o 2 horas por día</span> que podrías aprovechar para generar ingresos
        </>,
        <>
          Querés <span className="font-bold">más libertad de tiempo y dinero</span>, sin depender de un jefe ni de un lugar físico
        </>,
      ]
    : safeMode
    ? [
        <>
          Querés <span className="font-bold">entender cómo funcionan los mercados financieros</span> desde cero, con explicaciones simples
        </>,
        <>
          Buscás una <span className="font-bold">formación clara y ordenada</span>, sin tecnicismos ni promesas exageradas
        </>,
        <>
          Tenés <span className="font-bold">1 o 2 horas por día</span> que podrías dedicar a aprender algo nuevo
        </>,
        <>
          Querés <span className="font-bold">sumar conocimiento y nuevas habilidades</span> a tu propio ritmo
        </>,
      ]
    : [
        <>
          Querés <span className="font-bold">generar una segunda fuente de ingresos</span> que complemente tu sueldo y te permita cumplir objetivos como comprar tu casa, auto, etc.
        </>,
        <>
          Querés empezar con <span className="font-bold">una inversión baja y controlada</span>, sin poner en riesgo tus ahorros
        </>,
        <>
          Tenés <span className="font-bold">1 o 2 horas por día</span> que podrías aprovechar para generar ingresos
        </>,
        <>
          Querés <span className="font-bold">más libertad de tiempo y dinero</span>, sin depender de un jefe ni de un lugar físico
        </>,
      ]

  return (
    <>
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-10 md:px-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-montserrat text-black leading-tight font-bold">
              {safeMode ? "ESTA FORMACIÓN ES PARA VOS SI..." : "ESTE EVENTO ES PARA VOS SI..."}
            </h2>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-black">
        <div className="container mx-auto px-10 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6 md:space-y-10">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-[#00D084]" />
                  </div>
                  <p className="text-sm md:text-base lg:text-lg xl:text-xl font-montserrat leading-relaxed text-white">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 md:mt-16">
              <Button
                size="lg"
                className={`text-sm md:text-xl px-3 md:px-12 py-6 md:py-8 pulse-green-button w-full max-w-xs sm:max-w-none sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-gray-900 ${countryLanding ? "whitespace-nowrap max-w-md" : ""}`}
                onClick={handleRegistrationClick}
              >
                {countryLanding ? "¡QUIERO ASEGURAR MI CUPO AHORA!" : "¡QUIERO ASEGURAR MI CUPO!"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
