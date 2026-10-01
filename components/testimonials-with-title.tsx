"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const testimonials = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0003-YtjxHeSdwFZr2QX9JJXG4CXVzy80In.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0006-vNdnCBjzrPDyNt1VT3MfMz1qPi1G0M.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0007-iGK0DMq48TFuIkHekQwfsmscAnYBks.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0008-Jr0d4MkS3CnHA3rORvcGvylcsDRv8W.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0005-tUNREdi4fIGNINiSMouW2XIxn5mlNi.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen-20de-20whatsapp-202025-09-12-20a-20las-2002-arMmcfcdX5PvKdqmpghMwNCYE0Q0wN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0004-7LkOgrkRptLI8tgXkSyjgOCVyqm0zU.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0011-PnE3BJBRnnL6NMvWHH0XPgEGFVJjWE.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0010-NB6iW2Gg2mqDetuNSh966iJVEon0YC.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-20250912-wa0009-T5EdVIgMddsGEYYHaHk5oBOKXeeb00.jpeg",
]

export default function TestimonialsWithTitle() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
        setIsTransitioning(false)
      }, 400)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
      setIsTransitioning(false)
    }, 400)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
      setIsTransitioning(false)
    }, 400)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    if (index === currentIndex) return
    setIsAutoPlaying(false)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 400)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleRegistrationClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <section className="py-8 md:py-24 bg-black">
        <div className="mx-10 max-w-none">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight text-balance">
              <span className="text-[#00D084]">Personas reales</span> que ya están generando ingresos
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative group">
              <div className="relative aspect-[9/16] md:aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden">
                <Image
                  src={testimonials[currentIndex] || "/placeholder.svg"}
                  alt={`Testimonio ${currentIndex + 1}`}
                  fill
                  className={`object-cover transition-all duration-700 ease-in-out ${
                    isTransitioning
                      ? "opacity-0 scale-110 blur-sm rotate-1"
                      : "opacity-100 scale-100 blur-0 rotate-0"
                  }`}
                  loading="lazy"
                  sizes="(max-width: 768px) calc(100vw - 5rem), 448px"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#00D084]/20 to-transparent transition-opacity duration-700 ${
                    isTransitioning ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              <button
                onClick={goToPrevious}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 z-10 opacity-0 group-hover:opacity-100 border border-white/20"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 z-10 opacity-0 group-hover:opacity-100 border border-white/20"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                    index === currentIndex
                      ? "bg-[#00D084] scale-150 shadow-lg shadow-[#00D084]/50"
                      : "bg-gray-600 hover:bg-gray-500 hover:scale-125"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-8 md:py-12">
        <div className="container mx-auto px-10 md:px-6">
          <div className="text-center">
            <Button
              size="lg"
              className="text-sm md:text-xl px-3 md:px-12 py-6 md:py-8 pulse-green-button w-full max-w-xs sm:max-w-none sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={handleRegistrationClick}
            >
              ¡QUIERO ASEGURAR MI CUPO!
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
