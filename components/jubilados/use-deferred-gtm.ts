"use client"

import { useCallback } from "react"

// Mismo mapeo dominio -> GTM ID que antes se resolvía en el servidor con
// headers() en app/layout.tsx. Se movió al cliente (window.location.hostname)
// para poder servir la landing como HTML estático y cacheado, y para que GTM
// recién cargue cuando el usuario muestra intención de registrarse.
const GTM_BY_DOMAIN: Record<string, string> = {
  "metodoconsistente.com": "GTM-NVMSSS4L",
  "martinmorales.online": "GTM-MK334PHN",
}

function getGtmIdForCurrentHost(): string | null {
  if (typeof window === "undefined") return null

  const host = window.location.hostname.toLowerCase()

  for (const domain of Object.keys(GTM_BY_DOMAIN)) {
    if (host === domain || host.endsWith(`.${domain}`)) {
      return GTM_BY_DOMAIN[domain]
    }
  }

  return null
}

// Flag a nivel de módulo: sin importar cuántos botones/instancias llamen a
// loadGtm(), el contenedor de GTM se inyecta una sola vez por sesión de página.
let gtmLoaded = false

function injectGtm(gtmId: string) {
  if (gtmLoaded || typeof window === "undefined") return
  gtmLoaded = true

  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  document.head.appendChild(script)
}

/**
 * Hook compartido para cargar Google Tag Manager de forma diferida.
 * Se conecta al onClick de todos los botones de registro ("QUIERO ASEGURAR
 * MI CUPO" y variantes): GTM no carga en la visita inicial, solo cuando el
 * usuario hace clic por primera vez en alguno de esos botones.
 */
export function useDeferredGtm() {
  const loadGtm = useCallback(() => {
    const gtmId = getGtmIdForCurrentHost()
    if (gtmId) {
      injectGtm(gtmId)
    }
  }, [])

  return { loadGtm }
}
