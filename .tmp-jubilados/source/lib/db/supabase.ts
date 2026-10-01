'use server'

import { saveLead, updateLeadResponse, getLeadByPhone } from '../supabase-actions'

/**
 * Guarda un lead en Supabase
 */
export async function saveLeadSupabase(data: any) {
  return await saveLead({
    telefono: data.telefono,
    pais: data.pais,
    fecha: data.fecha,
    hora: data.hora,
    pagina_captura: data.pagina_captura,
    campana: data.campana,
    anuncio: data.anuncio,
    utm_source: data.utm_source || '',
    utm_medium: data.utm_medium || '',
    utm_term: data.utm_term || '',
  })
}

/**
 * Actualiza la respuesta de un lead en Supabase
 */
export async function updateLeadSupabase(telefono: string, respuesta: string) {
  return await updateLeadResponse(telefono, respuesta)
}

/**
 * Busca un lead en Supabase por teléfono
 */
export async function searchLeadSupabase(telefono: string) {
  return await getLeadByPhone(telefono)
}
