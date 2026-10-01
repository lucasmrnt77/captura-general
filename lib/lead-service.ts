import { saveLead, updateLeadResponse } from "./supabase-actions"
import { saveLeadNeon, updateLeadResponseNeon, Lead as NeonLead } from "./db-neon"
import { saveLedToCache, updateLeadResponseInCache, addToRetryQueue } from "./db-redis"

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

/**
 * Guarda el lead en Supabase, Neon y Redis en paralelo
 * Si falla, intenta reintentos y lo guarda en cola de Redis
 */
export async function saveLeadMultiDB(lead: Lead): Promise<{
  supabase: boolean
  neon: boolean
  cache: boolean
}> {
  console.log("[v0] Iniciando guardado de lead en múltiples BDs:", lead.telefono)

  // Ejecutar todas las BDs en paralelo
  const [supabaseResult, neonResult, cacheResult] = await Promise.allSettled([
    saveLead({
      telefono: lead.telefono,
      pais: lead.pais,
      fecha: lead.fecha,
      hora: lead.hora,
      pagina_captura: lead.pagina_captura,
      campana: lead.campana,
      anuncio: lead.anuncio,
      utm_source: lead.utm_source || "",
      utm_medium: lead.utm_medium || "",
      utm_term: lead.utm_term || "",
    }),
    saveLeadNeon(lead, 2),
    saveLedToCache(lead),
  ])

  const results = {
    supabase: supabaseResult.status === "fulfilled" && supabaseResult.value.success,
    neon: neonResult.status === "fulfilled" ? neonResult.value : false,
    cache: cacheResult.status === "fulfilled" ? cacheResult.value : false,
  }

  console.log("[v0] Resultados de guardado:", results)

  // Si ambas BDs fallan, agregar a cola de reintentos
  if (!results.supabase && !results.neon) {
    console.log("[v0] Ambas BDs fallaron, agregando a cola de reintentos")
    await addToRetryQueue(lead)
  }

  return results
}

/**
 * Actualiza la respuesta del lead en Supabase, Neon y Redis
 */
export async function updateLeadResponseMultiDB(
  telefono: string,
  respuesta: string
): Promise<{
  supabase: boolean
  neon: boolean
  cache: boolean
}> {
  console.log("[v0] Actualizando respuesta del lead:", telefono, respuesta)

  const [supabaseResult, neonResult, cacheResult] = await Promise.allSettled([
    updateLeadResponse(telefono, respuesta),
    updateLeadResponseNeon(telefono, respuesta, 2),
    updateLeadResponseInCache(telefono, respuesta),
  ])

  const results = {
    supabase: supabaseResult.status === "fulfilled" && supabaseResult.value.success,
    neon: neonResult.status === "fulfilled" ? neonResult.value : false,
    cache: cacheResult.status === "fulfilled" ? cacheResult.value : false,
  }

  console.log("[v0] Resultados de actualización:", results)

  return results
}
