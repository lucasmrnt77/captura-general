'use server'

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { getDateTimeGMT3 } from './date-utils'

let supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase
  
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  console.log('[v0] Supabase client configured:', supabaseUrl.replace(/^https?:\/\//, '').split('.')[0])

  supabase = createClient(supabaseUrl, supabaseKey)
  return supabase
}

export async function saveLead(data: {
  telefono: string
  pais: string
  fecha: string
  hora: string
  pagina_captura: string
  campana: string
  anuncio: string
  utm_source: string
  utm_medium: string
  utm_term: string
}) {
  try {
    const client = getSupabaseClient()
    const { data: result, error } = await client
      .from('leads_eventos')
      .insert([data])
      .select()

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('[v0] Supabase save error:', error)
    return { success: false, error }
  }
}

export async function saveLeadPaginaGeneral(data: {
  telefono: string
  pais?: string
  fecha?: string | null
  hora?: string | null
  pagina_captura?: string
  campaign?: string
  anuncio?: string
  utm_source?: string
  utm_medium?: string
  utm_term?: string
  landing?: string
  video?: string
  pag_gracias?: string
}) {
  try {
    const client = getSupabaseClient()
    const { data: result, error } = await client
      .from('LeadsPaginaGeneral')
      .upsert([data], { onConflict: 'telefono' })
      .select()

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('[v0] LeadsPaginaGeneral save error:', error)
    return { success: false, error }
  }
}

export async function updateLeadPaginaGeneral(
  telefono: string,
  data: { edad?: string; genero?: string; respuesta_dinero?: string },
) {
  try {
    const client = getSupabaseClient()
    const { data: result, error } = await client
      .from('LeadsPaginaGeneral')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('telefono', telefono)
      .select()

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('[v0] LeadsPaginaGeneral update error:', error)
    return { success: false, error }
  }
}

export async function updateLeadResponse(telefono: string, respuesta: string, details?: {
  age_range?: string
  gender?: string
}) {
  try {
    const client = getSupabaseClient()
    const { data: result, error } = await client
      .from('leads_eventos')
      .update({
        respuesta,
        respuesta_fecha: getDateTimeGMT3(),
        ...(details?.age_range ? { edad: details.age_range } : {}),
        ...(details?.gender ? { genero: details.gender } : {}),
      })
      .eq('telefono', telefono)
      .select()

    if (error) throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('[v0] Supabase update error:', error)
    return { success: false, error }
  }
}

export async function getLeadByPhone(telefono: string) {
  try {
    const client = getSupabaseClient()
    const { data: result, error } = await client
      .from('leads_eventos')
      .select('*')
      .eq('telefono', telefono)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return { success: true, data: result }
  } catch (error) {
    console.error('[v0] Supabase search error:', error)
    return { success: false, error }
  }
}
