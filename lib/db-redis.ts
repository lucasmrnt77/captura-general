import { kv } from "@vercel/kv"

export interface Lead {
  telefono: string
  pais: string
  fecha: string
  hora: string
  pagina_captura: string
  campana: string
  anuncio: string
  utm_source?: string
  utm_medium?: string
  utm_term?: string
  respuesta?: string
  respuesta_fecha?: string
  age_range?: string
  gender?: string
  capital_amount?: string
  video_id?: string
}

// Guardar en caché con TTL de 24 horas
export async function saveLedToCache(lead: Lead): Promise<boolean> {
  try {
    const key = `lead:${lead.telefono}`
    await kv.set(key, JSON.stringify(lead), { ex: 86400 })
    console.log("[v0] Lead guardado en Redis caché")
    return true
  } catch (error) {
    console.log("[v0] Error guardando en Redis:", error)
    return false
  }
}

// Obtener del caché
export async function getLeadFromCache(telefono: string): Promise<Lead | null> {
  try {
    const key = `lead:${telefono}`
    const cached = await kv.get(key)
    if (!cached) {
      console.log("[v0] Lead no encontrado en caché")
      return null
    }
    console.log("[v0] Lead recuperado del caché Redis")
    return JSON.parse(cached as string) as Lead
  } catch (error) {
    console.log("[v0] Error obteniendo del caché:", error)
    return null
  }
}

// Actualizar respuesta en caché
export async function updateLeadResponseInCache(telefono: string, respuesta: string): Promise<boolean> {
  try {
    const key = `lead:${telefono}`
    const cached = await kv.get(key)

    if (!cached) {
      console.log("[v0] Lead no existe en caché para actualizar")
      return false
    }

    const lead = JSON.parse(cached as string) as Lead
    lead.respuesta = respuesta
    lead.respuesta_fecha = new Date().toISOString()

    await kv.set(key, JSON.stringify(lead), { ex: 86400 })
    console.log("[v0] Respuesta actualizada en Redis caché")
    return true
  } catch (error) {
    console.log("[v0] Error actualizando respuesta en caché:", error)
    return false
  }
}

// Cola de reintentos para cuando fallan las BDs
export async function addToRetryQueue(lead: Lead): Promise<void> {
  try {
    const queueKey = "lead_retry_queue"
    await kv.lpush(queueKey, JSON.stringify(lead))
    console.log("[v0] Lead añadido a cola de reintentos")
  } catch (error) {
    console.log("[v0] Error añadiendo a cola de reintentos:", error)
  }
}

// Obtener del caché sin pasar por el servidor
export async function getLeadFromCacheClient(telefono: string): Promise<Lead | null> {
  try {
    const response = await fetch(`/api/cache/lead?telefono=${encodeURIComponent(telefono)}`)
    if (!response.ok) return null
    const data = await response.json()
    return data.lead || null
  } catch (error) {
    console.log("[v0] Error obteniendo del caché (client):", error)
    return null
  }
}
