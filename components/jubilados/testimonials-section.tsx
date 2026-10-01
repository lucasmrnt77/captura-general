"use client"

import { Button } from "@/components/ui/button"
import { useDeferredGtm } from "@/components/jubilados/use-deferred-gtm"
import { YouTubeTestimonial } from "@/components/youtube-testimonial"

export function TestimonialsSection({ pruebaJubilados = false }: { pruebaJubilados?: boolean }) {
  const { loadGtm } = useDeferredGtm()
  const handleRegistrationClick = () => {
    loadGtm()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <section className="bg-black px-6 py-8 md:py-24" aria-label="Video de testimonios">
        {pruebaJubilados && <div className="mx-auto w-full max-w-3xl"><YouTubeTestimonial /></div>}
      </section>
      <section className="bg-black py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-6">
          <Button size="lg" className="mx-auto block w-full max-w-sm text-sm md:text-xl px-3 md:px-12 py-6 md:py-8 pulse-green-button focus:outline-none focus:ring-2 focus:ring-[#00D084]" onClick={handleRegistrationClick}>
            QUIERO MI CUPO GRATIS
          </Button>
        </div>
      </section>
    </>
  )
}

export default TestimonialsSection
