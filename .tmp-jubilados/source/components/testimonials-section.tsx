"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useDeferredGtm } from "@/hooks/use-deferred-gtm"

function YouTubeFacade() {
  const [started, setStarted] = useState(false)

  return (
    <div className="mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-xl bg-black">
      {started ? (
        <iframe
          className="h-full w-full"
          src="https://www.youtube-nocookie.com/embed/iIO4IvcOQIw?autoplay=1"
          title="Testimonio de Ernesto"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="group relative block h-full w-full"
          onClick={() => setStarted(true)}
          aria-label="Reproducir video"
        >
          <img
            src="https://i.ytimg.com/vi/iIO4IvcOQIw/maxresdefault.jpg"
            alt="Miniatura del testimonio de Ernesto"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#20d681] text-3xl text-black shadow-lg" aria-hidden="true">▶</span>
          </span>
        </button>
      )}
    </div>
  )
}

export function TestimonialsSection({ pruebaJubilados = false }: { pruebaJubilados?: boolean }) {
  const { loadGtm } = useDeferredGtm()
  const handleRegistrationClick = () => {
    loadGtm()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <section className="bg-black px-6 py-8 md:py-24">
        {pruebaJubilados ? (
          <>
            <YouTubeFacade />
            <p className="mx-auto mt-4 max-w-[600px] text-center text-sm text-gray-300">
              Ernesto, 76 años hoy en día complementa su jubilación.
            </p>
          </>
        ) : null}
      </section>
      <section className="bg-black py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-6">
          <Button
            size="lg"
            className="mx-auto block w-full max-w-sm text-sm md:text-xl px-3 md:px-12 py-6 md:py-8 pulse-green-button focus:outline-none focus:ring-2 focus:ring-[#00D084]"
            onClick={handleRegistrationClick}
          >
            QUIERO MI CUPO GRATIS
          </Button>
        </div>
      </section>
    </>
  )
}

export default TestimonialsSection
