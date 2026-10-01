"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useDeferredGtm } from "@/hooks/use-deferred-gtm"

const ArrowUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="19" x2="12" y2="5" strokeWidth={2}></line>
    <polyline points="5,12 12,5 19,12" strokeWidth={2}></polyline>
  </svg>
)

export function FloatingCTA() {
  const { loadGtm } = useDeferredGtm()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const mainButton = document.getElementById("main-cta-button")
      if (mainButton) {
        const rect = mainButton.getBoundingClientRect()
        const isMainButtonVisible = rect.bottom > 0
        setIsVisible(!isMainButtonVisible)
      } else {
        // Fallback to scroll position if button not found
        setIsVisible(window.pageYOffset > 300)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    // Check initial state
    toggleVisibility()
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRegistrationClick = () => {
    loadGtm()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Floating CTA Button */}
      <div
        className={`fixed bottom-4 left-6 right-6 z-50 transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <div className="max-w-xs sm:max-w-sm mx-auto px-2">
          <div>
            <Button
              onClick={handleRegistrationClick}
              className="w-full pulse-green-button py-3 md:py-4 text-sm md:text-base shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#00D084]"
            >
              QUIERO MI CUPO GRATIS
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div
        className={`fixed bottom-16 md:bottom-20 right-6 z-50 transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <div className="backdrop-blur-sm bg-black/10 rounded-full p-1">
          <Button
            onClick={scrollToTop}
            size="icon"
            className="bg-secondary hover:bg-secondary/90 active:bg-secondary/90 text-secondary-foreground shadow-2xl border-2 border-white/20 w-10 h-10 md:w-12 md:h-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </>
  )
}
