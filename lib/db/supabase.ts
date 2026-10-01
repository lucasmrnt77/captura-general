'use server'

import {
  saveLead,
  saveLeadPaginaGeneral,
  updateLeadResponse,
  updateLeadPaginaGeneral,
  getLeadByPhone,
} from '../supabase-actions'

/**
 * Guarda un lead en Supabase
 */
export async function saveLeadSupabase(data: any) {
  const legacyResult = await saveLead({
    telefono: data.telefono,
    pais: data.pais,
    fecha_hora: data.fecha_hora,
    pagina_captura: data.pagina_captura,
    campana: data.campana,
    anuncio: data.anuncio,
    utm_source: data.utm_source || '',
    utm_medium: data.utm_medium || '',
    utm_term: data.utm_term || '',
  })

  const [generalResult] = await Promise.allSettled([saveLeadPaginaGeneral({
    telefono: data.telefono,
    pais: data.pais,
    fecha: normalizeLeadDate(data.fecha),
    hora: data.hora,
    pagina_captura: data.pagina_captura,
    campaign: data.campana,
    anuncio: data.anuncio,
    utm_source: data.utm_source || '',
    utm_medium: data.utm_medium || '',
    utm_term: data.utm_term || '',
    landing: data.landing,
    video: data.video,
    pag_gracias: data.pag_gracias,
  })])

  if (generalResult.status === 'rejected' || !generalResult.value.success) {
    console.error('[v0] LeadsPaginaGeneral save failed:', generalResult.status === 'rejected' ? generalResult.reason : generalResult.value.error)
  }

  return {
    ...legacyResult,
    general: generalResult.status === 'fulfilled' ? generalResult.value.success : false,
  }
}

function normalizeLeadDate(value?: string): string | null {
  if (!value) return null
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  return match ? `${match[3]}-${match[2]}-${match[1]}` : value
}

/**
 * Actualiza la respuesta de un lead en Supabase
 */
export async function updateLeadSupabase(
  telefono: string,
  respuesta: string,
  details?: { age_range?: string; gender?: string; capital_amount?: string },
) {
  const legacyResult = await updateLeadResponse(telefono, respuesta, details)
  const [generalResult] = await Promise.allSettled([updateLeadPaginaGeneral(telefono, {
    edad: details?.age_range,
    genero: details?.gender,
    respuesta_dinero: details?.capital_amount || respuesta,
  })])

  if (generalResult.status === 'rejected' || !generalResult.value.success) {
    console.error('[v0] LeadsPaginaGeneral survey update failed:', generalResult.status === 'rejected' ? generalResult.reason : generalResult.value.error)
  }

  return legacyResult
}

/**
 * Busca un lead en Supabase por teléfono
 */
export async function searchLeadSupabase(telefono: string) {
  return await getLeadByPhone(telefono)
}
