"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useDeferredGtm } from "@/components/jubilados/use-deferred-gtm"

const Gift = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,12 20,22 4,22 4,12" strokeWidth={2}></polyline>
    <rect x="2" y="7" width="20" height="5" strokeWidth={2}></rect>
    <line x1="12" y1="22" x2="12" y2="7" strokeWidth={2}></line>
    <path d="m12,7-3-3a3,3 0 0,0-3,3" strokeWidth={2}></path>
    <path d="m12,7 3-3a3,3 0 0,1 3,3" strokeWidth={2}></path>
  </svg>
)

export function CTASection() {
  const { loadGtm } = useDeferredGtm()
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("cta-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // 7 de Septiembre 2026 a las 20:00 GMT-3
    const targetDate = new Date("2026-09-07T23:00:00Z") // 20:00 GMT-3 = 23:00 UTC

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    // Calcular inmediatamente al cargar
    calculateTimeLeft()

    // Luego actualizar cada segundo
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="cta-section" className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl border border-gray-200">
            <div className="text-center mb-6 md:mb-8">
              <div
                className={`inline-flex items-center gap-2 bg-[#00D084]/10 border border-[#00D084]/30 rounded-full px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-bold text-[#00D084] mb-4 md:mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              >
                <Gift className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-center">ENTRENAMIENTO COMPLETAMENTE GRATUITO</span>
              </div>

              <h2
                className={`text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-black text-balance leading-tight ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-200`}
              >
                ¡Asegurá tu <span className="text-[#00D084]">cupo</span> ahora!
              </h2>

              <p
                className={`text-base md:text-xl text-gray-600 mb-6 md:mb-8 text-balance leading-relaxed px-2 md:px-0 ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-300`}
              >
                No te quedes afuera de esta oportunidad única.
              </p>
            </div>

            <div
              className={`flex justify-center mb-8 md:mb-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-400`}
            >
              <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm md:max-w-none mx-auto">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-[#00D084] to-[#00B574] rounded-lg md:rounded-xl p-2 md:p-4 mb-1 md:mb-2 shadow-lg">
                      <div className="text-lg md:text-2xl lg:text-4xl font-bold text-white">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`flex justify-center ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-600`}>
              <Button
                size="lg"
                className="text-base md:text-xl px-6 py-4 md:px-12 md:py-6 pulse-green-button w-full max-w-sm mx-auto whitespace-nowrap overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-white"
                onClick={() => {
                  loadGtm()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                QUIERO MI CUPO GRATIS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
