"use client"

import { Button } from "@/components/ui/button"
import { YouTubeTestimonial } from "@/components/youtube-testimonial"

export function TestimonialsSection({ geo = false, countryLanding = false }: { geo?: boolean; countryLanding?: boolean }) {
  const handleRegistrationClick = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <>
      <section className="bg-black px-10 py-8 md:px-6 md:py-24" aria-label="Video de testimonios">
        <div className="mx-auto w-full max-w-3xl">
          <YouTubeTestimonial />
        </div>
      </section>
      <section className="bg-black py-8 md:py-12">
        <div className="container mx-auto flex justify-center px-10 md:px-6">
          <div className="flex justify-center text-center">
            <Button size="lg" className={`mx-auto text-sm md:text-xl px-4 md:px-10 py-6 md:py-8 pulse-green-button w-full max-w-md whitespace-nowrap ${countryLanding ? "" : "sm:max-w-none sm:w-auto"}`} onClick={handleRegistrationClick}>
              {countryLanding ? "¡QUIERO ASEGURAR MI CUPO AHORA!" : geo ? "QUIERO MI CUPO GRATIS" : "¡QUIERO ASEGURAR MI CUPO!"}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
