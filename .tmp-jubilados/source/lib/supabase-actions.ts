'use server'

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { getDateTimeGMT3 } from './date-utils'

let supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase
  
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

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

export async function updateLeadResponse(telefono: string, respuesta: string) {
  try {
    const client = getSupabaseClient()
    const { data: result, error } = await client
      .from('leads_eventos')
      .update({
        respuesta,
        respuesta_fecha: getDateTimeGMT3(),
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
