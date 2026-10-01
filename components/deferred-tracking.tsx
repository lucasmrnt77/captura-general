"use client"

import { useEffect } from "react"

const GTM_ID = "GTM-NVMSSS4L"

function loadGtm() {
  if (window.__deferredGtmLoaded) return

  window.__deferredGtmLoaded = true
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

export function DeferredTracking() {
  useEffect(() => {
    const isThanksPage = ["/gracias", "/gracias-video", "/gracias1-video", "/gracias-video3", "/gracias-video4"].includes(window.location.pathname)

    if (isThanksPage) {
      loadGtm()
    }

    const handleFormActivity = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLFormElement | null
      if (target instanceof HTMLInputElement && target.type === "tel") {
        loadGtm()
      }
      if (target instanceof HTMLFormElement) {
        loadGtm()
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ event: "lead_form_submit" })
      }
    }

    document.addEventListener("input", handleFormActivity, true)
    document.addEventListener("submit", handleFormActivity, true)

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const button = target?.closest("button, a")
      const label = button?.textContent?.toLowerCase() ?? ""

      if (button?.id === "main-cta-button" || label.includes("quiero asegurar mi cupo")) {
        loadGtm()
      }
    }

    document.addEventListener("click", handleClick, true)
    return () => {
      document.removeEventListener("input", handleFormActivity, true)
      document.removeEventListener("submit", handleFormActivity, true)
      document.removeEventListener("click", handleClick, true)
    }
  }, [])

  return null
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>
    __deferredGtmLoaded?: boolean
  }
}
